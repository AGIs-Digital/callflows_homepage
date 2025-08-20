"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ArrowRight, Calculator, Shield } from "lucide-react";
import { BookingButton } from "@/components/booking/booking-button";

export function PricingOverview() {
  return (
    <div className="py-16 bg-gradient-to-b from-background to-secondary/20">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary dark:text-white mb-6">
            So einfach funktioniert unser Preismodell
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transparente Kosten ohne Überraschungen - starten Sie risikofrei mit unserem Pilotmonat
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Schritt 1: Pilotmonat */}
          <Card className="relative border-primary/50 shadow-lg">
            <Badge className="absolute -top-3 left-6 bg-primary text-primary-foreground">
              Schritt 1
            </Badge>
            <CardHeader className="pt-8">
              <CardTitle className="flex items-center text-2xl">
                <Shield className="h-6 w-6 text-primary mr-3" />
                Pilotmonat starten
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center p-6 bg-primary/5 rounded-lg">
                <div className="text-4xl font-bold text-primary mb-2">2.490 €</div>
                <div className="text-muted-foreground">einmalig, inkl. 1.000 KI-Minuten</div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span className="text-sm">Vollständige Einrichtung & Konfiguration</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span className="text-sm">Keine Vertragslaufzeit</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span className="text-sm">Persönliche Betreuung</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span className="text-sm">Go-Live Unterstützung</span>
                </div>
              </div>

              <BookingButton 
                buttonText="Pilotmonat starten"
                className="w-full"
                variant="default"
                size="lg"
                showArrow={true}
              />
            </CardContent>
          </Card>

          {/* Schritt 2: Nach Go-Live */}
          <Card className="relative">
            <Badge className="absolute -top-3 left-6 bg-green-600 text-white">
              Schritt 2
            </Badge>
            <CardHeader className="pt-8">
              <CardTitle className="flex items-center text-2xl">
                <Calculator className="h-6 w-6 text-primary mr-3" />
                Nach Go-Live
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-2">Keine Grundgebühr</div>
                <div className="text-muted-foreground">Reine Nutzungsgebühr</div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">Minutenstaffel (pro Minute):</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>bis 1.000 Min:</div>
                  <div className="font-semibold">0,99 €</div>
                  <div>1.001-2.000 Min:</div>
                  <div className="font-semibold">0,94 €</div>
                  <div>2.001-5.000 Min:</div>
                  <div className="font-semibold">0,89 €</div>
                  <div>5.001-10.000 Min:</div>
                  <div className="font-semibold">0,84 €</div>
                  <div>ab 10.001 Min:</div>
                  <div className="font-semibold">0,79 €</div>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
                <div className="text-sm text-muted-foreground">
                  ✓ Sekundengenaue Abrechnung<br/>
                  ✓ Monatliche Rechnungsstellung<br/>
                  ✓ Jederzeit kündbar
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Vorteile im Überblick */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center p-6">
            <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Kein Risiko</h3>
            <p className="text-muted-foreground text-sm">
              Keine Vertragslaufzeit, jederzeit kündbar
            </p>
          </Card>
          <Card className="text-center p-6">
            <Calculator className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Keine Grundgebühr</h3>
            <p className="text-muted-foreground text-sm">
              Sekundengenaue Abrechnung, nur was Sie nutzen
            </p>
          </Card>
          <Card className="text-center p-6">
            <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Vollservice</h3>
            <p className="text-muted-foreground text-sm">
              Einrichtung, Betreuung und Support inklusive
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
