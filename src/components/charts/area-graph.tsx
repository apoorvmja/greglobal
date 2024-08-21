'use client';

import { TrendingUp } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';

const chartConfig = {
    verbal: {
        label: 'Verbal',
        color: 'hsl(var(--chart-1))',
    },
    quant: {
        label: 'Quant',
        color: 'hsl(var(--chart-2))',
    },
} satisfies ChartConfig;

interface Props {
    awaScore: number;
    verbal1Score: number;
    verbal2Score: number;
    quant1Score: number;
    quant2Score: number;
}

interface ChartData {
    date: string;
    verbalScore: number;
    quantScore: number;
}

const AreaGraph: React.FC<Props> = ({
    awaScore,
    verbal1Score,
    verbal2Score,
    quant1Score,
    quant2Score,
}) => {
    const verbalScore = 130 + verbal1Score + verbal2Score;
    const quantScore = 130 + quant1Score + quant2Score;
    const [chartData, setChartData] = useState<ChartData[]>([]);
    const [loaded, setLoaded] = useState(false)
    const storeGREscore = JSON.parse(localStorage.getItem('StoreGREscore') || 'false');

    useEffect(() => {
        const storedData = localStorage.getItem('greTestScores');
        let scoresArray: ChartData[] = storedData ? JSON.parse(storedData) : [];

        // Get the current date
        const currentDate = new Date().toISOString().split('T')[0]; // ISO format (YYYY-MM-DD)

        // Append new scores with date to the array
        scoresArray.push({ date: currentDate, verbalScore, quantScore });

        // Save the updated array back to local storage
        localStorage.setItem('greTestScores', JSON.stringify(scoresArray));

        if (storeGREscore) {
            // If StoreGREscore is true, use real data
            setChartData(scoresArray);
        } else {
            // If StoreGREscore is false, use default noob to pro data
            setChartData([
                { date: '2024-08-01', verbalScore: 120, quantScore: 120 },
                { date: '2024-08-02', verbalScore: 122, quantScore: 122 },
                { date: '2024-08-03', verbalScore: 125, quantScore: 125 },
                { date: '2024-08-04', verbalScore: 128, quantScore: 130 },
                { date: '2024-08-05', verbalScore: 130, quantScore: 132 },
                { date: '2024-08-06', verbalScore: 133, quantScore: 135 },
                { date: '2024-08-07', verbalScore: 135, quantScore: 138 },
                { date: '2024-08-08', verbalScore: 138, quantScore: 140 },
                { date: '2024-08-09', verbalScore: 140, quantScore: 142 },
                { date: '2024-08-10', verbalScore: 142, quantScore: 145 },
                { date: '2024-08-11', verbalScore: 145, quantScore: 148 },
                { date: '2024-08-12', verbalScore: 148, quantScore: 150 },
                { date: '2024-08-13', verbalScore: 150, quantScore: 152 },
                { date: '2024-08-14', verbalScore: 153, quantScore: 155 },
                { date: '2024-08-15', verbalScore: 155, quantScore: 158 },
                { date: '2024-08-16', verbalScore: 158, quantScore: 160 },
                { date: '2024-08-17', verbalScore: 160, quantScore: 162 },
                { date: '2024-08-18', verbalScore: 163, quantScore: 165 },
                { date: '2024-08-19', verbalScore: 165, quantScore: 167 },
                { date: '2024-08-20', verbalScore: 168, quantScore: 170 },
                { date: '2024-08-21', verbalScore: 170, quantScore: 170 },
            ]);
        }
        setLoaded(true)
    }, [verbalScore, quantScore]);


    // console.log(chartData)

    const startStoringGREdata = () => {
        localStorage.setItem('StoreGREscore', JSON.stringify(true));

        const storedData = localStorage.getItem('greTestScores');
        const scoresArray: ChartData[] = storedData ? JSON.parse(storedData) : [];
        setChartData(scoresArray);
    };

    return (
        <>
            {loaded && (
                <Card>
                    <CardHeader>
                        <CardTitle>Time vs Score - Stacked</CardTitle>
                        <CardDescription>
                            Measure your GRE journey with GreGoGlobal
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig} className="aspect-auto h-[310px] w-full">
                            <AreaChart
                                accessibilityLayer
                                data={chartData}
                                margin={{
                                    left: 12,
                                    right: 12,
                                }}
                            >
                                <CartesianGrid vertical={false} />
                                <XAxis dataKey="date" tickMargin={8} />
                                <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                                <Area
                                    dataKey="verbalScore"
                                    type="natural"
                                    fill="#FFAE49"
                                    fillOpacity={0.4}
                                    stroke="var(--color-mobile)"
                                    stackId="a"
                                />
                                <Area
                                    dataKey="quantScore"
                                    type="natural"
                                    fill="#44B7C2"
                                    fillOpacity={0.4}
                                    stroke="var(--color-desktop)"
                                    stackId="a"
                                />
                            </AreaChart>
                        </ChartContainer>
                    </CardContent>
                    <CardFooter>
                        <div className="flex w-full gap-2 text-sm justify-between items-center">
                            <div className="grid gap-2">
                                <div className="flex items-center gap-2 font-medium leading-none">
                                    Trending up by 10.9% this month <TrendingUp className="h-4 w-4" />
                                </div>
                                <div className="flex items-center gap-2 leading-none text-muted-foreground">
                                    January - August 2024
                                </div>
                            </div>
                            {!storeGREscore && (<Button onClick={startStoringGREdata}>Start Measuring</Button>)}
                        </div>
                    </CardFooter>
                </Card>
            )}
        </>
    );
};

export default AreaGraph;
