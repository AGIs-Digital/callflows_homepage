"use client";

import { LegalLayout } from "@/components/legal/layout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { generateFAQSchema } from "@/lib/seo/schema";
import { useI18n } from "@/lib/i18n";
import Script from "next/script";
import Head from "next/head";

// Metadata wird jetzt dynamisch über i18n generiert

export default function FAQPage() {
  const { t } = useI18n();
  
  // Generiere das FAQ Schema mit übersetzten Texten
  const faqSchema = generateFAQSchema();
  
  // FAQ-Daten aus den Übersetzungen
  const faqItems = Array.from({ length: 14 }, (_, i) => ({
    question: t(`faq.question${i + 1}`),
    answer: t(`faq.answer${i + 1}`)
  }));
  
  return (
    <>
      <Head>
        <title>FAQ - Häufige Fragen zu KI-Telefonie und Voice Agents | callflows</title>
        <meta name="description" content="Antworten auf häufige Fragen zu KI-Telefonie, Voice Agents und automatisierter Kundenkommunikation. Alles über Kosten, Integration, Datenschutz und technische Anforderungen." />
      </Head>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema)
        }}
      />
      
      <LegalLayout
        title={t('faq.pageTitle')}
        subtitle={t('faq.pageSubtitle')}
      >
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-muted-foreground mb-8">
            {t('faq.description')}
          </p>
          
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                data-faq-id={index}
                data-track="faq-click"
                itemScope
                itemType="https://schema.org/Question"
              >
                <AccordionTrigger 
                  className="text-left font-medium py-4"
                  itemProp="name"
                >
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent 
                  className="text-muted-foreground"
                  itemScope
                  itemType="https://schema.org/Answer"
                  itemProp="acceptedAnswer"
                >
                  <div itemProp="text">
                    {faq.answer}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </LegalLayout>
    </>
  );
} 