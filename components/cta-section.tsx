"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="bg-primary py-24">
      <div className="container text-center">
        <h2 className="text-3xl font-bold mb-4 text-white">
          Bereit für die Zukunft der Kommunikation?
        </h2>
        <p className="text-white/90 mb-8 max-w-2xl mx-auto">
          Starten Sie noch heute mit Callflows und revolutionieren Sie Ihre 
          Kommunikation. Unser Team steht Ihnen bei allen Fragen zur Seite.
        </p>
        <div className="flex gap-4 justify-center">
          <Button className="bg-accent text-gray-900 hover:bg-accent/90">
            Beratungstermin buchen
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <p className="mt-4 text-sm text-white/80">
          Keine Kreditkarte erforderlich • 14 Tage kostenlos testen • Jederzeit kündbar
        </p>
      </div>
    </section>
  );
}