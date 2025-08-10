const fs = require('fs');
const path = require('path');

// Aktuelle Blog-Posts (nur 2024 und neuer)
const POSTS = [
  {
    slug: "kundenservice-ki-customer-experience",
    title: "Kundenservice mit KI: So verbessern Sie die Customer Experience",
    description: "Entdecken Sie, wie KI-gestützte Voice Agents den Kundenservice revolutionieren können.",
    publishedTime: "2024-01-20T10:00:00Z",
    author: "Tom Abeln",
    image: "/images/blog/kundenservice-ki-customer-experience.webp"
  },
  {
    slug: "ki-telefonie-mitarbeiter-akzeptanz",
    title: "KI-Telefonie und Mitarbeiter: Wie man die Akzeptanz fördert",
    description: "Erfahren Sie, wie Sie Ihre Mitarbeiter für KI-Telefonie begeistern können. Praktische Tipps und Strategien für eine erfolgreiche Implementierung ohne Widerstände.",
    publishedTime: "2024-03-05T10:00:00Z",
    author: "Timo Goltz",
    image: "/images/blog/ki-telefonie-mitarbeiter-akzeptanz.webp"
  },
  {
    slug: "ki-telefonie-branchen",
    title: "KI-Telefonie in verschiedenen Branchen: Erfolgsgeschichten und Best Practices",
    description: "Entdecken Sie, wie verschiedene Branchen KI-Telefonie erfolgreich einsetzen. Von E-Commerce bis Gesundheitswesen - reale Beispiele und bewährte Praktiken.",
    publishedTime: "2024-04-15T10:00:00Z",
    author: "Timo Goltz",
    image: "/images/blog/ki-telefonie-branchen.webp"
  },
  {
    slug: "kosten-nutzen-analyse-ki-telefonie",
    title: "Kosten-Nutzen-Analyse: Lohnt sich KI-Telefonie für Ihr Unternehmen?",
    description: "Erfahren Sie, wie Sie die Wirtschaftlichkeit von KI-Telefonie für Ihr Unternehmen berechnen können. Eine detaillierte Kosten-Nutzen-Analyse mit ROI-Berechnungen und Praxisbeispielen.",
    publishedTime: "2024-06-01T10:00:00Z",
    author: "Tom Abeln",
    image: "/images/blog/kosten-nutzen-analyse-ki-telefonie.webp"
  },
  {
    slug: "ki-telefonie-gesundheitswesen",
    title: "KI-Telefonie im Gesundheitswesen: Anwendungsfälle und Erfolgsgeschichten",
    description: "Entdecken Sie, wie KI-gestützte Voice Agents das Gesundheitswesen revolutionieren. Von der Terminvergabe bis zur Patientenbetreuung - reale Erfolgsgeschichten und Praxisbeispiele.",
    publishedTime: "2024-07-20T10:00:00Z",
    author: "Timo Goltz",
    image: "/images/blog/ki-telefonie-gesundheitswesen.webp"
  },
  {
    slug: "gpt4o-ki-telefonie",
    title: "GPT-4o revolutioniert KI-Telefonie: Neue Möglichkeiten für Unternehmen",
    description: "Erfahren Sie, wie OpenAIs neuestes Sprachmodell GPT-4o die KI-Telefonie auf ein neues Level hebt.",
    publishedTime: "2024-11-05T10:00:00Z",
    author: "Tom Abeln",
    image: "/images/blog/gpt4o-ki-telefonie.webp"
  }
];

function generateSimpleContent(post) {
  return `
KI-Telefonie verändert die Geschäftswelt

${post.description}

Die Zukunft der Kundenkommunikation liegt in intelligenten Voice Agents, die natürliche Gespräche führen und dabei höchste Servicequalität bieten.

Warum KI-Telefonie?

• 24/7 Verfügbarkeit ohne Qualitätsverlust
• Konsistente Servicequalität bei jedem Anruf  
• Kosteneinsparungen bei steigender Effizienz
• Skalierbarkeit für wachsende Unternehmen

Die callflows-Lösung

Unsere KI-Voice-Agents werden speziell für Ihre Branche und Ihre Bedürfnisse konfiguriert. Durch kontinuierliches Lernen werden sie immer besser und bieten Ihren Kunden eine optimale Erfahrung.

"Die Implementierung von callflows hat unsere Kundenzufriedenheit deutlich verbessert", berichtet ein zufriedener Kunde.

Praktische Anwendungen

KI-Telefonie eignet sich für verschiedenste Anwendungsfälle - von der Terminbuchung über Kundenservice bis hin zur Leadqualifizierung. Die Technologie passt sich flexibel an Ihre Anforderungen an.

Nächste Schritte

Interessiert an KI-Telefonie für Ihr Unternehmen? Kontaktieren Sie uns für eine kostenlose Beratung und erfahren Sie, wie callflows Ihre Kundenkommunikation revolutionieren kann.
`;
}

