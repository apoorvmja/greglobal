"use client"

import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
    BookmarkCheck,
    Book,
    BrainCircuit,
    ChevronDown,
    Clock,
    Eye,
    GraduationCap,
    History,
    LanguagesIcon as Language,
    CloudLightningIcon as Lightning,
    LineChart,
    RefreshCw,
    FolderRootIcon as Root,
    Star,
    TreeDeciduous,
    Volume2,
    Zap,
    Loader,
} from "lucide-react"

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
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { toast } from "sonner";

interface Etymology {
    origin: string
    rootWord: string
    meaning: string
    evolution: string[]
}

interface WordContext {
    sentence: string
    source: string
    difficulty: "basic" | "intermediate" | "advanced"
}

interface Answer {
    id: string
    text: string
    definition: string
    etymology: Etymology
    pronunciation: string
    partOfSpeech: string
    synonyms: string[]
    antonyms: string[]
    contexts: WordContext[]
    mnemonic: string
    isCorrect: boolean
    usageFrequency: number // percentage in academic texts
}

interface Question {
    id: string
    sentence: string
    blank: string
    difficulty: "easy" | "medium" | "hard"
    topic: string
    answers: Answer[]
    explanation: string
    timeLimit: number
    relatedWords: string[]
    commonErrors: string[]
}

interface ExamQuestionWithOptions {
    questionid: string;
    question_text: string;
    options: { text: string; isCorrect: boolean }[];
    question_solution: string;
}

interface VocabularyQuestionBlankDisplayProps {
    questions: ExamQuestionWithOptions[];
    backToDashboardAfterResults: () => void;
}


