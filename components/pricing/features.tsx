"use client";

import { CheckCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function PricingFeatures() {
  const { t, tArray } = useI18n();

  return (
    <div className="bg-muted/50 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold mb-4">{t('pricing.featuresTitle')}</h3>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {/* Communication */}
          <div className="bg-card p-8 rounded-lg border">
            <h4 className="text-2xl font-semibold mb-6 text-center">{t('pricing.communicationTitle')}</h4>
            <div className="space-y-4">
              {tArray('pricing.communicationItems').map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-muted-foreground leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Technology */}
          <div className="bg-card p-8 rounded-lg border">
            <h4 className="text-2xl font-semibold mb-6 text-center">{t('pricing.technologyTitle')}</h4>
            <div className="space-y-4">
              {tArray('pricing.technologyItems').map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-muted-foreground leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Personalization */}
          <div className="bg-card p-8 rounded-lg border">
            <h4 className="text-2xl font-semibold mb-6 text-center">{t('pricing.personalizationTitle')}</h4>
            <div className="space-y-4">
              {tArray('pricing.personalizationItems').map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-muted-foreground leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}