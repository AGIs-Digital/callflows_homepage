import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PricingTables } from "./components/pricing-tables";
import { PricingFAQ } from "./components/pricing-faq";
import { PricingTestimonials } from "./components/pricing-testimonials";
import { PricingFeatures } from "./components/pricing-features";
import { PricingCTA } from "./components/pricing-cta";

export default function PricingPage() {
  return (
    <>
      <SiteHeader />
      <main className="py-16">
        <div className="container">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-primary dark:text-white mb-4">
              Transparente Preisgestaltung für Ihren Erfolg
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Wählen Sie das passende Paket für Ihre Anforderungen und starten Sie noch heute 
              mit unserer KI-gestützten Voice Agent Lösung
            </p>
          </div>

          <PricingTables />
          <PricingFeatures />
          <PricingTestimonials />
          <PricingFAQ />
          <PricingCTA />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}