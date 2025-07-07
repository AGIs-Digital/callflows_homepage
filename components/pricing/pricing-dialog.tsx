"use client";

import { useState, useEffect } from "react";
import { PricingPlan } from "@/lib/types/pricing";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/contact-form";
import { CheckCircle } from "lucide-react";
import { CalButton } from "@/components/booking/cal-button";
import { getCalApi } from "@calcom/embed-react";

interface PricingDialogProps {
  plan: PricingPlan;
  onClose: () => void;
}

export function PricingDialog({ plan, onClose }: PricingDialogProps) {
  const isCustomPlan = plan.isCustom || plan.price === 0;
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleFormSuccess = () => {
    setFormSubmitted(true);
    // Nach 3 Sekunden Dialog schließen
    setTimeout(() => {
      onClose();
    }, 3000);
  };
  
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("on", {
        action: "bookingSuccessful",
        callback: (e) => {
          console.log("Booking successful:", e.detail);
          // Hier können Sie den Dialog schließen, wenn die Buchung erfolgreich war
          onClose();
        },
      });
    })();
  }, [onClose]);
  
  return (
    <>
      <DialogHeader>
        <DialogTitle>
          {isCustomPlan ? "Individuelles Angebot anfordern" : `${plan.name} Paket buchen`}
        </DialogTitle>
      </DialogHeader>
      
      {formSubmitted ? (
        <div className="py-8 flex flex-col items-center justify-center text-center">
          <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-3 mb-4">
            <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Nachricht erfolgreich gesendet!</h3>
          <p className="text-muted-foreground mb-4">
            Vielen Dank für Ihre Anfrage. Wir werden uns zeitnah bei Ihnen melden.
          </p>
          <Button 
            variant="outline" 
            onClick={onClose}
          >
            Schließen
          </Button>
        </div>
      ) : (
        <>
          {!isCustomPlan && (
            <div className="mt-4 p-4 bg-muted rounded-md">
              <p className="font-medium">Ihre Auswahl:</p>
              <p className="text-sm text-muted-foreground">{plan.name}</p>
              <p className="text-sm text-muted-foreground">{plan.minutesIncluded.toLocaleString('de-DE')} Freiminuten</p>
              <p className="text-sm font-medium mt-2">
                {plan.price.toFixed(2).replace('.', ',')} € / min
              </p>
            </div>
          )}
          
          <div className="mt-4">
            <ContactForm 
              defaultSubject={`Anfrage: ${plan.name} Paket`}
              onSubmitSuccess={handleFormSuccess}
              planType={plan.type}
            />
          </div>
          <CalButton />
        </>
      )}
    </>
  );
} 