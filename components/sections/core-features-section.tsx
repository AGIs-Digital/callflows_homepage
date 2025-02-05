"use client";

import { 
  Calendar, 
  Database, 
  Phone, 
  Link2, 
  Clock, 
  Users, 
  PhoneForwarded,
  UserCircle,
  Scale
} from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Realtime-Bookings",
    description: "Sofortige Terminvereinbarungen und Reservierungen über den Telefonagenten"
  },
  {
    icon: Database,
    title: "Eigene Wissensdatenbank",
    description: "Der KI-Agent nutzt individuelle Firmendaten für fundierte Antworten"
  },
  {
    icon: Phone,
    title: "Multi-Channel-Handling",
    description: "Bis zu 100+ gleichzeitige Anrufe ohne Wartezeiten"
  },
  {
    icon: Link2,
    title: "CRM-Integration",
    description: "Nahtlose Anbindung an gängige bestehende CRM-Systeme zur direkten Datenpflege"
  },
  {
    icon: Clock,
    title: "24/7 verfügbar",
    description: "Jederzeit erreichbar, keine Pausen, keine Wartezeiten"
  },
  {
    icon: Users,
    title: "Agent-Teams",
    description: "Mehrere KI-Agents arbeiten zusammen und bilden eine digitale Abteilung"
  },
  {
    icon: PhoneForwarded,
    title: "Intelligente Anrufweiterleitung",
    description: "Übergabe an menschliche Mitarbeiter, wenn nötig"
  },
  {
    icon: UserCircle,
    title: "Personalisierte Kommunikation",
    description: "Individuelle Gesprächsführung basierend auf Kundendaten"
  },
  {
    icon: Scale,
    title: "Skalierbarkeit",
    description: "Von Startups bis Enterprise: Anpassbar an jede Unternehmensgröße"
  }
];

export function CoreFeaturesSection() {
  return (
    <section className="py-24 bg-section-blue dark:bg-[#DEF0F2]/5">
      <div className="container max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary dark:text-white mb-4">
            Kernfunktionen
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Entdecken Sie die leistungsstarken Features unserer KI Voice Agents
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border border-border bg-background
                         transition-all duration-300 ease-out
                         hover:-translate-y-2 hover:shadow-lg
                         hover:border-primary/20"
            >
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-accent/10">
                  <feature.icon className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}