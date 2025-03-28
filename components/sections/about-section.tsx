"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";

export function AboutSection() {
  return (
    <section className="py-24 bg-section-light-blue dark:bg-[#F5F0FF]/5">
      <div className="container max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Linke Spalte - Überschrift, Text und Bild */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-primary dark:text-white">
              Über <strong className="text-primary">callflows</strong>
            </h2>
            
            <div className="space-y-4">
              <p className="text-lg text-muted-foreground">
                Wir sind davon überzeugt: KI wird die Art verändern, wie Unternehmen mit ihren Kunden sprechen.
                Aber nicht irgendwann – sondern jetzt.
              </p>
              <p className="text-lg text-muted-foreground">
                <strong className="text-primary">callflows</strong> hilft Unternehmen dabei, diesen Wandel zu gestalten – nicht blindlings, sondern mit Struktur, Erfahrung und echter Partnerschaft.
                Unsere AI Voice Agents übernehmen Gespräche, verstehen Anliegen, buchen Termine, erkennen Chancen – und integrieren sich in bestehende Systeme, als wären sie schon immer da gewesen.
              </p>
              <p className="text-lg text-muted-foreground">
                Wir wissen: Diese Technologie ist neu. Sie ist mächtig – aber sie ist kein Selbstläufer.
                Deshalb lassen wir unsere Kunden nicht mit einem "KI-Tool" allein.
              </p>
            </div>
            
            {/* Bild nach dem Text */}
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden mt-6 max-w-md">
              <Image
                src="/images/team.jpg"
                alt="Die callflows Gründer"
                fill
                loading="lazy"
                className="object-cover"
              />
            </div>
          </div>

          {/* Rechte Spalte - Mission & Features */}
          <div className="space-y-8">
            {/* Unsere Mission zuerst */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-primary dark:text-white mb-4">
                Unsere Mission:
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">👉</span>
                  <span className="text-muted-foreground">KI greifbar machen.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">👉</span>
                  <span className="text-muted-foreground">Kundenkontakt automatisieren – ohne Qualität zu verlieren.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">👉</span>
                  <span className="text-muted-foreground">Unternehmen dabei helfen, schneller, schlanker und gleichzeitig menschlicher zu kommunizieren.</span>
                </li>
              </ul>
            </div>
            
            {/* Was uns besonders macht danach */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-primary dark:text-white mb-4">
                Was uns besonders macht:
              </h3>
              <p className="text-muted-foreground mb-4">
                Wir begleiten von Anfang an. Wir hören zu. Wir bauen mit Ihnen gemeinsam eine Lösung, die wirklich zu Ihrem Unternehmen passt.
              </p>
              
              <ul className="space-y-3 mt-4">
                {[
                  "Individuelle Prozessmodellierung",
                  "Persönliches Prompting & Finetuning",
                  "Transparente Minutenabrechnung ohne versteckte Kosten",
                  "Unbegrenzte Anzahl an Agents",
                  "Regelmäßige Check-ins zur Optimierung",
                  "Setup, Support und Telefonnummer inklusive"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check size={18} className="text-primary mt-1 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
                <p className="text-sm text-muted-foreground font-medium">
                  <strong className="text-primary">callflows</strong> ist keine Software – sondern ein Team.
                  Mit Hintergrund in Vertrieb, Marketing & Automatisierung.
                  Mit echtem Interesse an Ihrem Erfolg.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 