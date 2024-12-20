import { PricingPlan } from "@/lib/types/pricing";

export const pricingPlans: PricingPlan[] = [
  {
    name: "Inbound Voice Agent",
    subtitle: "Starter",
    price: 99,
    yearlyPrice: 89,
    features: [
      "100min/Monat inbegriffen",
      "Automatische Anrufannahme",
      "Standard Reporting",
      "E-Mail Support",
      "99.9% Uptime-Garantie"
    ],
    highlights: [
      "Perfekt für kleine Teams",
      "Entlastung Ihrer Mitarbeiter",
      "Schnelle Integration"
    ],
    cta: "Individuelles Angebot",
    popular: false
  },
  {
    name: "Outbound Voice Agent",
    subtitle: "Sales",
    price: 249,
    yearlyPrice: 229,
    features: [
      "100min/Monat inbegriffen",
      "Intelligente Kampagnensteuerung",
      "Erweiterte KI-Funktionen",
      "Custom Integrationen",
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
    price: 599,
    yearlyPrice: 539,
    features: [
      "Vollständig anpassbare Lösung",
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
      "Enterprise-Support"
    ],
    cta: "Individuelles Angebot",
    popular: true
  }
];