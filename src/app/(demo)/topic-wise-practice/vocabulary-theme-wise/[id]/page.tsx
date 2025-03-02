"use client"
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
import { usePathname } from "next/navigation";

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

const topicMapping: Record<string, string> = {
    "apna-sapna-money-money": "Apna Sapna Money-Money",
    "beautiful-mind-part-1": "Beautiful Mind Part 1",
    "beautiful-mind-part-2": "Beautiful Mind Part 2",
    "body-&-disease-part-1": "Body & Disease Part -1",
    "body-&-disease-part-2": "Body & Disease Part -II",
    "break-and-brake": "Break and Brake",
    "crime-&-punishment": "Crime and Punishment",
    "criticism-&-praise": "Criticism & Praise",
    "fifty-shades-of-joy": "Fifty Shades of Joy",
    "genesis-&-apocalypse": "Genesis & Apocalypse",
    "krodh---anger-kills": "Krodh(anger)",
    "lsd-1": "LSD 1",
    "lsd-2": "LSD 2",
    "office-office-part-1": "Office-Office 1",
    "office-office-part-2": "Office-Office 2",
    "rajneeti-1": "Rajneeti 1",
    "rajneeti-2": "Rajneeti 2",
    "religion": "Religion",
    "roti-kapda-aur-makaan": "Roti Kapda aur Makan",
    "shabd-part-1": "Shabd Part 1",
    "shabd-part-2": "Shabd Part 2",
    "size-matters": "Size Matters",
    "time-flies": "Time Flies",
    "walk-in-the-park": "Walk in the Park",
};

export default function DashboardPage() {
    const pathname = usePathname();
    const id = pathname.split("/").pop();
    const topic_name = topicMapping[id || ""] || "Unknown Topic";

    const VocabularyQuestionsTests: Test[] = [
        {
            id: 1,
            title: topic_name || "Unknown",
            description: "Identify words with closely related meanings",
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
                    <VocabularySCQuestionSetDisplay
                        topic_name={topic_name}
                        displayOptions={VocabularyQuestionsTests}
                    // numberofQuestions = {10}
                    />
                </>
            </PlaceholderContent>
        </ContentLayout>
    );
}
