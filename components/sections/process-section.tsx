"use client";

import { Search, Cog, Rocket } from "lucide-react";
import { ZohoEmbed } from "@/components/booking/zoho-embed";
import { cn } from "@/lib/utils";

export function ProcessSection() {
  const steps = [
    {
      number: 1,
      icon: Search,
      title: "Kick-off & Prozess-Analyse",
      description: "Ziele, Use-Cases, Gesprächslogik",
      details: [
        "Bedarfsanalyse und Zieldefinition",
        "Use-Case Identifikation",
        "Gesprächslogik entwickeln",
        "Technische Voraussetzungen klären"
      ],
      gradient: "from-primary/20 to-primary/30",
      iconColor: "text-primary"
    },
    {
      number: 2,
      icon: Cog,
      title: "Einrichtung & Pilotmonat",
      description: "individueller Callflow, Test & Feinschliff",
      details: [
        "Individueller KI-callflow Setup",
        "Prozesslogik implementieren",
        "Testphase und Feintuning",
        "System-Integrationen einrichten"
      ],
      gradient: "from-accent/20 to-accent/30",
      iconColor: "text-accent"
    },
    {
      number: 3,
      icon: Rocket,
      title: "Go-Live & Skalierung",
      description: "Minutenbasiert abrechnen, bei Bedarf ausbauen",
      details: [
        "Produktiver Go-Live Start",
        "Minutenbasierte Abrechnung",
        "Performance Monitoring",
        "Skalierung nach Bedarf"
      ],
      gradient: "from-tertiary/20 to-tertiary/30",
      iconColor: "text-tertiary"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-primary/25 via-primary/15 to-accent/15">
      <div className="container max-w-6xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <span className="text-sm font-medium text-primary">So starten Sie</span>
          </div>
          <h2 className="text-4xl font-bold text-primary dark:text-white mb-6">
            In 3 Schritten live
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Von der ersten Analyse bis zum produktiven Einsatz – wir begleiten Sie durch jeden Schritt
          </p>
        </div>

        {/* 3-Schritte Prozess */}
        <div className="grid md:grid-cols-3 gap-8 relative mb-12">
          {/* Verbindungslinien zwischen Steps */}
          <div className="hidden md:block absolute top-20 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-primary/30 via-accent/30 to-tertiary/30" />
          
          {steps.map((step, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-2xl border border-border/50 bg-gradient-to-br ${step.gradient} backdrop-blur-sm
                         transition-all duration-300 ease-out 
                         hover:-translate-y-2 hover:shadow-xl 
                         hover:border-primary/30 group`}
            >
              {/* Step Number */}
              <div className="absolute -top-4 left-8 w-8 h-8 rounded-full bg-white dark:bg-gray-800 border-2 border-primary flex items-center justify-center z-10">
                <span className="text-sm font-bold text-primary">{step.number}</span>
              </div>
              
              <div className="text-center">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-white/80 dark:bg-gray-800/80 flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className={`w-8 h-8 ${step.iconColor}`} />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {step.description}
                </p>
                
                {/* Details */}
                <div className="space-y-2 text-left">
                  {step.details.map((detail, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <div className={`w-1.5 h-1.5 rounded-full ${step.iconColor.replace('text-', 'bg-')} flex-shrink-0 mt-2`} />
                      <span className="text-muted-foreground">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-card/60 backdrop-blur-sm rounded-2xl border border-border/50 p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-primary mb-4">
              Bereit für den nächsten Schritt?
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Lassen Sie uns gemeinsam analysieren, wie KI-callflows Ihren Vertrieb unterstützen können
            </p>
            <ZohoEmbed 
              buttonText="Beratung buchen"
              size="lg" 
              className="bg-[#FFB703] hover:bg-tertiary/70 text-white font-semibold px-8 py-4 text-lg gap-2"
            />
          </div>
        </div>
      </div>
    </section>
  );
}