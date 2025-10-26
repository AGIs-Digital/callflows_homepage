"use client";

import { Search, Cog, Rocket } from "lucide-react";
import { BookingButton } from "@/components/booking/booking-button";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";

export function ProcessSection() {
  const { t } = useI18n();
  
  const steps = [
    {
      number: 1,
      icon: Search,
      title: t('processSteps.steps.step1.title'),
      description: t('processSteps.steps.step1.description'),
      details: t('processSteps.steps.step1.details'),
      gradient: "from-primary/20 to-primary/30",
      iconColor: "text-primary"
    },
    {
      number: 2,
      icon: Cog,
      title: t('processSteps.steps.step2.title'),
      description: t('processSteps.steps.step2.description'),
      details: t('processSteps.steps.step2.details'),
      gradient: "from-accent/20 to-accent/30",
      iconColor: "text-accent"
    },
    {
      number: 3,
      icon: Rocket,
      title: t('processSteps.steps.step3.title'),
      description: t('processSteps.steps.step3.description'),
      details: t('processSteps.steps.step3.details'),
      gradient: "from-tertiary/20 to-tertiary/30",
      iconColor: "text-tertiary"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-primary/25 via-primary/15 to-accent/15">
      <div className="container max-w-6xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <span className="text-xl font-medium text-primary">{t('processSteps.badge')}</span>
          </div>
          <h2 className="text-4xl font-bold text-foreground mb-6">
            {t('processSteps.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('processSteps.subtitle')}
          </p>
        </div>

        {/* 3-Schritte Prozess */}
        <div className="grid md:grid-cols-3 gap-8 relative mb-12">
          {/* Verbindungslinien zwischen Steps */}
          <div className="hidden md:block absolute top-20 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-primary/30 via-accent/30 to-tertiary/30" />
          
          {steps.map((step, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-2xl border border-border/70 bg-gradient-to-br ${step.gradient} backdrop-blur-sm
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
                <p className="text-muted-foreground text-s leading-relaxed mb-6">
                  {step.description}
                </p>
                
                {/* Details */}
                <div className="space-y-2 text-left">
                  {Array.isArray(step.details) && step.details.map((detail, i) => (
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
          <div className="bg-card/60 backdrop-blur-sm rounded-2xl border border-border/70 p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              {t('processSteps.cta.title')}
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {t('processSteps.cta.description')}
            </p>
            <BookingButton 
              buttonText={t('processSteps.cta.buttonText')}
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-gray-900 font-semibold px-8 py-4 text-lg gap-2"
              bookingUrl="https://outlook.office.com/book/booking@callflows.de/?ismsaljsauthenabled"
            />
          </div>
        </div>
      </div>
    </section>
  );
}