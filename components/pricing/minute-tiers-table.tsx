"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { pricingTiers } from "@/lib/data/pricing-plans";
import { useI18n } from "@/lib/i18n";

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
    <div className="h-full flex flex-col">
      <div className="text-center mb-8">
        <h2 className="text-2xl xl:text-3xl font-bold text-foreground mb-4">
          {t('minuteTiers.title')}
        </h2>
        <p className="text-base xl:text-lg text-muted-foreground">
          {t('minuteTiers.subtitle')}
        </p>
      </div>

      <Card className="overflow-hidden flex-1">
          <CardHeader className="bg-primary/5 border-b">
            <CardTitle className="text-xl text-center">
              {t('minuteTiers.tableTitleShort')}
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
                        <div className="text-s text-muted-foreground">
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
                        <div className="text-s text-muted-foreground">
                          {tier.to === Infinity ? (
                            `${t('minuteTiers.upToAmount')} 15.000 ${t('minuteTiers.minutes')}`
                          ) : (
                            `${t('minuteTiers.upToAmount')} ${tier.to.toLocaleString('de-DE')} ${t('minuteTiers.minutes')}`
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {/* Enterprise Row */}
                  <tr className="bg-primary/10 border-t-2 border-primary/20">
                    <td className="py-4 px-4" colSpan={3}>
                      <div className="text-center">
                        <span className="font-semibold text-primary text-sm">
                          {t('minuteTiers.enterpriseTitle')}
                        </span>
                        <span className="text-sm text-muted-foreground ml-2">
                          {t('minuteTiers.enterpriseDescription')}
                        </span>
                      </div>
                    </td>
                  </tr>
                  {/* Tax Notice Row */}
                  <tr className="bg-muted/30">
                    <td className="py-2 px-4 text-center text-sm text-muted-foreground" colSpan={3}>
                      {t('minuteTiers.taxNotice')}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
    </div>
  );
}
