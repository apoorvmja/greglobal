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
import { useSearchParams } from "next/navigation";


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
    "coordinate-3d-geometry": "Coordinate geometry",
    "data-interpretation": "Data Interpretation",
    "geometry": "Geometry",
    "number-system": "Number system",
    "percentage": "Percentage",
    "permutation-combination-probability": "Permutation & Combination and Probability",
    "probability": "probability",
    "rate-time": "Rate & Time",
    "ratio-proportion": "Ratio & Proportion",
    "roots-exponent": "Roots & Exponents",
    "sequence-set-theory": "Sequences & set theory",
    "speed-time-distance": "Speed, Time, and Distance",
    "statistics": "Statistics",
};

export default function DashboardPage() {
    const pathname = usePathname();
    const id = pathname.split("/").pop();
    const topic_name = topicMapping[id || ""] || "Unknown Topic";
    const searchParams = useSearchParams();
    const NumberOfAvailableTests = Number(searchParams.get("tests"));

    const QuantitativeQuestionsTests: Test[] = [
        {
            id: 1,
            title: `${topic_name} Test 1`,
            description: "Practice fundamental concepts and problem-solving techniques.",
            estimatedTime: 30,
            status: "not-started",
            progress: 0,
        },
        {
            id: 2,
            title: `${topic_name} Test 2`,
            description: "Apply logical reasoning and quantitative strategies.",
            estimatedTime: 35,
            status: "in-progress",
            progress: 40,
        },
        {
            id: 3,
            title: `${topic_name} Test 3`,
            description: "Analyze data and interpret numerical relationships.",
            estimatedTime: 40,
            status: "completed",
            score: 90,
            lastAttempted: "2024-02-22",
            progress: 100,
        },
        {
            id: 4,
            title: `${topic_name} Test 4`,
            description: "Enhance problem-solving speed and accuracy.",
            estimatedTime: 30,
            status: "not-started",
            progress: 0,
        },
        {
            id: 5,
            title: `${topic_name} Test 5`,
            description: "Strengthen numerical computation and estimation skills.",
            estimatedTime: 35,
            status: "in-progress",
            progress: 25,
        },
        {
            id: 6,
            title: `${topic_name} Test 6`,
            description: "Solve complex word problems with multiple steps.",
            estimatedTime: 40,
            status: "completed",
            score: 88,
            lastAttempted: "2024-02-18",
            progress: 100,
        },
        {
            id: 7,
            title: `${topic_name} Test 7`,
            description: "Master various GRE question types through practice.",
            estimatedTime: 30,
            status: "not-started",
            progress: 0,
        },
        {
            id: 8,
            title: `${topic_name} Test 8`,
            description: "Develop efficient strategies for GRE quantitative questions.",
            estimatedTime: 35,
            status: "in-progress",
            progress: 60,
        },
        {
            id: 9,
            title: `${topic_name} Test 9`,
            description: "Work on time management for solving complex problems.",
            estimatedTime: 40,
            status: "completed",
            score: 92,
            lastAttempted: "2024-02-15",
            progress: 100,
        },
        {
            id: 10,
            title: `${topic_name} Test 10`,
            description: "Tackle challenging GRE quantitative reasoning problems.",
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
                    <QuantitativeQuestionSetDisplay topic_name={topic_name} displayOptions={QuantitativeQuestionsTests.slice(0, NumberOfAvailableTests)} />
                </>
            </PlaceholderContent>
        </ContentLayout>
    );
}
