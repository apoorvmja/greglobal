"use client";

import * as React from "react";
import SelectQuestionSet from "@/components/topic-wise-practice/SelectQuestionSet";
import { getSlicedQuestionsWithOptionAndAnswer } from "../getSlicedQuestions";
import { GRETextCompletionBlankDisplay } from "./gre-text-completion-blanks-display";

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

const textCompletionTests: Test[] = [
    {
        id: 1,
        title: "Text Completion Test 1",
        description: "Fill in missing words to complete the passage meaningfully",
        estimatedTime: 30,
        status: "not-started",
        progress: 0,
    },
    {
        id: 2,
        title: "Text Completion Test 2",
        description: "Strengthen your vocabulary and contextual understanding",
        estimatedTime: 35,
        status: "in-progress",
        progress: 40,
    },
    {
        id: 3,
        title: "Text Completion Test 3",
        description: "Practice multi-blank text completion questions",
        estimatedTime: 40,
        status: "completed",
        score: 90,
        lastAttempted: "2024-02-22",
        progress: 100,
    },
    {
        id: 4,
        title: "Text Completion Test 4",
        description: "Enhance logical consistency in sentence completion",
        estimatedTime: 30,
        status: "not-started",
        progress: 0,
    },
    {
        id: 5,
        title: "Text Completion Test 5",
        description: "Develop advanced inferencing skills in blank-filling exercises",
        estimatedTime: 35,
        status: "in-progress",
        progress: 25,
    },
    {
        id: 6,
        title: "Text Completion Test 6",
        description: "Understand complex sentence structures through completion tasks",
        estimatedTime: 40,
        status: "completed",
        score: 88,
        lastAttempted: "2024-02-18",
        progress: 100,
    },
    {
        id: 7,
        title: "Text Completion Test 7",
        description: "Improve word selection accuracy based on passage tone",
        estimatedTime: 30,
        status: "not-started",
        progress: 0,
    },
    {
        id: 8,
        title: "Text Completion Test 8",
        description: "Master nuances of sentence meaning through strategic blank-filling",
        estimatedTime: 35,
        status: "in-progress",
        progress: 60,
    },
    {
        id: 9,
        title: "Text Completion Test 9",
        description: "Refine analytical thinking with multi-blank completion exercises",
        estimatedTime: 40,
        status: "completed",
        score: 92,
        lastAttempted: "2024-02-15",
        progress: 100,
    },
    {
        id: 10,
        title: "Text Completion Test 10",
        description: "Tackle challenging vocabulary-based sentence completion",
        estimatedTime: 30,
        status: "not-started",
        progress: 0,
    },
];

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

export default function GRETextCompletionQuestionDisplay() {
    const [TCQuestionsAfterSlicingAndAddingOptionsNAnwers, setTCQuestionsAfterSlicingAndAddingOptionsNAnwers] =
        React.useState<ExamQuestionWithOptions[]>([]);

    const handleTestSetSelect = (test: Test) => {
        const questions: ExamQuestionWithOptions[] = getSlicedQuestionsWithOptionAndAnswer(
            "Text Completion",
            test.id,
            15
        );
        setTCQuestionsAfterSlicingAndAddingOptionsNAnwers(questions);
        console.log("finalarray", TCQuestionsAfterSlicingAndAddingOptionsNAnwers)
    };


    return (
        <>
            {TCQuestionsAfterSlicingAndAddingOptionsNAnwers.length > 0 ? (
                <GRETextCompletionBlankDisplay
                    questions={TCQuestionsAfterSlicingAndAddingOptionsNAnwers}
                    backToDashboardAfterResults={() => { setTCQuestionsAfterSlicingAndAddingOptionsNAnwers([]); }}
                />
            ) : (
                <SelectQuestionSet
                    tests={textCompletionTests}
                    title="GRE Reading Comprehension"
                    description="Enhance your reading and inference skills with practice tests."
                    onTestSetSelect={handleTestSetSelect}
                />
            )}
        </>
    );
}
