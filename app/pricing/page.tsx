import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PricingSection } from "@/components/sections/pricing-section";
import { PricingFeaturesSection } from "@/components/sections/pricing-features-section";
import { CTASection } from "@/components/cta-section";
import { PricingTables } from "@/components/pricing/tables";

export default function PricingPage() {
  return (
    <main className="bg-background">
      <SiteHeader />
      <div className="pt-12">
        <PricingSection />
        <PricingFeaturesSection />
        <CTASection />
      </div>
      <div className="pt-24 pb-16">
        <div className="container">
          <h1 className="text-4xl font-bold text-center mb-12">Transparente Preisgestaltung</h1>
          <PricingTables />
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}