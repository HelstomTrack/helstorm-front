import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { FieldErrors, UseFormRegister } from "react-hook-form"

type PersonalInfoProps = {
    register: UseFormRegister<any>
    errors: FieldErrors
}

export function PersonalInfo({ register, errors }: PersonalInfoProps) {
    return (
        <>
            <div className="space-y-2">
                <Label htmlFor="firstname" className="text-sm font-medium text-gray-700">
                    Prénom
                </Label>
                <Input
                    id="firstname"
                    {...register("firstname")}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                {errors.firstname && <p className="text-red-500 text-xs mt-1">{errors.firstname.message as string}</p>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="lastname" className="text-sm font-medium text-gray-700">
                    Nom
                </Label>
                <Input
                    id="lastname"
                    {...register("lastname")}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                {errors.lastname && <p className="text-red-500 text-xs mt-1">{errors.lastname.message as string}</p>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                    Téléphone
                </Label>
                <Input
                    id="phone"
                    {...register("phone")}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message as string}</p>}
            </div>
        </>
    )
}

