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
import TotalTestDisplay from "@/components/mock-tests-ui/TotalTestDisplay";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Shorter GRE Mock Tests - Take Free Test Today',
  description: 'AI-powered GRE full-length mock tests available online. Make your GRE prepration jouney smooth as never before, launching First even AI powered GRE Mock tests in the market.',
  keywords: ['GRE mock test', 'Free GRE mock tests', 'Shorter GRE mock tests', 'free shorter gre mock tests', 'gre practice tests', 'gregoglobal practice tests'],
  openGraph: {
    title: 'Free Shorter GRE Mock Tests - Take Free Test Today',
    description: 'AI-powered GRE full-length mock tests available online. Make your GRE prepration jouney smooth as never before, launching First even AI powered GRE Mock tests in the market.',
    url: 'https://gregoglobal.com/mock-tests',
    images: [
      {
        url: 'https://gregoglobal.com/GreGoGlobalLandingPage.webp',
        alt: 'Free Shorter GRE Mock tests',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Shorter GRE Mock Tests - Take Free Test Today',
    description: 'AI-powered GRE full-length mock tests available online. Make your GRE prepration jouney smooth as never before, launching First even AI powered GRE Mock tests in the market.',
    images: ['https://gregoglobal.com/GreGoGlobalLandingPage.webp'],
  },
  alternates: {
    canonical: 'https://gregoglobal.com/mock-tests',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CategoriesPage() {
  return (
    <ContentLayout title="Categories">
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
            <BreadcrumbPage>Mock tests</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <PlaceholderContent>
        <TotalTestDisplay />
      </PlaceholderContent>
    </ContentLayout>
  );
}
