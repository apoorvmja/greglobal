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
            title: "Similar Meaning Test 1",
            description: "Identify words with closely related meanings",
            estimatedTime: 30,
            status: "not-started",
            progress: 0,
        },
        {
            id: 2,
            title: "Similar Meaning Test 2",
            description: "Strengthen your understanding of word relationships",
            estimatedTime: 35,
            status: "in-progress",
            progress: 40,
        },
        {
            id: 3,
            title: "Similar Meaning Test 3",
            description: "Distinguish between near-synonyms in different contexts",
            estimatedTime: 40,
            status: "completed",
            score: 90,
            lastAttempted: "2024-02-22",
            progress: 100,
        },
        {
            id: 4,
            title: "Similar Meaning Test 4",
            description: "Enhance synonym recognition and precision",
            estimatedTime: 30,
            status: "not-started",
            progress: 0,
        },
        {
            id: 5,
            title: "Similar Meaning Test 5",
            description: "Develop vocabulary flexibility with synonym matching",
            estimatedTime: 35,
            status: "in-progress",
            progress: 25,
        },
        {
            id: 6,
            title: "Similar Meaning Test 6",
            description: "Identify subtle differences in meaning among synonyms",
            estimatedTime: 40,
            status: "completed",
            score: 88,
            lastAttempted: "2024-02-18",
            progress: 100,
        },
        {
            id: 7,
            title: "Similar Meaning Test 7",
            description: "Improve contextual usage of words with similar meanings",
            estimatedTime: 30,
            status: "not-started",
            progress: 0,
        },
        {
            id: 8,
            title: "Similar Meaning Test 8",
            description: "Master word nuances through synonym practice",
            estimatedTime: 35,
            status: "in-progress",
            progress: 60,
        },
        {
            id: 9,
            title: "Similar Meaning Test 9",
            description: "Refine analytical skills in differentiating word meanings",
            estimatedTime: 40,
            status: "completed",
            score: 92,
            lastAttempted: "2024-02-15",
            progress: 100,
        },
        {
            id: 10,
            title: "Similar Meaning Test 10",
            description: "Tackle challenging synonym-based questions",
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
                    <VocabularySCQuestionSetDisplay topic_name="Similar meaning" displayOptions={VocabularyQuestionsTests} />
                </>
            </PlaceholderContent>
        </ContentLayout>
    );
}
