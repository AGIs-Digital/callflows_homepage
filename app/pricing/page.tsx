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
        <title>KI-Voice-Agent Preise ohne Vertragslaufzeit | Pay-per-Use Telefonie | callflows</title>
        <meta name="description" content="Pilotmonat für 2.490 €, danach pro Minute abgerechnet – ohne Vertragsbindung. Jetzt KI-Callflow testen und Vertriebsprozesse automatisieren." />
        <meta name="keywords" content="KI-Voice-Agent, automatisierte Telefonie, Pay-per-Use, Vertrieb Mittelstand, minutenbasierte Abrechnung, ohne Vertragslaufzeit" />
      </Head>
      <main className="bg-background">
      <SiteHeader />
      <div>
        {/* Hero Header with Main Title */}
        <div className="pt-8 pb-16 bg-gradient-to-b from-secondary via-secondary/55 to-tertiary/35">
          <div className="container max-w-6xl mx-auto">
            <BreadcrumbSEO 
              items={[
                { name: "Preise", url: "https://callflows.de/pricing" }
              ]}
            />
            <div className="text-center mt-8">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary dark:text-white mb-4 leading-tight">
                Transparente KI-callflow Preise
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold text-accent mb-6">
                Preise ohne Vertragslaufzeit
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
                Starten Sie risikofrei mit einem Pilotmonat - keine Vertragslaufzeit, keine versteckten Kosten
              </p>
              <div className="bg-green-100 dark:bg-green-900/20 rounded-lg p-4 inline-block">
                <p className="text-green-800 dark:text-green-200 font-semibold">
                  ✓ Keine Vertragslaufzeit ✓ Kein Risiko ✓ Reine Nutzungsgebühr
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