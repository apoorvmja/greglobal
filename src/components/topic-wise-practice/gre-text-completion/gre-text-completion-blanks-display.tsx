"use client"

import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
    BookmarkCheck,
    HelpCircle,
    Info,
    CloudLightningIcon as Lightning,
    MousePointerClick,
    RefreshCw,
    Star,
    Timer,
    TrendingUp,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { toast } from "sonner"

interface Answer {
    id: string
    text: string
    isCorrect: boolean
}

interface Blank {
    id: string
    correctAnswerId: string
    selectedAnswerId?: string
}

interface Question {
    id: string
    text: string[] // Text segments between blanks
    blanks: Blank[]
    answers: Answer[]
    difficulty: "easy" | "medium" | "hard"
    explanation: string
    timeLimit: number // in seconds
}

// const sampleQuestion: Question = {
//     id: "q1",
//     text: [
//         "Despite their reputation for being ",
//         " , the team's methods were actually quite ",
//         " , following established protocols with ",
//         " precision.",
//     ],
//     blanks: [
//         { id: "b1", correctAnswerId: "a1" },
//         { id: "b2", correctAnswerId: "a4" },
//         { id: "b3", correctAnswerId: "a6" },
//     ],
//     answers: [
//         { id: "a1", text: "unorthodox", isCorrect: true },
//         { id: "a2", text: "conventional", isCorrect: false },
//         { id: "a3", text: "innovative", isCorrect: false },
//         { id: "a4", text: "methodical", isCorrect: true },
//         { id: "a5", text: "haphazard", isCorrect: false },
//         { id: "a6", text: "meticulous", isCorrect: true },
//         { id: "a7", text: "casual", isCorrect: false },
//         { id: "a8", text: "sporadic", isCorrect: false },
//         { id: "a9", text: "arbitrary", isCorrect: false },
//     ],
//     difficulty: "medium",
//     explanation:
//         "The passage describes a contrast between perception and reality. The team's reputation suggests they were 'unorthodox', but their actual methods were 'methodical' and executed with 'meticulous' precision, emphasizing their careful and systematic approach.",
//     timeLimit: 180,
// }

interface ExamQuestionWithOptions {
    questionid: string;
    question_text: string;
    options: { text: string; isCorrect: boolean }[];
    question_solution: string;
}

interface GRETextCompletionBlankDisplayProps {
    questions: ExamQuestionWithOptions[];
    backToDashboardAfterResults: () => void;
}


