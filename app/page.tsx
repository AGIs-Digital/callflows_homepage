import { SiteHeader } from "@/components/site-header";
import { HeroSection } from "@/components/sections/hero-section";
import { ProcessSection } from "@/components/sections/process-section";
import { PricingComparisonSection } from "@/components/sections/pricing-comparison-section";
import { CoreFeaturesSection } from "@/components/sections/core-features-section";
import { FeaturesSection } from "@/components/sections/features-section";
import { SiteFooter } from "@/components/site-footer";
import { CTASection } from "@/components/sections/cta-section";
import { CTASectionSecondary } from "@/components/sections/cta-section-secondary";
import { IntegrationChallengesSection } from "@/components/sections/integration-challenges-section";
import { PetraUSPSection } from "@/components/sections/petra-usp-section";
import { ROICalculator } from "@/components/pricing/roi-calculator";

export default function Home() {
  return (
    <div className="bg-background">
      <SiteHeader />
      <main 
        id="main-content" 
        className="focus:outline-none"
        role="main"
        aria-label="Hauptinhalt"
        tabIndex={-1}
      >
        <HeroSection />
        <IntegrationChallengesSection />
        <PetraUSPSection />
        <ProcessSection />
        <section id="pricecomparison" aria-labelledby="pricing-heading">
          <PricingComparisonSection />
        </section>
        <CTASection />
        <ROICalculator />
        <section id="features" aria-labelledby="features-heading">
          <FeaturesSection />
        </section>
        <section id="core-features" aria-labelledby="core-features-heading">
          <CoreFeaturesSection />
        </section>
        <CTASectionSecondary />
      </main>
      <SiteFooter />
    </div>
  );
}