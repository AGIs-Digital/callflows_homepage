"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useI18n } from "@/lib/i18n";

export function PricingBillingHints() {
  const { t } = useI18n();

  return (
    <div className="mt-12 max-w-4xl mx-auto">
      <Card className="bg-card/60 backdrop-blur-sm border border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg text-center text-foreground">
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
  );
}

