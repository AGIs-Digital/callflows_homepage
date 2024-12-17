"use client";

import { PricingTables } from "@/components/pricing/tables";
import { PricingFeatures } from "@/components/pricing/features";
import { PricingFAQ } from "@/components/pricing/faq";
import { CTASection } from "@/components/cta-section";

export function PricingSection() {
  return (
    <section className="py-24 bg-white dark:bg-background">
      <div className="container max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-primary dark:text-white mb-6">
            Transparente Preisgestaltung
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
            Wählen Sie den Plan, der zu Ihren Anforderungen passt
          </p>
        </div>
        
        <PricingTables />
        <PricingFeatures />
        <PricingFAQ />
      </div>
    </section>
  );
}