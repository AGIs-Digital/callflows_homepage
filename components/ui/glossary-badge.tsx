"use client";

import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";

type GlossaryBadgeProps = {
  href?: string;
  className?: string;
};

export function GlossaryBadge({ href = "/glossar/ki-callflow", className }: GlossaryBadgeProps) {
  const { t } = useI18n();

  return (
    <HoverCard openDelay={120} closeDelay={100}>
      <HoverCardTrigger asChild>
        <Link href={href}>
          <Badge
            variant="secondary"
            className={`${className} transition-transform hover:scale-105 cursor-pointer`}
          >
            KI‑callflow
          </Badge>
        </Link>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="text-sm text-muted-foreground mb-3 space-y-1">
          <div className="font-medium text-foreground">{t("glossary.kiCallflow.title")}</div>
          <div>• {t("glossary.kiCallflow.l1")}</div>
          <div>• {t("glossary.kiCallflow.l2")}</div>
          <div className="italic">{t("glossary.kiCallflow.l3")}</div>
        </div>
        <Link href={href} className="text-sm font-medium text-primary underline underline-offset-4">
          {t("glossary.readMore")}
        </Link>
      </HoverCardContent>
    </HoverCard>
  );
}


