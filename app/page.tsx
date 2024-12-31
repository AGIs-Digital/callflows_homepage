import { SiteHeader } from "@/components/site-header";
import { HeroSection } from "@/components/hero-section";
import { ProcessSection } from "@/components/sections/process-section";
import { ProductPreviewSection } from "@/components/sections/product-preview-section";
import { UseCaseVideoSection } from "@/components/sections/use-case-video-section";
import { FeaturesSection } from "@/components/features-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { PricingSection } from "@/components/pricing-section";
import { CTASection } from "@/components/cta-section";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <main className="bg-background">
      <SiteHeader />
      <HeroSection />
      <div className="bg-section-light">
        <ProcessSection />
      </div>
      <div id="features">
        <FeaturesSection />
      </div>
      <div className="bg-section-dark">
        <ProductPreviewSection />
      </div>
      <div id="testimonials">
        <TestimonialsSection />
      </div>
      <div className="bg-section-light">
        <UseCaseVideoSection />
      </div>
      <div id="pricing">
        <PricingSection />
      </div>
      <CTASection />
      <SiteFooter />
    </main>
  );
}