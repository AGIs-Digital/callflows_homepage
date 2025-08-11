"use client";

import { PricingCard } from "@/components/pricing/plan-card";
import { monthlyPlans } from "@/lib/data/pricing-plans";
import { useI18n } from "@/lib/i18n";

export function PricingTables() {
  const { t } = useI18n();
  
  return (
    <div className="py-16 bg-gradient-to-b from-secondary/40 to-accent/50">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl text-primary dark:text-white font-bold mb-6">{t('pricing.monthlyPackages')}</h2>
          <p className="text-lg text-muted-foreground mb-12">{t('pricing.pricesExclVat')}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {monthlyPlans.map((plan) => (
            <PricingCard 
              key={plan.name} 
              plan={plan} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}