"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckIcon } from "@radix-ui/react-icons";
import { ContactForm } from "@/components/contact-form";
import type { PricingPlan } from "@/lib/types/pricing";

interface PricingCardProps {
  plan: PricingPlan;
  yearly?: boolean;
}

export function PricingCard({ plan, yearly = false }: PricingCardProps) {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const price = yearly ? plan.yearlyPrice : plan.price;

  return (
    <>
      <Card className="relative flex flex-col p-6">
        {plan.popular && (
          <Badge className="absolute -top-2 right-4">Beliebt</Badge>
        )}
        
        <div className="space-y-2">
          <h3 className="text-2xl font-bold">{plan.name}</h3>
          <p className="text-muted-foreground">{plan.subtitle}</p>
        </div>

        <div className="mt-6 flex items-baseline gap-x-1">
          <span className="text-4xl font-bold">{price}€</span>
          <span className="text-sm font-semibold text-muted-foreground">/Monat</span>
        </div>

        <ul className="mt-6 space-y-3">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-center gap-x-2">
              <CheckIcon className="h-5 w-5 text-green-500" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {plan.highlights && (
          <div className="mt-6">
            <p className="font-semibold mb-2">Highlights:</p>
            <ul className="space-y-2">
              {plan.highlights.map((highlight) => (
                <li key={highlight} className="text-sm text-muted-foreground">
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        )}

        <Button
          onClick={() => setIsContactOpen(true)}
          className="mt-8 w-full"
          size="lg"
        >
          {plan.cta}
        </Button>
      </Card>

      <ContactForm
        isOpen={isContactOpen}
        onOpenChange={setIsContactOpen}
        source={`pricing_${plan.name.toLowerCase().replace(/\s+/g, '_')}`}
      />
    </>
  );
} 