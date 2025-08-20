import { PricingPlan, MinutePackage, PricingTier } from "@/lib/types/pricing";

// Neue Preisstruktur: Pilotmonat + Minutenstaffel
export const pilotPackage = {
  name: "Pilotmonat KI-callflow",
  subtitle: "Individueller KI-callflow mit Einrichtung",
  badge: "Risikofrei starten",
  setupPrice: 2490,
  includedMinutes: 1000,
  highlights: [
    "Keine Vertragslaufzeit, kein Risiko",
    "Vollständige Einrichtung und Konfiguration",
    "1.000 KI-Minuten inklusive",
    "Individuelle Anpassung an Ihr Unternehmen",
    "Persönliche Betreuung während der Pilotphase",
    "Go-Live Unterstützung"
  ],
  cta: "Pilotmonat starten",
  popular: true
};

// Minutenstaffel für die nutzungsbasierte Abrechnung nach Go-Live
export const pricingTiers: PricingTier[] = [
  {
    from: 1,
    to: 1000,
    pricePerMinute: 0.99,
    description: "Bis 1.000 Minuten"
  },
  {
    from: 1001,
    to: 2000,
    pricePerMinute: 0.94,
    description: "1.001 - 2.000 Minuten"
  },
  {
    from: 2001,
    to: 5000,
    pricePerMinute: 0.89,
    description: "2.001 - 5.000 Minuten"
  },
  {
    from: 5001,
    to: 10000,
    pricePerMinute: 0.84,
    description: "5.001 - 10.000 Minuten"
  },
  {
    from: 10001,
    to: Infinity,
    pricePerMinute: 0.79,
    description: "Ab 10.001 Minuten"
  }
];

// Legacy: Behalten für Kompatibilität, falls woanders verwendet
export const monthlyPlans: PricingPlan[] = [
  {
    name: "Pilotmonat",
    type: "pilot",
    subtitle: "Individueller KI-callflow ohne Risiko",
    price: 2490,
    minutesIncluded: 1000,
    highlights: [
      "Keine Vertragslaufzeit, kein Risiko",
      "Vollständige Einrichtung inklusive",
      "1.000 KI-Minuten enthalten",
      "Individuelle Konfiguration",
      "Persönliche Betreuung"
    ],
    cta: "Pilotmonat starten",
    popular: true,
    isPilot: true
  }
];

export const minutePackages: MinutePackage[] = [
  {
    name: "Nach Go-Live",
    minutes: 0,
    pricePerMinute: 0.99,
    totalPrice: 0,
    savings: "Staffelpreise",
    description: "Reine Nutzungsgebühr ohne Vertragslaufzeit",
    isUsageBased: true
  }
];