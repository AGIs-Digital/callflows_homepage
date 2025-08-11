"use client";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PricingFeaturesSection } from "@/components/sections/pricing-features-section";
import { PricingTables } from "@/components/pricing/tables";
import { PricingIntro } from "@/components/pricing/pricing-intro";
import { ROICalculator } from "@/components/pricing/roi-calculator";
import { CTASectionSecondary } from "@/components/sections/cta-section-secondary";
import { BreadcrumbSEO } from "@/components/ui/breadcrumb-seo";
import { useI18n } from "@/lib/i18n";
import Head from "next/head";

export default function PricingPage() {
  const { t } = useI18n();
  
  return (
    <>
      <Head>
        <title>Preise für KI-Telefonie und Voice Agents | callflows</title>
        <meta name="description" content="Transparente Preise für KI Voice Agents. Minutenbasierte Abrechnung ohne versteckte Kosten, flexible Pakete und 1 Monat kostenlose Pilotphase. Jetzt Kosten berechnen!" />
      </Head>
      <main className="bg-background">
      <SiteHeader />
      <div className="pt-12">
        {/* Hero Header with Main Title */}
        <div className="py-20 bg-gradient-to-b from-secondary to-secondary/40">
          <div className="container max-w-6xl mx-auto">
            <BreadcrumbSEO 
              items={[
                { name: "Preise", url: "https://callflows.de/pricing" }
              ]}
            />
            <div className="text-center mt-12">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary dark:text-white mb-6 leading-tight">
                {t('pricing.pageTitle')}
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Transparente Preise für KI Voice Agents ohne versteckte Kosten
              </p>
            </div>
          </div>
        </div>
        
        {/* 1. Preistabellen zuerst */}
        <PricingTables />
        
        {/* 2. Alle Pakete enthalten */}
        <PricingFeaturesSection />
        
        {/* 3. Intro-Block mit Erklärungen */}
        <PricingIntro />
        
        <CTASectionSecondary />
      </div>

      <SiteFooter />
      </main>
    </>
  );
}