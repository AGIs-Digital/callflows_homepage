"use client";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PricingFeaturesSection } from "@/components/sections/pricing-features-section";
import { CTASection } from "@/components/sections/cta-section";
import { PricingTables } from "@/components/pricing/tables";
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
        <meta name="description" content="Transparente Preise für KI-gestützte Voice Agents. Minutenbasierte Abrechnung ohne versteckte Kosten, flexible Pakete und 1 Monat kostenlose Pilotphase. Jetzt Kosten berechnen!" />
      </Head>
      <main className="bg-background">
      <SiteHeader />
      <div className="pt-12">
        {/* Hero Section mit Farbverlauf */}
        <div className="pt-24 pb-16 bg-gradient-to-b from-secondary via-accent/5 to-accent/20">
          <div className="container">
            <BreadcrumbSEO 
              items={[
                { name: "Preise", url: "https://callflows.de/pricing" }
              ]}
            />
            <h1 className="text-3xl text-center sm:text-4xl md:text-4xl font-bold text-primary dark:text-white mb-4 md:mb-6 px-4">{t('pricing.pageTitle')}</h1>
            <PricingTables />
          </div>
        </div>
        
        <PricingFeaturesSection />
        <CTASectionSecondary />
      </div>

      <SiteFooter />
      </main>
    </>
  );
}