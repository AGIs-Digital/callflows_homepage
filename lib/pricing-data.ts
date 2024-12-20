import { Bot, Phone, BarChart3, Shield, Clock, Calendar } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface PricingFeature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface PricingFAQ {
  question: string;
  answer: string;
}

export const pricingFeatures: PricingFeature[] = [
  {
    icon: Bot,
    title: "KI Voice Agent",
    description: "Modernste KI-Technologie für natürliche Gespräche"
  },
  {
    icon: Phone,
    title: "Multichannel",
    description: "bis zu 100 Gesprächen gleichzeitig"
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
    icon: Calendar,
    title: "Realtime Bookings",
    description: "Verknüpfung Ihrer Kalender und Echtzeitbuchungen"
  },
  {
    icon: Clock,
    title: "24/7 Verfügbar",
    description: "Rund um die Uhr für Ihre Kunden erreichbar"
  }
];

export const pricingFAQs: PricingFAQ[] = [
  {
    question: "Wie funktioniert das Rückgaberecht?",
    answer: "Sie können jederzeit kündigen. Wir gewähren Ihnen ein Rückgaberecht von 14 Tagen. Wir bitten Sie, uns zu kontaktieren, falls Sie nicht zufrieden sind."
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
    answer: "Die Anrufe werden pro Minute abgerechnet. Die Agenten haben 100min/Monat enthalten. Zusätzliche Minuten können bei Bedarf flexibel hinzugebucht werden."
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