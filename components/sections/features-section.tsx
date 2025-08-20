"use client";

import { Users, Building2, TrendingUp, Building } from "lucide-react";
import { CheckCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function FeaturesSection() {
  const { t } = useI18n();

  const targetGroups = [
    {
      icon: Users,
      title: "Personaldienstleister",
      description: "mit hoher Anruf- und Follow-up-Last",
      gradient: "from-primary/20 to-primary/30",
      iconColor: "text-primary",
      benefits: [
        "Automatisierte Anrufe für Kandidaten-Kontaktierung",
        "KI-Telefonie reduziert manuelle Follow-ups",
        "Mehr Zeit für qualifizierte Gespräche im B2B-Vertrieb"
      ]
    },
    {
      icon: Building2,
      title: "Mittelständische Vertriebsorganisationen",
      description: "die skalieren wollen",
      gradient: "from-tertiary/20 to-tertiary/30",
      iconColor: "text-tertiary",
      benefits: [
        "Skalierbare Vertriebsprozesse",
        "Konsistente Kundenansprache",
        "Wachstum ohne Personalaufbau"
      ]
    },
    {
      icon: TrendingUp,
      title: "Effiziente Teams",
      description: "die Standardanrufe automatisieren möchten",
      gradient: "from-accent/20 to-accent/30",
      iconColor: "text-accent",
      benefits: [
        "Mehr Zeit für Abschlüsse",
        "Automatisierte Routine-Tasks",
        "Höhere Conversion-Raten"
      ]
    },
    {
      icon: Building,
      title: "Konzerne",
      description: "die transparente, flexible KI-Telefonie suchen",
      gradient: "from-secondary/30 to-secondary/40",
      iconColor: "text-primary",
      benefits: [
        "Transparente Kostenstruktur",
        "Flexibel skalierbare Lösung",
        "Enterprise-Grade Sicherheit"
      ]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-secondary/20 via-primary/15 to-primary/25">
      <div className="container max-w-6xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <span className="text-sm font-medium text-primary">Für wen ist das?</span>
          </div>
          <h2 className="text-4xl font-bold mb-6 text-primary dark:text-white">
            KI‑Voice‑Agents für den Mittelstand
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            KI-Voice-Agents unterstützen den Mittelstand dabei, automatisierte Anrufe im B2B-Vertrieb zu realisieren und gleichzeitig den persönlichen Kontakt zu stärken
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {targetGroups.map((group, index) => (
            <div 
              key={index} 
              className={`relative p-8 rounded-2xl border border-border/50 bg-gradient-to-br ${group.gradient} backdrop-blur-sm
                         transition-all duration-300 ease-out 
                         hover:-translate-y-1 hover:shadow-xl 
                         hover:border-primary/30 group overflow-hidden`}
              style={{ 
                animationDelay: `${index * 0.1}s`
              }}
            >
                <div className="absolute top-0 left-0 w-full h-1 bg-card/50 border border-border/50 backdrop-blur-sm transform -skew-x-12" />
              <div className="relative z-10">
                <div className="flex items-start gap-4 mb-6">
                  <div className={`flex-shrink-0 w-14 h-14 rounded-xl bg-white/80 dark:bg-gray-800/80 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <group.icon className={`w-7 h-7 ${group.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
                      {group.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {group.description}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {group.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-3 group/item">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0 group-hover/item:scale-110 transition-transform duration-200" />
                      <span className="text-sm text-foreground leading-relaxed">
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-green-800 dark:text-green-200">
              Passt zu Ihrem Unternehmen? Lassen Sie uns sprechen!
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}