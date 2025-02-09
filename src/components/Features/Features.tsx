import {Zap, Dumbbell, CookingPot, Watch} from "lucide-react"

const features = [
    {
        name: "Génération de programme sportif",
        description: "Obtenez un programme sportif sur mesure, généré en fonction de vos besoins spécifiques.",
        icon: Dumbbell,
    },
    {
        name: "Génération de programme alimentaire",
        description: "Obtenez un programme alimentaire sur mesure, généré en fonction de vos besoins spécifiques.",
        icon: CookingPot,
    },
    {
        name: "Suivi de votre progression",
        description: "Accédez à vos programmes et suivez votre évolution au fil du temps.",
        icon: Watch,
    },
    {
        name: "Simple, rapide et efficace",
        description: "En quelques clics, obtenez le programme parfait pour atteindre vos objectifs.",
        icon: Zap,
    },
]

export default function Features() {
    return (
        <section className="container space-y-16 py-24 md:py-32">
            <div className="mx-auto max-w-[58rem] text-center">
                <h2 className="mt-2 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-6xl">Helstorm solution</h2>
                <p className="mt-4 text-muted-foreground sm:text-lg">
                    Obtient un programme sportif et alimentaire sur mesure, générés en fonction de vos besoins spécifiques.
                </p>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
                {features.map((feature) => (
                    <div key={feature.name} className="relative overflow-hidden rounded-lg border bg-background p-8 transition-all duration-300 hover:scale-110">
                        <div className="flex items-center gap-4">
                            <feature.icon className="h-8 w-8" />
                            <h3 className="font-bold">{feature.name}</h3>
                        </div>
                        <p className="mt-2 text-muted-foreground">{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

