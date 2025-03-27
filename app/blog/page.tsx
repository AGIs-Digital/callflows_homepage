"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Beispiel-Blogbeiträge (ersetzen Sie diese durch Ihre tatsächlichen Daten)
const blogPosts = [
  {
    id: 1,
    slug: "ki-telefonie-grundlagen",
    title: "KI-Telefonie: Grundlagen und Einsatzmöglichkeiten",
    excerpt: "Erfahren Sie, wie KI-gestützte Telefonie funktioniert und welche Vorteile sie für Unternehmen bietet. Ein Überblick über die Technologie und ihre Anwendungsbereiche.",
    image: "/images/blog/ki-telefonie-grundlagen.jpg",
    category: "Grundlagen",
    author: "Tom Abeln",
    date: "15. November 2023",
  },
  {
    id: 2,
    slug: "voice-agents-vs-chatbots",
    title: "Voice Agents vs. Chatbots: Was ist der Unterschied?",
    excerpt: "Viele Unternehmen setzen bereits auf Chatbots, doch Voice Agents bieten ganz neue Möglichkeiten. Wir vergleichen beide Technologien und zeigen die Vor- und Nachteile.",
    image: "/images/blog/voice-agents-vs-chatbots.jpg",
    category: "Vergleich",
    author: "Timo Goltz",
    date: "05. Dezember 2023",
  },
  {
    id: 3,
    slug: "kundenservice-mit-ki",
    title: "Kundenservice mit KI: So verbessern Sie die Customer Experience",
    excerpt: "KI-gestützte Voice Agents können den Kundenservice revolutionieren. Erfahren Sie, wie Sie mit intelligenten Sprachassistenten die Kundenzufriedenheit steigern können.",
    image: "/images/blog/kundenservice-mit-ki.jpg",
    category: "Kundenservice",
    author: "Tom Abeln",
    date: "20. Dezember 2023",
  },
  {
    id: 4,
    slug: "ki-telefonie-implementieren",
    title: "KI-Telefonie implementieren: So gelingt der Einstieg",
    excerpt: "Die Einführung von KI-Telefonie kann eine Herausforderung sein. Wir zeigen Ihnen, wie Sie den Implementierungsprozess erfolgreich gestalten und typische Fallstricke vermeiden.",
    image: "/images/blog/ki-telefonie-implementieren.jpg",
    category: "Implementierung",
    author: "Timo Goltz",
    date: "10. Januar 2024",
  },
  {
    id: 5,
    slug: "kosten-nutzen-analyse-ki-telefonie",
    title: "Kosten-Nutzen-Analyse: Lohnt sich KI-Telefonie für Ihr Unternehmen?",
    excerpt: "Wir analysieren die Kosten und den potenziellen ROI von KI-Telefonie für verschiedene Unternehmensgrößen und Branchen.",
    image: "/images/blog/kosten-nutzen-analyse.jpg",
    category: "Wirtschaftlichkeit",
    author: "Tom Abeln",
    date: "25. Januar 2024",
  },
  {
    id: 6,
    slug: "datenschutz-ki-telefonie",
    title: "Datenschutz in der KI-Telefonie: Was Sie beachten müssen",
    excerpt: "Der Einsatz von KI in der Telefonie wirft wichtige Datenschutzfragen auf. Wir erklären, welche rechtlichen Aspekte zu beachten sind und wie Sie DSGVO-konform bleiben.",
    image: "/images/blog/datenschutz-ki-telefonie.jpg",
    category: "Datenschutz",
    author: "Timo Goltz",
    date: "15. Februar 2024",
  },
  {
    id: 7,
    slug: "ki-telefonie-branchen",
    title: "KI-Telefonie in verschiedenen Branchen: Anwendungsbeispiele",
    excerpt: "Von Gesundheitswesen bis E-Commerce: Wir zeigen erfolgreiche Implementierungen von KI-Telefonie in verschiedenen Branchen.",
    image: "/images/blog/ki-telefonie-branchen.jpg",
    category: "Anwendungsfälle",
    author: "Tom Abeln",
    date: "05. März 2024",
  },
  {
    id: 8,
    slug: "zukunft-ki-telefonie",
    title: "Die Zukunft der KI-Telefonie: Trends und Entwicklungen",
    excerpt: "Welche Entwicklungen erwarten uns in den nächsten Jahren? Wir werfen einen Blick auf die neuesten Trends und Technologien im Bereich der KI-Telefonie.",
    image: "/images/blog/zukunft-ki-telefonie.jpg",
    category: "Trends",
    author: "Timo Goltz",
    date: "20. März 2024",
  },
  {
    id: 9,
    slug: "ki-telefonie-mitarbeiter",
    title: "KI-Telefonie und Mitarbeiter: Wie man die Akzeptanz fördert",
    excerpt: "Die Einführung von KI-Telefonie kann bei Mitarbeitern auf Widerstand stoßen. Wir geben Tipps, wie Sie die Akzeptanz im Team fördern können.",
    image: "/images/blog/ki-telefonie-mitarbeiter.jpg",
    category: "Change Management",
    author: "Tom Abeln",
    date: "10. April 2024",
  },
  {
    id: 10,
    slug: "ki-telefonie-case-study",
    title: "Case Study: Wie Unternehmen X seine Conversion Rate um 40% steigerte",
    excerpt: "Eine detaillierte Fallstudie über die erfolgreiche Implementierung von KI-Telefonie in einem mittelständischen Unternehmen.",
    image: "/images/blog/ki-telefonie-case-study.jpg",
    category: "Case Study",
    author: "Timo Goltz",
    date: "25. April 2024",
  }
];

