import type { UseFormGetValues } from "react-hook-form"

type ConfirmationProps = {
    getValues: UseFormGetValues<any>
}

export function Confirmation({ getValues }: ConfirmationProps) {
    return (
        <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">Vérifiez vos informations</h3>
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <p>
                    <span className="font-medium text-gray-700">Nom complet:</span> {getValues("firstname")}{" "}
                    {getValues("lastname")}
                </p>
                <p>
                    <span className="font-medium text-gray-700">Email:</span> {getValues("email")}
                </p>
                <p>
                    <span className="font-medium text-gray-700">Téléphone:</span> {getValues("phone")}
                </p>
                <p>
                    <span className="font-medium text-gray-700">Âge:</span> {getValues("age")} ans
                </p>
                <p>
                    <span className="font-medium text-gray-700">Poids:</span> {getValues("weight")} kg
                </p>
                <p>
                    <span className="font-medium text-gray-700">Taille:</span> {getValues("height")} cm
                </p>
                <p>
                    <span className="font-medium text-gray-700">Genre:</span> {getValues("gender")}
                </p>
                <p>
                    <span className="font-medium text-gray-700">Objectif:</span> {getValues("goal")}
                </p>
                <p>
                    <span className="font-medium text-gray-700">Niveau:</span> {getValues("level")}
                </p>
            </div>
            <p className="text-sm text-gray-600">
                Veuillez vérifier que toutes les informations ci-dessus sont correctes avant de vous inscrire.
            </p>
        </div>
    )
}

