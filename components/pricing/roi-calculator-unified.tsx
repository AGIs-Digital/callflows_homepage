"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Phone, Clock, Euro, Calculator, Zap } from "lucide-react";
import { useI18n } from "@/lib/i18n";

// Diskrete Gehaltswerte: 556€, 750€, dann 250€-Schritte
const SALARY_VALUES = [
  556, 750, 1000, 1250, 1500, 1750, 2000, 2250, 2500, 2750, 3000, 
  3250, 3500, 3750, 4000, 4250, 4500, 4750, 5000, 5250, 5500, 5750, 6000
] as const;

export function ROICalculatorUnified() {
  const { t } = useI18n();
  
  // Schieberegler-Werte
  const [employees, setEmployees] = useState([2]);
  const [salaryIndex, setSalaryIndex] = useState([10]); // Index 10 = 3000€
  const [callsPerDay, setCallsPerDay] = useState([50]);
  const [avgCallDuration, setAvgCallDuration] = useState([2]);
  const [automationRate, setAutomationRate] = useState([90]);
  
  // Aktuelles Gehalt basierend auf Index
  const monthlySalary = SALARY_VALUES[salaryIndex[0]];

  // Funktion zur Berechnung der Staffelpreise
  const calculateTieredCost = (minutes: number): number => {
    let totalCost = 0;
    let remainingMinutes = minutes;

    // Staffel 1: 1-1000 Minuten = 0,99€
    if (remainingMinutes > 0) {
      const minutesInTier = Math.min(remainingMinutes, 1000);
      totalCost += minutesInTier * 0.99;
      remainingMinutes -= minutesInTier;
    }

    // Staffel 2: 1001-2000 Minuten = 0,94€
    if (remainingMinutes > 0) {
      const minutesInTier = Math.min(remainingMinutes, 1000); // 1001-2000
      totalCost += minutesInTier * 0.94;
      remainingMinutes -= minutesInTier;
    }

    // Staffel 3: 2001-5000 Minuten = 0,89€
    if (remainingMinutes > 0) {
      const minutesInTier = Math.min(remainingMinutes, 3000); // 2001-5000
      totalCost += minutesInTier * 0.89;
      remainingMinutes -= minutesInTier;
    }

    // Staffel 4: 5001-10000 Minuten = 0,84€
    if (remainingMinutes > 0) {
      const minutesInTier = Math.min(remainingMinutes, 5000); // 5001-10000
      totalCost += minutesInTier * 0.84;
      remainingMinutes -= minutesInTier;
    }

    // Staffel 5: ab 10001 Minuten = 0,79€
    if (remainingMinutes > 0) { // ab 10001
      totalCost += remainingMinutes * 0.79;
    }

    return totalCost;
  };

  // Berechnungen
  const calculations = {
    // Monatliche Anrufe
    monthlyCallsTotal: callsPerDay[0] * 22, // 22 Arbeitstage
    automatedCalls: Math.round((callsPerDay[0] * 22) * (automationRate[0] / 100)),
    
    // Zeit pro Anruf in Stunden
    timePerCallHours: avgCallDuration[0] / 60,
    
    // Gesparte Zeit durch Automatisierung 
    savedHours: Math.round((callsPerDay[0] * 22) * (automationRate[0] / 100) * (avgCallDuration[0] / 60)),
    
    // Personalkosten (mit 45% Arbeitgeberanteil)
    monthlyPersonalCosts: employees[0] * monthlySalary * 1.45,
    
    // Gesparte Personalkosten (Anteil der automatisierten Zeit)
    savedPersonalCosts: Math.round((employees[0] * monthlySalary * 1.45) * 
      (((callsPerDay[0] * 22) * (automationRate[0] / 100) * (avgCallDuration[0] / 60)) / 160)), // 160h = Vollzeit
    
    // KI-Kosten
    aiMinutes: Math.round((callsPerDay[0] * 22) * (automationRate[0] / 100) * avgCallDuration[0]),
    aiMonthlyCost: 0,
    
    // ROI
    monthlySavings: 0,
    annualSavings: 0,
    roi: 0,
    costReduction: 0
  };

  // KI-Kosten mit Staffelpreisen berechnen
  calculations.aiMonthlyCost = calculateTieredCost(calculations.aiMinutes);
  
  // Netto-Einsparungen
  calculations.monthlySavings = calculations.savedPersonalCosts - calculations.aiMonthlyCost;
  calculations.annualSavings = calculations.monthlySavings * 12;
  
  // ROI berechnen
  calculations.roi = calculations.aiMonthlyCost > 0 
    ? Math.round((calculations.monthlySavings / calculations.aiMonthlyCost) * 100)
    : 0;
    
  // Kostenreduktion berechnen
  calculations.costReduction = calculations.monthlyPersonalCosts > 0
    ? Math.round((calculations.monthlySavings / calculations.monthlyPersonalCosts) * 100)
    : 0;

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="py-16 bg-gradient-to-b from-primary/25 via-tertiary/15 to-tertiary/20">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="bg-primary rounded-full p-2">
              <Calculator className="h-5 w-5 text-primary-foreground" />
            </div>
            <Badge variant="secondary" className="px-3 py-1">
              {t('pricing.roiCalculator.badge')}
            </Badge>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('pricing.roiCalculator.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('pricing.roiCalculator.subtitle')}
          </p>
        </div>

        {/* Einheitliche Card */}
        <Card className="bg-white/95 dark:bg-card/95 backdrop-blur-md border-border/70 shadow-2xl max-w-5xl mx-auto">
          <CardContent className="p-8">
            <div className="grid lg:grid-cols-2 gap-12">
              
              {/* Eingabe-Parameter */}
              <div className="space-y-8">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-primary mb-2 flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    {t('pricing.roiCalculator.yourSituation')}
                  </h3>
                  <p className="text-sm text-muted-foreground">Passen Sie die Werte an Ihre Situation an</p>
                </div>

                {/* Anzahl Mitarbeiter */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="font-medium flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      {t('pricing.roiCalculator.employees')}
                    </label>
                    <Badge variant="outline" className="font-bold">
                      {employees[0]}
                    </Badge>
                  </div>
                  <Slider
                    value={employees}
                    onValueChange={setEmployees}
                    max={15}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                </div>

                {/* Monatsgehalt */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="font-medium flex items-center gap-2">
                      <Euro className="h-4 w-4 text-primary" />
                      {t('pricing.roiCalculator.monthlySalary')}
                    </label>
                    <Badge variant="outline" className="font-bold">
                      {formatCurrency(monthlySalary)}
                    </Badge>
                  </div>
                  <Slider
                    value={salaryIndex}
                    onValueChange={setSalaryIndex}
                    max={SALARY_VALUES.length - 1}
                    min={0}
                    step={1}
                    className="w-full"
                  />
                </div>

                {/* Anrufe pro Tag */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="font-medium flex items-center gap-2">
                      <Phone className="h-4 w-4 text-primary" />
                      {t('pricing.roiCalculator.callsPerDay')}
                    </label>
                    <Badge variant="outline" className="font-bold">
                      {callsPerDay[0]}
                    </Badge>
                  </div>
                  <Slider
                    value={callsPerDay}
                    onValueChange={setCallsPerDay}
                    max={200}
                    min={10}
                    step={5}
                    className="w-full"
                  />
                </div>

                {/* Gesprächsdauer */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="font-medium flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      {t('pricing.roiCalculator.avgCallDuration')}
                    </label>
                    <Badge variant="outline" className="font-bold">
                      {avgCallDuration[0]} Min.
                    </Badge>
                  </div>
                  <Slider
                    value={avgCallDuration}
                    onValueChange={setAvgCallDuration}
                    max={10}
                    min={1}
                    step={0.5}
                    className="w-full"
                  />
                </div>

                {/* Automatisierungsrate */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="font-medium flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-primary" />
                      {t('pricing.roiCalculator.automationRate')}
                    </label>
                    <Badge variant="outline" className="font-bold">
                      {automationRate[0]}%
                    </Badge>
                  </div>
                  <Slider
                    value={automationRate}
                    onValueChange={setAutomationRate}
                    max={95}
                    min={50}
                    step={5}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Ergebnisse */}
              <div className="space-y-6">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-primary mb-2 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    {t('pricing.roiCalculator.yourSavings')}
                  </h3>
                  <p className="text-sm text-muted-foreground">Ihre monatlichen Einsparungen</p>
                </div>

                {/* Kosten-Vergleich */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-800">
                    <p className="text-sm text-red-700 dark:text-red-300 mb-1">Personal/Monat</p>
                    <p className="text-2xl font-bold text-red-600">
                      {formatCurrency(calculations.savedPersonalCosts)}
                    </p>
                    <p className="text-xs text-red-600/70 mt-1">
                      +45% Arbeitgeberkosten
                    </p>
                  </div>
                  <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
                    <p className="text-sm text-primary mb-1">KI/Monat</p>
                    <p className="text-2xl font-bold text-primary">
                      {formatCurrency(calculations.aiMonthlyCost)}
                    </p>
                    <p className="text-xs text-primary/70 mt-1">
                      {calculations.aiMinutes.toLocaleString('de-DE')} Minuten
                    </p>
                  </div>
                </div>

                {/* Hauptergebnis */}
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800 text-center">
                  <p className="text-sm text-green-700 dark:text-green-300 mb-2">Ihre Einsparungen</p>
                  <div className="space-y-2">
                    <p className="text-3xl font-bold text-green-600">
                      {formatCurrency(calculations.monthlySavings)}
                    </p>
                    <p className="text-sm text-green-600">pro Monat</p>
                    <p className="text-lg font-semibold text-green-600">
                      {formatCurrency(calculations.annualSavings)} jährlich
                    </p>
                  </div>
                </div>

                {/* KPIs */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-card/50 rounded-lg border border-border/70">
                    <p className="text-2xl font-bold text-primary">{calculations.roi}%</p>
                    <p className="text-sm text-muted-foreground">ROI</p>
                  </div>
                  <div className="text-center p-4 bg-card/50 rounded-lg border border-border/70">
                    <p className="text-2xl font-bold text-primary">{calculations.costReduction}%</p>
                    <p className="text-sm text-muted-foreground">Kostenreduktion</p>
                  </div>
                </div>

                {/* Zusätzliche Metriken */}
                <div className="pt-4 border-t border-border/70 space-y-2 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Automatisierte Anrufe/Monat:</span>
                    <span className="font-medium">{calculations.automatedCalls.toLocaleString('de-DE')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Gesparte Stunden/Monat:</span>
                    <span className="font-medium">{calculations.savedHours}h</span>
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
