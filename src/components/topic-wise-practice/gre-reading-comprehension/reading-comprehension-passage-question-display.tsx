"use client"

import * as React from "react"
import { Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

interface ExamQuestion {
    questionid: string
    subjectid: string
    question_time: string
    question_pre: string
    question_post: string
    question_text: string
    question_RC_text: string
    question_points: string
    question_solution: string
    question_type: string
    question_type2: string
    question_topic: string
    options: { text: string; isCorrect: boolean }[];
}

interface ReadingAssessmentProps {
    questions: ExamQuestion[]
    backToDashboardAfterResults: () => void;
}

const MIN_FONT_SIZE = 14
const MAX_FONT_SIZE = 24

export default function ReadingAssessmentPassageQuestionDisplay({ questions, backToDashboardAfterResults }: ReadingAssessmentProps) {
    const [fontSize, setFontSize] = React.useState(16)
    const [selectedAnswers, setSelectedAnswers] = React.useState<{ [key: string]: string }>({});
    const [progress, setProgress] = React.useState(0)
    const [currentIndex, setCurrentIndex] = React.useState(0)
    const [showResults, setShowResults] = React.useState(false);

    React.useEffect(() => {
        if (selectedAnswers) {
            setProgress((prev) => prev + 33)
        }
    }, [selectedAnswers])

    const adjustFontSize = (amount: number) => {
        setFontSize((prev) => Math.min(Math.max(prev + amount, MIN_FONT_SIZE), MAX_FONT_SIZE))
    }

    const handleNextQuestion = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setShowResults(true);
        }
        console.log(selectedAnswers)
    };

    const handleAnswerSelect = (value: string) => {
        setSelectedAnswers((prev) => ({
            ...prev,
            [questions[currentIndex].questionid]: value,
        }));
    };



    return (
        <div className="container mx-auto p-4 md:p-8">
            <div className="mb-8 flex items-center justify-between">
                <h1 className="text-2xl font-bold">Reading Assessment</h1>
                <Progress value={(currentIndex / questions.length) * 100} className="w-[100px]" />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Reading Passage Section */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0">
                        <CardTitle>Reading Passage</CardTitle>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="icon" onClick={() => adjustFontSize(-1)} disabled={fontSize <= MIN_FONT_SIZE}>
                                <Minus className="h-4 w-4" />
                            </Button>
                            <span className="min-w-[3ch] text-center">{fontSize}</span>
                            <Button variant="outline" size="icon" onClick={() => adjustFontSize(1)} disabled={fontSize >= MAX_FONT_SIZE}>
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-[600px] rounded-md border p-4">
                            <div style={{ fontSize: `${fontSize}px` }} className="space-y-4">
                                {questions.length > 0 ? (
                                    <p dangerouslySetInnerHTML={{ __html: questions[currentIndex].question_RC_text }}></p>
                                ) : (
                                    <p>No passage available.</p>
                                )}
                            </div>
                            <ScrollBar />
                        </ScrollArea>
                    </CardContent>
                </Card>

                {/* Questions Section */}
                <div className="space-y-6">
                    {questions.length > 0 && (
                        <Card key={questions[currentIndex].questionid}>
                            <CardHeader>
                                <CardTitle>Question {currentIndex + 1}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <p className="text-lg font-medium" dangerouslySetInnerHTML={{ __html: questions[currentIndex].question_text }}></p>
                                    <RadioGroup
                                        value={selectedAnswers[questions[currentIndex].questionid] || ""}
                                        onValueChange={handleAnswerSelect}
                                    >                                        <div className="space-y-3">
                                            {questions[currentIndex].options.map((option, idx) => (
                                                <div key={idx} className="flex items-center space-x-2">
                                                    <RadioGroupItem value={`option${idx + 1}`} id={`option${idx + 1}`} />
                                                    <Label htmlFor={`option${idx + 1}`} className="leading-relaxed">
                                                        <span dangerouslySetInnerHTML={{ __html: option.text }}></span>
                                                    </Label>
                                                </div>
                                            ))}
                                        </div>
                                    </RadioGroup>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Next Button */}
                    <Button onClick={handleNextQuestion} className="w-full">
                        {currentIndex < questions.length - 1 ? "Next Question" : "Finish"}
                    </Button>

                    {showResults && (
                        <div className="space-y-6">
                            <h1 className="text-2xl font-bold text-center mb-6">Review Your Answers</h1>

                            {questions.map((question, index) => {
                                const userAnswer = selectedAnswers[question.questionid] || "Not Answered";
                                const correctAnswer = question.options.find((option) => option.isCorrect)?.text || "Not Provided";

                                return (
                                    <Card key={question.questionid}>
                                        <CardHeader>
                                            <CardTitle>Question {index + 1}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-lg font-medium" dangerouslySetInnerHTML={{ __html: question.question_text }}></p>

                                            <div className="mt-4">
                                                <p className="font-semibold">Your Answer:</p>
                                                <p
                                                    className={`p-2 rounded-md ${userAnswer === correctAnswer ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                                        }`}
                                                    dangerouslySetInnerHTML={{ __html: userAnswer }}
                                                ></p>
                                            </div>

                                            <div className="mt-2">
                                                <p className="font-semibold">Correct Answer:</p>
                                                <p className="p-2 rounded-md bg-blue-100 text-blue-700"
                                                    dangerouslySetInnerHTML={{ __html: correctAnswer }}>
                                                </p>
                                            </div>

                                            <div className="mt-2">
                                                <p className="font-semibold">Explanation:</p>
                                                <p className="p-2 rounded-md bg-gray-100"
                                                    dangerouslySetInnerHTML={{ __html: question.question_solution }}>
                                                </p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                );
                            })}

                            <Button onClick={backToDashboardAfterResults} className="w-full mt-6">
                                Back To Dashboard
                            </Button>
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}
