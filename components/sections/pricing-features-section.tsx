import { PricingFeatures } from "@/components/pricing/features";

export function PricingFeaturesSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-accent/40 via-primary/20 to-primary/25">
      <div className="container max-w-6xl mx-auto">
        <PricingFeatures />
      </div>
    </section>
  );
} 