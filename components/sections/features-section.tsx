"use client";

import { Headphones, Megaphone, PhoneCall, Users } from "lucide-react";

const features = [
  {
    icon: Headphones,
    title: "Support & Kundenservice",
    description: "Automatisierte und intelligente Anrufannahme für effizienten Kundenservice rund um die Uhr.",
    items: [
      "Erste Hilfe bei Anfragen",
      "Terminbuchungen & Reservierungen",
      "Beschwerdemanagement"
    ]
  },
  {
    icon: Megaphone,
    title: "Marketing & Leadgenerierung",
    description: "Effiziente Kundenansprache und Follow-ups durch KI-gesteuerte Telefonkampagnen.",
    items: [
      "Automatische Werbeanrufe",
      "Event-Erinnerungen & Nachfassanrufe",
      "Feedback- und Umfragen"
    ]
  },
  {
    icon: PhoneCall,
    title: "Vertrieb & Kundenbetreuung",
    description: "Steigerung der Verkaufszahlen durch gezielte telefonische Kundeninteraktion.",
    items: [
      "Bestandskundenbetreuung",
      "Cross- & Upselling",
      "Nachfassaktionen"
    ]
  },
  {
    icon: Users,
    title: "Recruiting & HR-Prozesse",
    description: "Effektive Automatisierung und Vereinfachung des Bewerbungsprozesses.",
    items: [
      "Telefonische Vorauswahl",
      "Onboarding & Dokumentenanforderungen",
      "Mitarbeiterumfragen & Zufriedenheitsanalysen"
    ]
  }
];

export function FeaturesSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container max-w-6xl">
        <div className="text-center mb-16 section-animate">
          <h2 className="text-4xl font-bold mb-4 text-primary dark:text-white">
            Einsatzbereiche für KI-Voice-Agents
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            In allen Bereichen sind Voice Agents der Standard von morgen.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="p-6 rounded-xl border border-border bg-background 
                         transition-all duration-300 ease-out 
                         hover:-translate-y-2 hover:shadow-lg 
                         hover:border-primary/20 section-animate 
                         group"
              style={{ 
                animationDelay: `${index * 0.15}s`,
                transitionDelay: `${index * 0.1}s`
              }}
            >
              <feature.icon className="w-12 h-12 text-primary mb-4 transform 
                                    transition-all duration-300 ease-out 
                                    group-hover:scale-110 group-hover:rotate-3
                                    text-[#FFB703]" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground mb-4">{feature.description}</p>
              <ul className="space-y-2">
                {feature.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}