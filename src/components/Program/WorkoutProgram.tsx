"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dumbbell, Clock, Zap, Calendar } from "lucide-react";
import { planApi } from "@/utils/api";
import useSWR from "swr";
import {Exercise, Program} from "@/utils/types";

const fetcher = async () => {
    try {
        const response = await planApi.getPlanById(1);
        return response.length > 0 ? response[0] : null; // Retourne l'objet plan complet
    } catch (error) {
        console.error("Erreur lors de la récupération des données", error);
        return null;
    }
};

export default function WorkoutProgram() {
    const { data: plan, error } = useSWR("workout-plan", fetcher, {
        suspense: true,
    });

    if (error) return <div>Erreur de chargement du programme...</div>;
    if (!plan || !plan.programs || !plan.programs.length) return <div>Chargement...</div>;

    const daysOrder = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

    // Trier les programmes selon l'ordre des jours de la semaine
    const sortedPrograms = [...plan.programs].sort((a, b) => {
        const dayA = daysOrder.indexOf(a.day);
        const dayB = daysOrder.indexOf(b.day);
        return dayA - dayB;
    });

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [activeDay, setActiveDay] = useState(sortedPrograms[0]?.day || "");

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8">
                {plan.name}
            </h1>
            <Tabs defaultValue={activeDay} onValueChange={setActiveDay} className="w-full">
                <TabsList className="grid w-full grid-cols-7 mb-4">
                    {sortedPrograms.map((program: Program) => (
                        <TabsTrigger key={program.id} value={program.day || program.name} className="text-[10px] sm:text-xs md:text-sm">
                            {program.day ? program.day.slice(0, 3) : program.name.slice(0, 3)}
                        </TabsTrigger>
                    ))}
                </TabsList>
                {sortedPrograms.map((program: Program) => (
                    <TabsContent key={program.id} value={program.day || program.name}>
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between text-lg md:text-xl">
                                    <span>
                                        {program.day || program.name} - {program.name}
                                    </span>
                                    <Calendar className="h-5 w-5 text-muted-foreground" />
                                </CardTitle>
                                <CardDescription className="text-sm md:text-base">
                                    {program.name}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {program.exercises.map((exercise: Exercise) => (
                                        <Card key={exercise.id}>
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
                                                        <span className="text-sm md:text-base">Repos: {exercise.rest_time}s</span>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
}

