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
import { useUser } from "@clerk/nextjs";
import PlaceholderContent from "@/components/demo/placeholder-content"

export default function StudyDashboard() {
    const [searchQuery, setSearchQuery] = React.useState("")
    const [progress, setProgress] = React.useState(45)

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
                        <BreadcrumbPage>Results</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <PlaceholderContent>
                <>
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
                                <Select defaultValue="all">
                                    <SelectTrigger className="w-[140px]">
                                        <SelectValue placeholder="Filter by type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Tests</SelectItem>
                                        <SelectItem value="quant">Quantitative</SelectItem>
                                        <SelectItem value="verbal">Verbal</SelectItem>
                                        <SelectItem value="reading">Reading</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <Tabs defaultValue="all" className="space-y-6">
                            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
                                <TabsTrigger value="all">All Sections</TabsTrigger>
                                <TabsTrigger value="quant">Quantitative</TabsTrigger>
                                <TabsTrigger value="verbal">Verbal</TabsTrigger>
                                <TabsTrigger value="reading">Reading</TabsTrigger>
                            </TabsList>

                            <TabsContent value="all" className="space-y-6">
                                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {/* Advanced Quant Section */}
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="flex items-center justify-between">
                                                Advanced Quantitative
                                                <Badge variant="secondary">12 Tests</Badge>
                                            </CardTitle>
                                            <CardDescription>Master mathematical concepts</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <div className="flex items-center justify-between text-sm">
                                                        <span>Progress</span>
                                                        <span className="text-muted-foreground">75%</span>
                                                    </div>
                                                    <Progress value={75} />
                                                </div>
                                                <Button className="w-full">Start Test</Button>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Advanced Verbal Section */}
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="flex items-center justify-between">
                                                Advanced Verbal
                                                <Badge variant="secondary">10 Tests</Badge>
                                            </CardTitle>
                                            <CardDescription>Enhance your verbal reasoning skills</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <div className="flex items-center justify-between text-sm">
                                                        <span>Progress</span>
                                                        <span className="text-muted-foreground">75%</span>
                                                    </div>
                                                    <Progress value={75} />
                                                </div>
                                                <Button className="w-full">Start Test</Button>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* GRE FLT Section */}
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="flex items-center justify-between">
                                                GRE FLT
                                                <Badge variant="secondary">6 Tests</Badge>
                                            </CardTitle>
                                            <CardDescription>Full-length GRE practice tests</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <div className="flex items-center justify-between text-sm">
                                                        <span>Progress</span>
                                                        <span className="text-muted-foreground">75%</span>
                                                    </div>
                                                    <Progress value={75} />
                                                </div>
                                                <Button className="w-full">Start Test</Button>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* GRE Quant Section Tests */}
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="flex items-center justify-between">
                                                GRE Quant Sectional Test
                                                <Badge variant="secondary">10 Tests</Badge>
                                            </CardTitle>
                                            <CardDescription>This Improve your problem-solving skills</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <div className="flex items-center justify-between text-sm">
                                                        <span>Progress</span>
                                                        <span className="text-muted-foreground">75%</span>
                                                    </div>
                                                    <Progress value={75} />
                                                </div>
                                                <Button className="w-full">Start Test</Button>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* GRE Reading Comprehension */}
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="flex items-center justify-between">
                                                GRE Reading Comprehension
                                                <Badge variant="secondary">10 Tests</Badge>
                                            </CardTitle>
                                            <CardDescription>Enhance your reading and analysis skills</CardDescription>
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
                                                <Link href="/topic-wise-practice/gre-reading-comprehension">
                                                    <Button className="w-full">Start Test</Button>
                                                </Link>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* GRE Sentence Equivalence */}
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="flex items-center justify-between">
                                                GRE Sentence Equivalence
                                                <Badge variant="secondary">8 Tests</Badge>
                                            </CardTitle>
                                            <CardDescription>Improve your vocabulary and sentence structure</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <div className="flex items-center justify-between text-sm">
                                                        <span>Progress</span>
                                                        <span className="text-muted-foreground">75%</span>
                                                    </div>
                                                    <Progress value={75} />
                                                </div>
                                                <Button className="w-full">Start Test</Button>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* GRE Text Completion */}
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="flex items-center justify-between">
                                                GRE Text Completion
                                                <Badge variant="secondary">15 Tests</Badge>
                                            </CardTitle>
                                            <CardDescription>Master sentence completion</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <div className="flex items-center justify-between text-sm">
                                                        <span>Progress</span>
                                                        <span className="text-muted-foreground">75%</span>
                                                    </div>
                                                    <Progress value={75} />
                                                </div>
                                                <Button className="w-full">Start Test</Button>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* GRE Verbal Section Test */}
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="flex items-center justify-between">
                                                GRE Verbal Section Test
                                                <Badge variant="secondary">10 Tests</Badge>
                                            </CardTitle>
                                            <CardDescription>Practice complete verbal sections</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <div className="flex items-center justify-between text-sm">
                                                        <span>Progress</span>
                                                        <span className="text-muted-foreground">75%</span>
                                                    </div>
                                                    <Progress value={75} />
                                                </div>
                                                <Button className="w-full">Start Test</Button>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Quant Topic Test */}
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="flex items-center justify-between">
                                                Quant Topic Test
                                                <Badge variant="secondary">12 Tests</Badge>
                                            </CardTitle>
                                            <CardDescription>Focus on individual quant topics</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <div className="flex items-center justify-between text-sm">
                                                        <span>Progress</span>
                                                        <span className="text-muted-foreground">75%</span>
                                                    </div>
                                                    <Progress value={75} />
                                                </div>
                                                <Button className="w-full">Start Test</Button>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Shorter GRE FLT */}
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="flex items-center justify-between">
                                                Shorter GRE FLT
                                                <Badge variant="secondary">5 Tests</Badge>
                                            </CardTitle>
                                            <CardDescription>Practice shorter GRE full-length tests</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <div className="flex items-center justify-between text-sm">
                                                        <span>Progress</span>
                                                        <span className="text-muted-foreground">75%</span>
                                                    </div>
                                                    <Progress value={75} />
                                                </div>
                                                <Button className="w-full">Start Test</Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </TabsContent>

                            {/* Other tab contents would follow the same pattern */}
                            <TabsContent value="quant">
                                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{/* Quantitative specific content */}</div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </>
            </PlaceholderContent>
        </ContentLayout>
    )
}

