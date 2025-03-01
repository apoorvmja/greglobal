import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { Toaster } from "sonner";

import "./globals.css";

import { ThemeProvider } from "@/providers/theme-provider";

import {
  ClerkProvider,
} from '@clerk/nextjs'

import './globals.css'
import Script from "next/script";

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
  const GTM_ID = "AW-16486749894"

  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id=${GTM_ID}';f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `,
          }}
        />
        <body className={GeistSans.className}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Toaster />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>

  );
}
