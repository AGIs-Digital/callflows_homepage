"use client";

import { PricingPlan } from "@/lib/types/pricing";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/contact-form";

interface PricingDialogProps {
  plan: PricingPlan;
  onClose: () => void;
}

export function PricingDialog({ plan, onClose }: PricingDialogProps) {
  const isCustomPlan = plan.isCustom || plan.price === 0;
  
  return (
    <>
      <DialogHeader>
        <DialogTitle>
          {isCustomPlan ? "Individuelles Angebot anfordern" : `${plan.name} Paket buchen`}
        </DialogTitle>
      </DialogHeader>
      
      <div className="mt-4">
        <ContactForm 
          defaultSubject={`Anfrage: ${plan.name} Paket`}
          onSubmitSuccess={onClose}
          planType={plan.type}
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