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
  
  const highlightCallflows = (text: string) => {
    return text.replace(/callflows/gi, '<strong class="text-primary">callflows</strong>');
  };

  // Manuell gepflegte Teamliste mit individuellen Rollen und Quotes
  const team: TeamMember[] = [

    { 
      name: "Pascal Stary", 
      role: t("about.teamMembers.pascal.role"), 
      quote: t("about.teamMembers.pascal.quote"), 
      imgSrc: "/images/pascalstary.webp" 
    },
    { 
      name: "Jamin Afram", 
      role: t("about.teamMembers.jamin.role"), 
      quote: t("about.teamMembers.jamin.quote"), 
      imgSrc: "/images/jaminafram.webp" 
    },
    { 
      name: "Tom Günther", 
      role: t("about.teamMembers.tom.role"), 
      quote: t("about.teamMembers.tom.quote"), 
      imgSrc: "/images/tomguenther.webp" 
    },
    { 
      name: "Marvin Grubbe", 
      role: t("about.teamMembers.marvin.role"), 
      quote: t("about.teamMembers.marvin.quote"), 
      imgSrc: "/images/marvingrubbe.webp" 
    },
    { 
      name: "Jan Kastning", 
      role: t("about.teamMembers.jan.role"), 
      quote: t("about.teamMembers.jan.quote"), 
      imgSrc: "/images/jankastning.webp"
    },
    { 
      name: t("about.teamMembers.joinUs.name"), 
      role: t("about.teamMembers.joinUs.role"), 
      quote: t("about.teamMembers.joinUs.quote")
      // Kein imgSrc - verwendet automatisch die geschlechtsneutrale Silhouette
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-secondary/30 via-secondary/90 to-primary/10">
      <div className="container max-w-6xl">
        <div className="text-center mb-10">
          <h2 
            className="text-3xl md:text-4xl font-bold text-foreground mb-3"
            dangerouslySetInnerHTML={{ __html: highlightCallflows(t("about.teamQuotesTitle")) }}
          />
          <p className="text-lg text-muted-foreground">{t("about.teamQuotesSubtitle")}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {team.map((m, idx) => (
            <div key={idx} className="rounded-2xl border bg-card/60 p-6">
              <div className="relative w-36 h-36 md:w-40 md:h-40 rounded-lg overflow-hidden border bg-muted mx-auto">
                {m.imgSrc ? (
                  <Image src={m.imgSrc} alt={m.name} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                    {/* Einfache, elegante Silhouette */}
                    <div className="w-20 h-20 rounded-full bg-primary/30 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-primary/50 flex items-center justify-center">
                        <div className="w-6 h-6 rounded-full bg-primary/70"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="relative">
                <div className="absolute -top-2 -left-2 text-4xl text-primary/30 select-none">"</div>
                <blockquote 
                  className="mt-4 text-sm text-muted-foreground leading-relaxed px-2"
                  dangerouslySetInnerHTML={{ __html: highlightCallflows(m.quote || '') }}
                />
                <div className="absolute -bottom-2 -right-2 text-4xl text-primary/30 select-none">"</div>
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