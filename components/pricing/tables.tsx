"use client";

import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { pricingPlans } from "@/lib/data/pricing-plans";
import { PricingPlanCard } from "@/components/pricing/plan-card";

export function PricingTables() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="mb-24">
      <div className="flex items-center justify-center gap-4 mb-12">
        <span className={!isYearly ? "font-medium" : "text-muted-foreground"}>
          Monatlich
        </span>
        <Switch
          checked={isYearly}
          onCheckedChange={setIsYearly}
          className="data-[state=checked]:bg-primary"
        />
        <span className={isYearly ? "font-medium" : "text-muted-foreground"}>
          Jährlich (Bis zu 10% Rabatt)
        </span>
      </div>
      <p className="text-center text-muted-foreground mb-8">
        Alle Preise sind Startpreise und werden individuell an Ihre Anforderungen angepasst
      </p>

      <div className="grid lg:grid-cols-3 gap-8">
        {pricingPlans.map((plan) => (
          <PricingPlanCard 
            key={plan.name} 
            plan={plan} 
            isYearly={isYearly} 
          />
        ))}
      </div>
    </div>
  );
}