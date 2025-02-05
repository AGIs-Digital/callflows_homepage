import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PricingSection } from "@/components/sections/pricing-section";
import { PricingFeaturesSection } from "@/components/sections/pricing-features-section";
import { CTASection } from "@/components/cta-section";

export default function PricingPage() {
  return (
    <main className="bg-background">
      <SiteHeader />
      <div className="pt-12">
        <PricingSection />
        <PricingFeaturesSection />
        <CTASection />
      </div>
      <SiteFooter />
    </main>
  );
}