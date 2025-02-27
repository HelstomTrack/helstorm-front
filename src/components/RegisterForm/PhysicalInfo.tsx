import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { FieldErrors, UseFormRegister } from "react-hook-form"

type PhysicalInfoProps = {
  register: UseFormRegister<any>
  errors: FieldErrors
}

export function PhysicalInfo({ register, errors }: PhysicalInfoProps) {
  return (
      <>
        <div className="space-y-2">
          <Label htmlFor="age" className="text-sm font-medium text-gray-700">
            Âge
          </Label>
          <Input
              id="age"
              placeholder={"Entrez votre âge"}
              type="number"
              {...register("age", { valueAsNumber: true })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age.message as string}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="weight" className="text-sm font-medium text-gray-700">
            Poids (kg)
          </Label>
          <Input
              id="weight"
              type="number"
              placeholder={"Entrez votre poids"}
              {...register("weight", { valueAsNumber: true })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          {errors.weight && <p className="text-red-500 text-xs mt-1">{errors.weight.message as string}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="height" className="text-sm font-medium text-gray-700">
            Taille (cm)
          </Label>
          <Input
              id="height"
              type="number"
                placeholder={"Entrez votre taille"}
              {...register("height", { valueAsNumber: true })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          {errors.height && <p className="text-red-500 text-xs mt-1">{errors.height.message as string}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="gender" className="text-sm font-medium text-gray-700">
            Genre
          </Label>
          <Select onValueChange={(value) => register("gender").onChange({ target: { value } })}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sélectionnez votre genre" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="man">Homme</SelectItem>
              <SelectItem value="woman">Femme</SelectItem>
              <SelectItem value="other">Autre</SelectItem>
            </SelectContent>
          </Select>
          {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender.message as string}</p>}
        </div>
      </>
  )
}

