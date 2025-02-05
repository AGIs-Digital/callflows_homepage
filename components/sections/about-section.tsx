"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function AboutSection() {
  return (
    <section className="py-24 bg-section-light-blue dark:bg-[#F5F0FF]/5">
      <div className="container max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Linke Spalte - Text */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-primary dark:text-white">
              Über callflows
            </h2>
            <div className="space-y-4">
              <p className="text-lg text-muted-foreground">
                Callflows wurde 2024 mit der Vision gegründet, die Kommunikation zwischen 
                Unternehmen und Kunden durch KI-gestützte Lösungen zu revolutionieren.
              </p>
              <p className="text-lg text-muted-foreground">
                Als Pioniere im Bereich der KI-gestützten Sprachkommunikation entwickeln 
                wir innovative Lösungen, die speziell auf die Bedürfnisse des 
                deutschsprachigen Marktes zugeschnitten sind. Unsere Expertise geht dabei 
                weit über Telefonie hinaus: Wir analysieren, optimieren und automatisieren 
                Ihre Geschäftsprozesse für maximale Effizienz.
              </p>
              <p className="text-lg text-muted-foreground">
                Unser Ziel: Unkompliziert Zugang zu Technologien schaffen, um mehr Zeit für  Kernaufgaben zu gewinnen. 
              </p>
            </div>
            
          </div>

          {/* Rechte Spalte - Bilder & Stats */}
          <div className="space-y-8">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
              <Image
                src="/images/team.jpg"
                alt="Die callflows Gründer"
                fill
                className="object-cover"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-2">
                <div className="text-4xl font-bold text-primary">10+ Jahre</div>
                <div className="text-sm text-muted-foreground">
                  Expertise in Vertrieb, Marketing, und Unternehmenskommunikation
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-primary">Seit 2023</div>
                <div className="text-sm text-muted-foreground">
                  Erfahrungen im Launch und Betrieb von Projekten mit künstlicher Intelligenz
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 