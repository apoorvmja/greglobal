"use client";

import * as React from "react";
import SelectQuestionSet from "@/components/topic-wise-practice/SelectQuestionSet";
import { getSlicedQuestionsWithOptionAndAnswer } from "../getSlicedQuestions";
import { SentenceEquivalenceQuizDisplay } from "./sentence-equivalence-quiz-display";

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

const sentenceEquivalenceTests: Test[] = [
    {
        id: 1,
        title: "Sentence Equivalence Test 1",
        description: "Identify synonym pairs that preserve sentence meaning.",
        estimatedTime: 40,
        status: "not-started",
        progress: 0,
    },
    {
        id: 2,
        title: "Sentence Equivalence Test 2",
        description: "Practice selecting two words that complete the sentence logically.",
        estimatedTime: 45,
        status: "in-progress",
        progress: 30,
    },
    {
        id: 3,
        title: "Sentence Equivalence Test 3",
        description: "Strengthen vocabulary by analyzing subtle meaning differences.",
        estimatedTime: 50,
        status: "completed",
        score: 90,
        lastAttempted: "2024-02-22",
        progress: 100,
    },
    {
        id: 4,
        title: "Sentence Equivalence Test 4",
        description: "Work on advanced-level sentence completion challenges.",
        estimatedTime: 35,
        status: "not-started",
        progress: 0,
    },
    {
        id: 5,
        title: "Sentence Equivalence Test 5",
        description: "Test your ability to determine sentence logic using synonyms.",
        estimatedTime: 50,
        status: "in-progress",
        progress: 70,
    },
    {
        id: 6,
        title: "Sentence Equivalence Test 6",
        description: "Analyze sentence structure and choose the best word pairs.",
        estimatedTime: 40,
        status: "completed",
        score: 88,
        lastAttempted: "2024-02-18",
        progress: 100,
    },
    {
        id: 7,
        title: "Sentence Equivalence Test 7",
        description: "Develop intuition for GRE-style sentence equivalence.",
        estimatedTime: 45,
        status: "not-started",
        progress: 0,
    },
    {
        id: 8,
        title: "Sentence Equivalence Test 8",
        description: "Challenge yourself with tricky word pair selections.",
        estimatedTime: 50,
        status: "completed",
        score: 82,
        lastAttempted: "2024-02-15",
        progress: 100,
    },
    {
        id: 9,
        title: "Sentence Equivalence Test 9",
        description: "Improve contextual word understanding through practice.",
        estimatedTime: 40,
        status: "not-started",
        progress: 0,
    },
    {
        id: 10,
        title: "Sentence Equivalence Test 10",
        description: "Master word choice strategies for the GRE Verbal section.",
        estimatedTime: 50,
        status: "in-progress",
        progress: 50,
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

export default function GREsentenceEquivalenceQuestionDisplay() {
    const [SEQuestionsAfterSlicingAndAddingOptionsNAnwers, setSEQuestionsAfterSlicingAndAddingOptionsNAnwers] =
        React.useState<ExamQuestionWithOptions[]>([]);

    const handleTestSetSelect = (test: Test) => {
        const questions: ExamQuestionWithOptions[] = getSlicedQuestionsWithOptionAndAnswer(
            "Sentence Equivalence",
            test.id,
            15
        );
        setSEQuestionsAfterSlicingAndAddingOptionsNAnwers(questions);
        console.log("finalarray", SEQuestionsAfterSlicingAndAddingOptionsNAnwers)
    };


    return (
        <>
            {SEQuestionsAfterSlicingAndAddingOptionsNAnwers.length > 0 ? (
                <SentenceEquivalenceQuizDisplay
                    questions={SEQuestionsAfterSlicingAndAddingOptionsNAnwers}
                    backToDashboardAfterResults={() => { setSEQuestionsAfterSlicingAndAddingOptionsNAnwers([]); }}
                />
            ) : (
                <SelectQuestionSet
                    tests={sentenceEquivalenceTests}
                    title="GRE Sentence Equivalence"
                    description="Enhance your reading and inference skills with practice tests."
                    onTestSetSelect={handleTestSetSelect}
                />
            )}
        </>
    );
}
