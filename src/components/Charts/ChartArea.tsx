"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const chartData = [
    { month: "Janvier", calories: 8200, temps: 720 },
    { month: "Février", calories: 9100, temps: 780 },
    { month: "Mars", calories: 9600, temps: 820 },
    { month: "Avril", calories: 9400, temps: 800 },
    { month: "Mai", calories: 10200, temps: 860 },
    { month: "Juin", calories: 10800, temps: 900 },
]

const chartConfig = {
    calories: {
        label: "Calories brûlées",
        color: "hsl(var(--chart-1))",
    },
    temps: {
        label: "Temps d'entraînement (min)",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

export function ChartArea() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Progression — Calories & Temps d'entraînement</CardTitle>
                <CardDescription>Janvier — Juin</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <AreaChart
                        accessibilityLayer
                        data={chartData}
                        margin={{ left: 12, right: 12 }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => String(value).slice(0, 3)}
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                        <Area
                            dataKey="calories"
                            type="natural"
                            fill="var(--color-calories)"
                            fillOpacity={0.4}
                            stroke="var(--color-calories)"
                            stackId="a"
                        />
                        <Area
                            dataKey="temps"
                            type="natural"
                            fill="var(--color-temps)"
                            fillOpacity={0.4}
                            stroke="var(--color-temps)"
                            stackId="a"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
            <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2 font-medium leading-none">
                            Tendance positive sur 6 mois <TrendingUp className="h-4 w-4" />
                        </div>
                        <div className="flex items-center gap-2 leading-none text-muted-foreground">
                            Calories brûlées et temps total d'entraînement (Janv — Juin)
                        </div>
                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}