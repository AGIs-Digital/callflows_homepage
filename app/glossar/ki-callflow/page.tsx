"use client";
import Head from "next/head";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { useI18n } from "@/lib/i18n";

export default function KICallflowPage() {
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
        <section className="py-20 bg-gradient-to-b from-background via-accent/10 to-primary/5">
          <div className="container max-w-6xl">
            <div className="relative rounded-2xl border bg-card/60 backdrop-blur p-10 md:p-14">
              <div className="absolute -top-24 -right-24 h-64 w-64 rotate-12 bg-gradient-to-br from-primary/20 via-accent/20 to-primary/10 blur-3xl rounded-full" />
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary">{t('glossary.kiCallflow.title')}</h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
                {t('glossary.kiCallflow.intro')}
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 bg-gradient-to-b from-primary/5 via-primary/30 to-primary/60">
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

        {/* Terminologie-Tabelle */}
        <section className="py-12 bg-gradient-to-b from-primary/60 via-secondary/60 to-secondary/30">
          <div className="container max-w-6xl">
            <h2 className="text-2xl font-semibold mb-6">{t('glossary.kiCallflow.terminologyTitle')}</h2>
            <div className="rounded-xl border bg-card overflow-hidden">
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
                          <td className="px-4 py-3 whitespace-nowrap">{term}</td>
                          <td className="px-4 py-3">{focus}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-6 rounded-xl border bg-accent/10 p-5">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">{t('glossary.kiCallflow.noteLabel')}</strong> {t('glossary.kiCallflow.note')}
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 bg-gradient-to-b from-secondary/30 via-accent/20 to-accent/50 pb-20">
          <div className="container max-w-6xl">
            <div className="rounded-xl border bg-gradient-to-r from-primary/5 via-accent/10 to-primary/5 p-6">
              <h2 className="text-2xl font-semibold mb-3">{t('glossary.kiCallflow.benefitsTitle')}</h2>
              <div className="grid md:grid-cols-3 gap-6 text-muted-foreground">
                {tArray('glossary.kiCallflow.benefits').map((b, i) => (
                  <div key={i}>{b}</div>
                ))}
              </div>
            </div>
          </div>
        </section>
        </div>
        <SiteFooter />
      </main>
    </>
  );
}


