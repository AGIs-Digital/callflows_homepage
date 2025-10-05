import { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PricingFeaturesSection } from "@/components/sections/pricing-features-section";
import { PilotPackageCard } from "@/components/pricing/pilot-package-card";
import { MinuteTiersTable } from "@/components/pricing/minute-tiers-table";
import { PricingIntro } from "@/components/pricing/pricing-intro";
import { ROICalculatorV2 } from "@/components/pricing/roi-calculator-v2";
import { CTASectionSecondary } from "@/components/sections/cta-section-secondary";
import { BreadcrumbSEO } from "@/components/ui/breadcrumb-seo";
import deTranslations from "@/translations/de.json";

// Server-Side Metadata für SEO
export const metadata: Metadata = {
  title: deTranslations.pricing.seo.title,
  description: deTranslations.pricing.seo.description,
  keywords: [deTranslations.pricing.seo.keywords],
  openGraph: {
    title: deTranslations.pricing.seo.title,
    description: deTranslations.pricing.seo.description,
    url: "https://callflows.de/pricing",
    type: "website",
  },
};

// JSON-LD Schema für Pricing/Product (SEO & RAG-optimiert)
const pricingSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "KI-callflow Pilotmonat",
  "description": "Individueller KI-callflow mit Einrichtung und 1.000 inkludierten Minuten. Keine Vertragslaufzeit, kein Risiko.",
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
    "description": "Einmalige Setup-Gebühr für Pilotmonat mit 1.000 KI-Minuten inklusive"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "12"
  }
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
        {/* Hero Header with Main Title */}
        <div className="pt-8 pb-16 bg-gradient-to-b from-secondary via-secondary/55 to-tertiary/35">
          <div className="container max-w-6xl mx-auto">
            <BreadcrumbSEO 
              items={[
                { name: deTranslations.pricing.hero.breadcrumb, url: "https://callflows.de/pricing" }
              ]}
            />
            <div className="text-center mt-8">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary dark:text-white mb-4 leading-tight">
                {deTranslations.pricing.hero.title}
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold text-accent mb-6">
                {deTranslations.pricing.hero.subtitle}
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
                {deTranslations.pricing.hero.description}
              </p>
              <div className="bg-green-100 dark:bg-green-900/20 rounded-lg p-4 inline-block">
                <p className="text-green-800 dark:text-green-200 font-semibold">
                  {deTranslations.pricing.hero.benefits}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* 1. Pilotmonat-Angebot */}
        <PilotPackageCard />
        
        {/* 2. Minutenstaffel nach Go-Live */}
        <MinuteTiersTable />
        
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