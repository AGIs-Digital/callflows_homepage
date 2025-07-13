import type { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, ArrowRight, Users, Zap, Shield, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from 'next/link'

export const metadata: Metadata = {
  title: "KI Telefonassistent Anbieter Vergleich 2025 - Die besten Voice Agents",
  description: "Umfassender Vergleich der besten KI Telefonassistent Anbieter 2025. Finden Sie die optimale Conversational AI-Lösung für Ihr Unternehmen.",
  keywords: "KI Telefonassistent Anbieter, Voice Agent Vergleich, Conversational AI Anbieter, KI Telefonie Vergleich 2025, beste KI Telefonassistenten",
  openGraph: {
    title: "KI Telefonassistent Anbieter Vergleich 2025",
    description: "Umfassender Vergleich der besten KI Telefonassistent Anbieter 2025",
    images: ["/images/blog/ki-telefonassistent-anbieter-vergleich-2025.png"],
  }
}

interface Provider {
  name: string
  description: string
  strengths: string[]
  weaknesses: string[]
  pricing: string
  bestFor: string
  rating: number
  isRecommended?: boolean
}

const providers: Provider[] = [
  {
    name: "callflows",
    description: "Maßgeschneiderte KI-Telefonie-Lösungen made in Germany mit persönlicher Betreuung",
    strengths: [
      "100% DSGVO-konform",
      "Maßgeschneiderte Lösungen",
      "Persönliche Betreuung",
      "Made in Germany",
      "Transparente Preisgestaltung",
      "Keine Grundgebühren"
    ],
    weaknesses: [
      "Höhere Einrichtungskosten",
      "Längere Implementierungszeit"
    ],
    pricing: "Minutenbasiert ab 0,99€/Min",
    bestFor: "Unternehmen, die individuelle Lösungen und persönliche Betreuung schätzen",
    rating: 9.5,
    isRecommended: true
  },
  {
    name: "Vitas",
    description: "Deutscher KI Telefonassistent mit Fokus auf einfache Einrichtung",
    strengths: [
      "Schnelle Einrichtung (60 Min)",
      "Made in Germany",
      "Bis zu 60 parallele Anrufe",
      "DSGVO-konform"
    ],
    weaknesses: [
      "Begrenzte Anpassungsmöglichkeiten",
      "Höhere Kosten bei vielen Gesprächen"
    ],
    pricing: "Ab 35€/Monat + 0,23€ pro Gespräch",
    bestFor: "Kleine bis mittlere Unternehmen mit Standardanforderungen",
    rating: 8.5
  },
  {
    name: "fonio.ai",
    description: "Flexibler KI Voice Agent mit Pay-per-Use Modell",
    strengths: [
      "Keine monatliche Grundgebühr",
      "Schnelle Einrichtung (30 Min)",
      "Flexible Preisgestaltung",
      "DSGVO-konform"
    ],
    weaknesses: [
      "Höhere Minutenpreise",
      "Keine kostenlose Testphase",
      "Mindeststartguthaben 300€"
    ],
    pricing: "0,50€/Min (Standard), 0,30€/Min (Enterprise)",
    bestFor: "Unternehmen mit unregelmäßigem Anrufaufkommen",
    rating: 8.0
  },
  {
    name: "Parloa",
    description: "Enterprise-fokussierte AI Agent Plattform für Contact Center",
    strengths: [
      "Unbegrenzte parallele Gespräche",
      "Contact Center Integration",
      "Echtzeit-Übersetzungen",
      "SOC-2 zertifiziert"
    ],
    weaknesses: [
      "Nur für große Unternehmen",
      "Komplexe Einrichtung",
      "Preise auf Anfrage"
    ],
    pricing: "Auf Anfrage",
    bestFor: "Große Unternehmen und Contact Center",
    rating: 8.5
  },
  {
    name: "Synthflow.ai",
    description: "Internationale Voice-AI Plattform mit hoher Skalierbarkeit",
    strengths: [
      "10-100 parallele Gespräche",
      "Über 30 Länder unterstützt",
      "200+ Integrationen",
      "Mehrsprachig (20+ Sprachen)"
    ],
    weaknesses: [
      "Teuer bei hohem Volumen",
      "Komplexe Preisstruktur",
      "US-basiert"
    ],
    pricing: "Ab $29/Monat bis $1250/Monat",
    bestFor: "Internationale Unternehmen mit hohem Anrufvolumen",
    rating: 8.0
  }
]

const comparisonCriteria = [
  { name: "DSGVO-Konformität", weight: "Sehr wichtig" },
  { name: "Einrichtungszeit", weight: "Wichtig" },
  { name: "Anpassbarkeit", weight: "Sehr wichtig" },
  { name: "Preis-Leistung", weight: "Sehr wichtig" },
  { name: "Support-Qualität", weight: "Wichtig" },
  { name: "Skalierbarkeit", weight: "Wichtig" }
]

export default function KITelefonassistentAnbieterVergleich() {
  return (
    <div className="container mx-auto py-12 px-4">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          KI Telefonassistent Anbieter Vergleich 2025
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          Finden Sie den besten KI Telefonassistent für Ihr Unternehmen. Unser umfassender Vergleich 
          hilft Ihnen bei der Auswahl der optimalen Conversational AI-Lösung.
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <Badge variant="secondary">Voice Agents</Badge>
          <Badge variant="secondary">KI-Telefonie</Badge>
          <Badge variant="secondary">Conversational AI</Badge>
          <Badge variant="secondary">Automatisierte Telefonie</Badge>
        </div>
      </div>

      {/* Einleitung */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6">Warum ein KI Telefonassistent?</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="text-lg mb-4">
              KI Telefonassistenten revolutionieren die Kundenkommunikation. Sie arbeiten 24/7, 
              bearbeiten mehrere Anrufe gleichzeitig und reduzieren Kosten erheblich.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Bis zu 80% Kostenreduktion</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>24/7 Verfügbarkeit</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Gleichzeitige Gespräche</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Konsistente Qualität</span>
              </li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Marktentwicklung 2025</h3>
            <p className="mb-4">
              Der Markt für KI-Telefonie wächst exponentiell. ChatGPT steht bereits auf Platz 11 
              der deutschen Google-Suchanfragen mit über 7 Millionen monatlichen Suchen.
            </p>
            <p className="text-sm text-muted-foreground">
              Quelle: SEO-Analyse Deutschland 2025
            </p>
          </div>
        </div>
      </section>

      {/* Vergleichskriterien */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6">Unsere Bewertungskriterien</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {comparisonCriteria.map((criteria, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <h3 className="font-semibold">{criteria.name}</h3>
                <Badge variant={criteria.weight === "Sehr wichtig" ? "default" : "secondary"}>
                  {criteria.weight}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Anbieter-Vergleich */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Die besten KI Telefonassistent Anbieter 2025</h2>
        <div className="space-y-8">
          {providers.map((provider, index) => (
            <Card key={index} className={`relative ${provider.isRecommended ? 'ring-2 ring-primary' : ''}`}>
              {provider.isRecommended && (
                <div className="absolute -top-3 left-6">
                  <Badge className="bg-primary text-white">
                    <Trophy className="w-4 h-4 mr-1" />
                    Empfehlung
                  </Badge>
                </div>
              )}
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">{provider.name}</CardTitle>
                    <CardDescription className="text-lg mt-2">
                      {provider.description}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-primary">
                      {provider.rating}/10
                    </div>
                    <div className="text-sm text-muted-foreground">Rating</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-green-600">Stärken</h4>
                    <ul className="space-y-1">
                      {provider.strengths.map((strength, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-orange-600">Schwächen</h4>
                    <ul className="space-y-1">
                      {provider.weaknesses.map((weakness, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <XCircle className="w-4 h-4 text-orange-500 flex-shrink-0" />
                          <span>{weakness}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Details</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium">Preise:</span>
                        <p className="text-muted-foreground">{provider.pricing}</p>
                      </div>
                      <div>
                        <span className="font-medium">Ideal für:</span>
                        <p className="text-muted-foreground">{provider.bestFor}</p>
                      </div>
                    </div>
                  </div>
                </div>
                {provider.name === "callflows" && (
                  <div className="mt-6 pt-6 border-t">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link href="/kontakt">
                        <Button className="bg-primary hover:bg-primary/90">
                          Kostenlose Beratung <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                      <Link href="/pricing">
                        <Button variant="outline">
                          Preise ansehen
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Entscheidungshilfe */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6">Welcher KI Telefonassistent passt zu Ihnen?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <Users className="w-8 h-8 text-blue-500 mb-2" />
              <CardTitle>Kleine Unternehmen</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Für den schnellen Einstieg mit bewährten Lösungen und einfacher Einrichtung.
              </p>
              <p className="font-semibold">Empfehlung: Vitas oder fonio.ai</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <Zap className="w-8 h-8 text-green-500 mb-2" />
              <CardTitle>Wachsende Unternehmen</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Für individuelle Anpassungen und langfristige Partnerschaft.
              </p>
              <p className="font-semibold">Empfehlung: callflows</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <Shield className="w-8 h-8 text-purple-500 mb-2" />
              <CardTitle>Enterprise</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Für komplexe Anforderungen und hohe Skalierbarkeit.
              </p>
              <p className="font-semibold">Empfehlung: Parloa oder Synthflow.ai</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6">Häufige Fragen zum KI Telefonassistent Vergleich</h2>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Welcher ist der beste KI Telefonassistent 2025?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Der beste KI Telefonassistent hängt von Ihren spezifischen Anforderungen ab. 
                callflows bietet die beste Kombination aus Flexibilität, DSGVO-Konformität und 
                persönlicher Betreuung für deutsche Unternehmen.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Was kostet ein professioneller KI Voice Agent?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Die Kosten variieren stark je nach Anbieter und Nutzung. Minutenbasierte Modelle 
                beginnen bei 0,30€/Minute, während Pauschalmodelle ab 35€/Monat verfügbar sind. 
                callflows bietet transparente Preise ohne versteckte Kosten.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Sind KI Telefonassistenten DSGVO-konform?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Alle in unserem Vergleich aufgeführten deutschen Anbieter sind DSGVO-konform. 
                Achten Sie bei internationalen Anbietern auf entsprechende Zertifizierungen 
                und Datenschutzrichtlinien.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white p-12 rounded-xl">
        <h2 className="text-3xl font-bold mb-4">
          Bereit für Ihren eigenen KI Telefonassistenten?
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Vereinbaren Sie eine kostenlose Beratung und erfahren Sie, wie callflows 
          Ihr Unternehmen mit maßgeschneiderten KI-Telefonie-Lösungen unterstützen kann.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/kontakt">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Kostenlose Beratung buchen <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <Link href="/pricing">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Preise vergleichen
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
} 