export function VocabularyBlankDisplay({ questions, backToDashboardAfterResults }: VocabularyQuestionBlankDisplayProps) {
    const [question, setQuestion] = React.useState<Question>()
    const [timeRemaining, setTimeRemaining] = React.useState(120)
    const [isAnswerRevealed, setIsAnswerRevealed] = React.useState(false)
    const [isBookmarked, setIsBookmarked] = React.useState(false)
    const [showEtymology, setShowEtymology] = React.useState(false)
    const [streak, setStreak] = React.useState(0)
    const [activeTab, setActiveTab] = React.useState("question")

    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [selectedAnswer, setSelectedAnswer] = React.useState<string | null>(null);
    const currentQuestion = questions[currentIndex];
    const [loadingPronounciation, setLoadingPronounciation] = React.useState(false)
    const [loadingPronunciationFor, setLoadingPronunciationFor] = React.useState<string | null>(null);

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

    const handleAnswerSelect = (answerId: string) => {
        if (!isAnswerRevealed) {
            setSelectedAnswer(answerId)
        }
    }

    const handleCheckAnswer = () => {
        if (!selectedAnswer) {
            toast.warning("Select an answer", {
                description: "Please choose an answer before checking.",
            });
            return
        }

        setIsAnswerRevealed(true)
        const isCorrect = currentQuestion.options.find((opt) => opt.text === selectedAnswer)?.isCorrect;

        if (isCorrect) {
            setStreak((prev) => prev + 1)
            toast.success("Correct!", {
                description: `Streak: ${streak + 1}`,
            });
        } else {
            setStreak(0)
            toast.error("Incorrect", {
                description: "Review the explanation to understand why.",
            });
        }
    }

    const handleReset = () => {
        setSelectedAnswer("")
        setTimeRemaining(120)
        setIsAnswerRevealed(false)
        setShowEtymology(false)
        setActiveTab("question")
    }

    const playPronunciation = (word: string, optionText: string) => {
        try {
            const utterance = new SpeechSynthesisUtterance(word);
            utterance.rate = 0.8;

            // When pronunciation ends, reset loading for the specific option
            utterance.onend = () => {
                setLoadingPronunciationFor(null);
            };

            window.speechSynthesis.speak(utterance);
        } catch (error) {
            toast.error("Try Again!", {
                description: "Error playing the input sound.",
            });
            setLoadingPronunciationFor(null); // Reset on error
        }
    };

    const handleNextQuestion = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setSelectedAnswer(null);
            setIsAnswerRevealed(false);
        } else {
            backToDashboardAfterResults();
        }
    };

    return (
        <div className="container mx-auto p-4 md:p-8">
            <Card className="relative">
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <div className="flex items-center gap-4">
                        <CardTitle>Vocabulary in Context</CardTitle>
                        <Badge variant="secondary" className="gap-1">
                            <Star className="h-3 w-3" />
                            {`Question ${currentIndex + 1} of ${questions.length}`}
                        </Badge>
                        {streak > 0 && (
                            <Badge variant="default" className="gap-1">
                                <Zap className="h-3 w-3" />
                                Streak: {streak}
                            </Badge>
                        )}
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
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="question">
                                <Book className="mr-2 h-4 w-4" />
                                Question
                            </TabsTrigger>
                            <TabsTrigger value="wordStudy">
                                <Language className="mr-2 h-4 w-4" />
                                Word Study
                            </TabsTrigger>
                            <TabsTrigger value="context">
                                <Eye className="mr-2 h-4 w-4" />
                                Context
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="question" className="space-y-6">
                            {/* Question Content */}
                            <div className="rounded-lg bg-muted p-6">
                                <p className="text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: currentQuestion.question_text }} />
                            </div>

                            {/* Answer Options */}
                            <RadioGroup value={selectedAnswer || ""} onValueChange={handleAnswerSelect}>
                                <div className="grid gap-4 md:grid-cols-2">
                                    {currentQuestion.options.map((option, index) => (
                                        <div key={index}>
                                            <HoverCard>
                                                <HoverCardTrigger asChild>
                                                    <div
                                                        className={`relative flex items-center rounded-lg border p-4 transition-colors cursor-pointer
                                                            ${selectedAnswer === option.text ? "border-primary bg-primary/5" : "hover:bg-accent"}
                                                            ${isAnswerRevealed && option.isCorrect ? "border-green-500 bg-green-50 dark:bg-green-950" : ""}
                                                        `}
                                                        onClick={() => handleAnswerSelect(option.text)}
                                                    >
                                                        <RadioGroupItem value={option.text} id={option.text} className="mr-4" />
                                                        <div className="flex flex-1 items-center justify-between">
                                                            <Label
                                                                htmlFor={option.text}
                                                                className="text-base"
                                                                dangerouslySetInnerHTML={{ __html: option.text }}
                                                            />
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    e.stopPropagation();

                                                                    setLoadingPronunciationFor(option.text);

                                                                    const tempDiv = document.createElement("div");
                                                                    tempDiv.innerHTML = option.text; // Convert HTML string to DOM elements
                                                                    const plainText = tempDiv.textContent || tempDiv.innerText; // Extract text

                                                                    playPronunciation(plainText, option.text)
                                                                }}
                                                            >
                                                                {loadingPronunciationFor === option.text ? (<div className="animate-spin"><Loader /></div>) : (<Volume2 className="h-4 w-4" />)}
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </HoverCardTrigger>
                                            </HoverCard>
                                        </div>
                                    ))}
                                </div>
                            </RadioGroup>

                            {/* Actions */}
                            <div className="flex items-center justify-between">
                                <div className="flex gap-2">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="outline">
                                                <BrainCircuit className="mr-2 h-4 w-4" />
                                                Study Tips
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle className="mb-2 underline">Vocabulary Study Tips</DialogTitle>
                                                <DialogDescription className="space-y-4">
                                                    <p>1. Look for context clues in the sentence</p>
                                                    <p>2. Consider the tone and style of the passage</p>
                                                    <p>3. Use word roots and etymology to understand meaning</p>
                                                    <p>4. Create personal connections with mnemonics</p>
                                                </DialogDescription>
                                            </DialogHeader>
                                        </DialogContent>
                                    </Dialog>

                                    <Button variant="outline" onClick={() => setShowEtymology(!showEtymology)}>
                                        <Root className="mr-2 h-4 w-4" />
                                        Etymology
                                    </Button>
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
                                    <Button variant="outline" onClick={handleNextQuestion}>
                                        {currentIndex < questions.length - 1 ? "Next Question" : "Back To Dashboard"}
                                    </Button>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="wordStudy" className="space-y-6">
                            {/* Word Study Content */}
                            {/* {selectedAnswer && (
                                <div className="space-y-6">
                                    {question.answers
                                        .filter((a) => a.id === selectedAnswer)
                                        .map((answer) => (
                                            <div key={answer.id} className="space-y-6">
                                                <Card>
                                                    <CardHeader>
                                                        <CardTitle className="flex items-center justify-between">
                                                            <span>{answer.text}</span>
                                                            <Badge variant="outline">Usage Frequency: {answer.usageFrequency}%</Badge>
                                                        </CardTitle>
                                                    </CardHeader>
                                                    <CardContent className="space-y-6">
                                                        <div className="grid gap-4 md:grid-cols-2">
                                                            <div>
                                                                <h4 className="mb-2 font-semibold">Synonyms</h4>
                                                                <div className="flex flex-wrap gap-2">
                                                                    {answer.synonyms.map((synonym, index) => (
                                                                        <Badge key={index} variant="secondary">
                                                                            {synonym}
                                                                        </Badge>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <h4 className="mb-2 font-semibold">Antonyms</h4>
                                                                <div className="flex flex-wrap gap-2">
                                                                    {answer.antonyms.map((antonym, index) => (
                                                                        <Badge key={index} variant="outline">
                                                                            {antonym}
                                                                        </Badge>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <Separator />

                                                        <div>
                                                            <h4 className="mb-4 font-semibold">Etymology</h4>
                                                            <div className="rounded-lg border p-4">
                                                                <div className="space-y-2">
                                                                    <div className="flex items-center gap-2">
                                                                        <Language className="h-4 w-4" />
                                                                        <span>Origin: {answer.etymology.origin}</span>
                                                                    </div>
                                                                    <div className="flex items-center gap-2">
                                                                        <Root className="h-4 w-4" />
                                                                        <span>Root: {answer.etymology.rootWord}</span>
                                                                    </div>
                                                                    <div className="flex items-center gap-2">
                                                                        <TreeDeciduous className="h-4 w-4" />
                                                                        <span>Evolution:</span>
                                                                    </div>
                                                                    <div className="ml-6 space-y-1">
                                                                        {answer.etymology.evolution.map((step, index) => (
                                                                            <div key={index} className="flex items-center gap-2">
                                                                                <div className="h-2 w-2 rounded-full bg-primary" />
                                                                                <span className="text-sm">{step}</span>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        ))}
                                </div>
                            )} */}
                        </TabsContent>

                        <TabsContent value="context" className="space-y-6">
                            {/* Context Examples */}
                            {/* {selectedAnswer && (
                                <div className="space-y-6">
                                    {question.answers
                                        .filter((a) => a.id === selectedAnswer)
                                        .map((answer) => (
                                            <div key={answer.id} className="space-y-4">
                                                {answer.contexts.map((context, index) => (
                                                    <Card key={index}>
                                                        <CardHeader>
                                                            <CardTitle className="flex items-center justify-between text-base">
                                                                <span>Example {index + 1}</span>
                                                                <Badge variant="outline">{context.difficulty}</Badge>
                                                            </CardTitle>
                                                        </CardHeader>
                                                        <CardContent>
                                                            <p className="text-sm">{context.sentence}</p>
                                                            <p className="mt-2 text-xs text-muted-foreground">Source: {context.source}</p>
                                                        </CardContent>
                                                    </Card>
                                                ))}
                                            </div>
                                        ))}
                                </div>
                            )} */}
                        </TabsContent>
                    </Tabs>

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
                                        <CardTitle className="flex items-center gap-2">
                                            <GraduationCap className="h-5 w-5" />
                                            Explanation
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <p className="text-sm text-muted-foreground">
                                            {currentQuestion.question_solution
                                                ? currentQuestion.question_solution
                                                : "No explanation available for this question."}
                                        </p>
                                        <Collapsible>
                                            <CollapsibleTrigger asChild>
                                                <Button variant="ghost" className="flex w-full justify-between p-4 mb-2">
                                                    <span>Common Errors</span>
                                                    <ChevronDown className="h-4 w-4" />
                                                </Button>
                                            </CollapsibleTrigger>
                                            <CollapsibleContent className="space-y-2">
                                                {[
                                                    "Confusing words with similar meanings but different contextual usage.",
                                                    "Not identifying the tone or logical flow of the sentence.",
                                                    "Ignoring contrast words like 'despite', 'although', and 'however'.",
                                                    "Selecting answers based on memorized definitions instead of context clues.",
                                                    "Overlooking grammatical structure when choosing the correct option."
                                                ].map((error, index) => (
                                                    <div key={index} className="rounded-md bg-muted p-4">
                                                        <p className="text-sm">{error}</p>
                                                    </div>
                                                ))}
                                            </CollapsibleContent>

                                        </Collapsible>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </CardContent>

                <CardFooter className="flex justify-between">
                    <div className="flex items-center gap-2">
                        <History className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Last studied: 3 days ago</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <LineChart className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Mastery: 85%</span>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}

