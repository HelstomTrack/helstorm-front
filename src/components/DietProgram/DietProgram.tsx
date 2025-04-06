"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Calendar } from "lucide-react";
import { planApi } from "@/utils/api";
import useSWR from "swr";
import { getUserId } from "@/utils/cookieDecode";
import {Meal} from "@/utils/types";

const fetcher = async () => {
    try {
        const response = await planApi.getDietById(getUserId());
        return response.length > 0 ? response[0] : null;
    } catch (error) {
        console.error("Erreur lors de la récupération des données", error);
        return null;
    }
};

export default function DietProgram() {
    const [activeDay] = useState("Lundi");
    const { data: diet } = useSWR("diet-plan", fetcher, { suspense: true, fallbackData: null });

    const daysOrder = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8">
                {diet?.name}
            </h1>

            <Tabs defaultValue={activeDay} className="w-full">
                <TabsList className="grid w-full grid-cols-7 mb-4">
                    {daysOrder.map((day) => (
                        <TabsTrigger key={day} value={day} className="text-[10px] sm:text-xs md:text-sm">
                            {day.slice(0, 3)}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {daysOrder.map((day) => (
                    <TabsContent key={day} value={day}>
                        <div className="space-y-4">
                            {diet?.days?.[day]?.length > 0 ? (
                                diet.days[day].map((meal: Meal, mealIndex: number) => (
                                    <Card key={`${meal.name}-${mealIndex}`}>
                                        <CardHeader>
                                            <CardTitle className="flex items-center justify-between text-lg md:text-xl">
                                                <span>{meal.name}</span>
                                                <Calendar className="h-5 w-5 text-muted-foreground" />
                                            </CardTitle>
                                            <CardDescription className="text-sm md:text-base">
                                                {meal.total_calories
                                                    ? `${meal.total_calories} kcal`
                                                    : "Calories non définies"}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <ul className="space-y-2">
                                                {meal.food.map((foodItem, foodIndex) => (
                                                    <li key={`${foodItem.name}-${foodIndex}`} className="flex items-center space-x-2">
                                                        <Zap className="h-4 w-4 text-yellow-500" />
                                                        <span className="text-sm md:text-base">{foodItem.name}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </CardContent>
                                    </Card>
                                ))
                            ) : (
                                <p className="text-muted-foreground text-center">
                                    Aucun repas défini pour ce jour.
                                </p>
                            )}
                        </div>
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
}

