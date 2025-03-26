"use client";

import { Wrench } from "lucide-react";

const coreFeatures = [
  {
    category: "Kommunikation",
    features: [
      "Realtime-Bookings – Sofortige Terminvereinbarungen",
      "Multi-Channel-Handling – Bis zu 100+ gleichzeitige Anrufe",
      "24/7 verfügbar – Keine Wartezeiten oder Pausen",
      "Intelligente Anrufweiterleitung bei Bedarf"
    ]
  },
  {
    category: "Technologie",
    features: [
      "Eigene Wissensdatenbank für fundierte Antworten",
      "CRM-Integration zur direkten Datenpflege",
      "Mehrere KI-Agents arbeiten zusammen und bilden eine digitale Abteilung",
      "Skalierbare Infrastruktur für jede Unternehmensgröße"
    ]
  },
  {
    category: "Personalisierung",
    features: [
      "Individuelle Gesprächsführung",
      "Kundenspezifische Anpassungen",
      "Branchen-spezifische Lösungen",
      "Maßgeschneiderte Workflows"
    ]
  }
];

export function PricingFeatures() {
  return (
    <div>
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4 text-primary dark:text-white">
          Alle Pakete beinhalten
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-24">
        {coreFeatures.map((category) => (
          <div key={category.category} className="space-y-6">
            <h3 className="text-lg font-semibold text-primary border-b pb-2">
              {category.category}
            </h3>
            <ul className="space-y-4">
              {category.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="h-2 w-2 rounded-full bg-accent flex-shrink-0 mt-2" />
                  <span className="text-muted-foreground text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Neuer Abschnitt: Individuelle Entwicklung und Dienstleistungen */}
      <div className="mt-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-primary dark:text-white">
            Individuelle Entwicklung & Dienstleistungen
          </h2>
        </div>
        
        <div className="bg-background rounded-xl p-8 border shadow-sm">
          <div className="flex items-center gap-4 mb-8 justify-center">
            <div className="p-3 rounded-full bg-primary/10">
              <Wrench className="w-6 h-6 text-primary" strokeWidth={1.5} />
            </div>
            <p className="text-lg font-medium">
              Maßgeschneiderte Voice Agents für Ihre spezifischen Anforderungen
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <p className="text-muted-foreground mb-6 text-center">
              Für die Entwicklung Ihrer individuellen Voice Agents bieten wir umfassende Dienstleistungen, die nach tatsächlichem Aufwand abgerechnet werden:
            </p>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Entwicklung vom ersten Prototypen bis zum Go-Live</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Schulungen für Ihr Team zur optimalen Nutzung</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Intensiver Support während der Entwicklungs- und Testphase</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Feinjustierung und Optimierung der Agents</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Spätere Anpassungen oder Entwicklung neuer callflows Agents</span>
              </li>
            </ul>
            
            <p className="text-center text-muted-foreground">
              Wir erstellen Ihnen gerne ein individuelles Angebot basierend auf Ihren spezifischen Anforderungen.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}