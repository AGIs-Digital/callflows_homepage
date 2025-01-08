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
    <><div className="text-center mb-16">
      <h2 className="text-3xl font-bold mb-4 text-primary dark:text-white">
        Häufig gestellte Fragen
      </h2>
      <p className="text-muted-foreground">
        Finden Sie Antworten auf die wichtigsten Fragen zu unseren Paketen
      </p>
    </div><div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {pricingFAQs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div></>
  );
}