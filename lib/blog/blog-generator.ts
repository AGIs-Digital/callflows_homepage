import fs from 'fs';
import path from 'path';

interface BlogPostData {
  title: string;
  description: string;
  publishedTime: string;
  author: string;
  content: string;
  slug: string;
  imagePath: string;
}

export interface CreateBlogPostRequest {
  title: string;
  description: string;
  publishedTime: Date;
  author: string;
  content: string;
  imageFile?: File;
}

/**
 * Erstellt einen neuen Blog-Post als TSX-Datei im Next.js App Router Format
 */
export async function createBlogPost(data: BlogPostData): Promise<{ success: boolean; message: string; slug: string }> {
  try {
    // Validierung
    if (!data.title || !data.description || !data.publishedTime || !data.author || !data.content || !data.slug) {
      return {
        success: false,
        message: 'Alle Pflichtfelder müssen ausgefüllt sein.',
        slug: data.slug
      };
    }

    // Slug bereinigen
    const cleanSlug = data.slug
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '-')
      .replace(/-+/g, '-')
      .trim();

    // Prüfen ob Slug bereits existiert
    const blogDir = path.join(process.cwd(), 'app/blog', cleanSlug);
    if (fs.existsSync(blogDir)) {
      return {
        success: false,
        message: `Ein Blog-Post mit dem Slug "${cleanSlug}" existiert bereits.`,
        slug: cleanSlug
      };
    }

    // Verzeichnis erstellen
    fs.mkdirSync(blogDir, { recursive: true });

    // Inhalt formatieren (Markdown zu JSX konvertieren)
    const formattedContent = formatContentToJSX(data.content);

    // TSX-Datei Inhalt generieren
    const tsxContent = generateBlogPostTSX({
      ...data,
      slug: cleanSlug,
      content: formattedContent
    });

    // page.tsx Datei erstellen
    const pagePath = path.join(blogDir, 'page.tsx');
    fs.writeFileSync(pagePath, tsxContent, 'utf-8');

    return {
      success: true,
      message: `Blog-Post "${data.title}" wurde erfolgreich erstellt.`,
      slug: cleanSlug
    };

  } catch (error) {
    console.error('Fehler beim Erstellen des Blog-Posts:', error);
    return {
      success: false,
      message: 'Ein unerwarteter Fehler ist aufgetreten.',
      slug: data.slug
    };
  }
}

/**
 * Generiert den TSX-Inhalt für einen Blog-Post
 */
function generateBlogPostTSX(data: BlogPostData): string {
  const publishDate = new Date(data.publishedTime);
  const modifiedTime = new Date(publishDate.getTime() + 24 * 60 * 60 * 1000); // 1 Tag später

  return `import { generateMetadata } from "@/lib/seo/metadata";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, User, Calendar } from "lucide-react";

export const metadata = generateMetadata({
  title: "${escapeString(data.title)}",
  description: "${escapeString(data.description)}",
  path: "/blog/${data.slug}",
  type: "article",
  publishedTime: "${data.publishedTime}",
  modifiedTime: "${modifiedTime.toISOString()}",
  authors: ["${escapeString(data.author)}"],
  keywords: [
    "KI Telefonie", 
    "Voice Agent", 
    "Automatisierte Telefonie", 
    "KI Kundenservice"
  ],
  images: [{
    url: "${data.imagePath}",
    width: 1200,
    height: 630,
    alt: "${escapeString(data.title)}"
  }]
});

export default function BlogPostPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="py-16 md:py-24 bg-gradient-to-b from-primary/20 via-accent/50 to-secondary/65">
        <div className="container max-w-6xl mx-auto">
      {/* Navigation */}
      <Link 
        href="/blog" 
        className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Zurück zum Blog
      </Link>
      
      <article className="prose prose-lg dark:prose-invert max-w-none">
        {/* Header */}
        <header className="not-prose mb-10">
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>${escapeString(data.author)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <time dateTime="${data.publishedTime}">
                ${publishDate.toLocaleDateString('de-DE', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </time>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>5 Min. Lesezeit</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground leading-tight">
            ${escapeString(data.title)}
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            ${escapeString(data.description)}
          </p>
          
          <div className="relative aspect-video w-full mb-8 overflow-hidden rounded-xl shadow-lg">
            <Image
              src="${data.imagePath}"
              alt="${escapeString(data.title)}"
              fill
              className="object-cover"
              priority
            />
          </div>
        </header>
        
        {/* Content */}
        <div className="prose-content">
          ${data.content}
        </div>
        
        {/* Footer */}
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
      </article>
        </div>
      </div>
    </main>
  );
}`;
}

