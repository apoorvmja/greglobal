"use client"
import * as React from "react"
import SelectQuestionSet from "@/components/topic-wise-practice/SelectQuestionSet"
import examQuestionsRaw from "@/components/topic-wise-practice/exam_questions.json";
import { getSlicedQuestionsWithOptionAndAnswer } from "../getSlicedQuestions";

type TestStatus = "not-started" | "in-progress" | "completed"

interface Test {
    id: number
    title: string
    description: string
    estimatedTime: number
    status: TestStatus
    score?: number
    lastAttempted?: string
    progress: number
}

const readingComprehensionTests: Test[] = [
    {
        id: 1,
        title: "Number Properties & Integer Arithmetic",
        description: "Master fundamental concepts of number theory and integer operations",
        estimatedTime: 45,
        status: "completed",
        score: 85,
        lastAttempted: "2024-02-20",
        progress: 100,
    },
    {
        id: 2,
        title: "Algebra & Linear Equations",
        description: "Practice solving complex algebraic equations and inequalities",
        estimatedTime: 60,
        status: "in-progress",
        progress: 65,
    },
    {
        id: 3,
        title: "Geometry & Coordinate Systems",
        description: "Explore geometric principles and coordinate geometry",
        estimatedTime: 50,
        status: "not-started",
        progress: 0,
    },
    // Adding more tests to complete the set of 12
    {
        id: 4,
        title: "Functions & Graphs",
        description: "Analyze various types of functions and their graphical representations",
        estimatedTime: 55,
        status: "completed",
        score: 92,
        lastAttempted: "2024-02-18",
        progress: 100,
    },
    {
        id: 5,
        title: "Probability & Statistics",
        description: "Master probability concepts and statistical analysis",
        estimatedTime: 45,
        status: "not-started",
        progress: 0,
    },
    {
        id: 6,
        title: "Data Interpretation",
        description: "Practice analyzing complex data sets and graphs",
        estimatedTime: 40,
        status: "in-progress",
        progress: 30,
    },
    {
        id: 7,
        title: "Word Problems & Applications",
        description: "Solve real-world mathematical problems",
        estimatedTime: 50,
        status: "not-started",
        progress: 0,
    },
    {
        id: 8,
        title: "Sequences & Series",
        description: "Understanding patterns and mathematical sequences",
        estimatedTime: 45,
        status: "completed",
        score: 78,
        lastAttempted: "2024-02-15",
        progress: 100,
    },
    {
        id: 9,
        title: "Ratios & Proportions",
        description: "Master ratio relationships and proportional reasoning",
        estimatedTime: 35,
        status: "not-started",
        progress: 0,
    },
    {
        id: 10,
        title: "Permutations & Combinations",
        description: "Practice counting principles and combinatorics",
        estimatedTime: 40,
        status: "in-progress",
        progress: 45,
    },
    {
        id: 11,
        title: "Advanced Algebra",
        description: "Complex algebraic expressions and equations",
        estimatedTime: 55,
        status: "not-started",
        progress: 0,
    },
    {
        id: 12,
        title: "Quantitative Comparison",
        description: "Compare quantities and mathematical expressions",
        estimatedTime: 50,
        status: "not-started",
        progress: 0,
    },
]

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

export default function GREReadingComprehensionQuestionDisplay() {
    const [readingComprehensionQuestionsAfterSlicing, setReadingComprehensionQuestionsAfterSlicing] = React.useState<ExamQuestion[]>([]);

    const handleTestSetSelect = (test: Test) => {
        const questions = getSlicedQuestionsWithOptionAndAnswer("Reading Comprehension", test.id, 15);
        setReadingComprehensionQuestionsAfterSlicing(questions);
    };


    return (
        <SelectQuestionSet
            tests={readingComprehensionTests}
            title="GRE Reading Comprehension"
            description="Enhance your reading and inference skills with practice tests."
            onTestSetSelect={handleTestSetSelect}
        />


    )
}
