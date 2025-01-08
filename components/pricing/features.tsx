"use client";

import { pricingFeatures } from "@/lib/pricing-data";

export function PricingFeatures() {
  return (
    <div className="py-24">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4 text-primary dark:text-white">
          Alle Pläne beinhalten
        </h2>
        <p className="text-muted-foreground">
          Profitieren Sie von unseren Kernfunktionen in jedem Paket
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pricingFeatures.map((feature) => (
          <div key={feature.title} className="flex gap-4">
            <div className="flex-shrink-0">
              <feature.icon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}