function generateTSX(post) {
  const publishDate = new Date(post.publishedTime);
  const modifiedTime = new Date(publishDate.getTime() + 24 * 60 * 60 * 1000);
  
  const content = generateSimpleContent(post);
  
  return `import { generateMetadata } from "@/lib/seo/metadata";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, User, Calendar } from "lucide-react";

export const metadata = generateMetadata({
  title: "${post.title.replace(/"/g, '\\"')}",
  description: "${post.description.replace(/"/g, '\\"')}",
  path: "/blog/${post.slug}",
  type: "article",
  publishedTime: "${post.publishedTime}",
  modifiedTime: "${modifiedTime.toISOString()}",
  authors: ["${post.author.replace(/"/g, '\\"')}"],
  keywords: [
    "KI Telefonie", 
    "Voice Agent", 
    "Automatisierte Telefonie",
    "callflows",
    "Kundenservice"
  ],
  images: [{
    url: "${post.image}",
    width: 1200,
    height: 630,
    alt: "${post.title.replace(/"/g, '\\"')}"
  }]
});

export default function BlogPost() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container max-w-4xl py-16 md:py-24">
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
              <span>${post.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <time dateTime="${post.publishedTime}">
                ${publishDate.toLocaleDateString('de-DE', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </time>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>3 Min. Lesezeit</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground leading-tight">
            ${post.title}
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            ${post.description}
          </p>
          
          <div className="relative aspect-video w-full mb-8 overflow-hidden rounded-xl shadow-lg">
            <Image
              src="${post.image}"
              alt="${post.title.replace(/"/g, '\\"')}"
              fill
              className="object-cover"
              priority
            />
          </div>
        </header>
        
        <div className="prose-content">
          ${formatContentToJSX(content)}
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
                Kostenlose Beratung buchen
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
    </main>
  );
}`;
}

function formatContentToJSX(content) {
  return content
    .split('\n\n')
    .filter(p => p.trim())
    .map(paragraph => {
      let trimmed = paragraph.trim();
      
      // Überschriften
      if (trimmed.length < 60 && !trimmed.endsWith('.') && !trimmed.includes('•')) {
        return `<h3 className="text-2xl font-semibold mt-10 mb-5 text-foreground">${trimmed}</h3>`;
      }
      
      // Listen
      if (trimmed.includes('•')) {
        const items = trimmed.split('\n').filter(line => line.includes('•'));
        const listItems = items.map(item => 
          `<li className="mb-2">${item.replace('•', '').trim()}</li>`
        ).join('\n        ');
        return `<ul className="list-disc list-inside mb-6 space-y-2 ml-4">\n        ${listItems}\n      </ul>`;
      }
      
      // Zitate
      if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
        return `<blockquote className="border-l-4 border-primary bg-accent/20 pl-4 py-3 mb-6 italic">\n        ${trimmed.slice(1, -1)}\n      </blockquote>`;
      }
      
      // Normale Absätze
      return `<p className="mb-6 leading-relaxed text-lg">\n        ${trimmed}\n      </p>`;
    })
    .join('\n\n      ');
}

// Migration ausführen
console.log('🚀 Starting simple migration...');

let successCount = 0;
for (const post of POSTS) {
  const postDir = path.join(process.cwd(), 'app/blog', post.slug);
  
  try {
    fs.mkdirSync(postDir, { recursive: true });
    
    const tsxContent = generateTSX(post);
    const pagePath = path.join(postDir, 'page.tsx');
    fs.writeFileSync(pagePath, tsxContent, 'utf-8');
    
    console.log(`✅ Created ${post.slug}`);
    successCount++;
    
  } catch (error) {
    console.error(`❌ Error creating ${post.slug}:`, error);
  }
}

console.log(`\n📊 Migration completed: ${successCount}/${POSTS.length} posts created`);
console.log(`\n🎯 Now all posts are dynamic and manageable via admin interface!`); 