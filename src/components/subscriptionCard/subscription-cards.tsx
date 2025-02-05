import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

const plans = [
    {
        name: "Débutant",
        price: "9,99€",
        description: "Parfait pour commencer votre parcours fitness",
        features: [
            "Programme d'entraînement personnalisé",
            "Plan alimentaire de base",
            "Suivi des progrès",
            "Accès à la communauté",
        ],
    },
    {
        name: "Avancé",
        price: "19,99€",
        description: "Pour ceux qui veulent pousser leurs limites",
        features: [
            "Tout ce qui est inclus dans Débutant",
            "Plans d'entraînement avancés",
            "Conseils nutritionnels détaillés",
            "Analyse vidéo de vos exercices",
            "Chat avec des coachs certifiés",
        ],
    },
    {
        name: "Elite",
        price: "29,99€",
        description: "L'expérience ultime pour des résultats maximaux",
        features: [
            "Tout ce qui est inclus dans Avancé",
            "Programmes ultra-personnalisés",
            "Consultation mensuelle avec un nutritionniste",
            "Accès prioritaire aux nouvelles fonctionnalités",
            "Suivi de santé avancé (sommeil, stress, etc.)",
        ],
    },
]

export function SubscriptionCards() {
    return (
        <div className="grid gap-8 md:grid-cols-3">
            {plans.map((plan, index) => (
                <Card key={index} className={index === 1 ? "border-primary" : ""}>
                    <CardHeader>
                        <CardTitle>{plan.name}</CardTitle>
                        <CardDescription>{plan.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">
                            {plan.price}
                            <span className="text-sm font-normal"> / mois</span>
                        </p>
                        <ul className="mt-4 space-y-2">
                            {plan.features.map((feature, idx) => (
                                <li key={idx} className="flex items-center">
                                    <Check className="mr-2 h-4 w-4 text-primary" />
                                    <span className="text-sm">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" variant={index === 1 ? "default" : "outline"}>
                            Choisir ce plan
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}

