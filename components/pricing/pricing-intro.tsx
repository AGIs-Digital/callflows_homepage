"use client";

import { CheckCircle, Shield, Clock, Users, Star } from "lucide-react";
import { GlossaryBadge } from "@/components/ui/glossary-badge";
import { useI18n } from "@/lib/i18n";

export function PricingIntro() {
  const { t } = useI18n();
  
  return (
    <div className="py-16 bg-gradient-to-b from-tertiary/20 via-primary/30 to-primary/35">
      <div className="container max-w-6xl mx-auto">
        <div className="max-w-5xl mx-auto mb-12">
          <div className="bg-card/60 backdrop-blur-sm p-12 rounded-xl border border-border/70 shadow-lg">
            {/* Einführungstext */}
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                {t('pricing.introTitle')}
              </h3>
              <p className="text-lg text-muted-foreground">
                {t('pricing.introSubtitle')}
              </p>
            </div>

            {/* Schritt-für-Schritt Anleitung */}
            <div className="space-y-8 mb-12">
              {/* Schritt 1 */}
              <div className="flex items-start gap-4 p-6 bg-card/80 rounded-lg border border-border/70">
                <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
                  1
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-primary mb-2 flex items-center gap-2">
                    🎯 {t('pricing.step1Title')}
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {t('pricing.step1Description')}
                  </p>
                </div>
              </div>

              {/* Schritt 2 */}
              <div className="flex items-start gap-4 p-6 bg-card/80 rounded-lg border border-border/70">
                <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
                  2
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-primary mb-2 flex items-center gap-3">
                    🛠️ {t('pricing.step2Title')}
                    <GlossaryBadge />
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {t('pricing.step2Description')}
                  </p>
                </div>
              </div>

              {/* Schritt 3 */}
              <div className="flex items-start gap-4 p-6 bg-card/80 rounded-lg border border-border/70">
                <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
                  3
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-primary mb-2 flex items-center gap-2">
                    📊 {t('pricing.step3Title')}
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {t('pricing.step3Description')}
                  </p>
                </div>
              </div>

              {/* Schritt 4 */}
              <div className="flex items-start gap-4 p-6 bg-card/80 rounded-lg border border-border/70">
                <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
                  4
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-primary mb-2 flex items-center gap-2">
                    💰 {t('pricing.step4Title')}
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {t('pricing.step4Description')}
                  </p>
                </div>
              </div>

              {/* Erweiterungen */}
              <div className="flex items-start gap-4 p-6 bg-gradient-to-r from-accent/20 to-background rounded-lg border border-primary/20">
                <div className="flex-shrink-0 w-12 h-12 bg-accent rounded-full flex items-center justify-center text-white font-bold text-lg">
                  +
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-tertiary mb-2 flex items-center gap-2">
                    🔧 {t('pricing.extensionsTitle')}
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {t('pricing.extensionsDescription')}
                  </p>
                </div>
              </div>
            </div>
            


              <div className="relative bg-accent/15 backdrop-blur-sm p-8 rounded-lg border border-primary/30 shadow-md overflow-hidden">
                <div className="pointer-events-none absolute -inset-x-10 -top-8 h-24 rotate-3 bg-gradient-to-r from-white/20 via-primary/20 to-accent/20" />
              <p className="text-center text-muted-foreground font-medium text-lg leading-relaxed">
                <strong className="text-foreground">{t('pricing.riskFreeStart')}</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
