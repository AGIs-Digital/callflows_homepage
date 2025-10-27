"use client";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BreadcrumbSEO } from "@/components/ui/breadcrumb-seo";
import { Card, CardContent } from "@/components/ui/card";
import { useI18n } from "@/lib/i18n";
import { BookOpen } from "lucide-react";

export function GlossarContent() {
  const { t, tArray } = useI18n();
  
  // Hilfsfunktion: Hebt "callflows" im Text hervor
  const highlightCallflows = (text: string) => {
    const parts = text.split(/(callflows|Callflows|KI‑callflow|KI-callflow|AI callflow)/g);
    return parts.map((part, i) => {
      if (part.toLowerCase().includes('callflow')) {
        return <span key={i} className="text-primary font-semibold">{part}</span>;
      }
      return part;
    });
  };
  
  return (
    <main className="bg-background">
      <SiteHeader />
      <div className="relative overflow-hidden">
        {/* Hero Section */}
        <div className="relative pt-20 pb-12 overflow-hidden bg-gradient-to-b from-secondary/25 via-secondary/35 to-secondary/40">
          <div className="container max-w-6xl relative z-10">
            {/* Breadcrumbs */}
            <BreadcrumbSEO 
              items={[
                { name: "Glossar", url: "https://callflows.de/glossar" }
              ]}
            />
            
            {/* Header mit Icon */}
            <div className="text-center mb-12 mt-8">
              <div className="flex justify-center mb-6">
                <div className="bg-primary/10 rounded-full p-4 border border-primary/20">
                  <BookOpen className="w-8 h-8 text-primary" />
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                {t('glossary.kiCallflow.pageTitle')}
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {t('glossary.kiCallflow.pageDescription')}
              </p>
            </div>

            {/* Beschreibungsbox */}
            <Card className="mb-8 bg-card/90 backdrop-blur-sm border-primary/20 shadow-lg">
              <CardContent className="p-8 text-center">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Verstehen Sie die Unterschiede zwischen <strong className="text-primary">KI-Voice-Agent</strong>, <strong className="text-primary">KI-Callflow</strong> und klassischen Systemen – 
                  und wie sie optimal zusammenspielen.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* KI-Voice-Agent Section */}
        <section className="py-12 bg-gradient-to-b from-secondary/40 via-accent/25 to-accent/35">
          <div className="container max-w-6xl">
            <div className="rounded-xl border bg-card p-8">
              <div className="mb-2 text-base md:text-lg font-semibold text-primary uppercase tracking-wide">
                {t('glossary.kiVoiceAgent.tagline')}
              </div>
              <h2 className="text-3xl font-bold mb-4">{t('glossary.kiVoiceAgent.title')}</h2>
              <p className="text-base md:text-lg text-muted-foreground mb-6 leading-relaxed">
                {highlightCallflows(t('glossary.kiVoiceAgent.intro'))}
              </p>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-1 rounded-lg bg-primary/5 p-5">
                  <h3 className="text-lg font-semibold mb-3 text-green-600 dark:text-green-400">{t('glossary.kiVoiceAgent.canTitle')}</h3>
                  <ul className="space-y-2 text-base md:text-lg">
                    {tArray('glossary.kiVoiceAgent.canItems').map((item, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-green-600 dark:text-green-400 mr-2">✓</span>
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="md:col-span-1 rounded-lg bg-muted/30 p-5">
                  <h3 className="text-lg font-semibold mb-3 text-orange-600 dark:text-orange-400">{t('glossary.kiVoiceAgent.cannotTitle')}</h3>
                  <ul className="space-y-2 text-base md:text-lg">
                    {tArray('glossary.kiVoiceAgent.cannotItems').map((item, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-orange-600 dark:text-orange-400 mr-2">✗</span>
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="md:col-span-1 rounded-lg bg-accent/30 p-5 flex items-center justify-center">
                  <p className="text-center text-base md:text-lg font-medium text-foreground">
                    {highlightCallflows(t('glossary.kiVoiceAgent.needsCallflow'))}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* KI-Callflow Section mit Vergleichstabelle */}
        <section className="py-12 bg-gradient-to-b from-accent/35 via-primary/20 to-primary/25">
          <div className="container max-w-6xl">
            <div className="rounded-xl border bg-card p-8">
              <div className="mb-2 text-base md:text-lg font-semibold text-primary uppercase tracking-wide">
                {t('glossary.kiCallflow.tagline')}
              </div>
              <h2 className="text-3xl font-bold mb-6">{t('glossary.kiCallflow.diffTitle')}</h2>
              
              {/* Vergleichstabelle */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-base md:text-lg border-collapse">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="px-4 py-3 font-semibold border">{t('glossary.kiCallflow.comparisonHeaders.0')}</th>
                      <th className="px-4 py-3 font-semibold border text-center">{t('glossary.kiCallflow.comparisonHeaders.1')}</th>
                      <th className="px-4 py-3 font-semibold border text-center">{t('glossary.kiCallflow.comparisonHeaders.2')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tArray('glossary.kiCallflow.comparisonRows').map((row, idx) => {
                      const [label, voiceAgent, callflow] = row.split('||');
                      return (
                        <tr key={idx}>
                          <td className="px-4 py-3 border font-medium bg-muted/20">{label}</td>
                          <td className="px-4 py-3 border text-center">{highlightCallflows(voiceAgent)}</td>
                          <td className="px-4 py-3 border text-center bg-primary/5">{highlightCallflows(callflow)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 rounded-lg bg-accent/20 p-5">
                <p className="text-base md:text-lg">
                  <strong className="text-foreground">{t('glossary.kiCallflow.synergyTitle')}</strong> {highlightCallflows(t('glossary.kiCallflow.synergyText'))}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Klassischer Callflow */}
        <section className="py-12 bg-gradient-to-b from-primary/25 via-secondary/20 to-[#fffff0]">
          <div className="container max-w-6xl">
            <div className="rounded-xl border bg-card p-8">
              <div className="mb-2 text-base md:text-lg font-semibold text-muted-foreground uppercase tracking-wide">
                {t('glossary.classicCallflow.tagline')}
              </div>
              <h2 className="text-3xl font-bold mb-4">{t('glossary.classicCallflow.title')}</h2>
              <p className="text-base md:text-lg text-muted-foreground mb-6 leading-relaxed">
                {highlightCallflows(t('glossary.classicCallflow.intro'))}
              </p>
              
              <div className="bg-muted/30 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-foreground">{t('glossary.classicCallflow.diffTitle')}</h3>
                <div className="flex flex-wrap gap-3">
                  {tArray('glossary.classicCallflow.diffItems').map((item, i) => (
                    <div 
                      key={i} 
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background border border-border text-sm md:text-base text-muted-foreground"
                    >
                      <span className="text-red-500 font-bold">✗</span>
                      <span>{item.replace('❌ ', '')}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Terminologie-Tabelle - Mobile optimiert */}
        <section className="py-12 bg-gradient-to-b from-[#fffff0] to-primary/30">
          <div className="container max-w-6xl">
            <h2 className="text-2xl font-semibold mb-6">{t('glossary.kiCallflow.terminologyTitle')}</h2>
            
            {/* Desktop Tabelle */}
            <div className="hidden md:block rounded-xl border bg-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-base md:text-lg">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="px-4 py-3 font-semibold">{t('glossary.kiCallflow.terminologyHeaders.0')}</th>
                      <th className="px-4 py-3 font-semibold">{t('glossary.kiCallflow.terminologyHeaders.1')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {tArray('glossary.kiCallflow.terminology').map((row, idx) => {
                      const [term, focus] = row.split('||');
                      return (
                        <tr key={idx}>
                          <td className="px-4 py-3 whitespace-nowrap font-medium">{highlightCallflows(term)}</td>
                          <td className="px-4 py-3">{highlightCallflows(focus)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Card Layout */}
            <div className="md:hidden space-y-4">
              {tArray('glossary.kiCallflow.terminology').map((row, idx) => {
                const [term, focus] = row.split('||');
                return (
                  <div key={idx} className="rounded-lg border bg-card p-4 space-y-2">
                    <div className="font-semibold text-primary text-base uppercase tracking-wide">
                      {t('glossary.kiCallflow.terminologyHeaders.0')}
                    </div>
                    <div className="font-medium text-lg">{highlightCallflows(term)}</div>
                    <div className="font-medium text-primary text-base uppercase tracking-wide mt-3">
                      {t('glossary.kiCallflow.terminologyHeaders.1')}
                    </div>
                    <div className="text-muted-foreground text-base leading-relaxed">{highlightCallflows(focus)}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Ende‑zu‑Ende Sektion */}
        <section className="py-12 bg-gradient-to-b from-primary/30 via-tertiary/20 to-tertiary/25">
          <div className="container max-w-6xl">
            <div className="rounded-xl border bg-card p-6 md:p-8">
              <h2 className="text-2xl font-semibold mb-3">{t('glossary.kiCallflow.e2eTitle')}</h2>
              <p className="text-base md:text-lg text-muted-foreground mb-6">{highlightCallflows(t('glossary.kiCallflow.e2eDefinition'))}</p>
              <div>
                <h3 className="text-lg font-medium mb-3">{t('glossary.kiCallflow.e2eIncludesTitle')}</h3>
                <ul className="grid md:grid-cols-2 gap-x-8 gap-y-2 list-disc pl-5 text-base md:text-lg text-muted-foreground">
                  {tArray('glossary.kiCallflow.e2eIncludes').map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-b from-tertiary/25 via-accent/30 to-accent/45 pb-24">
          <div className="container max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t('glossary.kiCallflow.benefitsTitle')}</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {highlightCallflows(t('glossary.kiCallflow.benefitsSubtitle'))}
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {tArray('glossary.kiCallflow.benefits').map((benefit, i) => (
                <div key={i} className="group relative">
                  <div className="h-full p-8 rounded-2xl bg-card/80 border border-border/50 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/20 hover:-translate-y-1">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-primary font-bold text-lg">{i + 1}</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-foreground font-semibold text-lg leading-relaxed">
                        {highlightCallflows(benefit)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <SiteFooter />
    </main>
  );
}

