"use client";

import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "@/components/mode-toggle";
import { ContactDialog } from "@/components/contact-dialog";
import { LoginDialog } from "@/components/login-dialog";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-sm border-b">
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/callflows_brand_no_claim.png"
            alt="Callflows Logo"
            width={150}
            height={30}
            priority
            className="dark:invert"
          />
        </Link>
        
        <nav className="flex items-center space-x-8">
          <Link 
            href="/produkte" 
            className="text-base font-medium text-foreground hover:text-foreground/80"
          >
            Produkte
          </Link>
          <Link 
            href="/losungen" 
            className="text-base font-medium text-foreground hover:text-foreground/80"
          >
            Lösungen
          </Link>
          <Link 
            href="/preise" 
            className="text-base font-medium text-foreground hover:text-foreground/80"
          >
            Preise
          </Link>
          <ContactDialog />
          <ModeToggle />
          <LoginDialog />
        </nav>
      </div>
    </header>
  );
}