import { Bot, Phone, BarChart3, Shield, Clock, Zap } from "lucide-react";
import { PricingFeature } from "@/lib/types/pricing";

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