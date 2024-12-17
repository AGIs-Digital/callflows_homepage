"use client";

import { Bot, Phone, BarChart3, Zap } from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "KI Voice Agent",
    description: "Unsere intelligenten Voice Agents führen natürliche Gespräche und passen sich an Ihre Bedürfnisse an."
  },
  {
    icon: Phone,
    title: "Automatisierte Anrufe",
    description: "Skalieren Sie Ihre In- und Outbound-Kommunikation effizient und kostengünstig."
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
        <div className="text-center mb-16 section-animate">
          <h2 className="text-4xl font-bold text-primary mb-4">
            Unsere Features
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Entdecken Sie die vielseitigen Einsatzmöglichkeiten unserer KI-gestützten Lösungen
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
              <feature.icon className="w-12 h-12 text-accent mb-4 transform 
                                     transition-all duration-300 ease-out 
                                     group-hover:scale-110 group-hover:rotate-3" />
              <h3 className="text-xl font-semibold mb-2 text-accent">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}