"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { MobileNav } from "@/components/mobile-nav";
import Image from "next/image";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-8">
          <Image
            src="/images/callflows_brand_no_claim.png"
            alt="callflows Logo"
            width={150}
            height={40}
            className="dark:invert"
          />
        </Link>
        <nav className="hidden md:flex flex-1 items-center space-x-6 text-sm font-medium">
          <Link
            href="/"
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname === "/" ? "text-foreground" : "text-foreground/60"
            )}
          >
            Home
          </Link>
          <Link
            href="/pricing"
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname === "/pricing" ? "text-foreground" : "text-foreground/60"
            )}
          >
            Preise
          </Link>
          <Link
            href="/blog"
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname.startsWith("/blog") ? "text-foreground" : "text-foreground/60"
            )}
          >
            Blog
          </Link>
          <Link
            href="/#about"
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname === "/#about" ? "text-foreground" : "text-foreground/60"
            )}
          >
            Über uns
          </Link>
        </nav>
        <div className="hidden md:flex items-center space-x-4 ml-auto">
          <ModeToggle />
          <Link href="/kontakt">
            <Button>Kontakt</Button>
          </Link>
          <Link href="/login">
            <Button variant="outline" className="bg-primary text-[#ffb703]">
              Login
            </Button>
          </Link>
        </div>
        <div className="md:hidden ml-auto flex items-center gap-4">
          <ModeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}