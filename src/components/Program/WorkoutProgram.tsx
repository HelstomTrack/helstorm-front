"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dumbbell, Clock, Zap, Calendar } from "lucide-react";
import { planApi } from "@/utils/api";
import useSWR from "swr";
import { Exercise } from "@/utils/types";
import { getUserId } from "@/utils/cookieDecode";

const fetcher = async () => {
    try {
        const response = await planApi.getPlanById(getUserId());
        console.log("Plan récupéré:", response);
        return response.length > 0 ? response[0] : null;
    } catch (error) {
        console.error("Erreur lors de la récupération des données", error);
        return null;
    }
};

export default function WorkoutProgram() {
    const [activeDay] = useState("Lundi");
    const { data: plan, error } = useSWR("workout-plan", fetcher, { suspense: true, fallbackData: [] })

    if (error) {
        console.error("Erreur SWR:", error);
        return <div>Erreur de chargement du programme...</div>;
    }

    if (!plan || !plan.programs || !plan.programs.length) {
        return <div>Chargement...</div>;
    }

    const daysOrder = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

    const programsByDay = daysOrder.map((day, index) => {
        const program = plan.programs[index];
        return program ? { ...program, day } : { day, exercises: [] };
    });

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8">
                {plan.name}
            </h1>
            <Tabs defaultValue={activeDay} className="w-full">
                <TabsList className="grid w-full grid-cols-7 mb-4">
                    {daysOrder.map((day) => (
                        <TabsTrigger key={day} value={day} className="text-[10px] sm:text-xs md:text-sm">
                            {day.slice(0, 3)}
                        </TabsTrigger>
                    ))}
                </TabsList>
                {programsByDay.map((program, index) => (
                    <TabsContent key={`${program.day}-${index}`} value={program.day}>
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between text-lg md:text-xl">
                                    <span>
                                        {program.day} - {program.name || "No Program"}
                                    </span>
                                    <Calendar className="h-5 w-5 text-muted-foreground" />
                                </CardTitle>
                                <CardDescription className="text-sm md:text-base">
                                    {program.name || "No Program"}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {program.exercises.length > 0 ? (
                                        program.exercises.map((exercise: Exercise, exerciseIndex: number) => (
                                            <Card key={`${exercise.id}-${exerciseIndex}`}>
                                                <CardHeader className="p-3 md:p-4">
                                                    <CardTitle className="text-base md:text-lg flex items-center justify-between">
                                                        <span>{exercise.name}</span>
                                                        <Dumbbell className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent className="p-3 md:p-4 pt-0">
                                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
                                                        <div className="flex items-center space-x-2">
                                                            <Zap className="h-4 w-4 text-yellow-500" />
                                                            <span className="text-sm md:text-base">
                                                                {exercise.difficulty} - {exercise.description}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <Clock className="h-4 w-4 text-blue-500" />
                                                            <span className="text-sm md:text-base">
                                                                Repos: {exercise.rest_time}s
                                                            </span>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))
                                    ) : (
                                        <div className="text-center text-gray-500">Aucun exercice pour ce jour</div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
}
