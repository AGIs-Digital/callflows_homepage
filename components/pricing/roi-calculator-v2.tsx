"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { TrendingUp, Phone, Clock, Percent, Euro, Calculator, Target, Users, Trophy, Info } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function ROICalculatorV2() {
  const { t } = useI18n();
  
  // Input-Parameter
  const [callsPerDay, setCallsPerDay] = useState([60]); // Default: 60, Range: 20-1000 in 10er Schritten
  const [callDurationSeconds, setCallDurationSeconds] = useState([60]); // Default: 60s, Range: 30s-300s in 5s Schritten
  const [conversionRate, setConversionRate] = useState([12]); // Default: 12%, Range: 1-50% (Lead-Qualifizierung)
  const [closingRate, setClosingRate] = useState([5]); // Default: 5%, Range: 0-100% (Abschlussrate)
  const [dealValue, setDealValue] = useState(2500); // Default: 2500€, Eingabefeld

  // Berechnungen
  const monthlyCallsTotal = callsPerDay[0] * 22; // 22 Arbeitstage
  const callDurationMinutes = callDurationSeconds[0] / 60; // Sekunden zu Minuten
  const totalMinutesPerMonth = Math.round(monthlyCallsTotal * callDurationMinutes);
  
  // KI-Kosten nach Staffelung berechnen
  const calculateKICosts = (totalMinutes: number): number => {
    let cost = 0;
    let remainingMinutes = totalMinutes;

    // Wichtig: Alle Minuten werden zum höchsten erreichten Staffelpreis berechnet
    if (totalMinutes <= 1000) {
      cost = totalMinutes * 0.99;
    } else if (totalMinutes <= 2000) {
      cost = totalMinutes * 0.94;
    } else if (totalMinutes <= 5000) {
      cost = totalMinutes * 0.89;
    } else if (totalMinutes <= 10000) {
      cost = totalMinutes * 0.84;
    } else {
      cost = totalMinutes * 0.79;
    }

    return cost;
  };

  const kiCostsMonthly = calculateKICosts(totalMinutesPerMonth);
  
  // Conversion-Berechnungen
  const qualifiedLeads = Math.round(monthlyCallsTotal * (conversionRate[0] / 100));
  const actualDeals = Math.round(qualifiedLeads * (closingRate[0] / 100));
  const monthlyRevenue = actualDeals * dealValue;
  
  // ROI-Berechnungen (korrigierte Formel)
  const profit = monthlyRevenue - kiCostsMonthly;
  const roi = kiCostsMonthly > 0 ? Math.round((profit / kiCostsMonthly) * 100) : 0;
  const revenuePerEuro = kiCostsMonthly > 0 ? Math.round(monthlyRevenue / kiCostsMonthly) : 0;
  
  // Kosten pro Lead
  const costPerLead = qualifiedLeads > 0 ? Math.round(kiCostsMonthly / qualifiedLeads) : 0;

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('de-DE').format(num);
  };

  const formatPercent = (percent: number): string => {
    return new Intl.NumberFormat('de-DE').format(percent);
  };

  // Welche Staffel wird erreicht? (Farbschema: von rot/neutral zu grün = besser)
  const getCurrentTier = (minutes: number): { tier: string; price: number; color: string; bgColor: string; borderColor: string } => {
    if (minutes <= 1000) return { 
      tier: t('roiCalculator.tiers.tier1'), 
      price: 0.99, 
      color: "text-red-600 dark:text-red-400", 
      bgColor: "bg-red-50 dark:bg-red-900/20",
      borderColor: "border-red-200 dark:border-red-800"
    };
    if (minutes <= 2000) return { 
      tier: t('roiCalculator.tiers.tier2'), 
      price: 0.94, 
      color: "text-orange-600 dark:text-orange-400", 
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      borderColor: "border-orange-200 dark:border-orange-800"
    };
    if (minutes <= 5000) return { 
      tier: t('roiCalculator.tiers.tier3'), 
      price: 0.89, 
      color: "text-amber-600 dark:text-amber-400", 
      bgColor: "bg-amber-50 dark:bg-amber-900/20",
      borderColor: "border-amber-200 dark:border-amber-800"
    };
    if (minutes <= 10000) return { 
      tier: t('roiCalculator.tiers.tier4'), 
      price: 0.84, 
      color: "text-blue-600 dark:text-blue-400", 
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      borderColor: "border-blue-200 dark:border-blue-800"
    };
    return { 
      tier: t('roiCalculator.tiers.tier5'), 
      price: 0.79, 
      color: "text-green-600 dark:text-green-400", 
      bgColor: "bg-green-50 dark:bg-green-900/20",
      borderColor: "border-green-200 dark:border-green-800"
    };
  };

  const currentTier = getCurrentTier(totalMinutesPerMonth);

  return (
    <div className="py-16 bg-gradient-to-b from-primary/25 via-tertiary/15 to-tertiary/20">
      <div className="container max-w-6xl mx-auto">
                  <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="bg-primary rounded-full p-2">
                <Calculator className="h-5 w-5 text-primary-foreground" />
              </div>
              <Badge variant="secondary" className="px-3 py-1">
                {t('roiCalculator.badge')}
              </Badge>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              {t('roiCalculator.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('roiCalculator.subtitle')}
            </p>
          </div>

        {/* Einheitliche Card */}
        <Card className="bg-white/95 dark:bg-card/95 backdrop-blur-md border-border/70 shadow-2xl max-w-6xl mx-auto">
          <CardContent className="p-8">
            <div className="grid lg:grid-cols-2 gap-12">
              
              {/* Eingabe-Parameter */}
                              <div className="space-y-8">
                  <div className="mb-6">
                                         <h3 className="text-2xl font-bold text-primary mb-2 flex items-center gap-2">
                       <Target className="h-6 w-6 text-primary" />
                       {t('roiCalculator.parameters.title')}
                     </h3>
                     <p className="text-base text-muted-foreground">{t('roiCalculator.parameters.subtitle')}</p>
                  </div>

                                 {/* Anrufe pro Tag */}
                 <div className="space-y-3">
                   <div className="flex items-center justify-between">
                     <label className="text-base font-medium flex items-center gap-2">
                       <Phone className="h-4 w-4 text-primary" />
                       {t('roiCalculator.parameters.callsPerDay')}
                       <TooltipProvider>
                         <Tooltip>
                           <TooltipTrigger asChild>
                             <Info className="h-5 w-5 text-muted-foreground hover:text-primary cursor-help transition-colors" />
                           </TooltipTrigger>
                           <TooltipContent side="top" className="max-w-sm">
                             <div className="space-y-2 text-base">
                               <p className="font-medium">{t('roiCalculator.parameters.callsPerDayTooltip.title')}</p>
                               <div className="space-y-1">
                                 <p><strong>{t('roiCalculator.parameters.callsPerDayTooltip.cold')}</strong></p>
                                 <p><strong>{t('roiCalculator.parameters.callsPerDayTooltip.warm')}</strong></p>
                               </div>
                               <p className="text-sm text-muted-foreground">
                                 {t('roiCalculator.parameters.callsPerDayTooltip.note')}
                               </p>
                             </div>
                           </TooltipContent>
                         </Tooltip>
                       </TooltipProvider>
                     </label>
                     <Badge variant="outline" className="font-bold text-sm px-2 py-1">
                       {callsPerDay[0]}
                     </Badge>
                   </div>
                                     <Slider
                     value={callsPerDay}
                     onValueChange={setCallsPerDay}
                     max={1000}
                     min={20}
                     step={10}
                     className="w-full"
                   />
                   <div className="flex justify-between text-sm text-muted-foreground font-medium">
                     <span>20</span>
                     <span>{formatNumber(monthlyCallsTotal)} {t('roiCalculator.parameters.callsPerMonth')}</span>
                     <span>1.000</span>
                   </div>
                </div>

                {/* Anrufdauer */}
                <div className="space-y-3">
                                     <div className="flex items-center justify-between">
                     <label className="text-base font-medium flex items-center gap-2">
                       <Clock className="h-4 w-4 text-primary" />
                       {t('roiCalculator.parameters.averageCallDuration')}
                     </label>
                                         <Badge variant="outline" className="font-bold text-sm px-2 py-1">
                       {callDurationSeconds[0]}s
                     </Badge>
                  </div>
                  <Slider
                    value={callDurationSeconds}
                    onValueChange={setCallDurationSeconds}
                    max={300}
                    min={30}
                    step={5}
                    className="w-full"
                  />
                                     <div className="flex justify-between text-sm text-muted-foreground font-medium">
                     <span>30s</span>
                     <span>{formatNumber(totalMinutesPerMonth)} {t('roiCalculator.parameters.minutesPerMonth')}</span>
                     <span>5min</span>
                   </div>
                </div>

                {/* Conversion Rate */}
                <div className="space-y-3">
                                     <div className="flex items-center justify-between">
                     <label className="text-base font-medium flex items-center gap-2">
                       <Percent className="h-4 w-4 text-primary" />
                       {t('roiCalculator.parameters.conversionRate')}
                     </label>
                                         <Badge variant="outline" className="font-bold text-sm px-2 py-1">
                       {conversionRate[0]}%
                     </Badge>
                  </div>
                  <Slider
                    value={conversionRate}
                    onValueChange={setConversionRate}
                    max={50}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                                     <div className="flex justify-between text-sm text-muted-foreground font-medium">
                     <span>1%</span>
                     <span>{qualifiedLeads} {t('roiCalculator.parameters.qualifiedLeadsMonth')}</span>
                     <span>50%</span>
                   </div>
                </div>

                {/* Closing Rate */}
                <div className="space-y-3">
                                     <div className="flex items-center justify-between">
                     <label className="text-base font-medium flex items-center gap-2">
                       <Trophy className="h-4 w-4 text-primary" />
                       {t('roiCalculator.revenue.closingRateQualifiedLeads')}
                     </label>
                                         <Badge variant="outline" className="font-bold text-base px-3 py-1">
                       {closingRate[0]}%
                     </Badge>
                  </div>
                  <Slider
                    value={closingRate}
                    onValueChange={setClosingRate}
                    max={100}
                    min={0}
                    step={1}
                    className="w-full"
                  />
                                     <div className="flex justify-between text-sm text-muted-foreground font-medium">
                     <span>0%</span>
                     <span>{actualDeals} {t('roiCalculator.parameters.actualDealsMonth')}</span>
                     <span>100%</span>
                   </div>
                </div>

                {/* Dealwert */}
                <div className="space-y-3">
                                     <Label className="text-base font-medium flex items-center gap-2">
                     <Euro className="h-4 w-4 text-primary" />
                     {t('roiCalculator.parameters.dealValue')}
                   </Label>
                  <div className="relative">
                    <Input
                      type="number"
                      value={dealValue}
                      onChange={(e) => setDealValue(Number(e.target.value))}
                      placeholder="2500"
                      className="text-lg font-semibold pl-8"
                    />
                    <Euro className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>

                                 {/* Staffel-Anzeige */}
                 <div className={`${currentTier.bgColor} rounded-lg p-4 border ${currentTier.borderColor}`}>
                   <div className="flex items-center justify-between">
                     <span className="text-base font-medium text-muted-foreground">{t('roiCalculator.costs.currentTierLabel')}</span>
                     <Badge variant="outline" className={`${currentTier.color} border-current font-bold text-sm px-2 py-1`}>
                       {currentTier.tier}
                     </Badge>
                   </div>
                   <div className="flex items-center justify-between mt-2">
                     <span className="text-base text-muted-foreground">{t('roiCalculator.costs.pricePerMinuteLabel')}</span>
                     <span className={`font-bold text-sm ${currentTier.color}`}>
                       {currentTier.price.toFixed(2).replace('.', ',')} €
                     </span>
                   </div>
                 </div>
              </div>

              {/* Ergebnisse */}
              <div className="space-y-6">
                <div className="mb-6">
                                     <h3 className="text-2xl font-bold text-primary mb-2 flex items-center gap-2">
                     <TrendingUp className="h-6 w-6 text-primary" />
                     {t('roiCalculator.revenue.title')}
                   </h3>
                   <p className="text-base text-muted-foreground">{t('roiCalculator.revenue.subtitle')}</p>
                </div>

                                 {/* KI-Kosten */}
                 <div className="bg-accent/10 rounded-lg p-6 border border-accent/20">
                   <div className="flex items-center justify-between mb-2">
                     <span className="text-base text-accent font-medium">{t('roiCalculator.costs.kiCostsMonth')}</span>
                     <Calculator className="w-6 h-6 text-accent" />
                   </div>
                   <p className="text-4xl font-bold text-accent mb-1">
                     {formatCurrency(kiCostsMonthly)}
                   </p>
                   <p className="text-sm text-accent/70">
                     {formatNumber(totalMinutesPerMonth)} {t('roiCalculator.costs.minutesAtPrice')} {currentTier.price.toFixed(2)}€
                   </p>
                 </div>

                                 {/* Generierter Umsatz */}
                 <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
                   <div className="flex items-center justify-between mb-2">
                     <span className="text-base text-green-700 dark:text-green-300 font-medium">{t('roiCalculator.costs.estimatedRevenue')}</span>
                     <TrendingUp className="w-6 h-6 text-green-600" />
                   </div>
                   <p className="text-4xl font-bold text-green-600 mb-1">
                     {formatCurrency(monthlyRevenue)}
                   </p>
                   <p className="text-sm text-green-600/70">
                     {actualDeals} {t('roiCalculator.revenue.deals')} × {formatCurrency(dealValue)}
                   </p>
                 </div>

                {/* ROI Hauptergebnis */}
                <div className="bg-primary/10 rounded-lg p-6 border border-primary/20 text-center">
                  <p className="text-base text-primary mb-2 font-medium">{t('roiCalculator.costs.returnOnInvestment')}</p>
                  <p className="text-5xl font-bold text-primary mb-2">
                    {formatPercent(roi)}%
                  </p>
                  <p className="text-base text-primary/70">
                    {revenuePerEuro}€ {t('roiCalculator.costs.revenuePerInvestment')}
                  </p>
                </div>



                                 {/* Lead-Performance Übersicht */}
                <div className="bg-accent/10 rounded-lg p-4 border border-accent/20">
                  <h4 className="text-base font-medium text-accent mb-3">{t('roiCalculator.costs.leadPerformanceDetail')}</h4>
                  <div className="space-y-2 text-base">
                    <div className="flex justify-between">
                      <span className="text-accent/80">{t('roiCalculator.costs.qualifiedLeadsLabel')}</span>
                      <span className="font-medium text-accent">{qualifiedLeads}{t('roiCalculator.revenue.perMonth')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-accent/80">{t('roiCalculator.costs.costPerLeadLabel')}</span>
                      <span className="font-medium text-accent">{formatCurrency(costPerLead)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-accent/80">{t('roiCalculator.costs.conversionRateLabel')}</span>
                      <span className="font-medium text-accent">{closingRate[0]}%</span>
                    </div>
                  </div>
                </div>


              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
