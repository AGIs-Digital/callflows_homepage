"use client";

import { useState } from "react";
import { ContactForm } from "@/components/contact-form";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function StandaloneContactForm() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSuccess = () => {
    setFormSubmitted(true);
    // Nach 10 Sekunden zurücksetzen, damit das Formular wieder angezeigt werden kann
    setTimeout(() => {
      setFormSubmitted(false);
    }, 10000);
  };

  return (
    <div className="bg-card rounded-lg border p-6 shadow-sm">
      <h2 className="text-2xl font-bold mb-4">Kontakt aufnehmen</h2>
      
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
            onClick={() => setFormSubmitted(false)}
          >
            Neues Formular
          </Button>
        </div>
      ) : (
        <ContactForm onSubmitSuccess={handleFormSuccess} />
      )}
    </div>
  );
} 