"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function AboutSection() {
  return (
    <section className="py-24 bg-white dark:bg-background">
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
                deutschsprachigen Marktes zugeschnitten sind.
              </p>
              <p className="text-lg text-muted-foreground">
                Unser Ziel: Unkomplizierter Zugang zu Technologien zu schaffen, um mehr Zeit für Ihre Kernaufgaben zu gewinnen. 
              </p>
            </div>
            
            <div className="pt-6">
              <Button 
                className="group"
                variant="outline"
              >
                Mehr über uns
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
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