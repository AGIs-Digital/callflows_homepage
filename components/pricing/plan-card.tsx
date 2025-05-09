"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { PricingPlan } from "@/lib/types/pricing";
import { useState, useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";
import { PricingDialog } from "@/components/pricing/pricing-dialog";
import { Timer, Info } from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PricingCardProps {
  plan: PricingPlan;
  selectedTerm: "sixMonths" | "twelveMonths";
}

export function PricingCard({ plan, selectedTerm }: PricingCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const earlyBirdActive = true; // Später aus Konfiguration laden
  
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("on", {
        action: "bookingSuccessful",
        callback: (e) => {
          console.log("Booking successful:", e.detail);
        },
      });
    })();
  }, []);

  // Preis berechnen (Early Bird oder regulär)
  let basePrice = plan.price;
  const isCustomPlan = plan.isCustom || basePrice === 0;
  
  // Rabatt anwenden basierend auf der Laufzeit
  let displayPrice = basePrice;
  let discountPercentage = 0;
  
  if (!isCustomPlan && plan.discounts) {
    if (selectedTerm === "sixMonths" && plan.discounts.sixMonths) {
      discountPercentage = plan.discounts.sixMonths;
      displayPrice = basePrice * (1 - discountPercentage / 100);
    } else if (selectedTerm === "twelveMonths" && plan.discounts.twelveMonths) {
      discountPercentage = plan.discounts.twelveMonths;
      displayPrice = basePrice * (1 - discountPercentage / 100);
    }
  }

  return (
    <div className={`bg-card rounded-xl border p-6 shadow-sm h-full flex flex-col relative ${plan.popular ? 'border-primary ring-1 ring-primary' : 'border-border'}`}>
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
            Beliebt
          </span>
        </div>
      )}
      
      <div className="mb-5">
        <h3 className="text-xl font-bold">{plan.name}</h3>
        <p className="text-sm text-muted-foreground">{plan.subtitle}</p>
      </div>

      {/* Freiminuten hervorgehoben */}
      <div className="mb-4">
        {isCustomPlan ? (
          <p className="text-xl font-bold text-primary">Individuelles Minutenkontingent</p>
        ) : (
          <p className="text-xl font-bold text-primary">{plan.minutesIncluded.toLocaleString('de-DE')} Freiminuten</p>
        )}
      </div>

      {/* Preis mit /Monat direkt dahinter */}
      {isCustomPlan ? (
        <div className="flex items-baseline mb-4">
          <span className="text-xl font-bold">Preis auf Anfrage</span>
        </div>
      ) : (
        <div className="mb-4">
          <div className="flex items-center">
            <span className="text-2xl font-bold">
              {/* Prüfen, ob der Preis kleiner als 1 ist (pro Minute) */}
              {displayPrice < 1 
                ? displayPrice.toFixed(2).replace('.', ',') 
                : Math.round(displayPrice).toLocaleString('de-DE')} €
            </span>
            <span className="text-muted-foreground ml-1">/min</span>
          </div>
          {selectedTerm === "twelveMonths" && discountPercentage > 0 && (
            <div className="text-green-600 text-sm mt-1">
              (10% Rabatt)
            </div>
          )}
        </div>
      )}

      <div className="space-y-4 mb-8 flex-grow">
        <ul className="space-y-2">
          {plan.highlights.map((highlight, index) => (
            <li key={index} className="flex items-start gap-2">
              <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0 mt-2" />
              <span className="text-sm text-muted-foreground">{highlight}</span>
            </li>
          ))}
        </ul>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="w-full mt-auto" variant="default">
            {plan.cta}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <PricingDialog 
            plan={plan} 
            onClose={() => setIsDialogOpen(false)} 
            selectedTerm={selectedTerm}
            discountedPrice={displayPrice}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}