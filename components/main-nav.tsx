"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";

interface MainNavProps {
  className?: string;
}

export function MainNav({ className }: MainNavProps) {
  const pathname = usePathname();
  const { t } = useI18n();

  return (
    <nav 
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      aria-label="Hauptnavigation"
      role="navigation"
    >
      <Link
        href="/"
        title="Zur callflows Startseite – KI‑callflows für Unternehmen"
        aria-current={pathname === "/" ? "page" : undefined}
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm px-2 py-1",
          pathname === "/" ? "text-primary" : "text-foreground/60"
        )}
      >
        {t('nav.home')}
      </Link>
      <Link
        href="/pricing"
        title="Preise für KI‑callflows anzeigen"
        aria-current={pathname === "/pricing" ? "page" : undefined}
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm px-2 py-1",
          pathname === "/pricing" ? "text-primary" : "text-foreground/60"
        )}
      >
        {t('nav.pricing')}
      </Link>
      <Link
        href="/blog"
        title="Blog über KI‑callflows und Voice Agents lesen"
        aria-current={pathname.startsWith("/blog") ? "page" : undefined}
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm px-2 py-1",
          pathname.startsWith("/blog") ? "text-primary" : "text-foreground/60"
        )}
      >
        {t('nav.blog')}
      </Link>
      <Link
        href="/about"
        title="Über callflows und unser Team erfahren"
        aria-current={pathname === "/about" ? "page" : undefined}
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm px-2 py-1",
          pathname === "/about" ? "text-primary" : "text-foreground/60"
        )}
      >
        {t('nav.about')}
      </Link>
      <Link
        href="/kontakt"
        title="Kontakt zu callflows aufnehmen"
        aria-current={pathname === "/kontakt" ? "page" : undefined}
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm px-2 py-1",
          pathname === "/kontakt" ? "text-primary" : "text-foreground/60"
        )}
      >
        {t('nav.contact')}
      </Link>
    </nav>
  );
} 