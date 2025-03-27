import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Diese Funktion würde in einer echten Anwendung Daten aus einer Datenbank oder CMS abrufen
function getBlogPost(slug: string) {
  // Beispiel-Daten für einen Blogbeitrag
  return {
    title: "KI-Telefonie: Grundlagen und Einsatzmöglichkeiten",
    date: "15. November 2023",
    author: "Tom Abeln",
    category: "Grundlagen",
    image: "/images/blog/ki-telefonie-grundlagen.jpg",
    content: `
      <p>Die KI-gestützte Telefonie revolutioniert die Art und Weise, wie Unternehmen mit ihren Kunden kommunizieren. In diesem Artikel erfahren Sie alles über die Grundlagen dieser Technologie und ihre vielfältigen Einsatzmöglichkeiten.</p>
      
      <h2>Was ist KI-Telefonie?</h2>
      
      <p>KI-Telefonie bezeichnet den Einsatz künstlicher Intelligenz in der telefonischen Kommunikation. Dabei übernehmen intelligente Sprachassistenten (Voice Agents) Gespräche mit Kunden und können eine Vielzahl von Aufgaben erledigen - von der einfachen Informationsbereitstellung bis hin zur Terminvereinbarung oder Problemlösung.</p>
      
      <p>Im Gegensatz zu herkömmlichen IVR-Systemen (Interactive Voice Response) können moderne KI-Voice-Agents natürliche Gespräche führen, Kundenanliegen verstehen und flexibel darauf reagieren. Sie nutzen Technologien wie Natural Language Processing (NLP) und Machine Learning, um Sprache zu erkennen, zu verstehen und angemessen zu antworten.</p>
      
      <h2>Vorteile für Unternehmen</h2>
      
      <ul>
        <li><strong>24/7-Verfügbarkeit:</strong> KI Voice Agents sind rund um die Uhr einsatzbereit und können Kundenanfragen jederzeit bearbeiten.</li>
        <li><strong>Skalierbarkeit:</strong> Das System kann problemlos mit steigendem Anrufvolumen umgehen, ohne dass zusätzliches Personal eingestellt werden muss.</li>
        <li><strong>Kosteneffizienz:</strong> Reduzierung der Personalkosten bei gleichzeitiger Steigerung der Effizienz.</li>
        <li><strong>Konsistente Qualität:</strong> Jeder Kunde erhält die gleiche hochwertige Betreuung, unabhängig von Tageszeit oder Anrufaufkommen.</li>
        <li><strong>Datenerfassung:</strong> Automatische Dokumentation aller Gespräche für spätere Analysen und Optimierungen.</li>
      </ul>
      
      <h2>Einsatzbereiche</h2>
      
      <p>Die Einsatzmöglichkeiten von KI-Telefonie sind vielfältig und erstrecken sich über verschiedene Branchen und Anwendungsfälle:</p>
      
      <h3>Kundenservice</h3>
      
      <p>Im Kundenservice können KI Voice Agents häufig gestellte Fragen beantworten, Probleme lösen oder bei Bedarf an den richtigen Mitarbeiter weiterleiten. Sie können auch Kundenfeedback sammeln und auswerten.</p>
      
      <h3>Terminvereinbarung</h3>
      
      <p>Die automatisierte Terminvereinbarung ist ein weiterer wichtiger Einsatzbereich. KI Voice Agents können verfügbare Zeitfenster prüfen, Termine buchen, bestätigen oder verschieben - und das alles in einem natürlichen Gespräch.</p>
      
      <h3>Outbound-Kampagnen</h3>
      
      <p>Im Outbound-Bereich können KI Voice Agents für Umfragen, Erinnerungen oder Follow-up-Anrufe eingesetzt werden. Sie können personalisierte Gespräche führen und dabei große Mengen an Kontakten effizient bearbeiten.</p>
      
      <h3>Lead-Qualifizierung</h3>
      
      <p>KI Voice Agents können potenzielle Kunden kontaktieren, deren Interesse und Bedürfnisse ermitteln und qualifizierte Leads an das Vertriebsteam weiterleiten.</p>
      
      <h2>Technologische Grundlagen</h2>
      
      <p>Die KI-Telefonie basiert auf mehreren Schlüsseltechnologien:</p>
      
      <ul>
        <li><strong>Automatic Speech Recognition (ASR):</strong> Umwandlung von gesprochener Sprache in Text</li>
        <li><strong>Natural Language Processing (NLP):</strong> Verstehen der Bedeutung und des Kontexts von Texten</li>
        <li><strong>Natural Language Generation (NLG):</strong> Erzeugung natürlich klingender Antworten</li>
        <li><strong>Text-to-Speech (TTS):</strong> Umwandlung von Text in natürlich klingende Sprache</li>
        <li><strong>Machine Learning:</strong> Kontinuierliche Verbesserung durch Lernen aus Gesprächsdaten</li>
      </ul>
      
      <h2>Implementierung im Unternehmen</h2>
      
      <p>Die Einführung von KI-Telefonie erfordert eine sorgfältige Planung und Vorbereitung. Wichtige Schritte sind:</p>
      
      <ol>
        <li>Analyse der bestehenden Kommunikationsprozesse</li>
        <li>Definition der Ziele und Anwendungsfälle</li>
        <li>Auswahl eines geeigneten Anbieters</li>
        <li>Entwicklung und Training der Voice Agents</li>
        <li>Integration in bestehende Systeme (CRM, Telefonanlagen etc.)</li>
        <li>Testphase und Optimierung</li>
        <li>Schulung der Mitarbeiter</li>
        <li>Kontinuierliches Monitoring und Verbesserung</li>
      </ol>
      
      <h2>Fazit</h2>
      
      <p>KI-Telefonie bietet Unternehmen die Möglichkeit, ihre telefonische Kommunikation zu revolutionieren und dabei Kosten zu senken, die Effizienz zu steigern und die Kundenzufriedenheit zu verbessern. Mit der fortschreitenden Entwicklung der KI-Technologien werden die Einsatzmöglichkeiten in Zukunft noch vielfältiger und die Gesprächsqualität noch natürlicher werden.</p>
      
      <p>Für Unternehmen, die im Wettbewerb bestehen und ihre Kundenkommunikation auf ein neues Level heben wollen, ist die Auseinandersetzung mit KI-Telefonie nicht mehr optional, sondern zunehmend notwendig.</p>
    `,
    relatedPosts: [
      {
        id: 2,
        slug: "voice-agents-vs-chatbots",
        title: "Voice Agents vs. Chatbots: Was ist der Unterschied?",
        image: "/images/blog/voice-agents-vs-chatbots.jpg",
      },
      {
        id: 4,
        slug: "ki-telefonie-implementieren",
        title: "KI-Telefonie implementieren: So gelingt der Einstieg",
        image: "/images/blog/ki-telefonie-implementieren.jpg",
      }
    ]
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug);

  return (
    <div className="bg-background">
      <div className="container py-12">
        <Link href="/blog">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft size={16} className="mr-2" />
            Zurück zum Blog
          </Button>
        </Link>

        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 text-xs font-medium bg-primary text-primary-foreground rounded-full">
                {post.category}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {post.title}
            </h1>
            <div className="flex items-center text-muted-foreground mb-8">
              <span>{post.author}</span>
              <span className="mx-2">•</span>
              <span>{post.date}</span>
            </div>
          </div>

          <div className="relative w-full h-[400px] mb-12 rounded-xl overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>

          <div 
            className="prose prose-lg max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {post.relatedPosts && post.relatedPosts.length > 0 && (
            <div className="mt-16 pt-8 border-t">
              <h3 className="text-2xl font-bold mb-6">Verwandte Artikel</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {post.relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                    <div className="group border rounded-lg overflow-hidden bg-card hover:shadow-md transition-shadow">
                      <div className="relative h-48 w-full">
                        <Image
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="font-medium group-hover:text-primary transition-colors">
                          {relatedPost.title}
                        </h4>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 