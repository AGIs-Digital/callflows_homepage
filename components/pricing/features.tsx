"use client";

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
      "Agent-Teams für digitale Abteilungen",
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
    <div className="py-14">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4 text-primary dark:text-white">
          Alle Pläne beinhalten
        </h2>
        <p className="text-muted-foreground">
          Profitieren Sie von allen Kernfunktionen in jedem Paket
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
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
    </div>
  );
}