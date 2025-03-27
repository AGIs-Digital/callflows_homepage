"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "@/components/mode-toggle";
import { ContactDialog } from "@/components/contact-dialog";
import { Menu, X } from "lucide-react";

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLoginClick = () => {
    window.location.href = "https://app.callflows.de/";
  };

  const navItems = [
    { href: "/#pricecomparison", label: "Vergleich" },
    { href: "/#faq", label: "FAQ" },
    { href: "/pricing", label: "Preise" },
  ];

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled ? "bg-background/80 backdrop-blur-sm shadow-sm border-b" : "bg-transparent"
      }`}
      style={{ zIndex: 200 }}
    >
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/callflows_brand_no_claim.png"
            alt="callflows Logo"
            width={150}
            height={30}
            priority
            className="dark:invert"
          />
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="nav-link"
            >
              {item.label}
            </a>
          ))}
          <ContactDialog />
          <ModeToggle />
          <button
            onClick={handleLoginClick}
            className="shiny-button group"
          >
            <span className="relative z-10 flex items-center">
              Login
              <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
            </span>
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 hover:bg-muted/50 rounded-lg transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[80px] bg-background/95 backdrop-blur-sm md:hidden" style={{ zIndex: 200 }}>
          <nav className="container py-6">
            <div className="space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="flex items-center w-full px-4 py-3 text-lg font-medium hover:bg-muted/50 rounded-lg transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
            
            <div className="mt-6 pt-6 border-t space-y-4">
              <div className="px-4">
                <ContactDialog />
              </div>
              
              <div className="flex items-center justify-between px-4">
                <ModeToggle />
              </div>
              
              <div className="px-4">
                <button
                  onClick={handleLoginClick}
                  className="w-full bg-primary text-white px-6 py-3 rounded-lg
                           font-medium hover:bg-primary/90 transition-colors"
                >
                  Login
                </button>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}