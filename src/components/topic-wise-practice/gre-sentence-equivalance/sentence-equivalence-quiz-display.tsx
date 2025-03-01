"use client"

import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  BookmarkCheck,
  BrainCircuit,
  ChevronDown,
  Clock,
  GraduationCap,
  History,
  CloudLightningIcon as Lightning,
  LineChart,
  RefreshCw,
  Star,
  Sparkles,
  Zap,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
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
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { toast } from "sonner"


interface ExamQuestionWithOptions {
  questionid: string;
  question_text: string;
  options: { text: string; isCorrect: boolean }[];
  question_solution: string;
}


interface SentenceEquivalenceQuizDisplayProps {
  questions: ExamQuestionWithOptions[];
  backToDashboardAfterResults: () => void;
}

export function SentenceEquivalenceQuizDisplay({ questions, backToDashboardAfterResults }: SentenceEquivalenceQuizDisplayProps) {
  const [questionIndex, setQuestionIndex] = React.useState(0);
  const [selectedAnswers, setSelectedAnswers] = React.useState<Set<string>>(new Set());
  const [isAnswerRevealed, setIsAnswerRevealed] = React.useState(false);
  const [timeRemaining, setTimeRemaining] = React.useState(90);
  const [isBookmarked, setIsBookmarked] = React.useState(false);
  const [showSemanticHint, setShowSemanticHint] = React.useState(false);
  const [streak, setStreak] = React.useState(0); // ✅ Track user streak

  const question = questions[questionIndex];

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
    const newSelected = new Set(selectedAnswers)
    if (newSelected.has(answerId)) {
      newSelected.delete(answerId)
    } else if (newSelected.size < 2) {
      newSelected.add(answerId)
    } else {
      toast("Maximum selections reached", {
        description: "Please deselect an answer before selecting a new one.",
      })
      return
    }
    setSelectedAnswers(newSelected)
  }

  const handleCheckAnswer = () => {
    if (selectedAnswers.size !== 2) {
      toast("Invalid selection: Please select exactly two answers.");
      return;
    }

    setIsAnswerRevealed(true);

    const correctAnswers = new Set(question.options.filter((opt) => opt.isCorrect).map((opt) => opt.text));
    const isCorrect = [...selectedAnswers].every((text) => correctAnswers.has(text)) &&
      [...correctAnswers].every((text) => selectedAnswers.has(text));

    if (isCorrect) {
      setStreak(streak + 1);
      toast(`Correct! Streak: ${streak + 1}`, {
        style: { backgroundColor: "#32fc5b", color: "white", fontWeight: "bold" },
      });
    } else {
      setStreak(0);
      toast("Incorrect. Review the explanation to understand why.", {
        style: { backgroundColor: "#ff4d4f", color: "white" },
      });
    }
  };

  const handleReset = () => {
    setSelectedAnswers(new Set())
    setTimeRemaining(90)
    setIsAnswerRevealed(false)
    setShowSemanticHint(false)
  }

  const handleNextQuestion = () => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
      setSelectedAnswers(new Set());
      setIsAnswerRevealed(false);
      setTimeRemaining(90);
    } else {
      backToDashboardAfterResults();
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Card className="relative">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div className="flex items-center gap-4">
            <CardTitle>Sentence Equivalence</CardTitle>
            <Badge variant="secondary" className="gap-1">
              <Star className="h-3 w-3" />
              {/* Add difficulty level if needed */}
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
          {/* Question */}
          <div className="rounded-lg bg-muted p-6">
            <p className="text-lg leading-relaxed">
              <div dangerouslySetInnerHTML={{ __html: question?.question_text }} className="text-lg" />

            </p>
          </div>

          {/* Answer Options */}
          <div className="grid grid-cols-2 gap-4">
            {question?.options.map((option, index) => (
              <div key={index} className="relative">
                <div
                  className={`flex cursor-pointer items-center rounded-lg border p-4 transition-colors ${selectedAnswers.has(option.text) ? "border-primary bg-primary/5" : "hover:bg-accent"
                    }`}
                  onClick={() => !isAnswerRevealed && handleAnswerSelect(option.text)}
                >
                  <Checkbox checked={selectedAnswers.has(option.text)} className="mr-4" />
                  <Label dangerouslySetInnerHTML={{ __html: option.text }} />
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <BrainCircuit className="mr-2 h-4 w-4" />
                    Strategy Tips
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="mb-4 underline">Solving Strategy</DialogTitle>
                    <DialogDescription className="space-y-4">
                      <p>1. Look for two words that could fill in the blank and create similar meanings</p>
                      <p>2. Consider the tone and context of the sentence</p>
                      <p>3. Identify the semantic relationship between the answer choices</p>
                      <p>4. Eliminate obviously incorrect choices first</p>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>

              <Button variant="outline" onClick={() => setShowSemanticHint(!showSemanticHint)}>
                <Sparkles className="mr-2 h-4 w-4" />
                Semantic Hint
              </Button>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={handleReset}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Reset
              </Button>
              <Button onClick={handleCheckAnswer} disabled={isAnswerRevealed || selectedAnswers.size !== 2}>
                <Lightning className="mr-2 h-4 w-4" />
                Check Answer
              </Button>
              {isAnswerRevealed && (
                questionIndex < questions.length - 1 ? (
                  <Button onClick={handleNextQuestion}>Next Question</Button>
                ) : (
                  <Button onClick={backToDashboardAfterResults}>Back to Dashboard 😊</Button>
                )
              )}
            </div>
          </div>

          {/* Semantic Hint */}
          <AnimatePresence>
            {showSemanticHint && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">
                      Semantic Hint
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Look for words that share the semantic relationship of describing how clear or unclear something
                      is to understand.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

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
                    <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: question?.question_solution }} ></p>
                    <Collapsible>
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" className="flex w-full justify-between p-4">
                          <span>Common Mistakes</span>
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="space-y-2">
                        {[
                          "Choosing two words that are synonyms but do not fit the sentence.",
                          "Selecting words that make sense individually but do not have a similar meaning.",
                          "Ignoring context clues such as contrast words (although, however).",
                          "Picking words based on personal familiarity rather than their actual meaning.",
                          "Not considering tone—e.g., a negative word might be needed instead of a positive one.",
                          "Overlooking the grammatical structure of the sentence.",
                        ].map((mistake, index) => (
                          <div key={index} className="rounded-md bg-muted p-4">
                            <p className="text-sm">{mistake}</p>
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
            <span className="text-sm text-muted-foreground">Last attempted: 2 days ago</span>
          </div>
          <div className="flex items-center gap-2">
            <LineChart className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Success rate: 75%</span>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

