"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

// ✅ Définition du schéma de validation avec Zod
const formSchema = z.object({
    username: z.string().min(2, { message: "Username must be at least 2 characters." }),
    password: z.string().min(4, { message: "Password must be at least 6 characters." }),
});

// ✅ Définition du type dérivé du schéma Zod
type FormData = z.infer<typeof formSchema>;

export function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema), // ✅ Validation avec Zod
    });

    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();

    // ✅ Fonction de soumission du formulaire
    const onSubmit = async (data: FormData) => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/login_check`, {
                username: data.username,
                password: data.password,
            });

            const token = response.data.token;
            Cookies.set("token", token, { expires: 1 });

            router.push("/success");
        } catch (error) {
            setErrorMessage("Identifiants incorrects !");
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
                {/* Champ Username */}
                <div className="grid gap-2">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" type="text" {...register("username")} />
                    {errors.username && (
                        <p className="text-red-500 text-sm">{errors.username.message}</p>
                    )}
                </div>

                {/* Champ Password */}
                <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" {...register("password")} />
                    {errors.password && (
                        <p className="text-red-500 text-sm">{errors.password.message}</p>
                    )}
                </div>

                {/* Message d'erreur backend */}
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}

                {/* Bouton Submit */}
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
