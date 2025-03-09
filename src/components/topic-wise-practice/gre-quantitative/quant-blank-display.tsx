"use client"

import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
    BookmarkCheck,
    Calculator,
    ChevronDown,
    Clock,
    Compass,
    FileText,
    ActivityIcon as Function,
    GraduationCap,
    CloudLightningIcon as Lightning,
    Pencil,
    RefreshCw,
    Star,
    ThumbsUp,
} from "lucide-react"
import { Sigma } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { toast } from "sonner";

interface Formula {
    name: string
    latex: string
    description: string
}

interface SolutionStep {
    id: string
    explanation: string
    latex?: string
    isKey: boolean
}

interface Solution {
    method: string
    steps: SolutionStep[]
    finalAnswer: string
}

interface Answer {
    id: string
    text: string
    latex?: string
    isCorrect: boolean
}

interface Question {
    id: string
    type: "multiple-choice" | "numeric-entry" | "quantitative-comparison" | "multiple-answer"
    text: string
    latex?: string
    image?: string
    difficulty: "easy" | "medium" | "hard"
    topic: string
    subtopic: string
    answers: Answer[]
    solutions: Solution[]
    relatedFormulas: Formula[]
    commonMistakes: string[]
    timeEstimate: number // in seconds
}


interface ExamQuestionWithOptions {
    questionid: string;
    question_text: string;
    options: { text: string; isCorrect: boolean }[];
    question_solution: string;
    question_type: string
}

interface QuantitativeQuestionBlankDisplayProps {
    questions: ExamQuestionWithOptions[];
    backToDashboardAfterResults: () => void;
}


