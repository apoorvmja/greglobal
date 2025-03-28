"use client"

import * as React from "react"
import { Search } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export default function StudyDashboard() {
    const [searchQuery, setSearchQuery] = React.useState("")
    const [progress, setProgress] = React.useState(45)
    const [showAllVocabThemeWise, setShowAllVocabThemeWise] = React.useState(false);

    const vocabularyTests = [
        { id: "vocabulary-sentence-completion", title: "Sentence Completion", numberOfTests: 10, notThemeWise: true },
        { id: "vocabulary-similar-meaning", title: "Similar Meaning", numberOfTests: 10, notThemeWise: true },
        { id: "apna-sapna-money-money", title: "Apna Sapna Money-Money", numberOfTests: 1 },
        { id: "beautiful-mind-part-1", title: "Beautiful Mind Part -1", numberOfTests: 1 },
        { id: "beautiful-mind-part-2", title: "Beautiful Mind Part -2", numberOfTests: 1 },
        { id: "body-&-disease-part-1", title: "Body & Disease Part 1", numberOfTests: 1 },
        { id: "body-&-disease-part-2", title: "Body & Disease Part 2", numberOfTests: 1 },
        { id: "break-and-brake", title: "Break and Brake", numberOfTests: 1 },
        { id: "crime-&-punishment", title: "Crime & Punishment", numberOfTests: 1 },
        { id: "criticism-&-praise", title: "Criticism & Praise", numberOfTests: 1 },
        { id: "fifty-shades-of-joy", title: "Fifty Shades of Joy", numberOfTests: 1 },
        { id: "genesis-&-apocalypse", title: "Genesis & Apocalypse", numberOfTests: 1 },
        { id: "krodh---anger-kills", title: "Krodh - Anger Kills", numberOfTests: 1 },
        { id: "lsd-1", title: "LSD 1", numberOfTests: 1 },
        { id: "lsd-2", title: "LSD 2", numberOfTests: 1 },
        { id: "office-office-part-1", title: "Office-Office Part 1", numberOfTests: 1 },
        { id: "office-office-part-2", title: "Office-Office Part 2", numberOfTests: 1 },
        { id: "rajneeti-1", title: "Rajneeti 1", numberOfTests: 1 },
        { id: "rajneeti-2", title: "Rajneeti 2", numberOfTests: 1 },
        { id: "religion", title: "Religion", numberOfTests: 1 },
        { id: "roti-kapda-aur-makaan", title: "Roti Kapda Aur Makaan", numberOfTests: 1 },
        { id: "shabd-part-1", title: "Shabd Part -1", numberOfTests: 1 },
        { id: "shabd-part-2", title: "Shabd Part -2", numberOfTests: 1 },
        { id: "size-matters", title: "Size Matters", numberOfTests: 1 },
        { id: "time-flies", title: "Time Flies", numberOfTests: 1 },
        { id: "walk-in-the-park", title: "Walk in the Park", numberOfTests: 1 },
    ];
    const GREVerbalTests = [
        { id: "gre-reading-comprehension", title: "GRE Reading Comprehension", description: "Enhance your reading and analysis skills", numberOfTests: 10 },
        { id: "gre-sentence-equivalance", title: "GRE Sentence Equivalence", description: "Master sentence completion", numberOfTests: 10 },
        { id: "gre-text-completion", title: "GRE Text Completion", description: "Improve your vocabulary and sentence structure", numberOfTests: 9 },
    ];
    const GREQuantTests = [
        { id: "algebra", title: "Algebra", description: "Strengthen your algebraic problem-solving skills", numberOfTests: 10 },
        { id: "coordinate-3d-geometry", title: "Coordinate & 3D Geometry", description: "Understand coordinate planes and 3D space", numberOfTests: 4 },
        { id: "data-interpretation", title: "Data Interpretation", description: "Analyze graphs and interpret quantitative data", numberOfTests: 6 },
        { id: "geometry", title: "Geometry", description: "Review fundamental geometric principles", numberOfTests: 9 },
        { id: "number-system", title: "Number System", description: "Deep dive into numerical operations", numberOfTests: 8 },
        { id: "percentage", title: "Percentage", description: "Solve percentage-based problems effectively", numberOfTests: 5 },
        { id: "permutation-combination-probability", title: "Permutation & Combination and Probability 1", description: "Learn counting principles and probability", numberOfTests: 3 },
        { id: "probability", title: "Probability", description: "Master probability concepts", numberOfTests: 3 },
        { id: "rate-time", title: "Rate & Time", description: "Solve problems related to rates and time", numberOfTests: 2 },
        { id: "ratio-proportion", title: "Ratio & Proportion", description: "Understand proportional relationships", numberOfTests: 3 },
        { id: "roots-exponent", title: "Roots & Exponent", description: "Simplify and manipulate roots and exponents", numberOfTests: 2 },
        { id: "sequence-set-theory", title: "Sequence and Set Theory", description: "Explore sequences and set relations", numberOfTests: 2 },
        { id: "speed-time-distance", title: "Speed, Time, and Distance", description: "Work with motion problems", numberOfTests: 3 },
        { id: "statistics", title: "Statistics", description: "Analyze statistical data effectively", numberOfTests: 2 },
    ];

    return (
        <ContentLayout title="Previous Results">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/">Home</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/dashboard">Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Practice</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="bg-white shadow-md rounded-lg mt-5">
                <div className="container mx-auto p-6 space-y-8">
                    <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">GRE Preparation Hub</h1>
                            <p className="text-muted-foreground">Master each section with structured practice</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="relative w-full md:w-64">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search tests..."
                                    className="pl-8"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <Select defaultValue="FLTs">
                                <SelectTrigger className="w-[140px]">
                                    <SelectValue placeholder="Filter by type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="FLTs">Shorter FLTs</SelectItem>
                                    <SelectItem value="quant">Quantitative</SelectItem>
                                    <SelectItem value="verbal">Verbal</SelectItem>
                                    <SelectItem value="vocabulary">Vocabulary (new)✨</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <Tabs defaultValue="FLTs" className="space-y-6">
                        <TabsList className=" h-auto flex flex-wrap sm:grid w-full grid-cols-2 lg:grid-cols-4">
                            <TabsTrigger value="FLTs">Shorter GRE FLT</TabsTrigger>
                            <TabsTrigger value="quant">Quantitative</TabsTrigger>
                            <TabsTrigger value="verbal">Verbal</TabsTrigger>
                            <TabsTrigger value="vocabulary">Vocabulary (new)✨</TabsTrigger>
                        </TabsList>

                        <TabsContent value="FLTs" className="space-y-6">
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {Array.from({ length: 6 }).map((_, index) => (
                                    <Card key={index}>
                                        <CardHeader>
                                            <CardTitle className="flex items-center justify-between">
                                                Shorter GRE FLT {index + 1}
                                                <Badge variant="secondary">1 Tests</Badge>
                                            </CardTitle>
                                            <CardDescription>Practice shorter GRE full-length tests</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4 flex flex-col">
                                                <div className="space-y-2">
                                                    <div className="flex items-center justify-between text-sm">
                                                        <span>Progress</span>
                                                        <span className="text-muted-foreground">75%</span>
                                                    </div>
                                                    <Progress value={75} />
                                                </div>
                                                <Link href="/mock-tests">
                                                    <Button className="w-full">Goto Tests</Button>
                                                </Link>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="quant">
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {GREQuantTests.map((test) => (
                                    <Card key={test.id}>
                                        <CardHeader>
                                            <CardTitle className="flex items-center justify-between">
                                                {test.title}
                                                <Badge variant="secondary">{test.numberOfTests} Test</Badge>
                                            </CardTitle>
                                            <CardDescription>{test.description}</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4 flex flex-col">
                                                <div className="space-y-2">
                                                    <div className="flex items-center justify-between text-sm">
                                                        <span>Progress</span>
                                                        <span className="text-muted-foreground">75%</span>
                                                    </div>
                                                    <Progress value={75} />
                                                </div>
                                                <Link href={`/topic-wise-practice/gre-quantitative/${test.id}?tests=${test.numberOfTests}`}>
                                                    <Button className="w-full">Start Test</Button>
                                                </Link>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="verbal">
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {GREVerbalTests.map((test) => (
                                    <Card key={test.id}>
                                        <CardHeader>
                                            <CardTitle className="flex items-center justify-between">
                                                {test.title}
                                                <Badge variant="secondary">{test.numberOfTests} Test</Badge>
                                            </CardTitle>
                                            <CardDescription>{test.description}</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4 flex flex-col">
                                                <div className="space-y-2">
                                                    <div className="flex items-center justify-between text-sm">
                                                        <span>Progress</span>
                                                        <span className="text-muted-foreground">75%</span>
                                                    </div>
                                                    <Progress value={75} />
                                                </div>
                                                <Link href={`/topic-wise-practice/${test.id}`}>
                                                    <Button className="w-full">Start Test</Button>
                                                </Link>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="vocabulary">
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {(showAllVocabThemeWise ? vocabularyTests : vocabularyTests.slice(0, 2)).map((test) => (
                                    <Card key={test.id}>
                                        <CardHeader>
                                            <CardTitle className="flex items-center justify-between">
                                                {test.title}
                                                <Badge variant="secondary">{test.numberOfTests} Test</Badge>
                                            </CardTitle>
                                            <CardDescription>Enhance your vocabulary skills</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4 flex flex-col">
                                                <div className="space-y-2">
                                                    <div className="flex items-center justify-between text-sm">
                                                        <span>Progress</span>
                                                        <span className="text-muted-foreground">75%</span>
                                                    </div>
                                                    <Progress value={75} />
                                                </div>
                                                <Link href={`${test.notThemeWise ? `/topic-wise-practice/${test.id}` : `/topic-wise-practice/vocabulary-theme-wise/${test.id}`}`}>
                                                    <Button className="w-full">Start Test</Button>
                                                </Link>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                                {!showAllVocabThemeWise && (
                                    <Card >
                                        <CardHeader>
                                            <CardTitle className="flex items-center justify-between">
                                                Vocabulary Theme Wise Tests
                                                <Badge variant="secondary">20+ Test</Badge>
                                            </CardTitle>
                                            <CardDescription>Enhance your vocabulary skills</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4 flex flex-col">
                                                <div className="space-y-2">
                                                    <div className="flex items-center justify-between text-sm">
                                                        <span>Progress</span>
                                                        <span className="text-muted-foreground">75%</span>
                                                    </div>
                                                    <Progress value={75} />
                                                </div>
                                                <Button onClick={() => { setShowAllVocabThemeWise(true) }} className="w-full">Show All Tests</Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </ContentLayout>
    )
}

