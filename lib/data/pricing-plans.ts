import { PricingPlan } from "@/lib/types/pricing";

export const pricingPlans: PricingPlan[] = [
  {
    name: "Inbound Voice Agent",
    subtitle: "Starter",
    price: 99,
    yearlyPrice: 89,
    features: [
      "Basis KI-Voice Agent",
      "24/7 Verfügbarkeit",
      "Automatische Anrufannahme",
      "Standard Reporting",
      "E-Mail Support",
      "99.9% Uptime-Garantie"
    ],
    highlights: [
      "Perfekt für kleine Teams",
      "Schneller ROI",
      "Schnelle Integration"
    ],
    cta: "Individuelles Angebot",
    popular: false
  },
  {
    name: "Outbound Voice Agent",
    subtitle: "Professional",
    price: 199,
    yearlyPrice: 179,
    features: [
      "Erweiterte KI-Funktionen",
      "Intelligente Kampagnensteuerung",
      "A/B Testing",
      "Erweiterte Analytics",
      "Prioritäts-Support",
      "Custom Integrationen",
      "Performance-Tracking"
    ],
    highlights: [
      "Ideal für wachsende Unternehmen",
      "Maximale Flexibilität",
      "Premium Support"
    ],
    cta: "Individuelles Angebot",
    popular: false
  },
  {
    name: "Complete Voice Suite",
    subtitle: "Enterprise",
    price: 299,
    yearlyPrice: 269,
    features: [
      "Vollständig anpassbare Lösung",
      "Inbound & Outbound",
      "KI-Training auf Ihre Bedürfnisse",
      "Dedizierter Account Manager",
      "24/7 Premium Support",
      "SLA-Garantien",
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