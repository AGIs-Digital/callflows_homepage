import { LegalLayout } from "@/components/legal/layout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { generateMetadata } from "@/lib/seo/metadata";
import { generateFAQSchema } from "@/lib/seo/schema";
import Script from "next/script";

export const metadata = generateMetadata({
  title: "Häufig gestellte Fragen zu KI Voice Agents",
  description: "Erfahren Sie mehr über KI-gestützte Telefonie, Voice Agents und wie callflows Ihre Kommunikation automatisieren kann. Antworten auf häufig gestellte Fragen zu Telefon KI.",
  path: "/faq",
  keywords: [
    "KI Voice Agent FAQ", 
    "Telefon KI Fragen", 
    "Sprachassistent Informationen", 
    "Automatisierte Telefonie Hilfe",
    "KI Telefonie Kosten"
  ]
});

const faqs = [
  {
    question: "Was ist ein KI Voice Agent?",
    answer: "Ein KI Voice Agent ist ein intelligenter Sprachassistent, der auf künstlicher Intelligenz basiert und in der Lage ist, Telefongespräche zu führen, Kundenanfragen zu beantworten und Prozesse zu automatisieren. Im Gegensatz zu herkömmlichen Sprachdialogsystemen können KI Voice Agents natürliche Gespräche führen, komplexe Anliegen verstehen und eigenständig Lösungen anbieten."
  },
  {
    question: "Wie funktioniert die Telefon KI von callflows?",
    answer: "Die Telefon KI von callflows nutzt fortschrittliche künstliche Intelligenz, um natürliche Gespräche zu führen. Sie versteht Anliegen, kann Termine buchen, Informationen geben und komplexe Aufgaben erledigen - alles über das Telefon. Die KI wird speziell auf Ihre Geschäftsprozesse trainiert und kann sich nahtlos in Ihre bestehenden Systeme integrieren. Sie arbeitet rund um die Uhr und kann mehrere Gespräche gleichzeitig führen."
  },
  {
    question: "Für welche Unternehmen eignet sich ein KI Voice Agent?",
    answer: "KI Voice Agents eignen sich für Unternehmen jeder Größe, die ihre Telefonkommunikation effizienter gestalten möchten. Besonders geeignet sind sie für Kundenservice, Vertrieb, Marketing und HR-Prozesse. Ob kleines Unternehmen oder großer Konzern - die Lösung skaliert mit Ihren Anforderungen und kann an verschiedene Branchen angepasst werden."
  },
  {
    question: "Was kostet ein KI Voice Agent?",
    answer: "Die Kosten für einen KI Voice Agent bei callflows basieren auf einem minutenbasierten Abrechnungsmodell. Die Preise beginnen bei 0,63€ pro Minute im Early-Bird-Angebot und variieren je nach Paket und Minutenvolumen. Es gibt keine versteckten Kosten oder Grundgebühren - Sie zahlen nur für die tatsächliche Nutzung. Für individuelle Anforderungen bieten wir maßgeschneiderte Lösungen an."
  },
  {
    question: "Kann ein KI Voice Agent in bestehende Systeme integriert werden?",
    answer: "Ja, die KI Voice Agents von callflows können nahtlos in bestehende CRM-Systeme, Kalendersysteme und andere Geschäftsanwendungen integriert werden, um einen reibungslosen Informationsaustausch zu gewährleisten. Die Integration erfolgt über APIs und Webhooks und wird von unserem Team vollständig betreut."
  },
  {
    question: "Wie natürlich klingt ein KI Voice Agent?",
    answer: "Die KI Voice Agents von callflows klingen außerordentlich natürlich und sind von menschlichen Gesprächspartnern kaum zu unterscheiden. Sie verstehen Kontext, können auf Nachfragen reagieren und führen flüssige Gespräche. Die Stimmen werden speziell für Ihre Marke ausgewählt und können in Tonalität und Sprechweise angepasst werden."
  },
  {
    question: "Wie lange dauert die Einrichtung eines KI Voice Agents?",
    answer: "Die Einrichtung eines KI Voice Agents dauert in der Regel 2-4 Wochen, abhängig von der Komplexität Ihrer Anforderungen. Der Prozess umfasst die Analyse Ihrer Geschäftsprozesse, die Konfiguration des Agents, die Integration in Ihre Systeme und ausführliche Tests. Unser Team begleitet Sie während des gesamten Prozesses und stellt sicher, dass der Agent optimal auf Ihre Bedürfnisse abgestimmt ist."
  },
  {
    question: "Welche Sprachen unterstützen die KI Voice Agents?",
    answer: "Aktuell unterstützen unsere KI Voice Agents Deutsch und Englisch. Weitere Sprachen sind in Planung und können auf Anfrage implementiert werden. Die Agents können auch mehrsprachig eingerichtet werden und erkennen automatisch die Sprache des Anrufers."
  },
  {
    question: "Wie werden die Daten geschützt?",
    answer: "Der Datenschutz hat bei callflows höchste Priorität. Alle Daten werden gemäß DSGVO verarbeitet und auf Servern innerhalb der EU gespeichert. Wir implementieren modernste Sicherheitsmaßnahmen wie Verschlüsselung, Zugriffskontrollen und regelmäßige Sicherheitsaudits. Detaillierte Informationen finden Sie in unserer Datenschutzerklärung."
  },
  {
    question: "Was unterscheidet callflows von anderen Anbietern?",
    answer: "callflows unterscheidet sich durch die Kombination aus fortschrittlicher KI-Technologie und persönlicher Betreuung. Wir bieten keine Standardlösung, sondern entwickeln mit Ihnen gemeinsam eine maßgeschneiderte Lösung, die perfekt zu Ihrem Unternehmen passt. Unsere KI Voice Agents sind besonders natürlich in der Gesprächsführung und können komplexe Aufgaben eigenständig erledigen. Zudem bieten wir ein transparentes Preismodell ohne versteckte Kosten."
  }
];

export default function FAQPage() {
  // Generiere das FAQ Schema
  const faqSchema = generateFAQSchema();
  
  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema)
        }}
      />
      
      <LegalLayout
        title="Häufig gestellte Fragen (FAQ)"
        subtitle="Alles, was Sie über KI Voice Agents und Telefon KI wissen müssen"
      >
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-muted-foreground mb-8">
            Hier finden Sie Antworten auf die häufigsten Fragen zu unseren KI Voice Agents und automatisierter Telefonie. Falls Ihre Frage nicht beantwortet wird, kontaktieren Sie uns gerne direkt.
          </p>
          
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
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