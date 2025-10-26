"use client";

import { TrendingUp, Users, HeadphonesIcon, Calendar, Briefcase, PhoneOutgoing } from "lucide-react";
import { CheckCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function FeaturesSection() {
  const { t } = useI18n();

  const targetGroups = [
    {
      icon: TrendingUp,
      title: t('featuresTarget.targetGroups.sales.title'),
      description: t('featuresTarget.targetGroups.sales.description'),
      gradient: "from-primary/5 to-primary/10",
      iconColor: "text-primary",
      benefits: t('featuresTarget.targetGroups.sales.benefits')
    },
    {
      icon: Users,
      title: t('featuresTarget.targetGroups.staffing.title'),
      description: t('featuresTarget.targetGroups.staffing.description'),
      gradient: "from-tertiary/5 to-tertiary/10",
      iconColor: "text-tertiary",
      benefits: t('featuresTarget.targetGroups.staffing.benefits')
    },
    {
      icon: HeadphonesIcon,
      title: t('featuresTarget.targetGroups.support.title'),
      description: t('featuresTarget.targetGroups.support.description'),
      gradient: "from-accent/5 to-accent/10",
      iconColor: "text-accent",
      benefits: t('featuresTarget.targetGroups.support.benefits')
    },
    {
      icon: Calendar,
      title: t('featuresTarget.targetGroups.appointments.title'),
      description: t('featuresTarget.targetGroups.appointments.description'),
      gradient: "from-primary/5 to-primary/10",
      iconColor: "text-primary",
      benefits: t('featuresTarget.targetGroups.appointments.benefits')
    },
    {
      icon: Briefcase,
      title: t('featuresTarget.targetGroups.internal.title'),
      description: t('featuresTarget.targetGroups.internal.description'),
      gradient: "from-tertiary/5 to-tertiary/10",
      iconColor: "text-tertiary",
      benefits: t('featuresTarget.targetGroups.internal.benefits')
    },
    {
      icon: PhoneOutgoing,
      title: t('featuresTarget.targetGroups.outbound.title'),
      description: t('featuresTarget.targetGroups.outbound.description'),
      gradient: "from-accent/5 to-accent/10",
      iconColor: "text-accent",
      benefits: t('featuresTarget.targetGroups.outbound.benefits')
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-tertiary/20 via-primary/15 to-primary/25">
      <div className="container max-w-6xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <span className="text-xl font-medium text-primary">{t('featuresTarget.badge')}</span>
          </div>
          <h2 className="text-4xl font-bold mb-6 text-foreground">
            {t('featuresTarget.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('featuresTarget.subtitle')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {targetGroups.map((group, index) => (
            <div 
              key={index} 
              className={`relative p-6 rounded-2xl border border-border/70 bg-gradient-to-br ${group.gradient} backdrop-blur-sm
                         transition-all duration-300 ease-out 
                         hover:-translate-y-1 hover:shadow-xl 
                         hover:border-primary/40 group overflow-hidden
                         bg-white/80 dark:bg-gray-900/80`}
              style={{ 
                animationDelay: `${index * 0.1}s`
              }}
            >
              <div className="relative z-10">
                <div className="flex flex-col items-center text-center mb-5">
                  <div className={`flex-shrink-0 w-14 h-14 rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mb-4 shadow-md border border-border/70`}>
                    <group.icon className={`w-7 h-7 ${group.iconColor}`} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300 leading-tight">
                    {group.title}
                  </h3>
                  <p className="text-muted-foreground text-s leading-relaxed font-medium">
                    {group.description}
                  </p>
                </div>
                

              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA - frecher */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/30 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
            <span className="text-base font-bold text-foreground">
              {t('featuresTarget.cta')}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}