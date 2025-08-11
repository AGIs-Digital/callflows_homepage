"use client";

import Image from "next/image";
import { useI18n } from "@/lib/i18n";

type TeamMember = {
  name: string;
  role: string;
  imgSrc?: string;
  quote?: string;
};

export function TeamQuotesSection() {
  const { t } = useI18n();

  const defaultRole = t("about.teamDefaultRole");
  const defaultQuote = t("about.teamDefaultQuote");

  // Manuell gepflegte Teamliste (keine DB notwendig)
  const team: TeamMember[] = [
    { name: "Marvin Grubbe", role: defaultRole, quote: defaultQuote, imgSrc: "/images/placeholder-avatar-1.webp" },
    { name: "Jamin Afram", role: defaultRole, quote: defaultQuote, imgSrc: "/images/placeholder-avatar-2.webp" },
    { name: "Pascal Stary", role: defaultRole, quote: defaultQuote, imgSrc: "/images/placeholder-avatar-3.webp" },
    { name: "Tom Günther", role: defaultRole, quote: defaultQuote, imgSrc: "/images/placeholder-avatar-4.webp" },
    { name: "Jan Kastning", role: defaultRole, quote: defaultQuote, imgSrc: "/images/placeholder-avatar-5.webp" },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-secondary/30 via-secondary/90 to-primary/10">
      <div className="container max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-10">{t("about.teamQuotesTitle")}</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {team.map((m, idx) => (
            <div key={idx} className="rounded-2xl border bg-card/60 p-6">
              <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-lg overflow-hidden border bg-muted mx-auto">
                {m.imgSrc ? (
                  <Image src={m.imgSrc} alt={m.name} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10" />
                )}
              </div>
              <div className="relative">
                <div className="absolute -top-2 -left-2 text-4xl text-primary/30 select-none">“</div>
                <blockquote className="mt-4 text-sm text-muted-foreground leading-relaxed px-2">{m.quote}</blockquote>
                <div className="absolute -bottom-2 -right-2 text-4xl text-primary/30 select-none">”</div>
              </div>
              <div className="mt-3 text-sm font-semibold text-foreground">{m.name}</div>
              <div className="text-xs text-muted-foreground">{m.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}