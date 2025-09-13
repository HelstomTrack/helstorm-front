"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const chartData = [
    { type: "Force", minutes: 1320, fill: "var(--color-force)" },
    { type: "Cardio", minutes: 980, fill: "var(--color-cardio)" },
    { type: "Mobilité", minutes: 420, fill: "var(--color-mobilite)" },
    { type: "HIIT", minutes: 360, fill: "var(--color-hiit)" },
    { type: "Repos actif", minutes: 300, fill: "var(--color-repos-actif)" },
]

const chartConfig = {
    minutes: { label: "Minutes" },
    force: { label: "Force", color: "hsl(var(--chart-1))" },
    cardio: { label: "Cardio", color: "hsl(var(--chart-2))" },
    mobilite: { label: "Mobilité", color: "hsl(var(--chart-3))" },
    hiit: { label: "HIIT", color: "hsl(var(--chart-4))" },
    repos: { label: "Repos actif", color: "hsl(var(--chart-5))" },
} satisfies ChartConfig

export function ChartPie() {
    const totalMinutes = React.useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.minutes, 0)
    }, [])

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Répartition — Temps d'entraînement</CardTitle>
                <CardDescription>Cardio, force, mobilité, HIIT, repos actif</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
                    <PieChart>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                        <Pie data={chartData} dataKey="minutes" nameKey="type" innerRadius={60} strokeWidth={5}>
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                                                <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                                                    {totalMinutes.toLocaleString()}
                                                </tspan>
                                                <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                                                    Minutes
                                                </tspan>
                                            </text>
                                        )
                                    }
                                    return null
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">
                    Volume d'entraînement en hausse <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">Répartition cumulée sur les 6 derniers mois</div>
            </CardFooter>
        </Card>
    )
}
