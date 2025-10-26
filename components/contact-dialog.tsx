"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ContactForm } from "@/components/contact-form";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export function ContactDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSuccess = () => {
    setFormSubmitted(true);
    // Nach 3 Sekunden Dialog schließen
    setTimeout(() => {
      setIsOpen(false);
      // Reset nach dem Schließen
      setTimeout(() => setFormSubmitted(false), 300);
    }, 3000);
  };

  return (
    <Dialog 
      open={isOpen} 
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) {
          // Reset wenn Dialog geschlossen wird
          setTimeout(() => setFormSubmitted(false), 300);
        }
      }}
    >
      <DialogTrigger asChild>
        <button className="nav-link">
          Kontakt
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground">
            Kontakt aufnehmen
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
              onClick={() => setIsOpen(false)}
            >
              Schließen
            </Button>
          </div>
        ) : (
          <ContactForm onSubmitSuccess={handleFormSuccess} />
        )}
      </DialogContent>
    </Dialog>
  );
}