"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Linkedin, Twitter } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="py-12 bg-background border-t">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Spalte 1: Logo und Kurzbeschreibung */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Image
                src="/images/callflows_brand_no_claim.png"
                alt="callflows Logo"
                width={120}
                height={30}
                className="dark:invert"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              KI-gestützte Voice Agents für automatisierte Kundenkommunikation. Wir revolutionieren die Art, wie Unternehmen telefonieren.
            </p>
            <div className="flex space-x-4">
              <a href="https://twitter.com/callflowsAI" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                <Twitter size={20} />
              </a>
              <a href="https://www.linkedin.com/company/callflows" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                <Linkedin size={20} />
              </a>
              <a href="https://www.facebook.com/callflowsAI" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                <Facebook size={20} />
              </a>
            </div>
          </div>
          
          {/* Spalte 2: Produkt */}
          <div>
            <h3 className="font-medium mb-4">Produkt</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/pricing" className="text-sm text-muted-foreground hover:text-primary">
                  Preise
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-muted-foreground hover:text-primary">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/blog/ki-telefonie-grundlagen" className="text-sm text-muted-foreground hover:text-primary">
                  KI-Telefonie Grundlagen
                </Link>
              </li>
              <li>
                <Link href="/blog/voice-agents-vs-chatbots" className="text-sm text-muted-foreground hover:text-primary">
                  Voice Agents vs. Chatbots
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Spalte 3: Unternehmen */}
          <div>
            <h3 className="font-medium mb-4">Unternehmen</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/#about" className="text-sm text-muted-foreground hover:text-primary">
                  Über uns
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-muted-foreground hover:text-primary">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="text-sm text-muted-foreground hover:text-primary">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Spalte 4: Rechtliches */}
          <div>
            <h3 className="font-medium mb-4">Rechtliches</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/impressum" className="text-sm text-muted-foreground hover:text-primary">
                  Impressum
                </Link>
              </li>
              <li>
                <Link href="/datenschutz" className="text-sm text-muted-foreground hover:text-primary">
                  Datenschutz
                </Link>
              </li>
              <li>
                <Link href="/agb" className="text-sm text-muted-foreground hover:text-primary">
                  AGB
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} <strong className="text-primary">callflows</strong>. Alle Rechte vorbehalten. | Adalbert-Stifter Straße 14, 30655 Hannover | Tel: +49-155-60106486
          </p>
        </div>
      </div>
    </footer>
  );
}