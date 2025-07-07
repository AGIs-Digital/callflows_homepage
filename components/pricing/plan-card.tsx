"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { PricingPlan } from "@/lib/types/pricing";
import { useState } from "react";
import { PricingDialog } from "@/components/pricing/pricing-dialog";

interface PricingCardProps {
  plan: PricingPlan;
}

export function PricingCard({ plan }: PricingCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isCustomPlan = plan.isCustom || plan.price === 0;

  return (
    <div className={`bg-card rounded-xl border p-8 shadow-sm h-full flex flex-col relative ${plan.popular ? 'border-primary ring-2 ring-primary/20' : 'border-border'}`}>
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold">
            Beliebt
          </span>
        </div>
      )}
      
      {/* Header Section mit Name und Beschreibung */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
        <p className="text-base text-muted-foreground">{plan.subtitle}</p>
      </div>

      {/* Preis Section - Hauptfokus */}
      {isCustomPlan ? (
        <div className="text-center mb-8">
          <div className="text-3xl font-bold mb-2">Preis auf Anfrage</div>
          <p className="text-lg font-semibold text-primary">Individuelles Minutenkontingent</p>
        </div>
      ) : (
        <div className="text-center mb-8">
          <div className="flex items-baseline justify-center mb-2">
            <span className="text-4xl font-bold">
              {plan.price.toFixed(2).replace('.', ',')} €
            </span>
            <span className="text-xl text-muted-foreground ml-2">/min</span>
          </div>
          <p className="text-lg font-semibold text-primary">{plan.minutesIncluded.toLocaleString('de-DE')} Freiminuten</p>
        </div>
      )}

      {/* Features Liste */}
      <div className="flex-grow mb-8">
        <ul className="space-y-4">
          {plan.highlights.map((highlight, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="h-2 w-2 rounded-full bg-[#FFB703] flex-shrink-0 mt-3" />
              <span className="text-lg text-muted-foreground leading-relaxed">{highlight}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA Button */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button 
            className="w-full mt-auto bg-[#FFB703] hover:bg-[#FFB703]/90 text-white font-semibold py-3 text-base" 
            variant="default"
          >
            {plan.cta}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <PricingDialog 
            plan={plan} 
            onClose={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}