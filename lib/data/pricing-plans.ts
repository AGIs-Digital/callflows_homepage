import { PricingPlan, MinutePackage } from "@/lib/types/pricing";

const EARLY_BIRD_ACTIVE = true; // Toggle for the promotion
const EARLY_BIRD_END_DATE = "2025-04-01T00:00:00"; // Endet am 01.04.2025 um 00:00 Uhr

export const monthlyPlans: PricingPlan[] = [
  {
    name: "Starter",
    type: "starter",
    subtitle: "Perfekt zum Kennenlernen",
    price: 499,
    earlyBirdPrice: 285,
    minutesIncluded: 500,
    highlights: [
      "Ideal zum Testen der Möglichkeiten von callflows",
      "Für Unternehmen, die erste Prozesse automatisieren möchten",
      "Reicht für gelegentliche Anrufe & kleinere Supportanfragen",
    ],
    cta: "Jetzt beraten lassen",
    popular: false
  },
  {
    name: "Pro",
    type: "pro",
    subtitle: "Für wachsende Unternehmen",
    price: 1799,
    earlyBirdPrice: 1029,
    minutesIncluded: 2000,
    highlights: [
      "Entlastet einzelne Mitarbeiter & spart Zeit",
      "Für regelmäßige Kundenkommunikation",
      "Ideal für kleine Teams mit steigendem Anrufvolumen",
    ],
    cta: "Jetzt beraten lassen",
    popular: false
  },
  {
    name: "Business",
    type: "business",
    subtitle: "Für Einzel- & kleine Unternehmen",
    price: 3999,
    earlyBirdPrice: 2539,
    minutesIncluded: 5000,
    highlights: [
      "Entlastet mehrere Mitarbeiter & spart Zeit",
      "Optimal für regelmäßige Kundenkommunikation",
      "Bietet Unterstützung wie eine zusätzliche Halbtagskraft",
    ],
    cta: "Jetzt beraten lassen",
    popular: true
  },
  {
    name: "Individuell",
    type: "custom",
    subtitle: "Maßgeschneiderte Lösungen",
    price: 0, // Preis auf Anfrage
    earlyBirdPrice: 0,
    minutesIncluded: 0, // Kontingent auf Anfrage
    highlights: [
      "Für Unternehmen mit speziellen Anforderungen",
      "Individuelles Minutenkontingent nach Bedarf",
      "Persönliche Beratung und maßgeschneiderte Lösung",
      "Optimale Skalierung für große Unternehmen"
    ],
    cta: "Individuelles Angebot",
    popular: false,
    isCustom: true
  }
];

export const minutePackages: MinutePackage[] = [
  {
    name: "Zusatzminuten 1.000",
    minutes: 1000,
    pricePerMinute: 0.90,
    totalPrice: 900,
    savings: "ca. 9%",
    description: "Entspricht einer Sekretärin halbtags"
  },
  {
    name: "Zusatzminuten 5.000",
    minutes: 5000,
    pricePerMinute: 0.85,
    totalPrice: 4250,
    savings: "ca. 14%",
    description: "Entspricht einem kleinen Vertriebsteam"
  },
  {
    name: "Zusatzminuten 10.000",
    minutes: 10000,
    pricePerMinute: 0.82,
    totalPrice: 8200,
    savings: "ca. 17%",
    description: "Entspricht einem größeren Vertriebsteam"
  },
  {
    name: "Individuelles Paket",
    minutes: 0,
    pricePerMinute: 0,
    totalPrice: 0,
    savings: "Auf Anfrage",
    description: "Maßgeschneiderte Lösung für Ihr Unternehmen",
    isCustom: true
  }
];