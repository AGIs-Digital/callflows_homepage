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
        <div className="pt-24 pb-16">
        <div className="container">
          <h1 className="text-3xl text-center sm:text-4xl md:text-4xl font-bold text-primary dark:text-white mb-4 md:mb-6 px-4">Transparente Preisgestaltung</h1>
          <PricingTables />
        </div>
      </div>
        <PricingFeaturesSection />
        <CTASection />
      </div>

      <SiteFooter />
    </main>
  );
}