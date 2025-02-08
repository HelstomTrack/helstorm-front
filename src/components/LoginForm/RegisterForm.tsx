"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/hooks/use-toast"

const personalInfoSchema = z.object({
    firstName: z.string().min(2, { message: "Le prénom doit contenir au moins 2 caractères." }),
    lastName: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères." }),
    age: z
        .number()
        .min(18, { message: "Vous devez avoir au moins 18 ans." })
        .max(120, { message: "L'âge maximum est de 120 ans." }),
})

const contactInfoSchema = z.object({
    email: z.string().email({ message: "Veuillez entrer une adresse email valide." }),
    phone: z.string().regex(/^\d{10}$/, { message: "Le numéro de téléphone doit contenir 10 chiffres." }),
})

const preferencesSchema = z.object({
    newsletter: z.enum(["oui", "non"], { required_error: "Veuillez choisir une option." }),
    theme: z.enum(["light", "dark"], { required_error: "Veuillez choisir un thème." }),
})

const formSchema = personalInfoSchema.merge(contactInfoSchema).merge(preferencesSchema)

type FormData = z.infer<typeof formSchema>

const steps = [
    { title: "Informations personnelles", schema: personalInfoSchema },
    { title: "Informations de contact", schema: contactInfoSchema },
    { title: "Préférences", schema: preferencesSchema },
]

export default function RegisterForm() {
    const [step, setStep] = useState(0)

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            age: 0,
            email: "",
            phone: "",
            newsletter: "non",
            theme: "light",
        },
    })

    function onSubmit(data: FormData) {
        toast({
            title: "Inscription réussie !",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
            ),
        })
    }

    const currentSchema = steps[step].schema

    return (
        <Card className="w-[550px]">
            <CardHeader>
                <CardTitle>{steps[step].title}</CardTitle>
            </CardHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardContent>
                        {step === 0 && (
                            <>
                                <FormField
                                    control={form.control}
                                    name="firstName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Prénom</FormLabel>
                                            <FormControl>
                                                <Input placeholder="John" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="lastName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nom</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Doe" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="age"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Âge</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    {...field}
                                                    onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}
                        {step === 1 && (
                            <>
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="john@example.com" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Téléphone</FormLabel>
                                            <FormControl>
                                                <Input placeholder="0123456789" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}
                        {step === 2 && (
                            <>
                                <FormField
                                    control={form.control}
                                    name="newsletter"
                                    render={({ field }) => (
                                        <FormItem className="space-y-3">
                                            <FormLabel>S'abonner à la newsletter ?</FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                    className="flex flex-col space-y-1"
                                                >
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="oui" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">Oui</FormLabel>
                                                    </FormItem>
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="non" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">Non</FormLabel>
                                                    </FormItem>
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="theme"
                                    render={({ field }) => (
                                        <FormItem className="space-y-3">
                                            <FormLabel>Thème préféré</FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                    className="flex flex-col space-y-1"
                                                >
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="light" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">Clair</FormLabel>
                                                    </FormItem>
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="dark" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">Sombre</FormLabel>
                                                    </FormItem>
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button type="button" variant="outline" onClick={() => setStep(step - 1)} disabled={step === 0}>
                            Précédent
                        </Button>
                        <Button
                            type={step === steps.length - 1 ? "submit" : "button"}
                            onClick={() => {
                                if (step < steps.length - 1) {
                                    form.trigger(Object.keys(currentSchema.shape) as Array<keyof FormData>).then((isValid) => {
                                        if (isValid) {
                                            setStep(step + 1)
                                        }
                                    })
                                }
                            }}
                        >
                            {step === steps.length - 1 ? "Soumettre" : "Suivant"}
                        </Button>
                    </CardFooter>
                </form>
            </Form>
            <div className="px-6 pb-6">
                <div className="flex justify-between text-sm text-muted-foreground">
                    {steps.map((_, index) => (
                        <span key={index}>{`Étape ${index + 1}`}</span>
                    ))}
                </div>
                <div className="mt-2 h-2 rounded-full bg-secondary">
                    <div
                        className="h-full rounded-full bg-primary transition-all duration-300 ease-in-out"
                        style={{ width: `${((step + 1) / steps.length) * 100}%` }}
                    ></div>
                </div>
            </div>
        </Card>
    )
}
