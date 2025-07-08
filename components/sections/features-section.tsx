"use client";

import { Headphones, Megaphone, PhoneCall, Users } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function FeaturesSection() {
  const { t } = useI18n();

  const features = [
    {
      icon: Headphones,
      title: t('features.feature1.title'),
      description: t('features.feature1.description'),
      items: [
        t('features.feature1.item1'),
        t('features.feature1.item2'),
        t('features.feature1.item3')
      ]
    },
    {
      icon: Megaphone,
      title: t('features.feature2.title'),
      description: t('features.feature2.description'),
      items: [
        t('features.feature2.item1'),
        t('features.feature2.item2'),
        t('features.feature2.item3')
      ]
    },
    {
      icon: PhoneCall,
      title: t('features.feature3.title'),
      description: t('features.feature3.description'),
      items: [
        t('features.feature3.item1'),
        t('features.feature3.item2'),
        t('features.feature3.item3')
      ]
    },
    {
      icon: Users,
      title: t('features.feature4.title'),
      description: t('features.feature4.description'),
      items: [
        t('features.feature4.item1'),
        t('features.feature4.item2'),
        t('features.feature4.item3')
      ]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-accent/30 via-accent/10 to-background">
      <div className="container max-w-6xl">
        <div className="text-center mb-16 section-animate">
          <h2 className="text-4xl font-bold mb-4 text-primary dark:text-white">
            {t('features.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('features.subtitle')}
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
                {feature.items.map((item: string, i: number) => (
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