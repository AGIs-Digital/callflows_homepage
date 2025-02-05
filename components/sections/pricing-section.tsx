"use client";

import { PricingTables } from "@/components/pricing/tables";

export function PricingSection() {
  return (
    <section className="bg-white dark:bg-background">
      <div className="container max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary dark:text-white mb-4 md:mb-6 px-4">
            Transparente Preisgestaltung
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 md:mb-12 px-4">
            Early Bird Angebot: Sichern Sie sich jetzt dauerhaft reduzierte Preise
          </p>
          <div className="max-w-2xl mx-auto bg-accent/10 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">🎉 Launch-Promotion</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Die ersten 5 Kunden profitieren von:
            </p>
            <ul className="text-sm text-muted-foreground space-y-1 mb-2">
              <li>• Dauerhaft reduzierte Monatsgebühr</li>
              <li>• Keine einmalige Einrichtungsgebühr</li>
              <li>• Garantierte Preisbindung für das gewählte Paket</li>
            </ul>
            <p className="text-xs text-muted-foreground">
              Angebot gültig bis 30.05.2025 oder für die ersten 5 Kunden
            </p>
          </div>
        </div>
        
        <PricingTables />
      </div>
    </section>
  );
}