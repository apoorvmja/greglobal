"use client";

import * as React from "react";
import SelectQuestionSet from "@/components/topic-wise-practice/SelectQuestionSet";
import { getSlicedQuestionsWithOptionAndAnswer } from "../getSlicedQuestions";
import ReadingAssessmentPassageQuestionDisplay from "./reading-comprehension-passage-question-display";

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

const readingComprehensionTests: Test[] = [
    {
        id: 1,
        title: "Reading Comprehension Test 1",
        description: "Analyze complex passages and answer inference-based questions.",
        estimatedTime: 40,
        status: "not-started",
        progress: 0,
    },
    {
        id: 2,
        title: "Reading Comprehension Test 2",
        description: "Practice comprehension skills with various question types.",
        estimatedTime: 45,
        status: "in-progress",
        progress: 50,
    },
    {
        id: 3,
        title: "Reading Comprehension Test 3",
        description: "Understand logical flow and structure of passages.",
        estimatedTime: 50,
        status: "completed",
        score: 85,
        lastAttempted: "2024-02-20",
        progress: 100,
    },
    {
        id: 4,
        title: "Reading Comprehension Test 4",
        description: "Interpret critical arguments and author perspectives.",
        estimatedTime: 50,
        status: "not-started",
        progress: 0,
    },
    {
        id: 5,
        title: "Reading Comprehension Test 5",
        description: "Identify main ideas and supporting details effectively.",
        estimatedTime: 45,
        status: "in-progress",
        progress: 30,
    },
    {
        id: 6,
        title: "Reading Comprehension Test 6",
        description: "Evaluate tone, purpose, and rhetorical strategies.",
        estimatedTime: 50,
        status: "completed",
        score: 90,
        lastAttempted: "2024-02-18",
        progress: 100,
    },
    {
        id: 7,
        title: "Reading Comprehension Test 7",
        description: "Improve critical reading and logical reasoning skills.",
        estimatedTime: 40,
        status: "not-started",
        progress: 0,
    },
    {
        id: 8,
        title: "Reading Comprehension Test 8",
        description: "Master handling dense academic and scientific passages.",
        estimatedTime: 50,
        status: "in-progress",
        progress: 60,
    },
    {
        id: 9,
        title: "Reading Comprehension Test 9",
        description: "Distinguish between facts, opinions, and assumptions.",
        estimatedTime: 50,
        status: "completed",
        score: 88,
        lastAttempted: "2024-02-15",
        progress: 100,
    },
    {
        id: 10,
        title: "Reading Comprehension Test 10",
        description: "Develop strategies for time-efficient passage reading.",
        estimatedTime: 40,
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

export default function GREReadingComprehensionQuestionDisplay() {
    const [RCQuestionsAfterSlicingAndAddingOptionsNAnwers, setRCQuestionsAfterSlicingAndAddingOptionsNAnwers] =
        React.useState<ExamQuestionWithOptions[]>([]);

    const handleTestSetSelect = (test: Test) => {
        const questions: ExamQuestionWithOptions[] = getSlicedQuestionsWithOptionAndAnswer(
            "Reading Comprehension",
            test.id,
            15
        );
        setRCQuestionsAfterSlicingAndAddingOptionsNAnwers(questions);
        console.log("finalarray", RCQuestionsAfterSlicingAndAddingOptionsNAnwers)
    };


    return (
        <>
            {RCQuestionsAfterSlicingAndAddingOptionsNAnwers.length > 0 ? (
                <ReadingAssessmentPassageQuestionDisplay
                    questions={RCQuestionsAfterSlicingAndAddingOptionsNAnwers}
                    backToDashboardAfterResults={() => { setRCQuestionsAfterSlicingAndAddingOptionsNAnwers([]); }}
                />
            ) : (
                <SelectQuestionSet
                    tests={readingComprehensionTests}
                    title="GRE Reading Comprehension"
                    description="Enhance your reading and inference skills with practice tests."
                    onTestSetSelect={handleTestSetSelect}
                />
            )}
        </>
    );
}
