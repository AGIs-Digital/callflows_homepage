import { PricingPlan, MinutePackage } from "@/lib/types/pricing";

export const monthlyPlans: PricingPlan[] = [
  {
    name: "Entlastung",
    type: "starter",
    subtitle: "Unterstützung im Tagesgeschäft",
    price: 1.09,
    minutesIncluded: 1000,
    highlights: [
      "Schnell spürbare Verbesserungen im Arbeitsalltag",
      "Häufige Fragen ohne Personaleinsatz beantworten",
      "Weniger Weiterverbindungen und Wartezeiten"
    ],
    cta: "Jetzt beraten lassen",
    popular: false
  },
  {
    name: "Wachstum",
    type: "professional",
    subtitle: "Umsatz & Expansion",
    price: 0.99,
    minutesIncluded: 2000,
    highlights: [
      "Prozesse von der Anfrage bis zum Abschluss optimieren",
      "Weniger Unterbrechungen in täglichen Arbeitsabläufen",
      "Wachstum ohne proportionalen Personalaufbau",
      "Hochwertige Leads für das Vertriebsteam"
    ],
    cta: "Jetzt beraten lassen",
    popular: false
  },
  {
    name: "Individuell",
    type: "custom",
    subtitle: "Maßgeschneiderte Lösungen",
    price: 0, // Preis auf Anfrage
    minutesIncluded: 0, // Kontingent auf Anfrage
    highlights: [
      "Marktführerschaft durch frühzeitige KI-Adoption",
      "Neue Kunden auch außerhalb der Geschäftszeiten gewinnen",
      "Persönliche Beratung und maßgeschneiderte Lösung",
      "Erkenntnisse aus Gesprächen für Geschäftsentscheidungen",
      "Mehrsprachige KI für globale Expansion"
    ],
    cta: "Individuelles Angebot",
    popular: true,
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