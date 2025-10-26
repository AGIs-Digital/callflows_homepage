"use client";
import Head from "next/head";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BreadcrumbSEO } from "@/components/ui/breadcrumb-seo";
import { useI18n } from "@/lib/i18n";

export default function GlossarIndex() {
  const { t, tArray } = useI18n();
  return (
    <>
      <Head>
        <title>{t('glossary.kiCallflow.pageTitle')}</title>
        <meta name="description" content={t('glossary.kiCallflow.pageDescription')} />
      </Head>
      <main className="bg-background">
        <SiteHeader />
        <div className="relative overflow-hidden">
        <section className="pt-20 pb-20 bg-gradient-to-b from-secondary/25 via-secondary/35 to-secondary/40">
          <div className="container max-w-6xl">
            {/* Breadcrumbs */}
            <BreadcrumbSEO 
              items={[
                { name: "Glossar", url: "https://callflows.de/glossar" }
              ]}
            />
            <div className="relative rounded-2xl border bg-card/60 backdrop-blur p-10 md:p-14">
              <div className="absolute -top-24 -right-24 h-64 w-64 rotate-12 bg-gradient-to-br from-primary/20 via-accent/20 to-primary/10 blur-3xl rounded-full" />
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary">{t('glossary.kiCallflow.title')}</h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
                {t('glossary.kiCallflow.intro')}
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 bg-gradient-to-b from-secondary/40 via-accent/25 to-accent/35">
          <div className="container max-w-6xl grid md:grid-cols-2 gap-8">
            <div className="rounded-xl border bg-card p-6">
              <h2 className="text-2xl font-semibold mb-4">{t('glossary.kiCallflow.diffTitle')}</h2>
              <ul className="space-y-2 text-muted-foreground">
                {tArray('glossary.kiCallflow.diffItems').map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border bg-card p-6">
              <h2 className="text-2xl font-semibold mb-4">{t('glossary.kiCallflow.voiceAgentsTitle')}</h2>
              <p className="text-muted-foreground">{t('glossary.kiCallflow.voiceAgentsText')}</p>
            </div>
          </div>
        </section>

        {/* Terminologie-Tabelle - Mobile optimiert */}
        <section className="py-12 bg-gradient-to-b from-accent/35 via-primary/25 to-primary/30">
          <div className="container max-w-6xl">
            <h2 className="text-2xl font-semibold mb-6">{t('glossary.kiCallflow.terminologyTitle')}</h2>
            
            {/* Desktop Tabelle */}
            <div className="hidden md:block rounded-xl border bg-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
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
                          <td className="px-4 py-3 whitespace-nowrap font-medium">{term}</td>
                          <td className="px-4 py-3">{focus}</td>
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
                    <div className="font-semibold text-primary text-sm uppercase tracking-wide">
                      {t('glossary.kiCallflow.terminologyHeaders.0')}
                    </div>
                    <div className="font-medium text-base">{term}</div>
                    <div className="font-medium text-primary text-sm uppercase tracking-wide mt-3">
                      {t('glossary.kiCallflow.terminologyHeaders.1')}
                    </div>
                    <div className="text-muted-foreground text-sm leading-relaxed">{focus}</div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 rounded-xl border bg-accent/10 p-5">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">{t('glossary.kiCallflow.noteLabel')}</strong> {t('glossary.kiCallflow.note')}
              </p>
            </div>
          </div>
        </section>

        {/* Ende‑zu‑Ende Sektion */}
        <section className="py-12 bg-gradient-to-b from-primary/30 via-tertiary/20 to-tertiary/25">
          <div className="container max-w-6xl">
            <div className="rounded-xl border bg-card p-6 md:p-8">
              <h2 className="text-2xl font-semibold mb-3">{t('glossary.kiCallflow.e2eTitle')}</h2>
              <p className="text-muted-foreground mb-6">{t('glossary.kiCallflow.e2eDefinition')}</p>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-medium mb-2">{t('glossary.kiCallflow.e2eIncludesTitle')}</h3>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    {tArray('glossary.kiCallflow.e2eIncludes').map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">{t('glossary.kiCallflow.e2eCriteriaTitle')}</h3>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    {tArray('glossary.kiCallflow.e2eCriteria').map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-b from-tertiary/25 via-accent/30 to-accent/45 pb-24">
          <div className="container max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">{t('glossary.kiCallflow.benefitsTitle')}</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t('glossary.kiCallflow.benefitsSubtitle')}
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
                        {benefit}
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
    </>
  );
}


