"use client"

import { useState } from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, User, Mail, Scale, Target, CheckCircle, Loader2 } from "lucide-react"
import { PersonalInfo } from "./PersonalInfo"
import { AccountDetails } from "./AccountDetails"
import { PhysicalInfo } from "./PhysicalInfo"
import { FitnessGoals } from "./FitnessGoals"
import { Confirmation } from "./Confirmation"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

const formSchema = z.object({
    email: z.string().email("Adresse email invalide"),
    firstname: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
    lastname: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
    phone: z.string().regex(/^[0-9]{10}$/, "Numéro de téléphone invalide"),
    password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
    age: z.number().min(18, "Vous devez avoir au moins 18 ans").max(120, "Âge invalide"),
    weight: z.number().min(30, "Poids minimum 30 kg").max(300, "Poids maximum 300 kg"),
    height: z.number().min(100, "Taille minimum 100 cm").max(250, "Taille maximum 250 cm"),
    goal: z.enum(["Shred", "Cut", "Bulk", "Strong", "Fit", "Power", "Enduro"]),
    level: z.enum(["beginner", "intermediate", "advanced"]),
    gender: z.enum(["man", "woman", "other"]),
})

type FormData = z.infer<typeof formSchema>

export default function RegisterForm() {
    const router = useRouter()
    const [step, setStep] = useState(1)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { toast } = useToast()

    const {
        register,
        handleSubmit,
        formState: { errors },
        trigger,
        getValues,
        setValue,
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            goal: "Shred",
            level: "beginner",
            gender: "other",
        },
    })

    const nextStep = async () => {
        const fieldsToValidate = [
            ["firstname", "lastname", "phone"],
            ["email", "password"],
            ["age", "weight", "height", "gender"],
            ["goal", "level"],
            [],
        ][step - 1]

        const isStepValid = await trigger(fieldsToValidate as any)
        if (isStepValid) setStep((prev) => Math.min(prev + 1, 5))
    }

    const prevStep = () => setStep((prev) => Math.max(prev - 1, 1))

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        try {
            setIsSubmitting(true)

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })

            if (!response.ok) throw new Error("Erreur lors de l'inscription")

            toast({
                title: "Inscription réussie",
                description: "Votre compte a été créé avec succès.",
            })
            router.push("/login")
        } catch (error) {
            console.error("Erreur d'inscription:", error)
            toast({
                title: "Erreur d'inscription",
                description: "Une erreur est survenue lors de l'inscription. Veuillez réessayer.",
                variant: "destructive",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    const steps = [
        { icon: <User className="w-6 h-6" />, title: "Informations personnelles" },
        { icon: <Mail className="w-6 h-6" />, title: "Détails du compte" },
        { icon: <Scale className="w-6 h-6" />, title: "Informations physiques" },
        { icon: <Target className="w-6 h-6" />, title: "Objectifs fitness" },
        { icon: <CheckCircle className="w-6 h-6" />, title: "Confirmation" },
    ]

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br p-4">
            <Card className="w-full max-w-lg bg-white/80 backdrop-blur-sm shadow-xl relative">
                {/* Overlay de chargement plein écran de la carte */}
                {isSubmitting && (
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-white/60 dark:bg-black/40 backdrop-blur-sm rounded-xl">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <p className="text-sm text-muted-foreground">Création du compte en cours…</p>
                    </div>
                )}

                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center text-gray-800">Créer un compte</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="mb-8">
                        <div className="flex justify-between mb-2">
                            {steps.map((s, i) => (
                                <div key={i} className="flex flex-col items-center w-1/5">
                                    <div
                                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                            i + 1 <= step ? "bg-primary text-white" : "bg-gray-200 text-gray-500"
                                        }`}
                                    >
                                        {s.icon}
                                    </div>
                                    <span className="text-xs mt-2 text-center text-gray-600 w-full px-1">{s.title}</span>
                                </div>
                            ))}
                        </div>
                        <div className="relative mt-2">
                            <div
                                className="absolute top-0 left-0 h-1 bg-primary transition-all duration-300 ease-in-out"
                                style={{ width: `${((step - 1) / 4) * 100}%` }}
                            />
                            <div className="h-1 w-full bg-gray-200 rounded-full" />
                        </div>
                    </div>

                    {/* Désactive tous les champs pendant le submit */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <fieldset disabled={isSubmitting} className="space-y-6">
                            {step === 1 && <PersonalInfo register={register} errors={errors} />}
                            {step === 2 && <AccountDetails register={register} errors={errors} />}
                            {step === 3 && <PhysicalInfo register={register} errors={errors} />}
                            {step === 4 && <FitnessGoals register={register} errors={errors} setValue={setValue} />}
                            {step === 5 && <Confirmation getValues={getValues} />}
                        </fieldset>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    {step > 1 && (
                        <Button type="button" variant="outline" onClick={prevStep} className="flex items-center" disabled={isSubmitting}>
                            <ChevronLeft className="w-4 h-4 mr-2" /> Précédent
                        </Button>
                    )}

                    {step < 5 ? (
                        <Button type="button" onClick={nextStep} className="ml-auto flex items-center" disabled={isSubmitting}>
                            Suivant <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                    ) : (
                        <Button type="submit" onClick={handleSubmit(onSubmit)} className="ml-auto" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <span className="inline-flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" /> Inscription en cours…
                </span>
                            ) : (
                                "S'inscrire"
                            )}
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </div>
    )
}
