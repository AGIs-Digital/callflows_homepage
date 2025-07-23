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

export function ROICalculator() {
  const { t } = useI18n();
  
  // Schieberegler-Werte
  const [employees, setEmployees] = useState([2]);
  const [salaryIndex, setSalaryIndex] = useState([10]); // Index 10 = 3000€
  const [callsPerDay, setCallsPerDay] = useState([50]);
  const [avgCallDuration, setAvgCallDuration] = useState([2]);
  const [automationRate, setAutomationRate] = useState([90]);
  
  // Aktuelles Gehalt basierend auf Index
  const monthlySalary = SALARY_VALUES[salaryIndex[0]];
  
  // Berechnete Werte
  const [calculations, setCalculations] = useState({
    monthlyPersonalCosts: 0,
    yearlyPersonalCosts: 0,
    aiMonthlyCost: 0,
    monthlySavings: 0,
    yearlySavings: 0,
    roi: 0,
    paybackMonths: 0,
    totalEmployeeCosts: 0
  });

  // ROI-Berechnung
  useEffect(() => {
    // Realistische Vollzeit-Personalkosten pro Mitarbeiter
    const employerCostFactor = 1.45; // +45% Personalnebenkosten (Lohnnebenkosten, Strukturkosten, Sonstige Personalkosten)
    const currentMonthlySalary = SALARY_VALUES[salaryIndex[0]];
    const monthlyPersonalCostPerEmployee = currentMonthlySalary * employerCostFactor;
    const totalEmployeeCosts = monthlyPersonalCostPerEmployee * employees[0];
    const yearlyPersonalCosts = totalEmployeeCosts * 12;
    
    // KI-Kosten nur für automatisierte Anrufe
    const aiMinutesPerMonth = (callsPerDay[0] * avgCallDuration[0] * 22 * automationRate[0]) / 100;
    const aiMonthlyCost = aiMinutesPerMonth * 0.99;
    
    // Einsparungen: Wenn wir X% der Anrufe automatisieren, brauchen wir weniger Personal
    const savedEmployeeFraction = automationRate[0] / 100;
    const potentialSavedEmployees = Math.min(employees[0] * savedEmployeeFraction, employees[0] - 0.5); // Mindestens 0.5 Mitarbeiter behalten
    const savedPersonalCosts = potentialSavedEmployees * monthlyPersonalCostPerEmployee;
    
    // Netto-Einsparungen
    const monthlySavings = savedPersonalCosts - aiMonthlyCost;
    const yearlySavings = monthlySavings * 12;
    const roi = aiMonthlyCost > 0 ? ((monthlySavings / aiMonthlyCost) * 100) : 0;
    // Bei KI-Telefonie gibt es keine Anfangsinvestition - Einsparungen sind sofort
    const paybackMonths = monthlySavings > 0 ? 1 : 99; // Einsparungen ab dem ersten Monat

    setCalculations({
      monthlyPersonalCosts: totalEmployeeCosts,
      yearlyPersonalCosts,
      aiMonthlyCost,
      monthlySavings,
      yearlySavings,
      roi,
      paybackMonths,
      totalEmployeeCosts
    });
  }, [employees, salaryIndex, callsPerDay, avgCallDuration, automationRate]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="py-16 bg-gradient-to-b from-accent/20 via-tertiary/50 to-accent/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="bg-primary rounded-full p-2">
              <Calculator className="h-5 w-5 text-primary-foreground" />
            </div>
            <Badge variant="secondary" className="px-3 py-1">
              {t('pricing.roiCalculator.badge')}
            </Badge>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {t('pricing.roiCalculator.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('pricing.roiCalculator.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Eingabe-Parameter */}
          <Card className="bg-card/60 backdrop-blur-sm border-border/50 shadow-lg">
                         <CardHeader className="pb-4">
               <CardTitle className="text-xl flex items-center gap-2">
                 <Zap className="h-5 w-5 text-primary" />
                 {t('pricing.roiCalculator.yourSituation')}
               </CardTitle>
             </CardHeader>
            <CardContent className="space-y-6">
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
                    {monthlySalary.toLocaleString()} €
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
                   max={500}
                   min={0}
                   step={10}
                   className="w-full"
                 />
               </div>

               {/* Durchschnittliche Anrufdauer */}
               <div className="space-y-3">
                 <div className="flex items-center justify-between">
                   <label className="font-medium flex items-center gap-2">
                     <Clock className="h-4 w-4 text-primary" />
                     {t('pricing.roiCalculator.avgCallDuration')}
                   </label>
                   <Badge variant="outline" className="font-bold">
                     {avgCallDuration[0]} {t('pricing.roiCalculator.minutes')}
                   </Badge>
                 </div>
                 <Slider
                   value={avgCallDuration}
                   onValueChange={setAvgCallDuration}
                   max={20}
                   min={0}
                   step={1}
                   className="w-full"
                 />
               </div>

               {/* Automatisierungsgrad */}
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
                  max={100}
                  min={30}
                  step={10}
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>

          {/* Ergebnisse - Kompakter */}
          <Card className="bg-gradient-to-br from-primary/5 to-accent/10 border-primary/20 shadow-lg">
                         <CardHeader className="pb-3">
               <CardTitle className="text-xl flex items-center gap-2">
                 <TrendingUp className="h-5 w-5 text-primary" />
                 {t('pricing.roiCalculator.yourSavings')}
               </CardTitle>
             </CardHeader>
            <CardContent className="space-y-4">
              {/* Aktuelle vs KI Kosten - kompakt */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-card/60 rounded-lg p-4 border border-border/50">
                  <p className="text-sm text-muted-foreground mb-1">{t('pricing.roiCalculator.personalMonthly')}</p>
                  <p className="text-xl font-bold text-red-600">
                    {formatCurrency(calculations.monthlyPersonalCosts)}
                  </p>
                                     <p className="text-xs text-muted-foreground mt-1">
                     +45% {t('pricing.roiCalculator.employerCosts')}
                   </p>
                </div>
                <div className="bg-card/60 rounded-lg p-4 border border-border/50">
                  <p className="text-sm text-muted-foreground mb-1">{t('pricing.roiCalculator.aiMonthly')}</p>
                  <p className="text-xl font-bold text-primary">
                    {formatCurrency(calculations.aiMonthlyCost)}
                  </p>
                </div>
              </div>

              {/* Einsparungen - prominent */}
              <div className="bg-gradient-to-r from-green-500/15 to-emerald-500/15 rounded-lg p-4 border border-green-500/20">
                <h3 className="text-base font-semibold mb-3 text-green-700 dark:text-green-400">
                  💰 {t('pricing.roiCalculator.yourSavings')}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-sm text-muted-foreground">{t('pricing.roiCalculator.monthly')}</p>
                    <p className="text-2xl font-bold text-green-600">
                      {formatCurrency(calculations.monthlySavings)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t('pricing.roiCalculator.yearly')}</p>
                    <p className="text-2xl font-bold text-green-600">
                      {formatCurrency(calculations.yearlySavings)}
                    </p>
                  </div>
                </div>
              </div>

              {/* ROI und Amortisation - kompakt */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-card/60 rounded-lg p-4 border border-border/50 text-center">
                  <p className="text-sm text-muted-foreground mb-2">{t('pricing.roiCalculator.roi')}</p>
                  <p className="text-xl font-bold text-primary">
                    {calculations.roi.toFixed(0)}%
                  </p>
                </div>
                <div className="bg-card/60 rounded-lg p-4 border border-border/50 text-center">
                  <p className="text-sm text-muted-foreground mb-2">{t('pricing.roiCalculator.costReduction')}</p>
                  <p className="text-xl font-bold text-primary">
                    {calculations.monthlyPersonalCosts > 0 ? `${Math.round((calculations.monthlySavings / calculations.monthlyPersonalCosts) * 100)}%` : '0%'}
                  </p>
                </div>
              </div>

              {/* Call-to-Action - kompakt */}
              <div className="bg-primary/10 rounded-lg p-4 text-center border border-primary/20">
                                 <p className="text-lg font-semibold mb-2">
                   💰 {formatCurrency(calculations.yearlySavings)} {t('pricing.roiCalculator.perYear')}!
                 </p>
                <p className="text-base text-muted-foreground">
                  {t('pricing.roiCalculator.freeConsultation')}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 