import { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FAQClientWrapper } from "./faq-client-wrapper";
import deTranslations from "@/translations/de.json";

// Server-Side Metadata für SEO
export const metadata: Metadata = {
  title: "KI Telefonie FAQ: Häufige Fragen zu Voice Bots & automatisierten Anrufen | callflows",
  description: "Alle Antworten zu KI Telefonie, Voice Bot Software und automatisierten Anrufen. Was kostet KI Telefonie? Wie funktioniert ein Voice Bot? DSGVO-konforme Lösungen.",
  keywords: ["KI Telefonie FAQ", "Voice Bot Fragen", "automatisierte Telefonie Antworten", "KI Telefonassistent Hilfe", "Voice Bot Deutschland"],
  openGraph: {
    title: "KI Telefonie FAQ: Häufige Fragen zu Voice Bots & automatisierten Anrufen | callflows",
    description: "Alle Antworten zu KI Telefonie, Voice Bot Software und automatisierten Anrufen. Was kostet KI Telefonie? Wie funktioniert ein Voice Bot?",
    url: "https://callflows.de/faq",
    type: "website",
  },
};

// FAQ-Daten direkt aus Übersetzungen laden (Server-Side für JSON-LD)
const faqItems = Array.from({ length: 12 }, (_, i) => ({
  question: deTranslations.faq[`question${i + 1}` as keyof typeof deTranslations.faq] as string,
  answer: deTranslations.faq[`answer${i + 1}` as keyof typeof deTranslations.faq] as string,
}));

// JSON-LD Schema für FAQPage (SEO & RAG-optimiert)
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqItems.map((faq) => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer,
    },
  })),
};

export default function FAQPage() {
  return (
    <>
      {/* JSON-LD Schema für strukturierte Daten - bleibt SSR für Crawler */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      {/* Versteckte FAQ-Texte für SEO/Crawler */}
      <div className="sr-only">
        <h1>FAQ - Häufige Fragen zu KI-Voice-Agents und automatisierter Telefonie</h1>
        {faqItems.map((faq, index) => (
          <div key={index}>
            <h2>{faq.question}</h2>
            <p>{faq.answer}</p>
          </div>
        ))}
      </div>
      
      <SiteHeader />
      <FAQClientWrapper />
      <SiteFooter />
    </>
  );
}
