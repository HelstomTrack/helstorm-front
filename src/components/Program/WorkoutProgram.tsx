"use client"

import { useState, useEffect } from "react"
import { Zap, Calendar, Clock, Target, Utensils, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getUserId } from "@/utils/cookieDecode"
import { getAccessToken } from "@/utils/api/auth/auth"

const WorkoutProgram = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [programData, setProgramData] = useState<any | null>(null)

    const fetchProgramData = async () => {
        try {
            setLoading(true)
            setError(null)

            const token = getAccessToken()
            const userId = getUserId()

            if (!userId) {
                setError("Utilisateur non connecté (ID introuvable dans le token).")
                setLoading(false)
                return
            }

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/programs/user/${userId}`,
                { credentials: "include", headers: { Authorization: `Bearer ${token}` } }
            )

            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`)
            }

            const raw = await response.json()

            // Adaptation pour différents formats possibles
            let program = null
            if (Array.isArray(raw)) {
                program = raw[0] ?? null
            } else if (raw && typeof raw === "object" && "program" in raw) {
                program = raw.program
            } else if (raw && typeof raw === "object") {
                program = raw
            }

            if (!program) {
                throw new Error("Réponse API invalide : aucun programme trouvé")
            }

            setProgramData(program)

        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Une erreur est survenue"
            setError(errorMessage)
            console.error("Erreur lors de la récupération:", err)
            setProgramData(null)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProgramData()
    }, [])

    const getIntensityColor = (intensite: string) => {
        switch (intensite?.toLowerCase()) {
            case "faible":
                return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
            case "modérée":
                return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
            case "élevée":
                return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <div className="container mx-auto px-4 py-8">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Mon Programme Fitness</h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Votre programme personnalisé d'entraînement et de nutrition
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                        <div className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
                            <Zap className="w-4 h-4" />
                            <span className="text-sm font-medium">{error}</span>
                        </div>
                    </div>
                )}

                {loading && (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600 dark:text-gray-400">Chargement de votre programme...</p>
                    </div>
                )}

                {programData && !loading && (
                    <Tabs defaultValue="sport" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-8">
                            <TabsTrigger value="sport" className="flex items-center gap-2">
                                <Target className="w-4 h-4" /> Programme Sportif
                            </TabsTrigger>
                            <TabsTrigger value="nutrition" className="flex items-center gap-2">
                                <Utensils className="w-4 h-4" /> Programme Alimentaire
                            </TabsTrigger>
                        </TabsList>

                        {/* Programme Sportif */}
                        <TabsContent value="sport">
                            <div className="grid gap-6">
                                {programData.programme_sportif?.map((day: any, index: number) => (
                                    <Card key={index} className="overflow-hidden">
                                        <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <Calendar className="w-5 h-5" />
                                                    <CardTitle className="text-xl">{day.jour}</CardTitle>
                                                </div>
                                                <Badge variant="secondary" className="bg-white/20 text-white">
                                                    {day.type_seance}
                                                </Badge>
                                            </div>
                                            <CardDescription className="text-blue-100 flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" /> {day.duree}
                        </span>
                                                {day.intensite && <Badge className={getIntensityColor(day.intensite)}>{day.intensite}</Badge>}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="p-6">
                                            {day.zones_ciblees && (
                                                <div className="mb-4">
                                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Zones ciblées :</h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {day.zones_ciblees.map((zone: string, i: number) => (
                                                            <Badge key={i} variant="outline">
                                                                {zone}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {day.exercices && (
                                                <div>
                                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Exercices :</h4>
                                                    <div className="space-y-3">
                                                        {day.exercices.map((ex: any, i: number) => (
                                                            <div key={i} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                                                <div className="flex items-center justify-between mb-2">
                                                                    <h5 className="font-medium text-gray-900 dark:text-white">{ex.nom}</h5>
                                                                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                                                        <span>{ex.series} séries</span>
                                                                        <span>•</span>
                                                                        <span>{ex.repetitions} reps</span>
                                                                        {ex.repos && (
                                                                            <>
                                                                                <span>•</span>
                                                                                <span>{ex.repos} repos</span>
                                                                            </>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                {ex.conseils && (
                                                                    <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                                                                        💡 {ex.conseils}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>

                        {/* Programme Alimentaire */}
                        <TabsContent value="nutrition">
                            <div className="grid gap-6">
                                {programData.programme_alimentaire?.map((day: any, index: number) => (
                                    <Card key={index}>
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2">
                                                <Calendar className="w-5 h-5" /> {day.jour}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4">
                                                {day.repas?.map((meal: any, i: number) => (
                                                    <div key={i} className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <h4 className="font-semibold text-green-800 dark:text-green-400">{meal.type}</h4>
                                                            {meal.calories && (
                                                                <Badge variant="outline" className="text-green-700 border-green-300">
                                                                    {meal.calories} kcal
                                                                </Badge>
                                                            )}
                                                        </div>
                                                        <p className="text-gray-700 dark:text-gray-300">{meal.description}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                )}

                {programData?.conseils?.length > 0 && (
                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Lightbulb className="w-5 h-5" /> Conseils du Coach
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2">
                                {programData.conseils.map((c: string, i: number) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <span className="text-blue-500 mt-1">•</span>
                                        <span className="text-gray-700 dark:text-gray-300">{c}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}

export default WorkoutProgram
