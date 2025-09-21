import { generateMetadata } from "@/lib/seo/metadata";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, User, Calendar } from "lucide-react";

export const metadata = generateMetadata({
  title: "Kundenservice mit KI: So verbessern Sie die Customer Experience",
  description: "Entdecken Sie, wie KI Voice Agents den Kundenservice revolutionieren können.",
  path: "/blog/kundenservice-ki-customer-experience",
  type: "article",
  publishedTime: "2024-01-20T10:00:00Z",
  modifiedTime: "2024-01-21T10:00:00.000Z",
  authors: ["Tom Abeln"],
  keywords: [
    "KI Telefonie", 
    "Voice Agent", 
    "Automatisierte Telefonie",
    "callflows",
    "Kundenservice"
  ],
  images: [{
    url: "/images/blog/kundenservice-ki-customer-experience.webp",
    width: 1200,
    height: 630,
    alt: "Kundenservice mit KI: So verbessern Sie die Customer Experience"
  }]
});

export default function BlogPost() {
  return (
    <main className="min-h-screen bg-background">
      <div className="py-16 md:py-24 bg-gradient-to-b from-primary/20 via-accent/50 to-secondary/65">
        <div className="container max-w-6xl mx-auto">
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Zurück zum Blog
        </Link>
        
        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>Tom Abeln</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <time dateTime="2024-01-20T10:00:00Z">
                20. Januar 2024
              </time>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>3 Min. Lesezeit</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground leading-tight">
            Kundenservice mit KI: So verbessern Sie die Customer Experience
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Entdecken Sie, wie KI Voice Agents den Kundenservice revolutionieren können.
          </p>
          
          <div className="relative aspect-video w-full mb-8 overflow-hidden rounded-xl shadow-lg">
            <Image
              src="/images/blog/kundenservice-ki-customer-experience.webp"
              alt="Kundenservice mit KI: So verbessern Sie die Customer Experience"
              fill
              className="object-cover"
              priority
            />
          </div>
        </header>
        
        <div className="prose-content">
          <h3 className="text-2xl font-semibold mt-10 mb-5 text-foreground">KI-Telefonie verändert die Geschäftswelt</h3>

      <p className="mb-6 leading-relaxed text-lg">
        Entdecken Sie, wie KI Voice Agents den Kundenservice revolutionieren können.
      </p>

      <p className="mb-6 leading-relaxed text-lg">
        Die Zukunft der Kundenkommunikation liegt in intelligenten Voice Agents, die natürliche Gespräche führen und dabei höchste Servicequalität bieten.
      </p>

      <h3 className="text-2xl font-semibold mt-10 mb-5 text-foreground">Warum KI-Telefonie?</h3>

      <ul className="list-disc list-inside mb-6 space-y-2 ml-4">
        <li className="mb-2">24/7 Verfügbarkeit ohne Qualitätsverlust</li>
        <li className="mb-2">Konsistente Servicequalität bei jedem Anruf</li>
        <li className="mb-2">Kosteneinsparungen bei steigender Effizienz</li>
        <li className="mb-2">Skalierbarkeit für wachsende Unternehmen</li>
      </ul>

      <h3 className="text-2xl font-semibold mt-10 mb-5 text-foreground">Die callflows-Lösung</h3>

      <p className="mb-6 leading-relaxed text-lg">
        Unsere KI-Voice-Agents werden speziell für Ihre Branche und Ihre Bedürfnisse konfiguriert. Durch kontinuierliches Lernen werden sie immer besser und bieten Ihren Kunden eine optimale Erfahrung.
      </p>

      <p className="mb-6 leading-relaxed text-lg">
        "Die Implementierung von callflows hat unsere Kundenzufriedenheit deutlich verbessert", berichtet ein zufriedener Kunde.
      </p>

      <h3 className="text-2xl font-semibold mt-10 mb-5 text-foreground">Praktische Anwendungen</h3>

      <p className="mb-6 leading-relaxed text-lg">
        KI-Telefonie eignet sich für verschiedenste Anwendungsfälle - von der Terminbuchung über Kundenservice bis hin zur Leadqualifizierung. Die Technologie passt sich flexibel an Ihre Anforderungen an.
      </p>

      <h3 className="text-2xl font-semibold mt-10 mb-5 text-foreground">Nächste Schritte</h3>

      <p className="mb-6 leading-relaxed text-lg">
        Interessiert an KI-Telefonie für Ihr Unternehmen? Kontaktieren Sie uns für eine kostenlose Beratung und erfahren Sie, wie callflows Ihre Kundenkommunikation revolutionieren kann.
      </p>
        </div>
        
        <footer className="not-prose mt-16 pt-8 border-t">
          <div className="bg-accent/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3">
              Möchten Sie KI-Telefonie in Ihrem Unternehmen einsetzen?
            </h3>
            <p className="text-muted-foreground mb-4">
              Entdecken Sie, wie callflows Ihren Kundenservice revolutionieren kann. 
              Vereinbaren Sie eine kostenlose Beratung und testen Sie unsere KI-Voice-Agents.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link 
                href="/kontakt"
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
              >
                Kostenlosen Termin buchen
              </Link>
              <Link 
                href="/pricing"
                className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                Preise ansehen
              </Link>
            </div>
          </div>
        </footer>
        </div>
      </div>
    </main>
  );
}