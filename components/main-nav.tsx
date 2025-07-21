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
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      <Link
        href="/"
        title="Zur callflows Startseite - KI-Telefonie & Voice Agents"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/" ? "text-primary" : "text-foreground/60"
        )}
      >
        {t('nav.home')}
      </Link>
      <Link
        href="/pricing"
        title="Preise und Pakete für KI-Telefonie anzeigen"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/pricing" ? "text-primary" : "text-foreground/60"
        )}
      >
        {t('nav.pricing')}
      </Link>
      <Link
        href="/blog"
        title="Blog über KI-Telefonie und Voice Agents lesen"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname.startsWith("/blog") ? "text-primary" : "text-foreground/60"
        )}
      >
        {t('nav.blog')}
      </Link>
      <Link
        href="/#about"
        title="Über callflows und unser Team erfahren"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/#about" ? "text-primary" : "text-foreground/60"
        )}
      >
        {t('nav.about')}
      </Link>
      <Link
        href="/kontakt"
        title="Kontakt zu callflows aufnehmen"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/kontakt" ? "text-primary" : "text-foreground/60"
        )}
      >
        {t('nav.contact')}
      </Link>
    </nav>
  );
} 