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
import MarketingSection from "@/components/dashboard-ui/MarketingSection";

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GRE Score Dashboard & Analytics | Personalized GRE Test Insights – GREGoGlobal',
  description: 'Access your personalized GRE score dashboard on GREGoGlobal. Get detailed analytics, performance breakdowns, and insights to improve your GRE score with AI-powered test feedback.',
  keywords: ['GRE score dashboard', 'GRE analytics', 'personalized GRE insights', 'GRE test performance', 'AI-powered GRE feedback'],
  openGraph: {
    title: 'GRE Score Dashboard & Analytics | Personalized GRE Test Insights',
    description: 'Get detailed GRE analytics and personalized test insights on GREGoGlobal. Track your performance and improve your score with AI-powered feedback.',
    url: 'https://gregoglobal.com/dashboard',
    images: [
      {
        url: 'https://gregoglobal.com/static/dashboard.png',
        alt: 'GRE Dashboard Analytics',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GRE Score Dashboard & Analytics | Personalized GRE Test Insights',
    description: 'Track your GRE test performance with detailed analytics and AI-powered feedback on GREGoGlobal.',
    images: ['https://gregoglobal.com/static/dashboard.png'],
  },
  alternates: {
    canonical: 'https://gregoglobal.com/dashboard',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function DashboardPage() {
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
        <MarketingSection />
      </PlaceholderContent>
    </ContentLayout>
  );
}
