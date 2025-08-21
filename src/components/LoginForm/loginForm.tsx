"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { setAccessToken, setRefreshToken } from "@/utils/api/auth/auth";

// Regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Au moins 8, 1 min, 1 maj, 1 chiffre, 1 spécial, pas d'espace
const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])[^\s]{8,72}$/;

const formSchema = z.object({
    username: z
        .string()
        .min(5, { message: "L'email doit faire au moins 5 caractères." })
        .email({ message: "Format d'email invalide." })
        .regex(emailRegex, { message: "Format d'email invalide." }),
    password: z
        .string()
        .min(8, { message: "Le mot de passe doit faire au moins 8 caractères." })
        .regex(passwordRegex, {
            message:
                "Le mot de passe doit contenir : 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial, et aucun espace.",
        }),
});

type FormData = z.infer<typeof formSchema>;

export function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();

    const onSubmit = async (data: FormData) => {
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/login_check`,
                {
                    username: data.username,
                    password: data.password,
                },
            );

            const { token, refresh_token } = response.data;

            setAccessToken(token);
            setRefreshToken(refresh_token);

            router.push("/dashboard");
        } catch (error: any) {
            console.error("Erreur de connexion", error);

            if (axios.isAxiosError(error)) {
                if (error.response?.status === 401) {
                    setErrorMessage("Mauvais identifiants, veuillez réessayer.");
                } else {
                    setErrorMessage(
                        error.response?.data?.message ??
                        "Une erreur est survenue. Veuillez réessayer plus tard.",
                    );
                }
            } else {
                setErrorMessage("Erreur inconnue, veuillez réessayer.");
            }
        }
    };

    return (
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Login to your account</h1>
                <p className="text-balance text-sm text-muted-foreground">
                    Enter your email below to login to your account
                </p>
            </div>

            <div className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="username">Email</Label>
                    <Input
                        id="username"
                        type="email"
                        inputMode="email"
                        autoComplete="username"
                        placeholder="john.doe@email.com"
                        {...register("username")}
                    />
                    {errors.username && (
                        <p className="text-red-500 text-sm">{errors.username.message}</p>
                    )}
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        autoComplete="current-password"
                        placeholder="Entrez votre mot de passe"
                        {...register("password")}
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm">{errors.password.message}</p>
                    )}
                </div>

                {errorMessage && <p className="text-red-500">{errorMessage}</p>}

                <Button type="submit" className="w-full">
                    Login
                </Button>
            </div>

            <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="/register" className="underline underline-offset-4">
                    Sign up
                </a>
            </div>
        </form>
    );
}
