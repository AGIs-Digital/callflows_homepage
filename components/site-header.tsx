"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MainNav } from "@/components/main-nav";
import { MobileNav } from "@/components/mobile-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { CalEmbed } from "@/components/booking/cal-embed";
import Image from "next/image";

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    // Initial-Check durchführen
    handleScroll();
    
    // Event-Listener mit passiver Option für bessere Performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <header className={cn(
      "fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-200",
      isScrolled ? "shadow-sm" : ""
    )}>
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Image
            src="/images/callflows_brand_no_claim.png"
            alt="callflows Logo"
            width={150}
            height={40}
            className="dark:invert"
            priority
          />
        </Link>
        <MainNav className="hidden md:flex" />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <ThemeToggle />
            <CalEmbed 
              buttonText="Beratungstermin" 
              className="hidden md:flex"
              variant="outline"
              size="sm"
            />
          </nav>
        </div>
        <MobileNav />
      </div>
    </header>
  );
}