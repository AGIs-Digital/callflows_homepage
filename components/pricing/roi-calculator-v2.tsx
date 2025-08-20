"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TrendingUp, Phone, Clock, Percent, Euro, Calculator, Target, Users } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function ROICalculatorV2() {
  const { t } = useI18n();
  
  // Input-Parameter
  const [callsPerDay, setCallsPerDay] = useState([100]); // Default: 100, Range: 20-1000 in 10er Schritten
  const [callDurationSeconds, setCallDurationSeconds] = useState([60]); // Default: 60s, Range: 30s-300s in 5s Schritten
  const [conversionRate, setConversionRate] = useState([14]); // Default: 14%, Range: 1-50%
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
  const monthlyRevenue = qualifiedLeads * dealValue;
  
  // ROI-Berechnungen
  const roi = kiCostsMonthly > 0 ? Math.round((monthlyRevenue / kiCostsMonthly) * 100) - 100 : 0;
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

  // Welche Staffel wird erreicht?
  const getCurrentTier = (minutes: number): { tier: string; price: number; color: string } => {
    if (minutes <= 1000) return { tier: "Staffel 1", price: 0.99, color: "text-blue-600" };
    if (minutes <= 2000) return { tier: "Staffel 2", price: 0.94, color: "text-green-600" };
    if (minutes <= 5000) return { tier: "Staffel 3", price: 0.89, color: "text-orange-600" };
    if (minutes <= 10000) return { tier: "Staffel 4", price: 0.84, color: "text-purple-600" };
    return { tier: "Staffel 5", price: 0.79, color: "text-red-600" };
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
                ROI-Calculator
              </Badge>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Wie viel Umsatz generieren Sie mit KI‑callflows?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Berechnen Sie Ihre Umsatzsteigerung durch automatisierte Anrufe und qualifizierte Leads
            </p>
          </div>

        {/* Einheitliche Card */}
        <Card className="bg-white/95 dark:bg-card/95 backdrop-blur-md border-border/70 shadow-2xl max-w-6xl mx-auto">
          <CardContent className="p-8">
            <div className="grid lg:grid-cols-2 gap-12">
              
              {/* Eingabe-Parameter */}
                              <div className="space-y-8">
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-primary mb-2 flex items-center gap-2">
                      <Target className="h-5 w-5 text-primary" />
                      Ihre Vertriebsparameter
                    </h3>
                    <p className="text-sm text-muted-foreground">Passen Sie die Werte an Ihre Situation an</p>
                  </div>

                {/* Anrufe pro Tag */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="font-medium flex items-center gap-2">
                      <Phone className="h-4 w-4 text-primary" />
                      Anrufe pro Tag
                    </label>
                    <Badge variant="outline" className="font-bold">
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
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>20</span>
                    <span>{formatNumber(monthlyCallsTotal)} Anrufe/Monat</span>
                    <span>1.000</span>
                  </div>
                </div>

                {/* Anrufdauer */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="font-medium flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      Ø Anrufdauer
                    </label>
                    <Badge variant="outline" className="font-bold">
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
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>30s</span>
                    <span>{formatNumber(totalMinutesPerMonth)} Min/Monat</span>
                    <span>5min</span>
                  </div>
                </div>

                {/* Conversion Rate */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="font-medium flex items-center gap-2">
                      <Percent className="h-4 w-4 text-primary" />
                      Erwartete Conversion Rate
                    </label>
                    <Badge variant="outline" className="font-bold">
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
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1%</span>
                    <span>{qualifiedLeads} qualifizierte Leads/Monat</span>
                    <span>50%</span>
                  </div>
                </div>

                {/* Dealwert */}
                <div className="space-y-3">
                  <Label className="font-medium flex items-center gap-2">
                    <Euro className="h-4 w-4 text-primary" />
                    Durchschnittlicher Dealwert
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
                  <p className="text-xs text-muted-foreground">
                    Durchschnittlicher Wert pro erfolgreichem Abschluss
                  </p>
                </div>

                {/* Staffel-Anzeige */}
                <div className="bg-card/50 rounded-lg p-4 border border-border/50">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Aktuelle Staffel:</span>
                    <Badge variant="outline" className={`${currentTier.color} font-bold`}>
                      {currentTier.tier}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm text-muted-foreground">Preis pro Minute:</span>
                    <span className={`font-bold ${currentTier.color}`}>
                      {currentTier.price.toFixed(2).replace('.', ',')} €
                    </span>
                  </div>
                </div>
              </div>

              {/* Ergebnisse */}
              <div className="space-y-6">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-primary mb-2 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Ihre Umsatzsteigerung
                  </h3>
                  <p className="text-sm text-muted-foreground">Monatliche Ergebnisse mit KI-callflows</p>
                </div>

                {/* KI-Kosten */}
                <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-6 border border-orange-200 dark:border-orange-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-orange-700 dark:text-orange-300">KI-Kosten/Monat</span>
                    <Calculator className="w-5 h-5 text-orange-600" />
                  </div>
                  <p className="text-3xl font-bold text-orange-600 mb-1">
                    {formatCurrency(kiCostsMonthly)}
                  </p>
                  <p className="text-xs text-orange-600/70">
                    {formatNumber(totalMinutesPerMonth)} Minuten à {currentTier.price.toFixed(2)}€
                  </p>
                </div>

                {/* Generierter Umsatz */}
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-green-700 dark:text-green-300">Generierter Umsatz/Monat</span>
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-3xl font-bold text-green-600 mb-1">
                    {formatCurrency(monthlyRevenue)}
                  </p>
                  <p className="text-xs text-green-600/70">
                    {qualifiedLeads} Leads × {formatCurrency(dealValue)}
                  </p>
                </div>

                {/* ROI Hauptergebnis */}
                <div className="bg-primary/10 rounded-lg p-6 border border-primary/20 text-center">
                  <p className="text-sm text-primary mb-2">Return on Investment</p>
                  <p className="text-4xl font-bold text-primary mb-2">
                    {roi}%
                  </p>
                  <p className="text-sm text-primary/70">
                    {revenuePerEuro}€ Umsatz pro 1€ KI-Investition
                  </p>
                </div>

                {/* Zusätzliche Metriken */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-card/50 rounded-lg border border-border/50">
                    <p className="text-xl font-bold text-primary">{formatCurrency(costPerLead)}</p>
                    <p className="text-xs text-muted-foreground">Kosten pro Lead</p>
                  </div>
                  <div className="text-center p-4 bg-card/50 rounded-lg border border-border/50">
                    <p className="text-xl font-bold text-primary">{qualifiedLeads}</p>
                    <p className="text-xs text-muted-foreground">Deals/Todos</p>
                  </div>
                </div>

                {/* Jahresübersicht */}
                <div className="pt-4 border-t border-border/50 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Jährliche KI-Kosten:</span>
                    <span className="font-medium">{formatCurrency(kiCostsMonthly * 12)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Jährlicher Umsatz:</span>
                    <span className="font-medium text-green-600">{formatCurrency(monthlyRevenue * 12)}</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Jahres-Gewinn:</span>
                    <span className="text-green-600">{formatCurrency((monthlyRevenue - kiCostsMonthly) * 12)}</span>
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
