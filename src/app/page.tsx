import Link from "next/link";
import Image from "next/image";
import { PanelsTopLeft } from "lucide-react";
import { ArrowRightIcon, GitHubLogoIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="z-[50] sticky top-0 w-full bg-background/95 border-b backdrop-blur-sm dark:bg-black/[0.6] border-border/40">
        <div className="container h-14 flex items-center">
          <Link
            href="/"
            className="flex justify-start items-center hover:opacity-85 transition-opacity duration-300"
          >
            <PanelsTopLeft className="w-6 h-6 mr-3" />
            <span className="font-bold">MJ Study Abroad</span>
            <span className="sr-only">MJ Study Abroad</span>
          </Link>
          <nav className="ml-auto flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-8 h-8 bg-background"
              asChild
            >
              <Link href="https://chat.whatsapp.com/CHwPiz6xEpHC0WSivb2UN7">
                <img src="https://www.toeflgoglobal.com/_next/image?url=%2Fassets%2Fwhatsapp.png&w=32&q=75" className="h-[1.2rem] w-[1.2rem]" />
              </Link>
            </Button>
            <ModeToggle />
          </nav>
        </div>
      </header>
      <main className="min-h-[calc(100vh-57px-97px)] flex-1">
        <div className="container relative pb-10">
          <section className="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-6">
            <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
              Brings you world&apos;s first GRE AI mock tests
            </h1>
            <span className="max-w-[750px] text-center text-lg font-light text-foreground">
              MJ Study Abroad helps you with your exam preperation by hosting flexible 24*7 Classes all around the globe.
            </span>
            <div className="flex w-full items-center justify-center space-x-4 py-4 md:pb-6">
              <Button variant="default" asChild>
                <Link href="/dashboard">
                  Mock tests
                  <ArrowRightIcon className="ml-2" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link
                  href="https://chat.whatsapp.com/CHwPiz6xEpHC0WSivb2UN7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gap-1 flex flex-row"
                >
                  <img src="https://www.toeflgoglobal.com/_next/image?url=%2Fassets%2Fwhatsapp.png&w=32&q=75" className="h-[1.2rem] w-[1.2rem]" />
                  Join MS in US Community
                </Link>
              </Button>
            </div>
          </section>
          <div className="w-full flex justify-center relative">
            <Image
              // src="/demo-light-min.png"
              src="/GreGoGlobalLandingPage.webp"
              width={1080}
              height={608}
              alt="demo"
              priority
              className="border rounded-xl shadow-sm dark:hidden"
            />
            <Image
              // src="/demo-dark-min.png"
              src="/GreGoGlobalLandingPage.webp"
              width={1080}
              height={608}
              alt="demo-dark"
              priority
              className="border border-zinc-600 rounded-xl shadow-sm hidden dark:block dark:shadow-gray-500/5"
            />
            <Image
              src="/LandingPageMobileShow.png"
              width={228}
              height={494}
              alt="demo-mobile"
              className="border rounded-xl absolute bottom-0 right-0 hidden lg:block dark:hidden"
            />
            <Image
              src="/LandingPageMobileDark.png"
              width={228}
              height={494}
              alt="demo-mobile"
              className="border border-zinc-600 rounded-xl absolute bottom-0 right-0 hidden dark:lg:block"
            />
          </div>
        </div>
      </main>
      <footer className="py-6 md:py-0 border-t border-border/40">
        <div className="container flex flex-col items-center justify-center gap-4 md:h-24 md:flex-row">
          <p className="text-balance text-center text-sm leading-loose text-muted-foreground">
            MJ Study Abroad is official partner of{" "}
            <Link
              href="https://www.ets.org"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-4 mr-1"
            >
              ETS
            </Link>
            and{" "}
            <Link
              href="https://www.idp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-4"
            >
              iDp
            </Link>
            .
          </p>
        </div>
      </footer>
    </div>
  );
}
