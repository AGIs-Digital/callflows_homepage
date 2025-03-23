"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ContactForm } from "@/components/contact-form";
import { PricingPlan } from "@/lib/types/pricing";
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
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
}

const EARLY_BIRD_END_DATE = new Date("2025-06-30");
const isEarlyBirdActive = () => {
  const now = new Date();
  return now < EARLY_BIRD_END_DATE;
};

export function PricingCard({ plan }: PricingCardProps) {
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
  const displayPrice = earlyBirdActive && plan.earlyBirdPrice ? plan.earlyBirdPrice : plan.price;
  const isCustomPlan = plan.isCustom || displayPrice === 0;

  return (
    <div className={`bg-card rounded-xl border p-6 shadow-sm ${plan.popular ? 'border-primary ring-1 ring-primary' : 'border-border'}`}>
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
            Beliebt
          </span>
        </div>
      )}

      <div className="mb-5">
        <h3 className="text-xl font-bold">{plan.name}</h3>
        <p className="text-sm text-muted-foreground">{plan.subtitle}</p>
      </div>

      <div className="mb-8">
        {earlyBirdActive && plan.earlyBirdPrice && !isCustomPlan && (
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

        {isCustomPlan ? (
          <div className="flex items-baseline mb-4">
            <span className="text-2xl font-bold">Preis auf Anfrage</span>
          </div>
        ) : (
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
        )}

        <div className="space-y-4">
          {isCustomPlan ? (
            <p className="text-sm text-primary">Individuelles Minutenkontingent</p>
          ) : (
            <p className="text-sm text-primary">{plan.minutesIncluded.toLocaleString('de-DE')} Freiminuten</p>
          )}
        </div>
      </div>

      <div className="space-y-4 mb-8">
        <h4 className="text-sm font-medium">Highlights:</h4>
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
          <Button className="w-full" variant="default">
            {plan.cta}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <PricingDialog plan={plan} onClose={() => setIsDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}