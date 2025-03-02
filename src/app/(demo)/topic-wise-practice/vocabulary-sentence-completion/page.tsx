import Link from "next/link";

import PlaceholderContent from "@/components/demo/placeholder-content";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import VocabularySCQuestionSetDisplay from "@/components/topic-wise-practice/vocabulary-practice-questions/vocabulary-select-set-display";

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

export default function DashboardPage() {
    const VocabularyQuestionsTests: Test[] = [
        {
            id: 1,
            title: "Sentence Completion Test 1",
            description: "Fill in missing words to complete the passage meaningfully",
            estimatedTime: 30,
            status: "not-started",
            progress: 0,
        },
        {
            id: 2,
            title: "Sentence Completion Test 2",
            description: "Strengthen your vocabulary and contextual understanding",
            estimatedTime: 35,
            status: "in-progress",
            progress: 40,
        },
        {
            id: 3,
            title: "Sentence Completion Test 3",
            description: "Practice multi-blank sentence completion questions",
            estimatedTime: 40,
            status: "completed",
            score: 90,
            lastAttempted: "2024-02-22",
            progress: 100,
        },
        {
            id: 4,
            title: "Sentence Completion Test 4",
            description: "Enhance logical consistency in sentence completion",
            estimatedTime: 30,
            status: "not-started",
            progress: 0,
        },
        {
            id: 5,
            title: "Sentence Completion Test 5",
            description: "Develop advanced inferencing skills in blank-filling exercises",
            estimatedTime: 35,
            status: "in-progress",
            progress: 25,
        },
        {
            id: 6,
            title: "Sentence Completion Test 6",
            description: "Understand complex sentence structures through completion tasks",
            estimatedTime: 40,
            status: "completed",
            score: 88,
            lastAttempted: "2024-02-18",
            progress: 100,
        },
        {
            id: 7,
            title: "Sentence Completion Test 7",
            description: "Improve word selection accuracy based on passage tone",
            estimatedTime: 30,
            status: "not-started",
            progress: 0,
        },
        {
            id: 8,
            title: "Sentence Completion Test 8",
            description: "Master nuances of sentence meaning through strategic blank-filling",
            estimatedTime: 35,
            status: "in-progress",
            progress: 60,
        },
        {
            id: 9,
            title: "Sentence Completion Test 9",
            description: "Refine analytical thinking with multi-blank completion exercises",
            estimatedTime: 40,
            status: "completed",
            score: 92,
            lastAttempted: "2024-02-15",
            progress: 100,
        },
        {
            id: 10,
            title: "Sentence Completion Test 10",
            description: "Tackle challenging vocabulary-based sentence completion",
            estimatedTime: 30,
            status: "not-started",
            progress: 0,
        },
    ];
    return (
        <ContentLayout title="Dashboard">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/">Home</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Dashboard</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <PlaceholderContent>
                <>
                    <VocabularySCQuestionSetDisplay topic_name="sentence completion" displayOptions={VocabularyQuestionsTests} />
                </>
            </PlaceholderContent>
        </ContentLayout>
    );
}
