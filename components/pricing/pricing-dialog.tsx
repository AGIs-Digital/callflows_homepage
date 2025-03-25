"use client";

import { PricingPlan } from "@/lib/types/pricing";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/contact-form";

interface PricingDialogProps {
  plan: PricingPlan;
  onClose: () => void;
  selectedTerm: "sixMonths" | "twelveMonths";
  discountedPrice?: number;
}

export function PricingDialog({ plan, onClose, selectedTerm = "sixMonths", discountedPrice }: PricingDialogProps) {
  const isCustomPlan = plan.isCustom || plan.price === 0;
  
  // Laufzeittext für die Anfrage
  let termText = selectedTerm === "sixMonths" ? "6-Monats-Vertrag" : "12-Monats-Vertrag";
  
  return (
    <>
      <DialogHeader>
        <DialogTitle>
          {isCustomPlan ? "Individuelles Angebot anfordern" : `${plan.name} Paket buchen`}
        </DialogTitle>
      </DialogHeader>
      
      {!isCustomPlan && (
        <div className="mt-4 p-4 bg-muted rounded-md">
          <p className="font-medium">Ihre Auswahl:</p>
          <p className="text-sm text-muted-foreground">{plan.name} - {termText}</p>
          <p className="text-sm text-muted-foreground">{plan.minutesIncluded.toLocaleString('de-DE')} Freiminuten</p>
          <p className="text-sm font-medium mt-2">
            {Math.round(discountedPrice || plan.price).toLocaleString('de-DE')} € / Monat
          </p>
        </div>
      )}
      
      <div className="mt-4">
        <ContactForm 
          defaultSubject={`Anfrage: ${plan.name} Paket (${termText})`}
          onSubmitSuccess={onClose}
          planType={plan.type}
          selectedTerm={selectedTerm}
          discountedPrice={discountedPrice}
        />
      </div>
      
      <div className="mt-4 text-center text-sm text-muted-foreground">
        <p>Oder vereinbaren Sie direkt einen Beratungstermin:</p>
        <Button
          className="mt-2"
          variant="outline"
          data-cal-link="callflows/55min"
          data-cal-config='{"layout":"popup"}'
          onClick={onClose}
        >
          Termin buchen
        </Button>
      </div>
    </>
  );
} 