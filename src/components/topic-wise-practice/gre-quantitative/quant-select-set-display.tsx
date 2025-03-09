"use client";

import * as React from "react";
import SelectQuestionSet from "@/components/topic-wise-practice/SelectQuestionSet";
import { getSlicedQuestionsWithOptionAndAnswer } from "../getSlicedQuestions";
import { QuantitativeBlankDisplay } from "./quant-blank-display";

type TestStatus = "not-started" | "in-progress" | "completed";

interface Test {
    id: number;
    title: string;
    description: string;
    estimatedTime: number;
    status: TestStatus;
    score?: number;
    lastAttempted?: string;
    progress: number;
}

interface ExamQuestion {
    questionid: string;
    subjectid: string;
    question_time: string;
    question_pre: string;
    question_post: string;
    question_text: string;
    question_RC_text: string;
    question_points: string;
    question_solution: string;
    question_type: string;
    question_type2: string;
    question_topic: string;
}

interface ExamQuestionWithOptions extends ExamQuestion {
    options: { text: string; isCorrect: boolean }[];
}

export default function QuantitativeQuestionSetDisplay({ topic_name, displayOptions = [] }: { topic_name: string, displayOptions: Test[] }) {
    const [QuantQuestionsAfterSlicingAndAddingOptionsNAnwers, setQuantQuestionsAfterSlicingAndAddingOptionsNAnwers] =
        React.useState<ExamQuestionWithOptions[]>([]);

    const handleTestSetSelect = (test: Test) => {
        const questions: ExamQuestionWithOptions[] = getSlicedQuestionsWithOptionAndAnswer(
            topic_name,
            test.id,
            15
        );
        setQuantQuestionsAfterSlicingAndAddingOptionsNAnwers(questions);
        console.log("finalarray", QuantQuestionsAfterSlicingAndAddingOptionsNAnwers)
    };

    return (
        <>
            {QuantQuestionsAfterSlicingAndAddingOptionsNAnwers.length > 0 ? (
                <QuantitativeBlankDisplay
                    questions={QuantQuestionsAfterSlicingAndAddingOptionsNAnwers}
                    backToDashboardAfterResults={() => { setQuantQuestionsAfterSlicingAndAddingOptionsNAnwers([]); }}
                />
            ) : (
                <SelectQuestionSet
                    tests={displayOptions}
                    title={`Quantitative- ${topic_name}`}
                    description="Enhance your reading and inference skills with practice tests."
                    onTestSetSelect={handleTestSetSelect}
                />
            )}
        </>
    );
}
