"use client";

import { useState } from "react";
import { PricingCard } from "@/components/pricing/plan-card";
import { monthlyPlans } from "@/lib/data/pricing-plans";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Info } from "lucide-react";

type ContractTerm = "sixMonths" | "twelveMonths";

export function PricingTables() {
  const [selectedTerm, setSelectedTerm] = useState<ContractTerm>("sixMonths");

  // Rabatt-Text basierend auf der gewählten Laufzeit
  const getDiscountText = () => {
    switch (selectedTerm) {
      case "sixMonths":
        return "Keine Rabatte bei 6-Monats-Vertrag";
      case "twelveMonths":
        return "10% Rabatt auf alle Pakete";
      default:
        return "";
    }
  };

  return (
    <div className="mb-12">
      {/* Monthly Plans */}
      <div className="mb-16">
        <div className="text-center mb-10">
          <h3 className="text-3xl font-bold mb-4">Unsere Monatspakete mit Freiminuten</h3>
          <p className="text-sm text-muted-foreground mb-8">Alle Preise zzgl. gesetzlicher MwSt.</p>
          
          {/* Gemeinsamer Laufzeit-Slider */}
          <div className="max-w-md mx-auto mb-8">
            <p className="text-sm font-medium mb-2">Vertragslaufzeit wählen:</p>
            <Tabs 
              defaultValue="sixMonths" 
              value={selectedTerm}
              onValueChange={(value) => setSelectedTerm(value as ContractTerm)}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="sixMonths">
                  6 Monate
                </TabsTrigger>
                <TabsTrigger value="twelveMonths">
                  12 Monate
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <p className="text-sm text-muted-foreground mt-2">
              {getDiscountText()}
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {monthlyPlans.map((plan) => (
            <PricingCard 
              key={plan.name} 
              plan={plan} 
              selectedTerm={selectedTerm}
            />
          ))}
        </div>
      </div>

      {/* Zusätzliche Minutenpakete Erklärung */}
      <div className="max-w-4xl mx-auto bg-muted p-6 rounded-lg mt-12">
        <div className="flex items-start gap-4">
          <div className="bg-primary rounded-full p-2 flex-shrink-0">
            <Info className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Zusätzliche Minutenpakete nach Bedarf</h3>
            <p className="text-muted-foreground mb-4">
              Neben Ihrem monatlichen Kontingent können Sie jederzeit flexible Minutenpakete hinzubuchen.
            </p>
            
            <div className="space-y-3">
              <div className="bg-card p-4 rounded-md border">
                <h4 className="font-medium mb-1">Flexible Erweiterung</h4>
                <p className="text-sm text-muted-foreground">
                  Kaufen Sie zusätzliche Minutenpakete individuell nach Ihrem Bedarf. Wir beraten Sie gerne und empfehlen passende Pakete basierend auf Ihrer Nutzung.
                </p>
              </div>
              
              <div className="bg-card p-4 rounded-md border">
                <h4 className="font-medium mb-1">Keine verfallenden Minuten</h4>
                <p className="text-sm text-muted-foreground">
                  Gekaufte Minutenpakete verfallen nicht und dienen als Reserve. Sie werden erst angebrochen, wenn Ihr monatliches Kontingent aufgebraucht ist.
                </p>
              </div>
              
              <div className="bg-card p-4 rounded-md border">
                <h4 className="font-medium mb-1">Kostenersparnis</h4>
                <p className="text-sm text-muted-foreground">
                  Vermeiden Sie den höheren Pay-as-you-go Preis von 0,99€ pro Minute, indem Sie vorausschauend Minutenpakete erwerben.
                </p>
              </div>
              
              <div className="bg-card p-4 rounded-md border">
                <h4 className="font-medium mb-1">Aktives Monitoring</h4>
                <p className="text-sm text-muted-foreground">
                  Wir überwachen Ihren Verbrauch und empfehlen proaktiv passende Pakete, damit Sie immer die optimale Lösung für Ihre Bedürfnisse haben.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}