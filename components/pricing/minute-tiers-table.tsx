"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { pricingTiers } from "@/lib/data/pricing-plans";
import { useI18n } from "@/lib/i18n";
import { CheckCircle } from "lucide-react";

export function MinuteTiersTable() {
  const { t } = useI18n();

  // Funktion zum Generieren der lokalisierten Beschreibung
  const getLocalizedDescription = (tier: any) => {
    if (tier.to === Infinity) {
      return `${t('minuteTiers.from')} ${tier.from.toLocaleString()} ${t('minuteTiers.minutes')}`;
    } else if (tier.from === 1) {
      return `${t('minuteTiers.upTo')} ${tier.to.toLocaleString()} ${t('minuteTiers.minutes')}`;
    } else {
      return `${tier.from.toLocaleString()} - ${tier.to.toLocaleString()} ${t('minuteTiers.minutes')}`;
    }
  };

  return (
    <div className="py-16 bg-gradient-to-b from-secondary/25 via-accent/30 to-accent/40">
      <div className="container max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary dark:text-white mb-4">
            {t('minuteTiers.title')}
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            {t('minuteTiers.subtitle')}
          </p>
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-lg px-4 py-2">
            <CheckCircle className="w-4 h-4 mr-2" />
            {t('minuteTiers.badge')}
          </Badge>
        </div>

        <Card className="overflow-hidden">
          <CardHeader className="bg-primary/5 border-b">
            <CardTitle className="text-xl text-center">
              {t('minuteTiers.tableTitle')}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-4 font-semibold">{t('minuteTiers.minuteRange')}</th>
                    <th className="text-center p-4 font-semibold">{t('minuteTiers.pricePerMinute')}</th>
                    <th className="text-right p-4 font-semibold">{t('minuteTiers.exampleCosts')}</th>
                  </tr>
                </thead>
                <tbody>
                  {pricingTiers.map((tier, index) => (
                    <tr 
                      key={index} 
                      className={`border-b hover:bg-muted/30 transition-colors ${
                        index === 0 ? 'bg-primary/5' : ''
                      }`}
                    >
                      <td className="p-4">
                        <div className="font-medium">{getLocalizedDescription(tier)}</div>
                        <div className="text-sm text-muted-foreground">
                          {tier.from.toLocaleString()} - {
                            tier.to === Infinity 
                              ? '∞' 
                              : tier.to.toLocaleString()
                          } {t('minuteTiers.minutes')}
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="text-lg font-bold text-primary">
                          {tier.pricePerMinute.toFixed(2).replace('.', ',')} {t('minuteTiers.euro')}
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <div className="font-medium">
                          {tier.to === Infinity ? (
                            <>
                              {(15000 * tier.pricePerMinute).toLocaleString('de-DE', {
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0
                              })} {t('minuteTiers.euro')}
                            </>
                          ) : (
                            <>
                              {(tier.to * tier.pricePerMinute).toLocaleString('de-DE', {
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0
                              })} {t('minuteTiers.euro')}
                            </>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {tier.to === Infinity ? (
                            `${t('minuteTiers.upTo')} 15.000 ${t('minuteTiers.minutes')}`
                          ) : (
                            `${t('minuteTiers.upTo')} ${tier.to.toLocaleString('de-DE')} ${t('minuteTiers.minutes')}`
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Micro-FAQ */}
        <div className="mt-12">
          <Card className="bg-card/60 backdrop-blur-sm border border-border/50">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg text-center text-primary">
                {t('minuteTiers.billingHints')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2"></div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{t('minuteTiers.billing')}</h4>
                      <p className="text-sm text-muted-foreground">
                        {t('minuteTiers.billingDesc')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2"></div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{t('minuteTiers.contract')}</h4>
                      <p className="text-sm text-muted-foreground">
                        {t('minuteTiers.contractDesc')}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2"></div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{t('minuteTiers.scaling')}</h4>
                      <p className="text-sm text-muted-foreground">
                        {t('minuteTiers.scalingDesc')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2"></div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{t('minuteTiers.support')}</h4>
                      <p className="text-sm text-muted-foreground">
                        {t('minuteTiers.supportDesc')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center p-6">
            <div className="text-2xl font-bold text-primary mb-2">{t('minuteTiers.noBasicFee')}</div>
                                        <div className="text-muted-foreground">{t('minuteTiers.basicFee')}</div>
          </Card>
          <Card className="text-center p-6">
            <div className="text-2xl font-bold text-primary mb-2">{t('minuteTiers.secondAccurate')}</div>
            <div className="text-muted-foreground">{t('minuteTiers.billing')}</div>
          </Card>
          <Card className="text-center p-6">
            <div className="text-2xl font-bold text-primary mb-2">{t('minuteTiers.monthlyBilling')}</div>
            <div className="text-muted-foreground">{t('minuteTiers.invoicing')}</div>
          </Card>
        </div>
      </div>
    </div>
  );
}
