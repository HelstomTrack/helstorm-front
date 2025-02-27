import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { FieldErrors, UseFormRegister } from "react-hook-form"

type AccountDetailsProps = {
    register: UseFormRegister<any>
    errors: FieldErrors
}

export function AccountDetails({ register, errors }: AccountDetailsProps) {
    return (
        <>
            <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email
                </Label>
                <Input
                    id="email"
                    type="email"
                    placeholder={"Entrez votre adresse email"}
                    {...register("email")}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message as string}</p>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Mot de passe
                </Label>
                <Input
                    id="password"
                    type="password"
                    placeholder={"Entrez votre mot de passe"}
                    {...register("password")}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message as string}</p>}
            </div>
        </>
    )
}

