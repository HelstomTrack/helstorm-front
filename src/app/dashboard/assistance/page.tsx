"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Target, Zap } from "lucide-react"

interface Exercise {
    id: string
    name: string
    category: string
    difficulty: "Débutant" | "Intermédiaire" | "Avancé"
    targetMuscles: string[]
    equipment: string
    instructions: string[]
    tips: string[]
    variations?: string[]
    image: string
}

const exercises: Exercise[] = [
    {
        id: "1",
        name: "Pompes Classiques",
        category: "Pectoraux",
        difficulty: "Débutant",
        targetMuscles: ["Pectoraux", "Triceps", "Épaules"],
        equipment: "Aucun",
        image: "/pompe.jpg",
        instructions: [
            "Placez-vous en position de planche, mains écartées à la largeur des épaules",
            "Gardez le corps droit de la tête aux talons",
            "Descendez en fléchissant les bras jusqu'à ce que la poitrine touche presque le sol",
            "Poussez pour revenir à la position de départ",
            "Respirez en descendant, expirez en poussant",
        ],
        tips: ["Gardez les abdominaux contractés", "Ne cambrez pas le dos", "Contrôlez la descente"],
        variations: [
            "Pompes sur les genoux pour débutants",
            "Pompes inclinées (pieds surélevés)",
            "Pompes diamant pour les triceps",
        ],
    },
    {
        id: "2",
        name: "Squats",
        category: "Jambes",
        difficulty: "Débutant",
        targetMuscles: ["Quadriceps", "Fessiers", "Ischio-jambiers"],
        equipment: "Aucun",
        image: "/squat.jpg",
        instructions: [
            "Debout, pieds écartés à la largeur des hanches",
            "Descendez en poussant les fesses vers l'arrière",
            "Fléchissez les genoux jusqu'à ce que les cuisses soient parallèles au sol",
            "Gardez le poids sur les talons",
            "Remontez en poussant sur les talons",
        ],
        tips: [
            "Gardez le dos droit",
            "Les genoux ne dépassent pas les orteils",
            "Descendez lentement, remontez rapidement",
        ],
        variations: ["Squats sautés", "Squats sumo (pieds plus écartés)", "Squats bulgares (une jambe)"],
    },
    {
        id: "3",
        name: "Planche",
        category: "Core",
        difficulty: "Intermédiaire",
        targetMuscles: ["Abdominaux", "Dos", "Épaules"],
        equipment: "Aucun",
        image: "/plank.jpg",
        instructions: [
            "Placez-vous en position de pompe sur les avant-bras",
            "Coudes sous les épaules, avant-bras parallèles",
            "Gardez le corps droit de la tête aux talons",
            "Contractez les abdominaux et les fessiers",
            "Maintenez la position en respirant normalement",
        ],
        tips: ["Ne levez pas les fesses", "Ne laissez pas les hanches s'affaisser", "Regardez vers le sol"],
        variations: ["Planche sur les mains", "Planche latérale", "Planche avec levée de jambe"],
    },
    {
        id: "4",
        name: "Tractions",
        category: "Dos",
        difficulty: "Avancé",
        targetMuscles: ["Grand dorsal", "Biceps", "Rhomboïdes"],
        equipment: "Barre de traction",
        image: "/traction.jpg",
        instructions: [
            "Suspendez-vous à la barre, mains en pronation",
            "Écartement légèrement plus large que les épaules",
            "Tirez-vous vers le haut jusqu'à ce que le menton dépasse la barre",
            "Descendez lentement jusqu'à l'extension complète des bras",
            "Gardez les épaules engagées",
        ],
        tips: ["Évitez de vous balancer", "Tirez avec le dos, pas seulement les bras", "Contrôlez la descente"],
        variations: ["Tractions assistées avec élastique", "Tractions en supination (chin-ups)", "Tractions larges"],
    },
    {
        id: "5",
        name: "Burpees",
        category: "Cardio",
        difficulty: "Intermédiaire",
        targetMuscles: ["Corps entier"],
        equipment: "Aucun",
        image: "/burpeese.jpg",
        instructions: [
            "Debout, pieds écartés à la largeur des hanches",
            "Accroupissez-vous et placez les mains au sol",
            "Sautez en arrière pour vous mettre en position de planche",
            "Effectuez une pompe (optionnel)",
            "Sautez pour ramener les pieds vers les mains",
            "Sautez verticalement avec les bras en l'air",
        ],
        tips: ["Gardez un rythme constant", "Atterrissez en douceur", "Adaptez l'intensité selon votre niveau"],
        variations: ["Burpees sans pompe", "Burpees sans saut final", "Burpees avec tuck jump"],
    },
    {
        id: "6",
        name: "Développé Couché",
        category: "Pectoraux",
        difficulty: "Intermédiaire",
        targetMuscles: ["Pectoraux", "Triceps", "Épaules antérieures"],
        equipment: "Barre, banc, poids",
        image: "/benchpress.jpg",
        instructions: [
            "Allongez-vous sur le banc, pieds au sol",
            "Saisissez la barre avec les mains écartées",
            "Sortez la barre du rack et stabilisez au-dessus de la poitrine",
            "Descendez la barre jusqu'à la poitrine en contrôlant",
            "Poussez la barre vers le haut jusqu'à l'extension complète",
        ],
        tips: [
            "Gardez les omoplates serrées",
            "Ne rebondissez pas sur la poitrine",
            "Utilisez un spotteur pour la sécurité",
        ],
        variations: ["Développé incliné", "Développé décliné", "Développé avec haltères"],
    },
    {
        id: "7",
        name: "Soulevé de Terre",
        category: "Dos",
        difficulty: "Avancé",
        targetMuscles: ["Ischio-jambiers", "Fessiers", "Dos", "Trapèzes"],
        equipment: "Barre, poids",
        image: "/deadlift.jpg",
        instructions: [
            "Debout, barre devant vous au sol",
            "Pieds écartés à la largeur des hanches",
            "Fléchissez les hanches et genoux pour saisir la barre",
            "Gardez le dos droit, poitrine sortie",
            "Soulevez en poussant sur les talons et en étendant les hanches",
            "Redescendez en contrôlant le mouvement",
        ],
        tips: ["La barre reste proche du corps", "Ne tirez pas avec le dos rond", "Commencez avec un poids léger"],
        variations: ["Soulevé de terre roumain", "Soulevé de terre sumo", "Soulevé de terre avec haltères"],
    },
    {
        id: "8",
        name: "Fentes",
        category: "Jambes",
        difficulty: "Débutant",
        targetMuscles: ["Quadriceps", "Fessiers", "Mollets"],
        equipment: "Aucun",
        image: "/fentes.jpg",
        instructions: [
            "Debout, pieds écartés à la largeur des hanches",
            "Faites un grand pas en avant avec une jambe",
            "Descendez jusqu'à ce que les deux genoux forment un angle de 90°",
            "Le genou arrière ne touche pas le sol",
            "Poussez sur le talon avant pour revenir à la position de départ",
        ],
        tips: ["Gardez le torse droit", "Le genou avant ne dépasse pas l'orteil", "Alternez les jambes"],
        variations: ["Fentes marchées", "Fentes latérales", "Fentes sautées"],
    },
    {
        id: "9",
        name: "Dips",
        category: "Triceps",
        difficulty: "Intermédiaire",
        targetMuscles: ["Triceps", "Pectoraux inférieurs", "Épaules"],
        equipment: "Barres parallèles ou chaise",
        image: "/dips.jpg",
        instructions: [
            "Placez-vous entre les barres parallèles",
            "Saisissez les barres, bras tendus",
            "Descendez en fléchissant les coudes",
            "Descendez jusqu'à ce que les épaules soient sous les coudes",
            "Poussez pour revenir à la position de départ",
        ],
        tips: ["Gardez le corps droit", "Ne descendez pas trop bas", "Contrôlez la descente"],
        variations: ["Dips assistés", "Dips sur chaise", "Dips lestés"],
    },
    {
        id: "10",
        name: "Mountain Climbers",
        category: "Cardio",
        difficulty: "Débutant",
        targetMuscles: ["Abdominaux", "Épaules", "Jambes"],
        equipment: "Aucun",
        image: "/mountain.jpg",
        instructions: [
            "Placez-vous en position de planche haute",
            "Amenez un genou vers la poitrine",
            "Revenez à la position de départ",
            "Alternez rapidement les jambes",
            "Gardez les hanches stables",
        ],
        tips: ["Gardez le rythme constant", "Ne levez pas les fesses", "Respirez régulièrement"],
        variations: ["Mountain climbers lents", "Mountain climbers croisés", "Mountain climbers avec pause"],
    },
]

