"use client";

import { PricingCard } from "@/components/pricing/plan-card";
import { monthlyPlans } from "@/lib/data/pricing-plans";
import { Info, CheckCircle, Shield, Clock, Users, Star } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function PricingTables() {
  const { t } = useI18n();
  
  return (
    <div className="mb-16">
      {/* Monthly Plans */}
      <div className="mb-20">
        <div className="text-center mb-16">
          {/* Infotext zur Preisstruktur */}
          <div className="max-w-5xl mx-auto mb-12">
            <div className="bg-muted/50 p-12 rounded-xl border">
              <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
                {t('pricing.intro')}
              </p>
              
              <div className="bg-card p-10 rounded-lg border mb-12">
                <h4 className="text-xl font-semibold mb-8 flex items-center gap-3">
                  <Star className="h-6 w-6 text-[#FFB703]" />
                  {t('pricing.starterTitle')}
                </h4>
                <p className="text-lg text-muted-foreground mb-8 text-left leading-relaxed">
                  {t('pricing.starterDescription')}
                </p>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-lg mb-2">{t('pricing.onboardingTitle')}</p>
                      <p className="text-muted-foreground">{t('pricing.onboardingDesc')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-lg mb-2">{t('pricing.callsTitle')}</p>
                      <p className="text-muted-foreground">{t('pricing.callsDesc')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-lg mb-2">{t('pricing.monitoringTitle')}</p>
                      <p className="text-muted-foreground">{t('pricing.monitoringDesc')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-lg mb-2">{t('pricing.optimizationTitle')}</p>
                      <p className="text-muted-foreground">{t('pricing.optimizationDesc')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-lg mb-2">{t('pricing.minutesTitle')}</p>
                      <p className="text-muted-foreground">{t('pricing.minutesDesc')}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-lg mb-2">{t('pricing.crmTitle')}</p>
                      <p className="text-muted-foreground">{t('pricing.crmDesc')}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-10 mb-12">
                <div className="bg-card p-8 rounded-lg border text-center">
                  <Clock className="h-10 w-10 text-primary mx-auto mb-4" />
                  <h5 className="font-semibold text-lg mb-4">{t('pricing.pilotDurationTitle')}</h5>
                  <p className="text-muted-foreground leading-relaxed">
                    {t('pricing.pilotDurationDesc')}
                  </p>
                </div>
                
                <div className="bg-card p-8 rounded-lg border text-center">
                  <Shield className="h-10 w-10 text-primary mx-auto mb-4" />
                  <h5 className="font-semibold text-lg mb-4">{t('pricing.riskFreeTitle')}</h5>
                  <p className="text-muted-foreground leading-relaxed">
                    {t('pricing.riskFreeDesc')}
                  </p>
                </div>
                
                <div className="bg-card p-8 rounded-lg border text-center">
                  <Users className="h-10 w-10 text-primary mx-auto mb-4" />
                  <h5 className="font-semibold text-lg mb-4">{t('pricing.flexibleTitle')}</h5>
                  <p className="text-muted-foreground leading-relaxed">
                    {t('pricing.flexibleDesc')}
                  </p>
                </div>
              </div>

              <div className="bg-primary/10 p-8 rounded-lg border border-primary/20">
                <p className="text-center text-muted-foreground font-medium text-lg leading-relaxed">
                  <strong className="text-primary">{t('pricing.riskFreeStart')}</strong>
                </p>
              </div>
            </div>
          </div>
          
          <h3 className="text-4xl text-primary dark:text-white font-bold mb-6">{t('pricing.monthlyPackages')}</h3>
          <p className="text-lg text-muted-foreground mb-12">{t('pricing.pricesExclVat')}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {monthlyPlans.map((plan) => (
            <PricingCard 
              key={plan.name} 
              plan={plan} 
            />
          ))}
        </div>
      </div>

      {/* Zusätzliche Minutenpakete Erklärung */}
      <div className="max-w-5xl mx-auto bg-muted p-10 rounded-lg mt-20">
        <div className="flex items-start gap-6">
          <div className="bg-primary rounded-full p-3 flex-shrink-0">
            <Info className="h-7 w-7 text-primary-foreground" />
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-6">{t('pricing.additionalTitle')}</h3>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {t('pricing.additionalDesc')}
            </p>
            
            <div className="space-y-6">
              <div className="bg-card p-8 rounded-md border">
                <h4 className="font-semibold text-lg mb-3">{t('pricing.flexExpandTitle')}</h4>
                <p className="text-muted-foreground leading-relaxed">
                  {t('pricing.flexExpandDesc')}
                </p>
              </div>
              
              <div className="bg-card p-8 rounded-md border">
                <h4 className="font-semibold text-lg mb-3">{t('pricing.noExpiryTitle')}</h4>
                <p className="text-muted-foreground leading-relaxed">
                  {t('pricing.noExpiryDesc')}
                </p>
              </div>
              
              <div className="bg-card p-8 rounded-md border">
                <h4 className="font-semibold text-lg mb-3">{t('pricing.activeMonitoringTitle')}</h4>
                <p className="text-muted-foreground leading-relaxed">
                  {t('pricing.activeMonitoringDesc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}