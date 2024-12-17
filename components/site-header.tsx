"use client";

import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "@/components/mode-toggle";
import { ContactDialog } from "@/components/contact-dialog";

export function SiteHeader() {
  const handleLoginClick = () => {
    window.location.href = "https://login.callflows.de/";
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-sm border-b">
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/callflows_brand_no_claim.png"
            alt="Callflows Logo"
            width={150}
            height={30}
            priority
            className="dark:invert"
          />
        </Link>
        
        <nav className="flex items-center space-x-8">
          <a 
            href="#features" 
            className="nav-link"
          >
            Features
          </a>
          <a 
            href="#testimonials" 
            className="nav-link"
          >
            Referenzen
          </a>
          <a 
            href="#pricing" 
            className="nav-link"
          >
            Preise
          </a>
          <ContactDialog />
          <ModeToggle />
          <button
            onClick={handleLoginClick}
            className="shiny-button"
          >
            Login
          </button>
        </nav>
      </div>
    </header>
  );
}