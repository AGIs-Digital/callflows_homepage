import { PricingPlan, MinutePackage } from "@/lib/types/pricing";

const EARLY_BIRD_ACTIVE = true; // Toggle for the promotion
const EARLY_BIRD_END_DATE = "2025-06-30"; // 3 months from now

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
    name: "Business",
    type: "business",
    subtitle: "Für Einzel- & kleine Unternehmen",
    price: 899,
    earlyBirdPrice: 570,
    minutesIncluded: 1000,
    highlights: [
      "Entlastet einzelne Mitarbeiter & spart Zeit",
      "Optimal für regelmäßige Kundenkommunikation",
      "Bietet Unterstützung wie eine zusätzliche Halbtagskraft",
    ],
    cta: "Jetzt beraten lassen",
    popular: true
  },
  {
    name: "Enterprise",
    type: "enterprise",
    subtitle: "Wachsende Unternehmen",
    price: 2499,
    earlyBirdPrice: 1710,
    minutesIncluded: 3000,
    highlights: [
      "Ideal für Unternehmen mit vielen Kunden & Abteilungen",
      "Zum Verbessern von Vertrieb, Support & internen Prozessen",
      "Perfekt für stark vertriebsorientierte Unternehmen mit hoher Anrufquote",
      
    ],
    cta: "Jetzt beraten lassen",
    popular: false
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
    name: "Zusatzminuten 20.000",
    minutes: 20000,
    pricePerMinute: 0.80,
    totalPrice: 16000,
    savings: "ca. 19%",
    description: "Ideal für Enterprise-Sales-Teams"
  }
];