"use client";

import { LegalLayout } from "@/components/legal/layout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

import { useI18n } from "@/lib/i18n";
// Metadata wird jetzt dynamisch über i18n generiert

export default function FAQPage() {
  const { t } = useI18n();
  
  // FAQ-Daten aus den Übersetzungen
  const faqItems = Array.from({ length: 14 }, (_, i) => ({
    question: t(`faq.question${i + 1}`),
    answer: t(`faq.answer${i + 1}`)
  }));
  
  return (
    <>
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
              >
                <AccordionTrigger className="text-left font-medium py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </LegalLayout>
    </>
  );
} 