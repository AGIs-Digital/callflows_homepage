"use client";

import { Handshake, ProjectorIcon, Headphones, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";

export function ProcessSection() {
  const { t, locale } = useI18n();
  
  const getStepDetails = (step: string) => {
    const details = {
      de: {
        step1: ["Bedarfsanalyse & Use Cases", "Technische Voraussetzungen", "Zieldefinition"],
        step2: ["Prozessmodellierung", "Agent-Konfiguration", "Automationen"],
        step3: ["Testphase", "Feintuning", "Feature-Integration"],
        step4: ["Go-Live", "Team-Schulung", "Laufende Betreuung"]
      },
      en: {
        step1: ["Needs analysis & use cases", "Technical requirements", "Goal definition"],
        step2: ["Process modeling", "Agent configuration", "Automations"],
        step3: ["Testing phase", "Fine-tuning", "Feature integration"],
        step4: ["Go-live", "Team training", "Ongoing support"]
      },
      fr: {
        step1: ["Analyse des besoins & cas d'usage", "Exigences techniques", "Définition des objectifs"],
        step2: ["Modélisation des processus", "Configuration d'agent", "Automatisations"],
        step3: ["Phase de test", "Ajustement fin", "Intégration de fonctionnalités"],
        step4: ["Mise en service", "Formation équipe", "Suivi continu"]
      },
      es: {
        step1: ["Análisis de necesidades y casos de uso", "Requisitos técnicos", "Definición de objetivos"],
        step2: ["Modelado de procesos", "Configuración de agente", "Automatizaciones"],
        step3: ["Fase de prueba", "Ajuste fino", "Integración de características"],
        step4: ["Puesta en marcha", "Capacitación del equipo", "Soporte continuo"]
      }
    };
    
    return details[locale]?.[step as keyof typeof details['de']] || details.de[step as keyof typeof details['de']];
  };
  
  const steps = [
    {
      number: 1,
      icon: Handshake,
      title: t('process.step1.title'),
      description: t('process.step1.description'),
      details: getStepDetails('step1')
    },
    {
      number: 2,
      icon: ProjectorIcon,
      title: t('process.step2.title'),
      description: t('process.step2.description'),
      details: getStepDetails('step2')
    },
    {
      number: 3,
      icon: Sparkles,
      title: t('process.step3.title'),
      description: t('process.step3.description'),
      details: getStepDetails('step3')
    },
    {
      number: 4,
      icon: Headphones,
      title: t('process.step4.title'),
      description: t('process.step4.description'),
      details: getStepDetails('step4')
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-secondary/30 via-accent/30 to-background">
      <div className="container max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary dark:text-white mb-4">
            {t('process.title')}
          </h2>
          <p className="text-xl text-muted-foreground">
            {t('process.description')}
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