import { PricingFeatures } from "@/components/pricing/features";

export function PricingFeaturesSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-accent/50 via-accent/10 to-secondary/5">
      <div className="container max-w-7xl mx-auto">
        <PricingFeatures />
      </div>
    </section>
  );
} 