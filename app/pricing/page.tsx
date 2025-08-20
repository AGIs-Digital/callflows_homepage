"use client";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PricingFeaturesSection } from "@/components/sections/pricing-features-section";
import { PilotPackageCard } from "@/components/pricing/pilot-package-card";
import { MinuteTiersTable } from "@/components/pricing/minute-tiers-table";
import { PricingIntro } from "@/components/pricing/pricing-intro";
import { ROICalculatorV2 } from "@/components/pricing/roi-calculator-v2";
import { CTASectionSecondary } from "@/components/sections/cta-section-secondary";
import { BreadcrumbSEO } from "@/components/ui/breadcrumb-seo";
import { useI18n } from "@/lib/i18n";
import Head from "next/head";

export default function PricingPage() {
  const { t } = useI18n();
  
  return (
    <>
      <Head>
        <title>{t('pricing.seo.title')}</title>
        <meta name="description" content={t('pricing.seo.description')} />
        <meta name="keywords" content={t('pricing.seo.keywords')} />
      </Head>
      <main className="bg-background">
      <SiteHeader />
      <div>
        {/* Hero Header with Main Title */}
        <div className="pt-8 pb-16 bg-gradient-to-b from-secondary via-secondary/55 to-tertiary/35">
          <div className="container max-w-6xl mx-auto">
            <BreadcrumbSEO 
              items={[
                { name: t('pricing.hero.breadcrumb'), url: "https://callflows.de/pricing" }
              ]}
            />
            <div className="text-center mt-8">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary dark:text-white mb-4 leading-tight">
                {t('pricing.hero.title')}
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold text-accent mb-6">
                {t('pricing.hero.subtitle')}
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
                {t('pricing.hero.description')}
              </p>
              <div className="bg-green-100 dark:bg-green-900/20 rounded-lg p-4 inline-block">
                <p className="text-green-800 dark:text-green-200 font-semibold">
                  {t('pricing.hero.benefits')}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* 1. Pilotmonat-Paket */}
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