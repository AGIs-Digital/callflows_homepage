"use client";

import { Bot, Phone, BarChart3, Zap } from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "KI Voice Agent",
    description: "Unser intelligenter Voice Agent führt natürliche Gespräche und passt sich an Ihre Bedürfnisse an."
  },
  {
    icon: Phone,
    title: "Automatisierte Anrufe",
    description: "Skalieren Sie Ihre Outbound-Kommunikation effizient und kostengünstig."
  },
  {
    icon: BarChart3,
    title: "Detaillierte Analysen",
    description: "Erhalten Sie tiefe Einblicke in Ihre Kampagnen mit unserem Analytics Dashboard."
  },
  {
    icon: Zap,
    title: "Schnelle Integration",
    description: "Einfache Integration in Ihre bestehenden Systeme und Workflows."
  }
];

export function FeaturesSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">
            Unsere Features
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Entdecken Sie die Möglichkeiten unserer KI-gestützten Outbound-Kommunikation
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6 rounded-xl border border-border bg-background">
              <feature.icon className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-accent">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}