/**
 * Intelligente Auto-Formatierung von Text zu JSX
 * Erkennt automatisch Struktur und formatiert entsprechend
 */
function formatContentToJSX(content: string): string {
  // 1. Basis-Cleanup
  let formatted = content
    .trim()
    .replace(/\r\n/g, '\n')  // Windows line endings
    .replace(/\r/g, '\n');   // Mac line endings

  // 2. Erkenne und formatiere explizite Markdown-Syntax
  formatted = formatExplicitMarkdown(formatted);
  
  // 3. Intelligente Auto-Formatierung
  formatted = intelligentAutoFormat(formatted);
  
  // 4. Finale JSX-Optimierung
  formatted = finalizeJSXFormat(formatted);
  
  return formatted;
}

/**
 * Verarbeitet explizite Markdown-Syntax
 */
function formatExplicitMarkdown(content: string): string {
  return content
    // Überschriften (explizit mit #)
    .replace(/^### (.*$)/gm, '___H4___$1___/H4___')
    .replace(/^## (.*$)/gm, '___H3___$1___/H3___')
    .replace(/^# (.*$)/gm, '___H2___$1___/H2___')
    
    // Fett und kursiv
    .replace(/\*\*(.*?)\*\*/g, '___STRONG___$1___/STRONG___')
    .replace(/\*(.*?)\*/g, '___EM___$1___/EM___')
    
    // Code inline
    .replace(/`([^`]+)`/g, '___CODE___$1___/CODE___')
    
    // Links (Markdown-Style)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '___LINK___$1|||$2___/LINK___')
    
    // Listen (explizit mit -)
    .replace(/^- (.*$)/gm, '___LI___$1___/LI___')
    .replace(/^\* (.*$)/gm, '___LI___$1___/LI___');
}

/**
 * Intelligente Auto-Formatierung ohne explizite Markdown-Syntax
 */
function intelligentAutoFormat(content: string): string {
  let lines = content.split('\n');
  let result = [];
  
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();
    
    // Leere Zeilen überspringen
    if (!line) {
      result.push('');
      continue;
    }
    
    // Bereits formatierte Zeilen überspringen
    if (line.includes('___')) {
      result.push(line);
      continue;
    }
    
    // 1. Auto-Überschriften erkennen (kurze Zeilen gefolgt von leerem Absatz)
    if (line.length < 80 && line.length > 10 && 
        i < lines.length - 1 && 
        lines[i + 1].trim() === '' &&
        !line.endsWith('.') && 
        !line.endsWith(',') &&
        /^[A-ZÜÄÖ]/.test(line)) {
      result.push(`___H3___${line}___/H3___`);
      continue;
    }
    
    // 2. Auto-Listen erkennen (Zeilen mit Aufzählungszeichen)
    if (/^[•·▪▫◦‣⁃]\s+/.test(line) || 
        /^\d+[.)]\s+/.test(line) ||
        /^[a-z][.)]\s+/.test(line)) {
      let listContent = line.replace(/^[•·▪▫◦‣⁃\d+a-z.)\s]+/, '');
      result.push(`___LI___${listContent}___/LI___`);
      continue;
    }
    
    // 3. Auto-Zitate erkennen
    if (line.startsWith('"') && line.endsWith('"')) {
      result.push(`___QUOTE___${line.slice(1, -1)}___/QUOTE___`);
      continue;
    }
    
    // 4. URLs automatisch verlinken
    line = line.replace(/(https?:\/\/[^\s]+)/g, '___LINK___$1|||$1___/LINK___');
    
    // 5. Wichtige Begriffe hervorheben (KI-spezifische Terminologie)
    const importantTerms = [
      'KI-Telefonie', 'Voice Agent', 'ChatGPT', 'Claude', 'GPT-4', 'OpenAI', 'Anthropic',
      'callflows', 'DSGVO', 'Künstliche Intelligenz', 'Machine Learning', 'NLP',
      'Sprachassistent', 'Automatisierung', 'Customer Experience', 'CRM'
    ];
    
    importantTerms.forEach(term => {
      const regex = new RegExp(`\\b(${term})\\b`, 'gi');
      line = line.replace(regex, '___STRONG___$1___/STRONG___');
    });
    
    result.push(line);
  }
  
  return result.join('\n');
}

/**
 * Konvertiert alle Platzhalter zu finalem JSX
 */
function finalizeJSXFormat(content: string): string {
  // Absätze aus zusammenhängenden Zeilen bilden
  let paragraphs = content.split('\n\n').filter(p => p.trim());
  
  let jsxContent = paragraphs.map(paragraph => {
    let lines = paragraph.split('\n').filter(l => l.trim());
    
    // Überprüfe ob der Absatz Listen enthält
    if (lines.some(line => line.includes('___LI___'))) {
      // Gruppiere Listen zusammen
      let processed = [];
      let currentList = [];
      
      for (let line of lines) {
        if (line.includes('___LI___')) {
          currentList.push(line);
        } else {
          if (currentList.length > 0) {
            // Liste abschließen
            let listItems = currentList.map(li => 
              li.replace(/___LI___(.*?)___\/LI___/, '<li className="mb-2">$1</li>')
            ).join('\n        ');
            processed.push(`<ul className="list-disc list-inside mb-6 space-y-2 ml-4">\n        ${listItems}\n      </ul>`);
            currentList = [];
          }
          processed.push(convertMarkersToJSX(line));
        }
      }
      
      // Verbleibende Liste abschließen
      if (currentList.length > 0) {
        let listItems = currentList.map(li => 
          li.replace(/___LI___(.*?)___\/LI___/, '<li className="mb-2">$1</li>')
        ).join('\n        ');
        processed.push(`<ul className="list-disc list-inside mb-6 space-y-2 ml-4">\n        ${listItems}\n      </ul>`);
      }
      
      return processed.join('\n      ');
    } else {
      // Normaler Absatz
      let processedLines = lines.map(convertMarkersToJSX);
      
      // Prüfe ob es eine Überschrift ist
      if (processedLines.length === 1 && processedLines[0].includes('<h')) {
        return processedLines[0];
      }
      
      // Prüfe ob es ein Zitat ist
      if (processedLines.length === 1 && processedLines[0].includes('___QUOTE___')) {
        return processedLines[0].replace(/___QUOTE___(.*?)___\/QUOTE___/, 
          '<blockquote className="border-l-4 border-primary bg-accent/20 pl-4 py-3 mb-6 italic">\n        "$1"\n      </blockquote>');
      }
      
      // Normaler Absatz
      return `<p className="mb-6 leading-relaxed text-lg">\n        ${processedLines.join(' ')}\n      </p>`;
    }
  }).join('\n\n      ');
  
  return jsxContent;
}

/**
 * Konvertiert interne Marker zu JSX-Tags
 */
function convertMarkersToJSX(text: string): string {
  return text
    .replace(/___H2___(.*?)___\/H2___/g, '<h2 className="text-3xl font-bold mt-12 mb-6 text-primary">$1</h2>')
    .replace(/___H3___(.*?)___\/H3___/g, '<h3 className="text-2xl font-semibold mt-10 mb-5 text-foreground">$1</h3>')
    .replace(/___H4___(.*?)___\/H4___/g, '<h4 className="text-xl font-medium mt-8 mb-4 text-foreground">$1</h4>')
    .replace(/___STRONG___(.*?)___\/STRONG___/g, '<strong className="font-semibold text-primary">$1</strong>')
    .replace(/___EM___(.*?)___\/EM___/g, '<em className="italic">$1</em>')
    .replace(/___CODE___(.*?)___\/CODE___/g, '<code className="bg-muted px-2 py-1 rounded text-sm font-mono border">$1</code>')
    .replace(/___LINK___(.*?)\|\|\|(.*?)___\/LINK___/g, '<a href="$2" className="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors" target="_blank" rel="noopener noreferrer">$1</a>');
}

/**
 * Escaped Strings für TSX
 */
function escapeString(str: string): string {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/'/g, "\\'")
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t');
}

/**
 * Speichert ein hochgeladenes Bild
 */
export async function saveUploadedImage(file: File, slug: string): Promise<string> {
  const imageDir = path.join(process.cwd(), 'public', 'images', 'blog');
  
  // Stelle sicher, dass der Ordner existiert
  if (!fs.existsSync(imageDir)) {
    fs.mkdirSync(imageDir, { recursive: true });
  }
  
  // Datei-Extension ermitteln
  const ext = file.name.split('.').pop() || 'jpg';
  const fileName = `${slug}.${ext}`;
  const filePath = path.join(imageDir, fileName);
  
  // In einer echten Implementierung würde hier das File-Handling stattfinden
  // Für jetzt geben wir den erwarteten Pfad zurück
  const imagePath = `/images/blog/${fileName}`;
  
  return imagePath;
}

/**
 * Lädt alle existierenden Blog-Posts
 */
export async function loadExistingBlogPosts(): Promise<any[]> {
  const blogDir = path.join(process.cwd(), 'app/blog');
  
  if (!fs.existsSync(blogDir)) {
    return [];
  }
  
  const directories = fs.readdirSync(blogDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
  
  const posts = [];
  
  for (const slug of directories) {
    const filePath = path.join(blogDir, slug, 'page.tsx');
    
    if (!fs.existsSync(filePath)) continue;
    
    try {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      
      // Metadaten extrahieren
      const titleMatch = fileContent.match(/title: ["'](.+?)["']/);
      const descriptionMatch = fileContent.match(/description: ["'](.+?)["']/);
      const publishedTimeMatch = fileContent.match(/publishedTime: ["'](.+?)["']/);
      const authorsMatch = fileContent.match(/authors: \[\s*["'](.+?)["']/);
      const imagesMatch = fileContent.match(/images: \[\{[\s\S]*?url: ["'](.+?)["']/);
      
      if (titleMatch && descriptionMatch && publishedTimeMatch) {
        const publishDate = new Date(publishedTimeMatch[1]);
        const now = new Date();
        
        let status: 'draft' | 'scheduled' | 'published' = 'draft';
        if (publishDate <= now) {
          status = 'published';
        } else {
          status = 'scheduled';
        }
        
        posts.push({
          slug,
          title: titleMatch[1],
          description: descriptionMatch[1],
          publishedTime: publishedTimeMatch[1],
          author: authorsMatch ? authorsMatch[1] : "Team callflows",
          image: imagesMatch ? imagesMatch[1] : `/images/blog/${slug}.webp`,
          status,
          content: "..." // Vereinfacht
        });
      }
    } catch (error) {
      console.error(`Fehler beim Lesen von ${slug}:`, error);
    }
  }
  
  // Sortiere nach Datum (neueste zuerst)
  return posts.sort((a, b) => {
    const dateA = new Date(a.publishedTime).getTime();
    const dateB = new Date(b.publishedTime).getTime();
    return dateB - dateA;
  });
} 