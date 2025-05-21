import fs from 'fs';
import path from 'path';

// Konfiguration
const authors = ["Tom Abeln", "Timo Goltz"];

// Spezifische Veröffentlichungsdaten für 2025
const publishDates = [
  new Date('2025-05-23T10:00:00Z'), // Erster Artikel am 23.05.2025
  new Date('2025-06-18T14:00:00Z'), // Zweiter Artikel am 18.06.2025
  new Date('2025-07-12T09:30:00Z'), // Dritter Artikel am 12.07.2025
  new Date('2025-08-27T11:15:00Z'), // Vierter Artikel am 27.08.2025
  new Date('2025-09-15T13:45:00Z')  // Fünfter Artikel am 15.09.2025
];

// Aktuelle Themen für 2025 mit Fokus auf Case Studies und produktfördernde Inhalte
const futureTopics = [
  {
    slug: "ki-telefonie-klarna-menschliche-kommunikation",
    title: "Klarna & Co zeigen: Warum KI-Telefonie nicht ohne Menschen funktioniert",
    description: "Viele Unternehmen setzen auf KI im Kundenservice – doch Klarna beweist, dass menschliche Stimmen weiterhin unverzichtbar sind. So gelingt der smarte Mix aus KI und Mensch.",
    keywords: ["KI Kundenservice 2025", "Klarna KI Fehler", "hybride Callcenter", "Voice Agent Trends"]
  },
  {
    slug: "voice-agents-praxis-ki-telefonie-2025",
    title: "Voice Agents im Praxiseinsatz: Was KI-Telefonie 2025 wirklich kann",
    description: "Was leisten moderne KI-Voice Agents im Alltag? Ein Überblick über aktuelle Use Cases, Technologieanbieter und Praxistipps für erfolgreiche Implementierung.",
    keywords: ["Voice Agent 2025", "KI Telefonie Einsatz", "AI Kundenservice", "Conversational AI"]
  },
  {
    slug: "datenschutz-ki-telefonie-regeln-2025",
    title: "Datenschutz in der KI-Telefonie: Diese 5 Regeln gelten jetzt",
    description: "KI-Telefonie unterliegt strengen Datenschutzvorgaben. Diese fünf aktuellen Grundsätze sollten Sie 2025 unbedingt beachten – für DSGVO-konforme Kommunikation.",
    keywords: ["KI Datenschutz Telefonie", "DSGVO Voice Bots", "Datenschutz KI 2025", "Sprach-KI Compliance"]
  },
  {
    slug: "hybride-callcenter-ki-vs-mensch",
    title: "KI vs. Mensch: Warum hybride Callcenter die besseren Ergebnisse liefern",
    description: "Weder reine KI noch nur Menschen: Die besten Ergebnisse im Kundenservice entstehen durch intelligente Kombination. Das spricht für hybride Modelle.",
    keywords: ["KI Callcenter Vergleich", "hybride Voice Agents", "Callcenter Zukunft", "AI Mensch Zusammenarbeit"]
  },
  {
    slug: "ki-telefonie-kmu-einstieg",
    title: "KI-Telefonie für KMU: Günstig starten, groß profitieren",
    description: "Auch kleine Unternehmen können von KI-Telefonie profitieren. So gelingt der Einstieg mit geringem Budget – inklusive Tools und Praxisbeispielen.",
    keywords: ["KI für kleine Unternehmen", "AI Telefonie KMU", "Einstieg KI Callcenter", "automatisierter Kundenservice"]
  }
];

// Funktion zum Formatieren eines Datums als ISO-String
function formatDateForMetadata(date: Date): string {
  return date.toISOString().replace(/\.\d{3}Z$/, 'Z');
}

// Funktion zum Generieren eines modifiedTime-Datums (3-7 Tage nach publishedTime)
function generateModifiedTime(publishDate: Date): string {
  const modifiedDate = new Date(publishDate);
  const daysToAdd = 3 + Math.floor(Math.random() * 5); // 3-7 Tage
  modifiedDate.setDate(modifiedDate.getDate() + daysToAdd);
  
  // Zufällige Uhrzeit zwischen 9:00 und 16:00 Uhr
  const hours = 9 + Math.floor(Math.random() * 8);
  const minutes = Math.floor(Math.random() * 60);
  modifiedDate.setHours(hours, minutes, 0, 0);
  
  return formatDateForMetadata(modifiedDate);
}

