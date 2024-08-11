'use client';

import * as React from 'react';
import { TrendingUp } from 'lucide-react';
import { Label, Pie, PieChart } from 'recharts';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent
} from '@/components/ui/chart';

interface Props {
    totalScore: number | 0;
}

const PieGraph: React.FC<Props> = ({ totalScore }) => {

    let chartData;
    let description;

    if (totalScore >= 335) {
        chartData = [
            { browser: 'Ivy League/Top Universities', visitors: 70, fill: '#00AA7E' },
            { browser: 'Mid-Tier Universities', visitors: 25, fill: '#F3BC00' },
            { browser: 'Lower-Tier Universities/Community Colleges', visitors: 5, fill: '#0075A4' }
        ];
        description = 'High chance of getting into Ivy League or Top Universities';
    } else if (totalScore >= 320) {
        chartData = [
            { browser: 'Ivy League/Top Universities', visitors: 30, fill: '#00AA7E' },
            { browser: 'Mid-Tier Universities', visitors: 50, fill: '#F3BC00' },
            { browser: 'Lower-Tier Universities/Community Colleges', visitors: 20, fill: '#0075A4' }
        ];
        description = 'Good chance of getting into Mid-Tier Universities';
    } else if (totalScore >= 300) {
        chartData = [
            { browser: 'Ivy League/Top Universities', visitors: 10, fill: '#00AA7E' },
            { browser: 'Mid-Tier Universities', visitors: 40, fill: '#F3BC00' },
            { browser: 'Lower-Tier Universities/Community Colleges', visitors: 50, fill: '#0075A4' }
        ];
        description = 'Higher chance of getting into Lower-Tier Universities or Community Colleges';
    } else {
        chartData = [
            { browser: 'Ivy League/Top Universities', visitors: 1, fill: '#00AA7E' },
            { browser: 'Mid-Tier Universities', visitors: 20, fill: '#F3BC00' },
            { browser: 'Lower-Tier Universities/Community Colleges', visitors: 79, fill: '#0075A4' }
        ];
        description = 'Mostly likely to get into Lower-Tier Universities or Community Colleges';
    }

    const chartConfig = {
        visitors: {
            label: 'Visitors'
        },
        chrome: {
            label: 'Chrome',
            color: 'hsl(var(--chart-1))'
        },
        safari: {
            label: 'Safari',
            color: 'hsl(var(--chart-2))'
        },
        firefox: {
            label: 'Firefox',
            color: 'hsl(var(--chart-3))'
        },
        edge: {
            label: 'Edge',
            color: 'hsl(var(--chart-4))'
        },
        other: {
            label: 'Other',
            color: 'hsl(var(--chart-5))'
        }
    } satisfies ChartConfig;

    const totalVisitors = React.useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
    }, []);

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Ivy University Admission Chances</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[360px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="visitors"
                            nameKey="browser"
                            innerRadius={60}
                            strokeWidth={5}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {/* {totalVisitors.toLocaleString()} */}
                                                    {totalScore}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    GRE Score
                                                </tspan>
                                            </text>
                                        );
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Your chances of getting into different types of universities
                </div>
            </CardFooter>
        </Card>
    );
}

export default PieGraph;