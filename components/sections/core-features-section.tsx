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
import { useI18n } from "@/lib/i18n";

export function CoreFeaturesSection() {
  const { t } = useI18n();

  const features = [
    {
      icon: UserCircle,
      title: t('coreFeatures.feature1.title'),
      description: t('coreFeatures.feature1.description')
    },
    {
      icon: Database,
      title: t('coreFeatures.feature2.title'),
      description: t('coreFeatures.feature2.description')
    },
    {
      icon: PhoneForwarded,
      title: t('coreFeatures.feature3.title'),
      description: t('coreFeatures.feature3.description')
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background via-primary/65 to-tertiary/30">
      <div className="container max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary dark:text-white mb-4">
            {t('coreFeatures.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('coreFeatures.subtitle')}
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