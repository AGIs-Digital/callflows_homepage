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
            <div key={idx} className="flex items-start gap-6 rounded-2xl border bg-card/60 backdrop-blur p-6">
              {/* Portrait (klein) */}
              <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-xl overflow-hidden border bg-muted flex-shrink-0">
                {f.imgSrc ? (
                  <Image src={f.imgSrc} alt={f.name} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20" />
                )}
              </div>

              {/* Quote */}
              <div className="relative flex-1">
                <div className="absolute -top-4 -left-2 text-6xl text-primary/30 select-none">“</div>
                <blockquote className="text-lg text-muted-foreground leading-relaxed pr-6">
                  {t(f.quoteKey)}
                </blockquote>
                <div className="absolute -bottom-4 -right-2 text-6xl text-primary/30 select-none">”</div>
                <div className="mt-6 text-sm text-foreground font-semibold">{f.name} · {f.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


