"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { pricingFAQs } from "@/lib/pricing-data";

export function PricingFAQ() {
  return (
    <>
      <div className="text-center mb-8 md:mb-16 px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 text-primary dark:text-white">
          Häufig gestellte Fragen
        </h2>
        <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
          Finden Sie Antworten auf die wichtigsten Fragen zu unseren Preisen
        </p>
      </div>
      
      <div className="max-w-3xl mx-auto px-4 md:px-0">
        <Accordion type="single" collapsible className="w-full">
          {pricingFAQs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-sm md:text-base font-medium py-4 md:py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </>
  );
}