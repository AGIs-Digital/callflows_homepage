"use client";

import { Handshake, ProjectorIcon, Headphones, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    number: 1,
    icon: Handshake,
    title: "Kontaktaufnahme",
    description: "Kostenfreies Erstgespräch",
    details: [
      "Bedarfsanalyse & Use Cases",
      "Technische Voraussetzungen",
      "Zieldefinition"
    ]
  },
  {
    number: 2,
    icon: ProjectorIcon,
    title: "Workshop",
    description: "Konzeption & Setup",
    details: [
      "Plattform-Setup",
      "Agent-Training",
      "System-Konfiguration"
    ]
  },
  {
    number: 3,
    icon: Sparkles,
    title: "Prototyping",
    description: "Test & Optimierung",
    details: [
      "Testphase",
      "Feintuning",
      "Feature-Integration"
    ]
  },
  {
    number: 4,
    icon: Headphones,
    title: "Support",
    description: "Betreuung & Support",
    details: [
      "Go-Live",
      "Team-Schulung",
      "Laufende Betreuung"
    ]
  }
];

export function ProcessSection() {
  return (
    <section className="py-24 bg-section-blue dark:bg-[#DEF0F2]/5">
      <div className="container max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary dark:text-white mb-4">
            So einfach geht's
          </h2>
          <p className="text-xl text-muted-foreground">
            Von der ersten Kontaktaufnahme bis zum Go-Live in einer Woche
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">

          {steps.map((step, index) => (
            <div
              key={index}
              className={cn(
                "relative p-6 rounded-lg border bg-card",
                "transform transition-all duration-300",
                "hover:-translate-y-2 hover:shadow-lg hover:border-primary/20"
              )}
            >
              {/* Step Number Circle */}
              <div className="absolute left-0 top-8 w-12 h-12 -translate-x-1/2 hidden lg:flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-[#FFB703] flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-900">{step.number}</span>
                </div>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground mb-4">{step.description}</p>
                <ul className="space-y-2 text-sm text-left w-full">
                  {step.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}