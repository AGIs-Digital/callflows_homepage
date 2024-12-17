"use client";

import Link from "next/link";
import Image from "next/image";

export function SiteFooter() {
  return (
    <footer className="py-12 bg-background">
      <div className="container">
        <div className="flex flex-col gap-8">
          <div>
            <Link href="/" className="inline-block">
              <Image
                src="/images/callflows_brand_no_claim.png"
                alt="Callflows Logo"
                width={200}
                height={30}
                priority
                className="dark:invert"
              />
            </Link>
            <p className="mt-4 text-muted-foreground text-base">
              Einfach. Automatisch. Erfolgreich.
            </p>
          </div>
          
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="flex gap-6">
              <Link href="/datenschutz" className="text-muted-foreground hover:text-foreground">
                Datenschutz
              </Link>
              <Link href="/agb" className="text-muted-foreground hover:text-foreground">
                AGB
              </Link>
              <Link href="/impressum" className="text-muted-foreground hover:text-foreground">
                Impressum
              </Link>
            </div>
            
            <p className="text-muted-foreground">
              © 2024 Callflows. Alle Rechte vorbehalten.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}