export default function BlogPage() {
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Sortieren der Blogbeiträge
  const sortedPosts = [...blogPosts].sort((a, b) => {
    if (sortBy === "newest") {
      const dateA = new Date(a.date.split(". ").reverse().join("-")).getTime();
      const dateB = new Date(b.date.split(". ").reverse().join("-")).getTime();
      return dateB - dateA;
    } else if (sortBy === "oldest") {
      const dateA = new Date(a.date.split(". ").reverse().join("-")).getTime();
      const dateB = new Date(b.date.split(". ").reverse().join("-")).getTime();
      return dateA - dateB;
    } else if (sortBy === "alphabetical") {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  // Berechnung der anzuzeigenden Beiträge basierend auf der aktuellen Seite
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(blogPosts.length / postsPerPage);

  return (
    <div className="py-16 bg-background">
      <div className="container">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Blog: Expertenwissen zu KI-Telefonie
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Aktuelle Trends, Praxistipps und Hintergrundwissen zu KI Voice Agents und
            automatisierter Kommunikation
          </p>
        </div>

        <div className="flex justify-between items-center mb-8">
          <div className="text-sm text-muted-foreground">
            Zeige {indexOfFirstPost + 1}-{Math.min(indexOfLastPost, blogPosts.length)} von {blogPosts.length} Artikeln
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Sortieren nach:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sortieren nach" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Neueste zuerst</SelectItem>
                <SelectItem value="oldest">Älteste zuerst</SelectItem>
                <SelectItem value="alphabetical">Alphabetisch</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentPosts.map((post) => (
            <div key={post.id} className="border rounded-lg overflow-hidden bg-card">
              <div className="relative h-48 w-full">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 text-xs font-medium bg-primary text-primary-foreground rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <span>{post.author}</span>
                  <span className="mx-2">•</span>
                  <span>{post.date}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`}>
                  <Button variant="link" className="p-0 h-auto text-primary">
                    Weiterlesen <ArrowRight size={16} className="ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12">
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Zurück
              </Button>
              {Array.from({ length: totalPages }).map((_, index) => (
                <Button
                  key={index}
                  variant={currentPage === index + 1 ? "default" : "outline"}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </Button>
              ))}
              <Button
                variant="outline"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Weiter
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 