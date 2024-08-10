import Link from "next/link";

export function Footer() {
  return (
    <div className="z-20 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-4 md:mx-8 flex h-14 items-center">
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
    </div>
  );
}
