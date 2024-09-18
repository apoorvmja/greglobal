import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";

import "./globals.css";

import { ThemeProvider } from "@/providers/theme-provider";

import {
  ClerkProvider,
} from '@clerk/nextjs'

import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NODE_ENV === 'production'
      ? 'https://gregoglobal.com'
      : `http://localhost:${process.env.PORT || 3000}`
  ),

  title: "GreGoGlobal -Practice Gre With full length mock tests",
  description:
    "Prepare for the GRE with AI-powered full-length mock tests and detailed analytics on GreGoGlobal. Boost your performance with accurate scoring, test reviews, and personalized study recommendations.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    url: "/",
    title: "GreGoGlobal -Practice Gre With full length mock tests",
    description:
      "Prepare for the GRE with AI-powered full-length mock tests and detailed analytics on GreGoGlobal. Boost your performance with accurate scoring, test reviews, and personalized study recommendations.",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "GreGoGlobal -Practice Gre With full length mock tests",
    description:
      "Prepare for the GRE with AI-powered full-length mock tests and detailed analytics on GreGoGlobal. Boost your performance with accurate scoring, test reviews, and personalized study recommendations."
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={GeistSans.className}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>

  );
}
