"use client";

import { PricingCard } from "@/components/pricing/plan-card";
import { MinutePackageCard } from "@/components/pricing/minute-package-card";
import { monthlyPlans, minutePackages } from "@/lib/data/pricing-plans";

export function PricingTables() {
  return (
    <div className="mb-12">
      {/* Monthly Plans */}
      <div className="mb-16">
        <div className="text-center mb-10">
          <h3 className="text-2xl font-bold mb-4">Monatliche Pakete mit Freiminuten</h3>
          <p className="text-muted-foreground mb-2">
            Feste monatliche Kosten mit inkludierten Freiminuten, jederzeit monatlich kündbar
          </p>
          <p className="text-sm text-muted-foreground">Alle Preise zzgl. gesetzlicher MwSt.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {monthlyPlans.map((plan) => (
            <PricingCard key={plan.name} plan={plan} />
          ))}
        </div>
      </div>

      {/* Minute Packages Table */}
      <div>
        <div className="text-center mb-10">
          <h3 className="text-2xl font-bold mb-4">Zusätzliche Minutenpakete</h3>
          <p className="text-muted-foreground mb-2">
            Flexible Erweiterung Ihres monatlichen Kontingents bei Bedarf
          </p>
          <p className="text-sm text-muted-foreground">Alle Preise zzgl. gesetzlicher MwSt.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {minutePackages.map((pkg) => (
            <MinutePackageCard key={pkg.name} package={pkg} />
          ))}
        </div>
      </div>
    </div>
  );
}