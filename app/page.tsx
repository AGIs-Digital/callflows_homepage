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
import { SocialProofROISection } from "@/components/sections/social-proof-roi-section";

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
        <FeaturesSection />
        <ProcessSection />
        <PetraUSPSection />
        <PricingComparisonSection />
        <CTASection />
        <SocialProofROISection />
        <CoreFeaturesSection />
        <CTASectionSecondary />
      </main>
      <SiteFooter />
    </div>
  );
}