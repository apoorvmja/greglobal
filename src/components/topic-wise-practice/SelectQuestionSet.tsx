"use client"

import * as React from "react"
import { ArrowLeft, Clock, Medal, Search, SortAsc } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { StringValidation } from "zod"
import Link from "next/link"

type TestStatus = "not-started" | "in-progress" | "completed"

interface Test {
    id: number
    title: string
    description: string
    estimatedTime: number
    status: TestStatus
    score?: number
    lastAttempted?: string
    progress: number
}

interface TestSelectionProps {
    tests: Test[]
    title: string
    description: string
    onTestSetSelect: (test: Test) => void
}

const SelectQuestionSet: React.FC<TestSelectionProps> = ({ tests, title, description, onTestSetSelect }) => {
    const [searchQuery, setSearchQuery] = React.useState("")
    const [statusFilter, setStatusFilter] = React.useState<TestStatus | "all">("all")

    const filteredTests = tests.filter((test) => {
        const matchesSearch = test.title.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesStatus = statusFilter === "all" || test.status === statusFilter
        return matchesSearch && matchesStatus
    })

    const getStatusBadgeVariant = (status: TestStatus) => {
        switch (status) {
            case "completed":
                return "default"; // Change from "success" to "default"
            case "in-progress":
                return "outline"; // Change from "warning" to "outline"
            default:
                return "secondary"; // Keep "secondary" for not-started
        }
    };


    return (
        <div className="container mx-auto p-6 space-y-8">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/topic-wise-practice">
                    <Button variant="ghost" size="icon" className="rounded-full">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
                    <p className="text-muted-foreground">{description}</p>
                </div>
            </div>

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
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
                    <Select value={statusFilter} onValueChange={(value: TestStatus | "all") => setStatusFilter(value)}>
                        <SelectTrigger className="w-[160px]">
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="in-progress">In Progress</SelectItem>
                            <SelectItem value="not-started">Not Started</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Button variant="outline" className="gap-2">
                    <SortAsc className="h-4 w-4" />
                    Sort by
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredTests.map((test) => (
                    <Card
                        key={test.id}
                        className={cn(
                            "transition-all hover:shadow-md",
                            test.status === "completed" && "border-green-200",
                            test.status === "in-progress" && "border-yellow-200",
                        )}
                    >
                        <CardHeader>
                            <div className="flex justify-between items-start gap-4">
                                <CardTitle className="text-xl">{test.title}</CardTitle>
                                <Badge variant={getStatusBadgeVariant(test.status)} className="capitalize">
                                    {test.status.replace("-", " ")}
                                </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{test.description}</p>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 text-sm">
                                    <div className="flex items-center gap-1">
                                        <Clock className="h-4 w-4 text-muted-foreground" />
                                        <span>{test.estimatedTime} mins</span>
                                    </div>
                                    {test.score && (
                                        <div className="flex items-center gap-1">
                                            <Medal className="h-4 w-4 text-muted-foreground" />
                                            <span>{test.score}%</span>
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>Progress</span>
                                        <span>{test.progress}%</span>
                                    </div>
                                    <Progress value={test.progress} />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button
                                className="w-full"
                                onClick={() => onTestSetSelect(test)}
                                variant={test.status === "completed" ? "secondary" : "default"}>
                                {test.status === "completed"
                                    ? "Review Test"
                                    : test.status === "in-progress"
                                        ? "Continue Test"
                                        : "Start Test"}
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default SelectQuestionSet;