"use client";

import { BreadcrumbSEO } from "@/components/ui/breadcrumb-seo";
import { useI18n } from "@/lib/i18n";

export function PricingHeroWrapper() {
  const { t } = useI18n();
  
  const highlightCallflows = (text: string) => {
    return text.replace(/callflows/gi, '<strong class="text-primary">callflows</strong>');
  };

  return (
    <section className="py-20 bg-gradient-to-b from-secondary via-secondary/55 to-tertiary/35">
      <div className="container max-w-6xl mx-auto">
        <BreadcrumbSEO 
          items={[
            { name: t('pricing.hero.breadcrumb'), url: "https://callflows.de/pricing" }
          ]}
        />
        <div className="text-center mt-8">
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground dark:text-white mb-4 leading-tight"
            dangerouslySetInnerHTML={{ __html: highlightCallflows(t('pricing.hero.title')) }}
          />
          <h2 
            className="text-2xl md:text-3xl font-semibold text-accent mb-6"
            dangerouslySetInnerHTML={{ __html: highlightCallflows(t('pricing.hero.subtitle')) }}
          />
          <p 
            className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6"
            dangerouslySetInnerHTML={{ __html: highlightCallflows(t('pricing.hero.description')) }}
          />
          <div className="bg-green-100 dark:bg-green-900/20 rounded-lg p-4 inline-block">
            <p className="text-green-800 dark:text-green-200 font-semibold">
              {t('pricing.hero.benefits')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

