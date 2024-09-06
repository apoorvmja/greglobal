// app/layout.tsx
import { Metadata } from 'next';
import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout"; // Just a component for layout, no admin focus

export const metadata: Metadata = {
  title: 'AI-Powered Full-Length GRE Mock Tests - Take Free Test Today',
  description: 'Experience the first AI-powered GRE full-length mock tests available online. Our unique platform offers students a real GRE test experience with advanced analytics.',
  keywords: ['AI-powered GRE mock tests', 'full-length GRE tests', 'GRE practice tests', 'GRE preparation', 'online GRE mock exams', 'AI GRE test analytics'],
  openGraph: {
    title: 'AI-Powered Full-Length GRE Mock Tests',
    description: 'Take the first-ever AI-powered full-length GRE mock tests. Enhance your GRE preparation with realistic test simulations and personalized analytics.',
    url: 'https://gregoglobal.com',
    images: [
      {
        url: 'https://gregoglobal.com/GreGoGlobalLandingPage.webp',
        alt: 'AI-powered GRE Mock Test',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI-Powered Full-Length GRE Mock Tests',
    description: 'Take advantage of our AI-powered GRE mock tests for a comprehensive GRE test preparation experience.',
    images: ['https://gregoglobal.com/GreGoGlobalLandingPage.webp'],
  },
  alternates: {
    canonical: 'https://gregoglobal.com',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function DemoLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AdminPanelLayout>
        {children}
      </AdminPanelLayout>

      <script type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: `
            {
              "@context": "https://schema.org",
              "@type": "EducationalApplication",
              "name": "AI-Powered GRE Mock Tests",
              "url": "https://yourwebsite.com",
              "description": "Take AI-powered full-length GRE mock tests with real-time analytics and personalized feedback.",
              "applicationCategory": "Education",
              "operatingSystem": "All",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
                "eligibleRegion": {
                  "@type": "Country",
                  "name": "United States"
                }
              }
            }
          `
        }}
      />
    </>
  );
}
