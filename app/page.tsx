import dynamic from "next/dynamic";
import { Suspense } from "react";
import { SiteHeader } from "@/components/site-header";
import { HeroSection } from "@/components/sections/hero-section";
import { SiteFooter } from "@/components/site-footer";

// Critical Above-the-fold content loads immediately
// Below-the-fold content loads progressively

// High Priority - Visible on mobile quickly
const IntegrationChallengesSection = dynamic(() => import("@/components/sections/integration-challenges-section").then(mod => ({ default: mod.IntegrationChallengesSection })), {
  loading: () => <div className="h-32 bg-gradient-to-r from-secondary/20 to-accent/20 animate-pulse"></div>
});

const FeaturesSection = dynamic(() => import("@/components/sections/features-section").then(mod => ({ default: mod.FeaturesSection })), {
  loading: () => <div className="h-40 bg-gradient-to-r from-primary/10 to-secondary/10 animate-pulse"></div>
});

// Medium Priority - Loads after critical content
const ProcessSection = dynamic(() => import("@/components/sections/process-section").then(mod => ({ default: mod.ProcessSection })), {
  loading: () => <div className="h-48 bg-gradient-to-r from-accent/10 to-primary/10 animate-pulse"></div>
});

const PetraUSPSection = dynamic(() => import("@/components/sections/petra-usp-section").then(mod => ({ default: mod.PetraUSPSection })), {
  loading: () => <div className="h-40 bg-gradient-to-r from-secondary/10 to-accent/10 animate-pulse"></div>
});

const CTASection = dynamic(() => import("@/components/sections/cta-section").then(mod => ({ default: mod.CTASection })), {
  loading: () => <div className="h-32 bg-gradient-to-r from-primary/10 to-accent/10 animate-pulse"></div>
});

// Low Priority - Loads when user scrolls
const PricingComparisonSection = dynamic(() => import("@/components/sections/pricing-comparison-section").then(mod => ({ default: mod.PricingComparisonSection })), {
  loading: () => <div className="h-56 bg-gradient-to-r from-accent/10 to-secondary/10 animate-pulse"></div>
});

const SocialProofROISection = dynamic(() => import("@/components/sections/social-proof-roi-section").then(mod => ({ default: mod.SocialProofROISection })), {
  loading: () => <div className="h-40 bg-gradient-to-r from-primary/10 to-secondary/10 animate-pulse"></div>
});

const CoreFeaturesSection = dynamic(() => import("@/components/sections/core-features-section").then(mod => ({ default: mod.CoreFeaturesSection })), {
  loading: () => <div className="h-48 bg-gradient-to-r from-secondary/10 to-accent/10 animate-pulse"></div>
});

const CTASectionSecondary = dynamic(() => import("@/components/sections/cta-section-secondary").then(mod => ({ default: mod.CTASectionSecondary })), {
  loading: () => <div className="h-32 bg-gradient-to-r from-accent/10 to-primary/10 animate-pulse"></div>
});

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
        {/* Critical Above-the-fold content - loads immediately */}
        <HeroSection />
        
        {/* High Priority - visible quickly on mobile */}
        <Suspense fallback={<div className="h-32 bg-gradient-to-r from-secondary/20 to-accent/20 animate-pulse"></div>}>
          <IntegrationChallengesSection />
        </Suspense>
        
        <Suspense fallback={<div className="h-40 bg-gradient-to-r from-primary/10 to-secondary/10 animate-pulse"></div>}>
          <SocialProofROISection />
        </Suspense>
        
        <Suspense fallback={<div className="h-40 bg-gradient-to-r from-secondary/10 to-primary/10 animate-pulse"></div>}>
          <FeaturesSection />
        </Suspense>
        
        {/* Medium Priority - loads after critical content */}
        <Suspense fallback={<div className="h-48 bg-gradient-to-r from-accent/10 to-primary/10 animate-pulse"></div>}>
          <ProcessSection />
        </Suspense>
        
        <Suspense fallback={<div className="h-40 bg-gradient-to-r from-secondary/10 to-accent/10 animate-pulse"></div>}>
          <PetraUSPSection />
        </Suspense>
        
        <Suspense fallback={<div className="h-32 bg-gradient-to-r from-primary/10 to-accent/10 animate-pulse"></div>}>
          <CTASection />
        </Suspense>
        
        {/* Low Priority - loads when user scrolls */}
        <Suspense fallback={<div className="h-56 bg-gradient-to-r from-accent/10 to-secondary/10 animate-pulse"></div>}>
          <PricingComparisonSection />
        </Suspense>
        
        <Suspense fallback={<div className="h-48 bg-gradient-to-r from-secondary/10 to-accent/10 animate-pulse"></div>}>
          <CoreFeaturesSection />
        </Suspense>
        
        <Suspense fallback={<div className="h-32 bg-gradient-to-r from-accent/10 to-primary/10 animate-pulse"></div>}>
          <CTASectionSecondary />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  );
}