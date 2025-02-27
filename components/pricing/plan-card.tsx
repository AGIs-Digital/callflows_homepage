"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ContactForm } from "@/components/contact-form";
import { PricingPlan } from "@/lib/types/pricing";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

interface PricingCardProps {
  plan: PricingPlan;
}

import { Timer, Info } from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const EARLY_BIRD_END_DATE = new Date("2025-06-30");
const isEarlyBirdActive = () => {
  const now = new Date();
  return now < EARLY_BIRD_END_DATE;
};

export function PricingCard({ plan }: PricingCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const earlyBirdActive = isEarlyBirdActive();

  const displayPrice = earlyBirdActive && plan.earlyBirdPrice 
    ? plan.earlyBirdPrice 
    : plan.price;

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
        {earlyBirdActive && plan.earlyBirdPrice && (
          <>
            <div className="flex items-center text-sm text-primary mb-2">
              <Timer className="w-4 h-4 mr-1" />
              <span>Zeitlich limitiertes Angebot!</span>
            </div>

            <div className="flex items-center gap-1 mb-4">
              <p className="text-sm text-green-600 font-medium">
                Keine Einrichtungsgebühr
              </p>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>Die einmalige Einrichtungsgebühr umfasst das komplette Onboarding nach Aufwand: Von der Entwicklung des Prototypen bis zum Go-Live.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </>
        )}

        <div className="flex items-baseline mb-4">
          <span className="text-4xl font-bold">
            {displayPrice.toLocaleString('de-DE')} €
          </span>
          <span className="text-muted-foreground ml-2">/Monat</span>
          {earlyBirdActive && plan.earlyBirdPrice && (
            <span className="ml-2 line-through text-muted-foreground">
              {plan.price.toLocaleString('de-DE')} €
            </span>
          )}
        </div>

        <div className="space-y-4">
          <p className="text-sm text-primary">{plan.minutesIncluded} Freiminuten</p>
        </div>
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
        data-cal-link="callflows/55min"
        data-cal-config='{"layout":"popup"}'
        className={`w-full mb-8 ${
          plan.popular ? "bg-primary" : "bg-accent text-gray-900"
        } hover:opacity-90 transition-opacity group`}
      >
        {plan.cta}
        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Button>
    </div>
  );
}