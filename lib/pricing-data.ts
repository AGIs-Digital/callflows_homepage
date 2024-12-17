import { Bot, Phone, BarChart3, Shield, Clock, Zap } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface PricingPlan {
  name: string;
  subtitle: string;
  price: number;
  yearlyPrice: number;
  features: string[];
  highlights: string[];
  cta: string;
  popular: boolean;
}

interface PricingFeature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface PricingTestimonial {
  quote: string;
  author: string;
  role: string;
  metric: string;
  metricLabel: string;
}

interface PricingFAQ {
  question: string;
  answer: string;
}

export const pricingPlans: PricingPlan[] = [
  {
    name: "Inbound Voice Agent",
    subtitle: "Starter",
    price: 199,
    yearlyPrice: 169,
    features: [
      "Bis zu 1.000 Anrufe/Monat",
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
    cta: "Kostenlos testen",
    popular: false
  },
  {
    name: "Outbound Voice Agent",
    subtitle: "Professional",
    price: 599,
    yearlyPrice: 539,
    features: [
      "Bis zu 5.000 Anrufe/Monat",
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
    cta: "Demo vereinbaren",
    popular: false
  },
  {
    name: "Complete Voice Suite",
    subtitle: "Enterprise",
    price: 899,
    yearlyPrice: 799,
    features: [
      "Unbegrenzte Anrufe",
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
    cta: "Kontakt aufnehmen",
    popular: true
  }
];

export const pricingFeatures: PricingFeature[] = [
  {
    icon: Bot,
    title: "KI Voice Agent",
    description: "Modernste KI-Technologie für natürliche Gespräche"
  },
  {
    icon: Phone,
    title: "Multichannel",
    description: "Nahtlose Integration aller Kommunikationskanäle"
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description: "Detaillierte Einblicke und Reporting-Funktionen"
  },
  {
    icon: Shield,
    title: "Sicherheit",
    description: "Höchste Standards für Datenschutz und Sicherheit"
  },
  {
    icon: Clock,
    title: "24/7 Verfügbar",
    description: "Rund um die Uhr für Ihre Kunden erreichbar"
  },
  {
    icon: Zap,
    title: "Skalierbar",
    description: "Flexibel anpassbar an Ihre Anforderungen"
  }
];

export const pricingTestimonials: PricingTestimonial[] = [
  {
    quote: "Mit der Enterprise Suite konnten wir unsere gesamte Kommunikation revolutionieren. Die KI-gestützte Lösung übertraf alle Erwartungen.",
    author: "Dr. Thomas Müller",
    role: "CTO, Innovation Labs GmbH",
    metric: "85%",
    metricLabel: "Kosteneinsparung"
  },
  {
    quote: "Die Integration war überraschend einfach und der Support ist erstklassig. Unsere Kunden sind begeistert von der Erreichbarkeit.",
    author: "Sarah Schmidt",
    role: "Head of Customer Service, Digital Solutions AG",
    metric: "24/7",
    metricLabel: "Erreichbarkeit"
  },
  {
    quote: "Als Enterprise-Kunde schätzen wir besonders die maßgeschneiderten KI-Modelle und den erstklassigen Support. Ein echter Game-Changer.",
    author: "Michael Weber",
    role: "COO, TechCorp GmbH",
    metric: "300%",
    metricLabel: "Effizienzsteigerung"
  }
];

export const pricingFAQs: PricingFAQ[] = [
  {
    question: "Wie funktioniert die kostenlose Testphase?",
    answer: "Die 14-tägige Testphase ermöglicht Ihnen, alle Features des Starter-Pakets unverbindlich zu testen. Sie benötigen keine Kreditkarte und können jederzeit kündigen."
  },
  {
    question: "Gibt es versteckte Kosten?",
    answer: "Nein, unsere Preise sind transparent. Sie zahlen nur für das gewählte Paket und optional für zusätzliche Anrufvolumen oder Funktionen, die Sie explizit buchen."
  },
  {
    question: "Kann ich das Paket später upgraden?",
    answer: "Ja, Sie können jederzeit auf ein höheres Paket upgraden. Die Preisdifferenz wird anteilig berechnet und Ihre bestehenden Daten werden nahtlos übernommen."
  },
  {
    question: "Wie werden die Anrufe abgerechnet?",
    answer: "Die Anrufe werden pro Minute abgerechnet. Starter und Professional Pakete enthalten ein definiertes Anrufvolumen, das Enterprise Paket bietet unbegrenzte Anrufe. Zusätzliche Minuten können bei Bedarf flexibel hinzugebucht werden."
  },
  {
    question: "Welche Zahlungsmethoden werden akzeptiert?",
    answer: "Wir akzeptieren alle gängigen Kreditkarten, SEPA-Lastschrift und Überweisung. Für Enterprise-Kunden bieten wir auch individuelle Zahlungskonditionen."
  },
  {
    question: "Gibt es Rabatte für Non-Profit Organisationen?",
    answer: "Ja, wir bieten spezielle Konditionen für Non-Profit Organisationen. Kontaktieren Sie uns für weitere Informationen."
  }
];