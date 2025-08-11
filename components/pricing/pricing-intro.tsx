"use client";

import { CheckCircle, Shield, Clock, Users, Star } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function PricingIntro() {
  const { t } = useI18n();
  
  return (
    <div className="py-16 bg-gradient-to-b from-primary/10 via-primary/40 to-primary/60">
      <div className="container max-w-7xl mx-auto">
        <div className="max-w-5xl mx-auto mb-12">
          <div className="bg-card/60 backdrop-blur-sm p-12 rounded-xl border border-border/50 shadow-lg">
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
              <div className="bg-card/80 backdrop-blur-sm p-8 rounded-lg border border-border/50 shadow-lg text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <Clock className="h-10 w-10 text-primary mx-auto mb-4" />
                <h5 className="font-semibold text-lg mb-4 text-primary">{t('pricing.pilotDurationTitle')}</h5>
                <p className="text-muted-foreground leading-relaxed">
                  {t('pricing.pilotDurationDesc')}
                </p>
              </div>
              
              <div className="bg-card/80 backdrop-blur-sm p-8 rounded-lg border border-border/50 shadow-lg text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <Shield className="h-10 w-10 text-primary mx-auto mb-4" />
                <h5 className="font-semibold text-lg mb-4 text-primary">{t('pricing.riskFreeTitle')}</h5>
                <p className="text-muted-foreground leading-relaxed">
                  {t('pricing.riskFreeDesc')}
                </p>
              </div>
              
              <div className="bg-card/80 backdrop-blur-sm p-8 rounded-lg border border-border/50 shadow-lg text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <Users className="h-10 w-10 text-primary mx-auto mb-4" />
                <h5 className="font-semibold text-lg mb-4 text-primary">{t('pricing.flexibleTitle')}</h5>
                <p className="text-muted-foreground leading-relaxed">
                  {t('pricing.flexibleDesc')}
                </p>
              </div>
            </div>

            <div className="bg-primary/15 backdrop-blur-sm p-8 rounded-lg border border-primary/30 shadow-md">
              <p className="text-center text-muted-foreground font-medium text-lg leading-relaxed">
                <strong className="text-primary">{t('pricing.riskFreeStart')}</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
