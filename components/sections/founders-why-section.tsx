"use client";

import Image from "next/image";
import { useI18n } from "@/lib/i18n";

export function FoundersWhySection() {
  const { t } = useI18n();

  const founders: Array<{ name: string; role: string; imgSrc?: string; quoteKey: string }> = [
    { name: "Timo Goltz", role: "Co‑Founder", imgSrc: "/images/timogoltz.webp", quoteKey: "about.whyTimo" },
    { name: "Tom Niclas Abeln", role: "Co‑Founder", imgSrc: "/images/tomniclasabeln.webp", quoteKey: "about.whyTom" },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-accent/20 via-primary/20 to-secondary/30">
      <div className="container max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-10">{t("about.whyTitle")}</h2>

        <div className="space-y-8">
          {founders.map((f, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 rounded-2xl border bg-card/60 backdrop-blur p-4 sm:p-6">
              {/* Portrait - Mobile optimiert */}
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-xl overflow-hidden border bg-muted flex-shrink-0">
                {f.imgSrc ? (
                  <Image src={f.imgSrc} alt={f.name} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20" />
                )}
              </div>

              {/* Quote - Mobile optimiert */}
              <div className="relative flex-1 w-full">
                <div className="absolute -top-2 sm:-top-4 -left-1 sm:-left-2 text-4xl sm:text-6xl text-primary/30 select-none">"</div>
                <blockquote className="text-base sm:text-lg text-muted-foreground leading-relaxed pr-4 sm:pr-6 pt-4 sm:pt-0 text-center sm:text-left">
                  {t(f.quoteKey)}
                </blockquote>
                <div className="absolute -bottom-2 sm:-bottom-4 -right-1 sm:-right-2 text-4xl sm:text-6xl text-primary/30 select-none">"</div>
                <div className="mt-4 sm:mt-6 text-sm text-foreground font-semibold text-center sm:text-left">
                  {f.name} · {f.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