export function GRETextCompletionBlankDisplay({ questions, backToDashboardAfterResults }: GRETextCompletionBlankDisplayProps) {

    const formattedQuestions: Question[] = questions.slice(0, 15).map((q, index) => {
        // Remove HTML tags and extract text
        const cleanText = q.question_text.replace(/<\/?p>/g, "").trim();

        // Find number of blanks using regex
        const underscoreBlanks = (cleanText.match(/_{3,}/g) || []).length;  // Matches "___" or longer
        const numberedBlanks = (cleanText.match(/\(\w+\)/g) || []).length;  // Matches (i), (ii), (iii)

        const numBlanks = Math.max(underscoreBlanks, numberedBlanks); // Use the max found

        // Create blank slots dynamically
        const blanks: Blank[] = Array.from({ length: numBlanks }, (_, i) => ({
            id: `b${index + 1}-${i + 1}`,
            correctAnswerId: q.options.find((o) => o.isCorrect)?.text || "",
        }));

        return {
            id: q.questionid,
            text: [cleanText], // Keep text
            blanks, // Store detected blanks
            answers: q.options.map((option, i) => ({
                id: `a${index + 1}${i + 1}`,
                text: option.text.replace(/<\/?p>/g, ""),
                isCorrect: option.isCorrect,
            })),
            difficulty: "medium",
            explanation: q.question_solution.replace(/<\/?p>/g, ""),
            timeLimit: 180,
        };
    });


    const [currentIndex, setCurrentIndex] = React.useState(0);

    const [timeRemaining, setTimeRemaining] = React.useState(formattedQuestions[0].timeLimit);
    const [isAnswerRevealed, setIsAnswerRevealed] = React.useState(false)
    const [draggedAnswer, setDraggedAnswer] = React.useState<Answer | null>(null)
    const [isBookmarked, setIsBookmarked] = React.useState(false)
    const [progress, setProgress] = React.useState(0);
    const [selectedAnswers, setSelectedAnswers] = React.useState<{ [key: string]: string }>({});

    const currentQuestion = formattedQuestions[currentIndex];


    // Timer
    React.useEffect(() => {
        if (timeRemaining > 0 && !isAnswerRevealed) {
            const timer = setInterval(() => {
                setTimeRemaining((prev) => prev - 1)
            }, 1000)
            return () => clearInterval(timer)
        } else if (timeRemaining === 0 && !isAnswerRevealed) {
            setIsAnswerRevealed(true)
            toast("Time's up!", {
                description: "The answer has been revealed.",
                style: { backgroundColor: "#ff4d4f", color: "white" }
            })
        }
    }, [timeRemaining, isAnswerRevealed, toast])

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs.toString().padStart(2, "0")}`
    }

    const handleReset = () => {
        setIsAnswerRevealed(false);
        setSelectedAnswers({});
        setTimeRemaining(currentQuestion.timeLimit);
    };

    const getDifficultyColor = (difficulty: Question["difficulty"]) => {
        switch (difficulty) {
            case "easy":
                return "bg-green-500"
            case "medium":
                return "bg-yellow-500"
            case "hard":
                return "bg-red-500"
            default:
                return "bg-gray-500"
        }
    }

    const handleNextQuestion = () => {
        if (currentIndex < formattedQuestions.length - 1) {
            setCurrentIndex((prev) => prev + 1);
            setSelectedAnswers({});
            setTimeRemaining(180);
            setIsAnswerRevealed(false);
        } else {
            toast("You've completed all questions!", {
                description: "Returning to dashboard...",
            });
            setTimeout(() => backToDashboardAfterResults(), 2000);
        }
    };

    const handleAnswerSelect = (blankId: string, answerId: string) => {
        if (!isAnswerRevealed) {
            setSelectedAnswers((prev) => ({
                ...prev,
                [blankId]: answerId,
            }));
        }
    };


    return (
        <div className="container mx-auto p-4 md:p-8">
            <Card className="relative">
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <div className="flex items-center gap-4">
                        <CardTitle>Text Completion</CardTitle>
                        <Badge variant="secondary" className="gap-1">
                            <TrendingUp className="h-3 w-3" />
                            {currentQuestion.difficulty.charAt(0).toUpperCase() + currentQuestion.difficulty.slice(1)}
                        </Badge>
                    </div>
                    <div className="flex items-center gap-4">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="outline" size="icon" onClick={() => setIsBookmarked(!isBookmarked)}>
                                        <BookmarkCheck className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>{isBookmarked ? "Bookmarked" : "Add to bookmarks"}</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <div className="flex items-center gap-2">
                            <Timer className="h-4 w-4" />
                            <span className={`font-mono ${timeRemaining < 30 ? "text-red-500" : ""}`}>
                                {formatTime(timeRemaining)}
                            </span>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Question Text */}
                    <div className="rounded-lg bg-muted p-6">
                        <div className="prose prose-gray dark:prose-invert">
                            {currentQuestion.text}
                        </div>
                    </div>

                    {/* Answer Options */}
                    {currentQuestion.blanks.map((blank, index) => (
                        <div key={blank.id} className="mb-4">
                            <p className="text-sm font-semibold">Select answer for blank {index + 1}:</p>
                            <div className="grid grid-cols-3 gap-4">
                                {currentQuestion.answers.slice(index * 3, index * 3 + 3).map((answer) => (
                                    <div
                                        key={answer.id}
                                        onClick={() => handleAnswerSelect(blank.id, answer.id)}
                                        className={`rounded-lg border p-3 text-center transition-colors cursor-pointer hover:bg-accent
                                        ${selectedAnswers[blank.id] === answer.id ? "border-blue-500 bg-blue-100 dark:bg-blue-900" : ""}
                                        ${isAnswerRevealed && (answer.isCorrect ? "border-green-500 bg-green-50 dark:bg-green-950"
                                                : selectedAnswers[blank.id] === answer.id ? "border-red-500 bg-red-50 dark:bg-red-950" : "")}`}
                                    >
                                        {answer.text}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}


                    {/* Actions */}
                    <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="outline">
                                        <HelpCircle className="mr-2 h-4 w-4" />
                                        Hint
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Need a hint?</DialogTitle>
                                        <DialogDescription>
                                            Look for context clues that suggest a contrast between the team's reputation and their actual
                                            methods.
                                        </DialogDescription>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>

                            <HoverCard>
                                <HoverCardTrigger asChild>
                                    <Button variant="outline">
                                        <Info className="mr-2 h-4 w-4" />
                                        Stats
                                    </Button>
                                </HoverCardTrigger>
                                <HoverCardContent className="w-80">
                                    <div className="space-y-2">
                                        <h4 className="text-sm font-semibold">Question Statistics</h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <p className="text-sm text-muted-foreground">Difficulty</p>
                                                <div className="flex items-center gap-2">
                                                    <div className={`h-2 w-2 rounded-full ${getDifficultyColor(currentQuestion.difficulty)}`} />
                                                    {currentQuestion.difficulty}
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm text-muted-foreground">Success Rate</p>
                                                <div className="flex items-center gap-2">
                                                    <Star className="h-4 w-4 text-yellow-500" />
                                                    75%
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </HoverCardContent>
                            </HoverCard>
                        </div>

                        <div className="flex gap-2">
                            <Button variant="outline" onClick={handleReset}>
                                <RefreshCw className="mr-2 h-4 w-4" />
                                Reset
                            </Button>
                            <Button onClick={() => setIsAnswerRevealed(true)} disabled={isAnswerRevealed}>
                                <Lightning className="mr-2 h-4 w-4" />
                                Check Answer
                            </Button>
                            <Button onClick={handleNextQuestion}>
                                Next Question
                            </Button>
                        </div>
                    </div>

                    {/* Explanation */}
                    <AnimatePresence>
                        {isAnswerRevealed && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">Explanation</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground">{currentQuestion.explanation}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </CardContent>
            </Card>
        </div>
    )
}

