"use client";

import { CheckCircle } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookingButton } from "@/components/booking/booking-button";
import { PricingPlan } from "@/lib/types/pricing";
import { useI18n } from "@/lib/i18n";

interface PricingCardProps {
  plan: PricingPlan;
}

export function PricingCard({ plan }: PricingCardProps) {
  const { t, tArray } = useI18n();

  // Map plan names to translation keys
  const getTranslatedPlanData = (planName: string) => {
    switch (planName) {
      case 'Entlastung':
        return {
          name: t('pricing.entlastungName'),
          subtitle: t('pricing.entlastungSubtitle'),
          highlights: tArray('pricing.entlastungHighlights'),
          cta: t('pricing.entlastungCta')
        };
      case 'Wachstum':
        return {
          name: t('pricing.wachstumName'),
          subtitle: t('pricing.wachstumSubtitle'),
          highlights: tArray('pricing.wachstumHighlights'),
          cta: t('pricing.wachstumCta')
        };
      case 'Enterprise':
        return {
          name: t('pricing.individuellName'),
          subtitle: t('pricing.individuellSubtitle'),
          highlights: tArray('pricing.individuellHighlights'),
          cta: t('pricing.individuellCta')
        };
      default:
        return {
          name: plan.name,
          subtitle: plan.subtitle,
          highlights: plan.highlights,
          cta: plan.cta
        };
    }
  };

  const translatedData = getTranslatedPlanData(plan.name);

  // Funktion um USP-Highlights zu erkennen und zu stylen
  const isUSPHighlight = (highlight: string) => {
    const uspKeywords = [
      'Unternehmensberatung KI-Transformation',
      'Corporate Consulting AI Transformation', 
      'Conseil en Transformation IA d\'Entreprise',
      'Consultoría Empresarial Transformación IA'
    ];
    return uspKeywords.some(keyword => highlight.includes(keyword));
  };

  return (
    <Card className={`relative flex flex-col h-full min-h-[100px] ${plan.popular ? 'border-primary shadow-lg' : ''}`}>
      {plan.popular && (
        <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
          {t('pricing.popular')}
        </Badge>
      )}
      
      <CardHeader className="text-center pt-8">
        <h4 className="text-2xl font-bold">{translatedData.name}</h4>
        <p className="text-muted-foreground">{translatedData.subtitle}</p>
        
        <div className="mt-6">
          {plan.isCustom ? (
            <div className="text-2xl font-bold text-primary">
              {t('pricing.priceOnRequest')}
            </div>
          ) : (
            <div className="text-center">
              {/* Gesamtpaketpreis prominent darstellen */}
              <div className="text-3xl font-bold text-primary mb-4">
                {(plan.price * plan.minutesIncluded).toLocaleString('de-DE')} €
                <span className="text-lg font-medium text-muted-foreground ml-2">
                  {t('pricing.monthly')}
                </span>
              </div>
              
              {/* Minutenanzahl und Preis pro Minute kompakt */}
              <div className="bg-muted/50 rounded-lg p-3">
                <div className="text-lg font-semibold text-foreground">
                  {plan.minutesIncluded.toLocaleString('de-DE')} {t('pricing.aiMinutes')}
                  <span className="text-sm text-muted-foreground ml-2">
                    ({plan.price.toFixed(2).replace('.', ',')} € {t('pricing.perMinute')})
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6 flex-1">
        {/* Plan Highlights */}
        {translatedData.highlights.length > 0 && (
          <div className="space-y-3">
            {translatedData.highlights.map((highlight, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <p className={`text-sm leading-relaxed ${isUSPHighlight(highlight) ? 'text-primary font-bold' : 'text-muted-foreground'}`}>
                  {highlight}
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-0 mt-auto">
        <BookingButton 
          buttonText={translatedData.cta}
          className="w-full"
          variant={plan.popular ? "default" : "outline"}
          size="lg"
          showArrow={false}
        />
      </CardFooter>
    </Card>
  );
}