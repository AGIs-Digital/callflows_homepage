import { PricingFeatures } from "@/components/pricing/features";

export function PricingFeaturesSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-accent/20 via-primary/10 to-primary/60">
      <div className="container max-w-6xl">
        <PricingFeatures />
      </div>
    </section>
  );
} 