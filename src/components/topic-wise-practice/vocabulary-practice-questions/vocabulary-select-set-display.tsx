"use client";

import * as React from "react";
import SelectQuestionSet from "@/components/topic-wise-practice/SelectQuestionSet";
import { getSlicedQuestionsWithOptionAndAnswer } from "../getSlicedQuestions";
import { VocabularyBlankDisplay } from "./vocabulary-blank-display";

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

export default function VocabularyQuestionSetDisplay({ topic_name, displayOptions = [], numberofQuestions }: { topic_name: string, displayOptions: Test[], numberofQuestions: number }) {
    const [VocabQuestionsAfterSlicingAndAddingOptionsNAnwers, setVocabQuestionsAfterSlicingAndAddingOptionsNAnwers] =
        React.useState<ExamQuestionWithOptions[]>([]);

    const handleTestSetSelect = (test: Test) => {
        const questions: ExamQuestionWithOptions[] = getSlicedQuestionsWithOptionAndAnswer(
            topic_name,
            test.id,
            numberofQuestions
        );
        setVocabQuestionsAfterSlicingAndAddingOptionsNAnwers(questions);
        console.log("finalarray", VocabQuestionsAfterSlicingAndAddingOptionsNAnwers)
    };

    return (
        <>
            {VocabQuestionsAfterSlicingAndAddingOptionsNAnwers.length > 0 ? (
                <VocabularyBlankDisplay
                    questions={VocabQuestionsAfterSlicingAndAddingOptionsNAnwers}
                    backToDashboardAfterResults={() => { setVocabQuestionsAfterSlicingAndAddingOptionsNAnwers([]); }}
                />
            ) : (
                <SelectQuestionSet
                    tests={displayOptions}
                    title={`Voacabulary ${topic_name}`}
                    description="Enhance your reading and inference skills with practice tests."
                    onTestSetSelect={handleTestSetSelect}
                />
            )}
        </>
    );
}
