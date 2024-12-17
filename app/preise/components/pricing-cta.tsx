"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function PricingCTA() {
  return (
    <div className="py-24 border-t text-center">
      <h2 className="text-3xl font-bold mb-4">
        Bereit für den nächsten Schritt?
      </h2>
      <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
        Starten Sie noch heute mit Callflows und revolutionieren Sie Ihre 
        Kommunikation. Unser Team steht Ihnen bei allen Fragen zur Seite.
      </p>
      <div className="flex gap-4 justify-center">
        <Button className="bg-primary">
          Kostenlos testen
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <Button variant="outline">
          Demo vereinbaren
        </Button>
      </div>
      <p className="mt-4 text-sm text-muted-foreground">
        Keine Kreditkarte erforderlich • 14 Tage kostenlos testen • Jederzeit kündbar
      </p>
    </div>
  );
}