// Funktion zum Erstellen eines Platzhalter-Blogbeitrags
function createFutureBlogPost(topic: any, index: number): void {
  // Generiere Daten für den Blogbeitrag
  const publishDate = publishDates[index];
  const publishedTime = formatDateForMetadata(publishDate);
  const modifiedTime = generateModifiedTime(publishDate);
  const author = authors[index % authors.length];
  
  // Erstelle Verzeichnis für den Blogbeitrag
  const dirPath = path.join(process.cwd(), 'app/blog', topic.slug);
  
  // Prüfe, ob der Ordner bereits existiert
  if (fs.existsSync(dirPath)) {
    console.log(`Überspringe ${topic.slug}: Ordner existiert bereits.`);
    return;
  }
  
  fs.mkdirSync(dirPath, { recursive: true });
  
  // Erstelle den Inhalt der page.tsx Datei
  const content = `import { generateMetadata } from "@/lib/seo/metadata";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = generateMetadata({
  title: "${topic.title}",
  description: "${topic.description}",
  path: "/blog/${topic.slug}",
  type: "article",
  publishedTime: "${publishedTime}",
  modifiedTime: "${modifiedTime}",
  authors: ["${author}"],
  keywords: [
    "${topic.keywords[0]}", 
    "${topic.keywords[1]}", 
    "${topic.keywords[2]}", 
    "${topic.keywords[3]}"
  ],
  images: [{
    url: "/images/blog/${topic.slug}.png",
    width: 1200,
    height: 630,
    alt: "${topic.title}"
  }]
});

export default function BlogPostPage() {
  return (
    <div className="container max-w-4xl py-16 md:py-24">
      <Link 
        href="/blog" 
        className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Zurück zum Blog
      </Link>
      
      <article>
        <header className="mb-10">
          <div className="flex items-center text-sm text-muted-foreground mb-3">
            <span>${author}</span>
            <span className="mx-2">•</span>
            <time dateTime="${publishedTime}">
              ${new Date(publishedTime).toLocaleDateString('de-DE', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </time>
            <span className="mx-2">•</span>
            <span>12 Min. Lesezeit</span>
          </div>
          
          <h1 className="text-4xl font-bold mb-6">${topic.title}</h1>
          
          <div className="relative aspect-video w-full mb-6 overflow-hidden rounded-lg">
            <Image
              src="/images/blog/${topic.slug}.png"
              alt="${topic.title}"
              fill
              className="object-cover"
            />
          </div>
        </header>
        
        <div className="prose prose-lg dark:prose-invert">
          <p>
            <strong>Hinweis:</strong> Dieser Artikel wird automatisch am ${new Date(publishedTime).toLocaleDateString('de-DE', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })} veröffentlicht.
          </p>
          
          <p>
            Bitte erstellen Sie ein Bild für diesen Blogbeitrag unter:
            <br />
            <code>/public/images/blog/${topic.slug}.png</code>
          </p>
          
          <p>
            <em>Hier können Sie den Inhalt des Artikels einfügen.</em>
          </p>
        </div>
      </article>
    </div>
  );
}`;

  // Schreibe die Datei
  fs.writeFileSync(path.join(dirPath, 'page.tsx'), content);
  
  console.log(`Zukünftiger Blogbeitrag erstellt: ${topic.slug}`);
  console.log(`  Titel: ${topic.title}`);
  console.log(`  Autor: ${author}`);
  console.log(`  Veröffentlichungsdatum: ${new Date(publishedTime).toLocaleDateString('de-DE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })} um ${new Date(publishedTime).toLocaleTimeString('de-DE', {
    hour: '2-digit',
    minute: '2-digit'
  })} Uhr`);
  console.log('---');
}

// Erstelle die zukünftigen Blogbeiträge
async function createFutureBlogPosts() {
  console.log("Erstelle zukünftige Blogbeiträge für 2025...");
  console.log('---');
  
  // Erstelle die Blogbeiträge
  futureTopics.forEach((topic, index) => {
    if (index < publishDates.length) {
      createFutureBlogPost(topic, index);
    }
  });
  
  console.log('---');
  console.log(`${Math.min(futureTopics.length, publishDates.length)} zukünftige Blogbeiträge für 2025 wurden erstellt.`);
  console.log('Hinweis: Bitte erstellen Sie die entsprechenden Bilder im Verzeichnis /public/images/blog/');
  console.log('');
  console.log('Um nach diesen 5 Monaten neue Blogs zu erstellen:');
  console.log('1. Aktualisieren Sie die publishDates im Skript mit neuen Daten');
  console.log('2. Fügen Sie neue Themen zur futureTopics-Liste hinzu');
  console.log('3. Führen Sie das Skript erneut aus');
}

// Führe das Skript aus
createFutureBlogPosts().catch(console.error); 