const categories = ["Tous", "Pectoraux", "Jambes", "Dos", "Core", "Triceps", "Cardio"]
const difficulties = ["Tous", "Débutant", "Intermédiaire", "Avancé"]

export default function ExercisePage() {
    const [selectedCategory, setSelectedCategory] = useState("Tous")
    const [selectedDifficulty, setSelectedDifficulty] = useState("Tous")

    const filteredExercises = exercises.filter((exercise) => {
        const categoryMatch = selectedCategory === "Tous" || exercise.category === selectedCategory
        const difficultyMatch = selectedDifficulty === "Tous" || exercise.difficulty === selectedDifficulty
        return categoryMatch && difficultyMatch
    })

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case "Débutant":
                return "bg-green-100 text-green-800"
            case "Intermédiaire":
                return "bg-yellow-100 text-yellow-800"
            case "Avancé":
                return "bg-red-100 text-red-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    return (
        <div className="min-h-screen bg-background">
            <main className="container mx-auto px-4 py-8">
                {/* Title Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">Guide d'Exercices Fitness</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
                        Collection complète d'exercices avec des instructions détaillées pour tous les niveaux et tous
                        les groupes musculaires.
                    </p>
                </div>

                {/* Filters */}
                <div className="mb-8 space-y-4">
                    <div>
                        <h3 className="text-lg font-semibold mb-3 text-foreground">Catégorie</h3>
                        <div className="flex flex-wrap gap-2">
                            {categories.map((category) => (
                                <Button
                                    key={category}
                                    variant={selectedCategory === category ? "default" : "outline"}
                                    onClick={() => setSelectedCategory(category)}
                                    className="text-sm"
                                >
                                    {category}
                                </Button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-3 text-foreground">Niveau</h3>
                        <div className="flex flex-wrap gap-2">
                            {difficulties.map((difficulty) => (
                                <Button
                                    key={difficulty}
                                    variant={selectedDifficulty === difficulty ? "default" : "outline"}
                                    onClick={() => setSelectedDifficulty(difficulty)}
                                    className="text-sm"
                                >
                                    {difficulty}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Exercise Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredExercises.map((exercise) => (
                        <Card key={exercise.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex justify-between items-start mb-2">
                                    <CardTitle className="text-xl font-bold text-balance">{exercise.name}</CardTitle>
                                    <Badge className={getDifficultyColor(exercise.difficulty)}>{exercise.difficulty}</Badge>
                                </div>
                                <CardDescription className="text-sm text-muted-foreground">{exercise.category}</CardDescription>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                {/* Exercise Image */}
                                <div className="w-full h-48 rounded-lg overflow-hidden bg-muted">
                                    <img
                                        src={exercise.image || "/placeholder.svg"}
                                        alt={`Démonstration de l'exercice ${exercise.name}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Quick Info */}
                                <div className="grid grid-cols-1 gap-4 text-sm">
                                    {/* Equipment */}
                                    <div className="flex items-center gap-2">
                                        <Zap className="h-4 w-4 text-accent" />
                                        <span className="text-muted-foreground">{exercise.equipment}</span>
                                    </div>
                                </div>

                                {/* Target Muscles */}
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Target className="h-4 w-4 text-primary" />
                                        <span className="text-sm font-medium">Muscles ciblés:</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1">
                                        {exercise.targetMuscles.map((muscle, index) => (
                                            <Badge key={index} variant="secondary" className="text-xs">
                                                {muscle}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                {/* Dialog Instructions */}
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" className="w-full bg-transparent">
                                            Voir les instructions
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                                        <DialogHeader>
                                            <DialogTitle className="text-2xl font-bold">{exercise.name}</DialogTitle>
                                            {/* FIX: Description renders a <p> by default; use asChild to avoid nesting a <div> inside <p> */}
                                            <DialogDescription asChild>
                                                <div className="flex items-center gap-2">
                                                    <Badge className={getDifficultyColor(exercise.difficulty)}>
                                                        {exercise.difficulty}
                                                    </Badge>
                                                    <span aria-hidden>•</span>
                                                    <span>{exercise.category}</span>
                                                </div>
                                            </DialogDescription>
                                        </DialogHeader>

                                        <div className="space-y-6">
                                            {/* Equipment and Target Muscles */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <Zap className="h-4 w-4 text-accent" />
                                                        <span className="font-medium">Équipement:</span>
                                                    </div>
                                                    <p className="text-muted-foreground">{exercise.equipment}</p>
                                                </div>

                                                <div>
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <Target className="h-4 w-4 text-primary" />
                                                        <span className="font-medium">Muscles ciblés:</span>
                                                    </div>
                                                    <div className="flex flex-wrap gap-1">
                                                        {exercise.targetMuscles.map((muscle, index) => (
                                                            <Badge key={index} variant="secondary" className="text-xs">
                                                                {muscle}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Instructions */}
                                            <div>
                                                <h4 className="font-semibold mb-3 text-primary text-lg">Instructions:</h4>
                                                <ol className="list-decimal list-inside space-y-2 text-sm">
                                                    {exercise.instructions.map((instruction, index) => (
                                                        <li key={index} className="leading-relaxed">
                                                            {instruction}
                                                        </li>
                                                    ))}
                                                </ol>
                                            </div>

                                            {/* Tips */}
                                            <div>
                                                <h4 className="font-semibold mb-3 text-primary text-lg">Conseils:</h4>
                                                <ul className="list-disc list-inside space-y-2 text-sm">
                                                    {exercise.tips.map((tip, index) => (
                                                        <li key={index} className="leading-relaxed">
                                                            {tip}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* Variations */}
                                            {exercise.variations && (
                                                <div>
                                                    <h4 className="font-semibold mb-3 text-foreground text-lg">Variations:</h4>
                                                    <ul className="list-disc list-inside space-y-2 text-sm">
                                                        {exercise.variations.map((variation, index) => (
                                                            <li key={index} className="leading-relaxed">
                                                                {variation}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* No Results */}
                {filteredExercises.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-lg text-muted-foreground">Aucun exercice trouvé pour ces critères.</p>
                    </div>
                )}
            </main>
        </div>
    )
}
