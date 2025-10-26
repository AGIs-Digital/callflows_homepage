"use client";

import { CheckCircle, Zap, Shield, Users } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookingButton } from "@/components/booking/booking-button";
import { pilotPackage } from "@/lib/data/pricing-plans";
import { useI18n } from "@/lib/i18n";

export function PilotPackageCard() {
  const { t } = useI18n();

  return (
    <div className="h-full flex flex-col">
      <div className="text-center mb-8">
        <h2 className="text-2xl xl:text-3xl font-bold text-primary dark:text-white mb-4">
          {t('pilotPackage.title')}
        </h2>
        <p className="text-base xl:text-lg text-muted-foreground">
          {t('pilotPackage.subtitle')}
        </p>
      </div>

      <Card className="relative border-primary shadow-xl flex-1">
          <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1">
            {t('pilotPackage.badge')}
          </Badge>
          
          <CardHeader className="text-center pt-8 pb-6">
            <h3 className="text-3xl font-bold text-primary dark:text-white mb-2">
              {t('pilotPackage.cardTitle')}
            </h3>
            <p className="text-lg text-muted-foreground mb-6">
              {t('pilotPackage.cardSubtitle')}
            </p>
            
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-4">
                {pilotPackage.setupPrice.toLocaleString('de-DE')} €
                <span className="text-lg font-medium text-muted-foreground ml-2">
                  {t('pilotPackage.oneTime')}
                </span>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 inline-block">
                <div className="text-lg font-semibold text-green-800 dark:text-green-200">
                  {pilotPackage.includedMinutes.toLocaleString('de-DE')} {t('pilotPackage.includedMinutes')}
                </div>
                <div className="text-sm text-green-600 dark:text-green-300">
                  {t('pilotPackage.valueText')} {(pilotPackage.includedMinutes * 0.99).toLocaleString('de-DE')} € {t('pilotPackage.savedValue')}
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6 px-6">
            {/* USP Highlight */}
            <div className="bg-primary/10 rounded-lg p-5 text-center">
              <div className="flex items-center justify-center gap-3 mb-2">
                <Shield className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold text-primary">{t('pilotPackage.noRisk')}</span>
              </div>
              <p className="text-base text-muted-foreground">
                {t('pilotPackage.subtitle')}
              </p>
            </div>

            {/* Bessere 2-Spalten Darstellung */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pilotmonat Leistungen */}
              <div className="space-y-3">
                <h4 className="text-base font-semibold flex items-center">
                  <Zap className="h-5 w-5 text-primary mr-2" />
                  {t('pilotPackage.pilotMonthIncludes')}
                </h4>
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground leading-relaxed">
                      {t('pilotPackage.pilotFeatures.feature1')}
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground leading-relaxed">
                      {t('pilotPackage.pilotFeatures.feature2')}
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground leading-relaxed">
                      {t('pilotPackage.pilotFeatures.feature3')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Nach Go-Live */}
              <div className="space-y-3">
                <h4 className="text-base font-semibold flex items-center">
                  <Users className="h-5 w-5 text-primary mr-2" />
                  {t('pilotPackage.afterGoLive')}
                </h4>
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{t('pilotPackage.noBasicFee')}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{t('pilotPackage.tierPricing')}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{t('pilotPackage.secondAccurateBilling')}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="pt-2 pb-6">
            <BookingButton 
              buttonText={t('pilotPackage.startPilotMonth')}
              className="w-full"
              variant="default"
              size="lg"
              showArrow={true}
            />
          </CardFooter>
      </Card>
    </div>
  );
}
