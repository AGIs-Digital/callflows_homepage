import { PricingPlan } from "@/lib/types/pricing";

export const pricingPlans: PricingPlan[] = [
  {
    name: "Inbound Voice Agent",
    subtitle: "Rezeption & Terminbuchung",
    price: 99,
    yearlyPrice: 89,
    features: [
      "100min/Monat inbegriffen",
      "Automatische Anrufannahme",
      "Für alle eingehenden Anrufe",
      "Leichte Integration",
      "Einfache KI-Funktionen"
    ],
    highlights: [
      "Perfekt für kleine Unternehmen",
      "Entlastung Ihrer Mitarbeiter",
      "Schnelle Integration"
    ],
    cta: "Individuelles Angebot",
    popular: false
  },
  {
    name: "Outbound Voice Agent",
    subtitle: "Sales & Marketing",
    price: 219,
    yearlyPrice: 199,
    features: [
      "100min/Monat inbegriffen",
      "Intelligente Kampagnensteuerung",
      "Für alle ausgehenden Anrufe",
      "Erweiterte KI-Funktionen",
      "Performance-Tracking"
    ],
    highlights: [
      "Ideal für wachsende Unternehmen",
      "Maximale Flexibilität",
      "Mehr Kundentermine"
    ],
    cta: "Individuelles Angebot",
    popular: false
  },
  {
    name: "Individuelle Lösung",
    subtitle: "Enterprise",
    price: 299,
    yearlyPrice: 269,
    features: [
      "200min/Monat inbegriffen",
      "Inbound & Outbound",
      "Dedizierter Account Manager",
      "Premium Support",
      "Voice Agent Teams",
      "Custom Development",
      "On-Premise Option"
    ],
    highlights: [
      "Unbegrenzte Skalierbarkeit",
      "Höchste Sicherheit",
      "Individuelle Lösung"
    ],
    cta: "Individuelles Angebot",
    popular: true
  }
];