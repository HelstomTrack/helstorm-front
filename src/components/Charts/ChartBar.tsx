"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
    type ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
    { month: "Janvier", poids_kg: 70, seances: 12 },
    { month: "Février", poids_kg: 71, seances: 14 },
    { month: "Mars", poids_kg: 72, seances: 13 },
    { month: "Avril", poids_kg: 72.5, seances: 15 },
    { month: "Mai", poids_kg: 73, seances: 16 },
    { month: "Juin", poids_kg: 73.5, seances: 14 },
]

const chartConfig = {
    poids_kg: {
        label: "Poids (kg)",
        color: "hsl(var(--chart-1))",
    },
    seances: {
        label: "Séances par mois",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

export function ChartBar() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Évolution — Poids & Séances</CardTitle>
                <CardDescription>Janvier — Juin</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => String(value).slice(0, 3)}
                        />
                        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Bar dataKey="poids_kg" stackId="a" fill="var(--color-poids_kg)" radius={[0, 0, 4, 4]} />
                        <Bar dataKey="seances" stackId="a" fill="var(--color-seances)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    Progression régulière observée <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Poids moyen et nombre de séances cumulés sur 6 mois
                </div>
            </CardFooter>
        </Card>
    )
}