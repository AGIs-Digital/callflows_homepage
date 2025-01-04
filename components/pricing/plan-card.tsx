"use client";

import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ContactForm } from "@/components/contact-form";
import { PricingPlan } from "@/lib/types/pricing";
import { useState } from "react";

interface PricingCardProps {
  plan: PricingPlan;
  isYearly: boolean;
}

export function PricingCard({ plan, isYearly }: PricingCardProps) {
  const price = isYearly ? plan.yearlyPrice : plan.price;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const savings = (plan.price - plan.yearlyPrice) * 12;

  return (
    <div className={`relative rounded-2xl p-8 ${
      plan.popular
        ? "border-2 border-primary shadow-lg"
        : "border border-border"
    }`}>
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
          <span className="text-4xl font-bold">ab {price}€</span>
          <span className="text-muted-foreground ml-2">/Monat</span>
        </div>
        {isYearly && (
          <p className="text-sm text-green-600 dark:text-green-400">
            Jährliche Zahlung: {savings}€ Ersparnis möglich
          </p>
        )}
        <p className="text-sm text-muted-foreground mt-2">
          Preis basiert auf Ihrem individuellen Bedarf
        </p>
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <Button
          onClick={() => setIsDialogOpen(true)}
          className={`w-full mb-8 ${
            plan.popular ? "bg-primary" : "bg-accent text-gray-900"
          } hover:opacity-90 transition-opacity`}
        >
          {plan.cta}
        </Button>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Individuelles Angebot für {plan.name}</DialogTitle>
          </DialogHeader>
          <ContactForm
            source={plan.type}
            isOpen={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            prefilledMessage={`Ich interessiere mich für das ${plan.name} Paket.`}
          />
        </DialogContent>
      </Dialog>

      <div className="space-y-3">
        {plan.features.map((feature) => (
          <div key={feature} className="flex items-start gap-3">
            <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <span className="text-muted-foreground text-sm">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
}