export function QuantitativeBlankDisplay({ questions, backToDashboardAfterResults }: QuantitativeQuestionBlankDisplayProps) {
    const [selectedAnswer, setSelectedAnswer] = React.useState<string>("")
    const [timeRemaining, setTimeRemaining] = React.useState(90)
    const [isAnswerRevealed, setIsAnswerRevealed] = React.useState(false)
    const [isBookmarked, setIsBookmarked] = React.useState(false)
    const [showSolution, setShowSolution] = React.useState(false)
    const [activeSolutionMethod, setActiveSolutionMethod] = React.useState(0)
    const [showFormulas, setShowFormulas] = React.useState(false)
    const [scratchPad, setScratchPad] = React.useState("")
    const [showCalculator, setShowCalculator] = React.useState(false)

    const [currentIndex, setCurrentIndex] = React.useState(0);

    const question = questions[currentIndex];

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

    const handleAnswerSelect = (answerId: string) => {
        if (!isAnswerRevealed) {
            setSelectedAnswer(answerId)
        }
    }

    const handleCheckAnswer = () => {
        if (!selectedAnswer.trim()) {
            toast.warning("Select an answer", { description: "Please enter an answer before checking." });
            return;
        }

        setIsAnswerRevealed(true);

        let isCorrect = false;

        if (question.question_type === "4") {
            // Numeric Entry: Check if the answer exists in the options
            isCorrect = question.options.some(opt => opt.text.trim() === selectedAnswer.trim());
            console.log(question.options.some(opt => opt.text.trim()))
            console.log(selectedAnswer.trim())
        } else {
            // Multiple Choice: Check correctness via selected radio option
            isCorrect = question.options.find(opt => opt.text === selectedAnswer)?.isCorrect ?? false;
        }

        if (isCorrect) {
            toast.success("Correct!", { description: "Good job!" });
        } else {
            toast.error("Incorrect", { description: "Check the solution for more details." });
        }
    };


    const handleNextQuestion = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setSelectedAnswer("");
            setIsAnswerRevealed(false);
            setTimeRemaining(30); // Reset timer
        } else {
            backToDashboardAfterResults(); // Finish test
        }
    };

    const handleReset = () => {
        setSelectedAnswer("")
        setTimeRemaining(30)
        setIsAnswerRevealed(false)
        setShowSolution(false)
        setShowFormulas(false)
        setScratchPad("")
    }

    return (
        <div className="container mx-auto p-4 md:p-8">
            <Card className="relative">
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <div className="flex items-center gap-4">
                        <CardTitle>Quantitative Reasoning</CardTitle>
                        <Badge variant="secondary" className="gap-1">
                            <Star className="h-3 w-3" />
                            {/* {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)} */}
                        </Badge>
                        <Badge variant="outline" className="gap-1">
                            <Function className="h-3 w-3" />
                            {/* {question.topic} */}
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
                            <Clock className="h-4 w-4" />
                            <span className={`font-mono ${timeRemaining < 30 ? "text-red-500" : ""}`}>
                                {formatTime(timeRemaining)}
                            </span>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* Question */}
                    <div className="rounded-lg bg-muted p-6">
                        <div className="space-y-4">
                            <p
                                className="text-lg leading-relaxed"
                                dangerouslySetInnerHTML={{
                                    __html: question.question_text.replace(/\\\"/g, '"').replace(/\\frac/g, "\\frac")
                                }}
                            />


                            {/* {question.image && (
                                <div className="my-4 flex justify-center">
                                    <img
                                        src={question.image || "/placeholder.svg"}
                                        alt="Question diagram"
                                        className="max-h-64 rounded-md"
                                    />
                                </div>
                            )} */}
                        </div>
                    </div>

                    {/* Answer Options */}
                    {question.question_type === "4" ? (
                        <div className="flex items-center gap-4">
                            <input
                                type="text"
                                className="border rounded-lg p-3 text-lg w-1/2"
                                placeholder="Enter your answer"
                                value={selectedAnswer}
                                onChange={(e) => setSelectedAnswer(e.target.value)}
                            />
                        </div>
                    ) : (
                        <RadioGroup value={selectedAnswer} onValueChange={handleAnswerSelect}>
                            <div className="grid gap-4 md:grid-cols-2">
                                {question.options.map((option, index) => (
                                    <div key={index} className={`flex items-center gap-2 p-4 border rounded-lg ${selectedAnswer === option.text ? "border-primary" : ""}`}>
                                        <RadioGroupItem value={option.text} />
                                        <Label dangerouslySetInnerHTML={{ __html: option.text }} />
                                    </div>
                                ))}
                            </div>
                        </RadioGroup>
                    )}


                    {/* Tools */}
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex flex-wrap gap-2">
                            <Button variant="outline" onClick={() => setShowFormulas(!showFormulas)}>
                                <Sigma className="mr-2 h-4 w-4" />
                                Formulas
                            </Button>
                            <Button variant="outline" onClick={() => setShowCalculator(!showCalculator)}>
                                <Calculator className="mr-2 h-4 w-4" />
                                Calculator
                            </Button>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="outline">
                                        <Pencil className="mr-2 h-4 w-4" />
                                        Scratch Pad
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Scratch Pad</DialogTitle>
                                        <DialogDescription>Use this space for your calculations.</DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <textarea
                                            className="h-[200px] rounded-md border p-2"
                                            value={scratchPad}
                                            onChange={(e) => setScratchPad(e.target.value)}
                                            placeholder="Write your calculations here..."
                                        />
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>

                        <div className="flex gap-2">
                            <Button variant="outline" onClick={handleReset}>
                                <RefreshCw className="mr-2 h-4 w-4" />
                                Reset
                            </Button>
                            <Button onClick={handleCheckAnswer} disabled={isAnswerRevealed || !selectedAnswer}>
                                <Lightning className="mr-2 h-4 w-4" />
                                Check Answer
                            </Button>
                            <Button onClick={handleNextQuestion} variant="default">
                                {currentIndex < questions.length - 1 ? "Next Question" : "Back to Dashboard"}
                            </Button>
                        </div>
                    </div>

                    {/* Formulas */}
                    {/* <AnimatePresence>
                        {showFormulas && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">Related Formulas</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid gap-4 md:grid-cols-2">
                                            {question.relatedFormulas.map((formula, index) => (
                                                <div key={index} className="rounded-lg border p-4">
                                                    <h4 className="mb-2 font-medium">{formula.name}</h4>
                                                    <div className="mb-2 flex justify-center">
                                                        Formula To Be Shown Later On
                                                    </div>
                                                    <p className="text-sm text-muted-foreground">{formula.description}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )}
                    </AnimatePresence> */}

                    {/* Calculator */}
                    <AnimatePresence>
                        {showCalculator && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">Calculator</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-col items-center">
                                            <div className="mb-4 w-full rounded-md border p-2 text-right text-xl">0</div>
                                            <div className="grid grid-cols-4 gap-2">
                                                {["7", "8", "9", "÷", "4", "5", "6", "×", "1", "2", "3", "-", "0", ".", "=", "+"].map((key) => (
                                                    <Button key={key} variant="outline" className="h-12 w-12 text-lg">
                                                        {key}
                                                    </Button>
                                                ))}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Solution */}
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
                                        <CardTitle className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <GraduationCap className="h-5 w-5" />
                                                <span>Solution</span>
                                            </div>
                                            <Button variant="outline" size="sm" onClick={() => setShowSolution(!showSolution)}>
                                                {showSolution ? "Hide" : "Show"} Solution
                                            </Button>
                                        </CardTitle>
                                    </CardHeader>

                                    {showSolution && (
                                        <CardContent className="space-y-4">
                                            {/* <Tabs
                                                defaultValue={`method-${activeSolutionMethod}`}
                                                onValueChange={(value) => setActiveSolutionMethod(Number.parseInt(value.split("-")[1]))}
                                            > */}
                                            {/* <TabsList className="mb-4">
                                                    {question.solutions.map((solution, index) => (
                                                        <TabsTrigger key={index} value={`method-${index}`}>
                                                            {solution.method}
                                                        </TabsTrigger>
                                                    ))}
                                                </TabsList> */}

                                            {/* {question.solutions.map((solution, methodIndex) => ( */}
                                            {/* <TabsContent value="" className="space-y-4"> */}
                                            {/* <div className="space-y-4">
                                                            {filteredSteps.map((step, stepIndex) => (
                                                                <div key={step.id} className="rounded-lg border p-4">
                                                                    <div className="flex items-start gap-4">
                                                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                                                            {stepIndex + 1}
                                                                        </div>
                                                                        <div className="space-y-2">
                                                                            <p>{step.explanation}</p>
                                                                            {step.latex && (
                                                                                <div className="my-2">
                                                                                    Solution To be Shown
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div> */}
                                            <div className="mt-4 rounded-lg border border-green-500 bg-green-50 p-4 dark:bg-green-950">
                                                <div className="flex items-center gap-2">
                                                    <ThumbsUp className="h-5 w-5 text-green-500" />
                                                    <span className="font-medium" dangerouslySetInnerHTML={{ __html: question.question_solution }} />
                                                </div>
                                            </div>
                                            {/* </TabsContent> */}
                                            {/* ))} */}
                                            {/* </Tabs> */}

                                            <Collapsible>
                                                <CollapsibleTrigger asChild>
                                                    <Button variant="ghost" className="flex w-full justify-between p-4">
                                                        <span>Common Mistakes</span>
                                                        <ChevronDown className="h-4 w-4" />
                                                    </Button>
                                                </CollapsibleTrigger>
                                                <CollapsibleContent className="space-y-2">
                                                    {/* {question.commonMistakes.map((mistake, index) => (
                                                        <div key={index} className="rounded-md bg-muted p-4">
                                                            <p className="text-sm">{mistake}</p>
                                                        </div>
                                                    ))} */}
                                                </CollapsibleContent>
                                            </Collapsible>
                                        </CardContent>
                                    )}
                                </Card>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </CardContent>

                <CardFooter className="flex justify-between">
                    <div className="flex items-center gap-2">
                        <Compass className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                            Topic:
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Question Type: </span>
                    </div>
                </CardFooter>
            </Card >
        </div >
    )
}

