"use client";

import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { pricingPlans } from "@/lib/pricing-data";

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
          Jährlich (10% Rabatt)
        </span>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {pricingPlans.map((plan) => (
          <div
            key={plan.name}
            className={`relative rounded-2xl p-8 ${
              plan.popular
                ? "border-2 border-primary shadow-lg"
                : "border border-border"
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-primary text-white px-3 py-1 rounded-full text-sm">
                  Meist gewählt
                </span>
              </div>
            )}

            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-muted-foreground">{plan.subtitle}</p>
            </div>

            <div className="mb-8">
              <div className="flex items-baseline mb-2">
                <span className="text-4xl font-bold">
                  {isYearly ? plan.yearlyPrice : plan.price}€
                </span>
                <span className="text-muted-foreground ml-2">/Monat</span>
              </div>
              {isYearly && (
                <p className="text-sm text-green-600 dark:text-green-400">
                  Sie sparen {(plan.price - plan.yearlyPrice) * 12}€ pro Jahr
                </p>
              )}
            </div>

            <div className="space-y-4 mb-8">
              {plan.highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  {highlight}
                </div>
              ))}
            </div>

            <Button
              className={`w-full mb-8 ${
                plan.popular ? "bg-primary" : "bg-accent text-gray-900"
              } hover:opacity-90 transition-opacity`}
            >
              {plan.cta}
            </Button>

            <div className="space-y-3">
              {plan.features.map((feature) => (
                <div key={feature} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}