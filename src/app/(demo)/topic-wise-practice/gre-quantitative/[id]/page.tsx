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
import QuantitativeQuestionSetDisplay from "@/components/topic-wise-practice/gre-quantitative/quant-select-set-display";
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
    "algebra": "Algebra",
    "coordinate-3d-geometry": "Coordinate & 3D Geometry",
    "data-interpretation": "Data Interpretation",
    "geometry": "Geometry",
    "number-system": "Number system",
    "percentage": "Percentage",
    "permutation-combination-probability": "Permutation & Combination and Probability",
    "probability": "Probability",
    "rate-time": "Rate & Time",
    "ratio-proportion": "Ratio & Proportion",
    "roots-exponent": "Roots & Exponent",
    "sequence-set-theory": "Sequence and Set Theory",
    "speed-time-distance": "Speed, Time, and Distance",
    "statistics": "Statistics",
};

export default function DashboardPage() {
    const pathname = usePathname();
    const id = pathname.split("/").pop();
    const topic_name = topicMapping[id || ""] || "Unknown Topic";

    const QuantitativeQuestionsTests: Test[] = [
        {
            id: 1,
            title: `${topic_name} Test 1`,
            description: "Identify words with closely related meanings",
            estimatedTime: 30,
            status: "not-started",
            progress: 0,
        },
        {
            id: 2,
            title: `${topic_name} Test 2`,
            description: "Strengthen your understanding of word relationships",
            estimatedTime: 35,
            status: "in-progress",
            progress: 40,
        },
        {
            id: 3,
            title: `${topic_name} Test 3`,
            description: "Distinguish between near-synonyms in different contexts",
            estimatedTime: 40,
            status: "completed",
            score: 90,
            lastAttempted: "2024-02-22",
            progress: 100,
        },
        {
            id: 4,
            title: `${topic_name} Test 4`,
            description: "Enhance synonym recognition and precision",
            estimatedTime: 30,
            status: "not-started",
            progress: 0,
        },
        {
            id: 5,
            title: `${topic_name} Test 5`,
            description: "Develop vocabulary flexibility with synonym matching",
            estimatedTime: 35,
            status: "in-progress",
            progress: 25,
        },
        {
            id: 6,
            title: `${topic_name} Test 6`,
            description: "Identify subtle differences in meaning among synonyms",
            estimatedTime: 40,
            status: "completed",
            score: 88,
            lastAttempted: "2024-02-18",
            progress: 100,
        },
        {
            id: 7,
            title: `${topic_name} Test 7`,
            description: "Improve contextual usage of words with similar meaning",
            estimatedTime: 30,
            status: "not-started",
            progress: 0,
        },
        {
            id: 8,
            title: `${topic_name} Test 8`,
            description: "Master word nuances through synonym practice",
            estimatedTime: 35,
            status: "in-progress",
            progress: 60,
        },
        {
            id: 9,
            title: `${topic_name} Test 9`,
            description: "Refine analytical skills in differentiating word meanings",
            estimatedTime: 40,
            status: "completed",
            score: 92,
            lastAttempted: "2024-02-15",
            progress: 100,
        },
        {
            id: 10,
            title: `${topic_name} Test 10`,
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
                    <QuantitativeQuestionSetDisplay topic_name={topic_name} displayOptions={QuantitativeQuestionsTests} />
                </>
            </PlaceholderContent>
        </ContentLayout>
    );
}
