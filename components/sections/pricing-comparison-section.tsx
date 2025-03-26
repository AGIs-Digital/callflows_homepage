"use client";

import { Building2, Bot, Users, Clock, Coins, Gauge, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getCalApi } from "@calcom/embed-react";
import { ArrowRight } from "lucide-react";

export function PricingComparisonSection() {
  return (
    <section className="py-24 bg-section-light-blue dark:bg-[#F5F0FF]/5">
      <div className="container max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary dark:text-white mb-6">
          KI Voice Agents für den deutschsprachigen Raum
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            <p className="text-xl text-muted-foreground">
              Die Geschäftskommunikation entwickelt sich stetig weiter: Von klassischen Lösungen 
              zu modernen, KI-gestützten Systemen.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Inhouse */}
          <div className="bg-background rounded-xl p-8 border">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-full bg-muted">
                <Building2 className="w-6 h-6 text-muted-foreground" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-semibold">Inhouse Mitarbeiter</h3>
            </div>
            <div className="mb-6">
              <div className="flex items-center gap-2">
                <div className="text-2xl font-bold text-primary">ab 0,30 € - 1,20 €</div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-4 h-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Berechnung basiert auf durchschnittlichen Arbeitgeberkosten von 2.700 € - 4.000 €/Monat 
                        bei ~4h effektiver Telefonzeit pro Tag (ca. 4.000 Minuten/Monat).
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="text-sm text-muted-foreground">pro effektive Telefonminute</div>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3 text-muted-foreground">
                <span className="text-red-500 font-bold">×</span>
                <span>Ausfälle durch Urlaub & Krankheit</span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <span className="text-red-500 font-bold">×</span>
                <span>Maximal ~4h effektive Telefonzeit pro Tag</span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <span className="text-red-500 font-bold">×</span>
                <span>Zusätzliche Kosten für Büro, Equipment, etc.</span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <span className="text-red-500 font-bold">×</span>
                <span>Fluktuation der Mitarbeiter</span>
              </li>
            </ul>
          </div>

          {/* callflows */}
          <div className="bg-background rounded-xl p-8 border border-primary/50 shadow-lg relative transform hover:scale-105 transition-transform">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-auto">
              <span className="bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-medium">
                Moderne KI-Lösung
              </span>
            </div>
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-full bg-primary/10">
                <Bot className="w-6 h-6 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-semibold">KI Voice Agent</h3>
            </div>
            <div className="mb-6">
              <div className="text-2xl font-bold text-primary">ab 0,18 € - 0,69 €</div>
              <div className="text-sm text-muted-foreground">pro Minute, meist zzgl. Grundgebühr</div>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <span className="text-green-500 font-bold">✓</span>
                <span>24/7 Verfügbarkeit ohne Mehrkosten</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 font-bold">✓</span>
                <span>Unbegrenzte parallele Gespräche möglich</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow-700 font-bold">!</span>
                <span>oft hohe Grundgebühr</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 font-bold">✓</span>
                <span>Gleichbleibend hohe Qualität</span>
              </li>
            </ul>
          </div>

          {/* Externes Call Center */}
          <div className="bg-background rounded-xl p-8 border">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-full bg-muted">
                <Users className="w-6 h-6 text-muted-foreground" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-semibold">Externes Call Center</h3>
            </div>
            <div className="mb-6">
              <div className="flex items-center gap-2">
                <div className="text-2xl font-bold text-primary">ab 0,70 € - 2,00 €</div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-4 h-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Basierend auf einer Marktanalyse deutscher Callcenter-Anbieter 2024.
                        Outbound-Calls oft teurer aufgrund von Sales-Skills und Provisionsmodellen.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="text-sm text-muted-foreground">pro Minute + Grundgebühren</div>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3 text-muted-foreground">
                <span className="text-red-500 font-bold">×</span>
                <span>Nur zu Geschäftszeiten verfügbar</span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <span className="text-red-500 font-bold">×</span>
                <span>Anrufvolumen schwankend</span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <span className="text-red-500 font-bold">×</span>
                <span>Zusätzlich mtl. Grundgebühren</span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <span className="text-red-500 font-bold">×</span>
                <span>Schwankende Service-Qualität</span>
              </li>
            </ul>
          </div>
        </div>

        {/* ROI Benefits */}
        <div className="flex flex-col items-center mt-24">
          <h2 className="text-4xl font-bold text-primary dark:text-white mb-12 text-center">
            Ihre Vorteile durch <strong className="text-primary">callflows</strong>
          </h2>
          <div className="bg-accent/10 p-6 rounded-lg my-8 text-center">
            <p className="text-xl font-bold text-primary dark:text-secondary">
             Reine Minutenabrechnung ohne Grundgebühren oder versteckten und unkalkulierbaren Kosten. Wir konfigurieren für Sie stets die beste Lösung.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 w-full mb-16">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Coins className="w-6 h-6 text-primary" strokeWidth={1.5} />
              </div>
              <h4 className="text-lg font-semibold mb-2">Kostentransparenz</h4>
              <p className="text-muted-foreground">
                Sie können die Kosten für callflow genau berechnen und planen.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Gauge className="w-6 h-6 text-primary" strokeWidth={1.5} />
              </div>
              <h4 className="text-lg font-semibold mb-2">Prompt Engineering</h4>
              <p className="text-muted-foreground">
                Wir erstellen und konfigurieren Ihre Agents nach Maß und passen diese kostenlos an neue Modelle an.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-primary" strokeWidth={1.5} />
              </div>
              <h4 className="text-lg font-semibold mb-2">Schnell einsatzbereit</h4>
              <p className="text-muted-foreground">
                Vom ersten Anruf bis zur ersten Verkaufschance - Start innerhalb 2 Wochen
              </p>
            </div>
          </div>

          <button
            className="bg-accent text-gray-900 px-8 py-4 rounded-lg font-medium
                     flex items-center hover:bg-accent/90 transition-all duration-200 
                     shadow-lg hover:shadow-xl group transform hover:-translate-y-0.5"
            data-cal-link="callflows/55min"
            data-cal-config='{"layout":"popup"}'
          >
            Beratungstermin buchen
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
        
      </div>
    </section>
  );
}