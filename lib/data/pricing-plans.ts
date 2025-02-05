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
      "Ideal zum Testen der Möglichkeiten von Callflows",
      "Für Unternehmen, die erste Prozesse automatisieren möchten",
      "Reicht für gelegentliche Anrufe & kleinere Supportanfragen",
      "Einrichtungsgebühr entfällt für die ersten 10 Kunden"
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
      "Bietet die Unterstützung einer zusätzlichen Halbtagskraft",
      "Einrichtungsgebühr entfällt für die ersten 10 Kunden"
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
      "Unterstützt Vertrieb, Support & interne Prozesse umfassend",
      "Perfekt für stark vertriebsorientierte Unternehmen mit hoher Anrufquote",
      "Einrichtungsgebühr entfällt für die ersten 10 Kunden"
    ],
    cta: "Jetzt beraten lassen",
    popular: false
  }
];

export const minutePackages: MinutePackage[] = [
  {
    name: "Starter",
    minutes: 1000,
    pricePerMinute: 0.90,
    totalPrice: 900,
    savings: "ca. 9%",
    description: "Entspricht einer Sekretärin halbtags"
  },
  {
    name: "Pro",
    minutes: 5000,
    pricePerMinute: 0.85,
    totalPrice: 4250,
    savings: "ca. 14%",
    description: "Entspricht einem kleinen Vertriebsteam"
  },
  {
    name: "Premium",
    minutes: 10000,
    pricePerMinute: 0.82,
    totalPrice: 8200,
    savings: "ca. 17%",
    description: "Entspricht einem größeren Vertriebsteam"
  },
  {
    name: "Enterprise",
    minutes: 20000,
    pricePerMinute: 0.80,
    totalPrice: 16000,
    savings: "ca. 19%",
    description: "Ideal für Enterprise-Sales-Teams"
  }
];