"use client";
import Link from "next/link";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { PreviousResultsComponentLoggedIn } from "@/components/previous-results-logged-in";
import { PreviousResultsComponentNotLogged } from "@/components/previous-results-not-signed";
import { useUser } from "@clerk/nextjs";

export default function PostsPage() {
    const { isSignedIn } = useUser(); // Destructure isLoaded from useUser hook
    return (
        <ContentLayout title="Previous Results">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/">Home</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/dashboard">Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Results</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <>
                {isSignedIn ? <PreviousResultsComponentLoggedIn /> : <PreviousResultsComponentNotLogged />}
            </>
        </ContentLayout>
    );
}
