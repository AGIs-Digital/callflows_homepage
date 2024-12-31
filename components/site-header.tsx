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
    window.location.href = "https://login.callflows.de/";
  };

  const navItems = [
    { href: "/#features", label: "Features" },
    { href: "/#testimonials", label: "Referenzen" },
    { href: "/#pricing", label: "Preise" },
  ];

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-200 ${
      isScrolled ? "bg-background/80 backdrop-blur-sm shadow-sm border-b" : "bg-transparent"
    }`}>
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
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-background border-b md:hidden">
            <nav className="container py-4 flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="nav-link block py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
          <ContactDialog />
          <ModeToggle />
          <button
            onClick={handleLoginClick}
            className="w-full text-center bg-primary text-white py-2 rounded-lg
                       hover:bg-primary/90 transition-colors"
          >
            Login
          </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}