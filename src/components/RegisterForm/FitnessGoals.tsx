import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form"

type FitnessGoalsProps = {
    register: UseFormRegister<any>
    errors: FieldErrors
    setValue: UseFormSetValue<any>
}

export function FitnessGoals({ register, errors, setValue }: FitnessGoalsProps) {
    return (
        <>
            <div className="space-y-2">
                <Label htmlFor="goal" className="text-sm font-medium text-gray-700">
                    Objectif
                </Label>
                <Select onValueChange={(value) => setValue("goal", value)}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Sélectionnez votre objectif" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Cut">Définition musculaire (sèche)</SelectItem>
                        <SelectItem value="Bulk">Prise de masse</SelectItem>
                    </SelectContent>
                </Select>
                {errors.goal && <p className="text-red-500 text-xs mt-1">{errors.goal.message as string}</p>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="level" className="text-sm font-medium text-gray-700">
                    Niveau
                </Label>
                <Select onValueChange={(value) => setValue("level", value)}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Sélectionnez votre niveau" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="beginner">Débutant</SelectItem>
                        <SelectItem value="intermediate">Intermédiaire</SelectItem>
                        <SelectItem value="advanced">Avancé</SelectItem>
                    </SelectContent>
                </Select>
                {errors.level && <p className="text-red-500 text-xs mt-1">{errors.level.message as string}</p>}
            </div>
        </>
    )
}

