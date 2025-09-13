"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const chartData = [
    { month: "Janvier", force: 4200, cardio: 320 },
    { month: "Février", force: 5100, cardio: 380 },
    { month: "Mars", force: 5600, cardio: 410 },
    { month: "Avril", force: 5300, cardio: 450 },
    { month: "Mai", force: 5900, cardio: 470 },
    { month: "Juin", force: 6400, cardio: 500 },
]

const chartConfig = {
    force: {
        label: "Force (volume total)",
        color: "hsl(var(--chart-1))",
    },
    cardio: {
        label: "Cardio (minutes)",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

export function ChartLine() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Progression — Force & Cardio</CardTitle>
                <CardDescription>Janvier — Juin</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <LineChart
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
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <Line dataKey="force" type="monotone" stroke="var(--color-force)" strokeWidth={2} dot={false} />
                        <Line dataKey="cardio" type="monotone" stroke="var(--color-cardio)" strokeWidth={2} dot={false} />
                    </LineChart>
                </ChartContainer>
            </CardContent>
            <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2 font-medium leading-none">
                            Tendance à la hausse (+6,5% force) <TrendingUp className="h-4 w-4" />
                        </div>
                        <div className="flex items-center gap-2 leading-none text-muted-foreground">
                            Volume total soulevé et minutes de cardio cumulés (6 mois)
                        </div>
                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}
