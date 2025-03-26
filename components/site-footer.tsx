"use client";

import Link from "next/link";
import Image from "next/image";

export function SiteFooter() {
  return (
    <footer className="py-12 bg-background">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <Link href="/" className="inline-block">
            <Image
              src="/images/callflows_brand_no_claim.png"
              alt="callflows Logo"
              width={150}
              height={30}
              priority
              className="dark:invert"
            />
          </Link>

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

          <p className="text-muted-foreground whitespace-nowrap">
            © {new Date().getFullYear()} <strong className="text-primary">callflows</strong>. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
}