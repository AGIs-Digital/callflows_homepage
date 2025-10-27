import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PricingFeaturesSection } from "@/components/sections/pricing-features-section";
import { PilotPackageCard } from "@/components/pricing/pilot-package-card";
import { MinuteTiersTable } from "@/components/pricing/minute-tiers-table";
import { PricingBillingHints } from "@/components/pricing/pricing-billing-hints";
import { PricingIntro } from "@/components/pricing/pricing-intro";
import { ROICalculatorV2 } from "@/components/pricing/roi-calculator-v2";
import { CTASectionSecondary } from "@/components/sections/cta-section-secondary";
import { PricingHeroWrapper } from "./pricing-hero-wrapper";
import { generateMetadata as genMeta } from "@/lib/seo/metadata";

// Server-Side Metadata für SEO
export const metadata = genMeta({
  title: 'KI Telefonie Preise - Transparent & Fair | callflows',
  description: 'Faire Preise für KI Telefonie: Pay-per-Use ohne Vertragslaufzeit. Pilotmonat ab 2.490€ inkl. Setup & 500 Minuten. Minutenpreise ab 0,45€. Jetzt kostenlos beraten lassen!',
  path: '/pricing',
  keywords: [
    'KI Telefonie Preise',
    'Voice Agent Kosten',
    'KI Telefonie Tarife',
    'Pay per Use Telefonie',
    'ohne Vertragslaufzeit',
    'Automatisierte Telefonie Kosten',
    'KI Callcenter Preise',
    'Voice Agent Pricing'
  ],
  images: [{
    url: '/images/callflows_brand_small.webp',
    width: 1200,
    height: 630,
    alt: 'callflows Preise - KI Telefonie Tarife'
  }]
});

// JSON-LD Schema für Pricing/Product (SEO & RAG-optimiert)
const pricingSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "KI-callflow Pilotmonat",
  "description": "Individueller KI-callflow mit Einrichtung und 500 inkludierten Minuten. Keine Vertragslaufzeit, kein Risiko.",
  "image": [
    "https://callflows.de/images/callflows_brand_small.webp"
  ],
  "brand": {
    "@type": "Brand",
    "name": "callflows"
  },
  "offers": {
    "@type": "Offer",
    "priceCurrency": "EUR",
    "price": "2490.00",
    "priceValidUntil": "2025-12-31",
    "availability": "https://schema.org/InStock",
    "url": "https://callflows.de/pricing",
    "description": "Einmalige Setup-Gebühr für Pilotmonat mit 500 KI-Minuten inklusive"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "12"
  },
  "category": "Software > Künstliche Intelligenz > Conversational Automation"
};

export default function PricingPage() {
  return (
    <>
      {/* JSON-LD Schema für strukturierte Daten */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingSchema) }}
      />
      
      <main className="bg-background">
      <SiteHeader />
      <div>
        {/* Hero Header with Main Title - Client-Side for i18n */}
        <PricingHeroWrapper />
        
        {/* 1. Pilotmonat & 2. Minutenstaffel - Side by Side auf XL Screens */}
        <div className="py-12 bg-gradient-to-b from-tertiary/35 via-secondary/20 to-accent/40">
          <div className="container max-w-6xl mx-auto">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
              {/* 1. Pilotmonat-Angebot */}
              <PilotPackageCard />
              
              {/* 2. Minutenstaffel nach Go-Live */}
              <MinuteTiersTable />
            </div>
            
            {/* Hinweise zur Abrechnung - zentriert unter beiden Containern */}
            <PricingBillingHints />
          </div>
        </div>
        
        {/* 3. Alle Features enthalten */}
        <PricingFeaturesSection />
        
        {/* 4. ROI Calculator */}
        <div id="roi-calculator">
          <ROICalculatorV2 />
        </div>
        
        {/* 5. Intro-Block mit weiteren Erklärungen */}
        <PricingIntro />
        
        <CTASectionSecondary />
      </div>

      <SiteFooter />
      </main>
    </>
  );
}