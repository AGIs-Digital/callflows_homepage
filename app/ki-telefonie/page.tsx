"use client";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer"; 
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BreadcrumbSEO } from "@/components/ui/breadcrumb-seo";
import { Check, Phone, Bot, Zap, TrendingUp, Users, Clock, Euro } from "lucide-react";
import Head from "next/head";
import Link from "next/link";

export default function KITelefoniePage() {
  return (
    <>
      <Head>
        <title>KI Telefonie 2024: Automatisierte Anrufe für Unternehmen | callflows</title>
        <meta name="description" content="KI Telefonie revolutioniert die Kundenkommunikation. Automatisierte Anrufe, Voice Bots und intelligente Telefonassistenten für Unternehmen. Jetzt kostenlos testen!" />
        <meta name="keywords" content="KI Telefonie, automatisierte Anrufe, Voice Bot, KI Telefonassistent, künstliche Intelligenz Telefon, Telefonie Automatisierung" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
        <SiteHeader />
        
        {/* Hero Section */}
        <section className="pt-8 pb-16">
          <div className="container max-w-6xl">
            {/* Breadcrumbs */}
            <BreadcrumbSEO 
              items={[
                { name: "KI Telefonie", url: "https://callflows.de/ki-telefonie" }
              ]}
            />
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                <Bot className="w-4 h-4 mr-2" />
                KI Telefonie 2024
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                KI Telefonie revolutioniert Ihre 
                <span className="text-primary"> Kundenkommunikation</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Automatisierte Anrufe mit künstlicher Intelligenz: Voice Bots führen natürliche Gespräche, 
                qualifizieren Leads und entlasten Ihr Team – 24/7 ohne Personalkosten.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/kontakt">Kostenlose Demo testen</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/pricing">Preise ansehen</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Was ist KI Telefonie Section */}
        <section className="py-16 bg-white/50">
          <div className="container max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-12">
              Was ist KI Telefonie?
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-lg text-muted-foreground mb-6">
                  KI Telefonie nutzt künstliche Intelligenz, um automatisierte Telefongespräche zu führen. 
                  Voice Bots verstehen natürliche Sprache, führen komplexe Dialoge und erledigen Aufgaben 
                  wie Terminbuchungen oder Kundenbetreuung vollautomatisch.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold">Natürliche Gespräche</h3>
                      <p className="text-sm text-muted-foreground">KI versteht Kontext und führt menschenähnliche Dialoge</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold">24/7 Verfügbarkeit</h3>
                      <p className="text-sm text-muted-foreground">Keine Ausfallzeiten oder Personalengpässe</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold">Skalierbare Lösung</h3>
                      <p className="text-sm text-muted-foreground">Beliebig viele parallele Gespräche möglich</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <Phone className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Traditionelle Telefonie</h3>
                    <p className="text-sm text-muted-foreground mb-4">vs.</p>
                    <Bot className="w-16 h-16 text-accent mx-auto mb-4" />
                    <h3 className="text-xl font-semibold">KI Telefonie</h3>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Vorteile Section */}
        <section className="py-16">
          <div className="container max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Vorteile von KI Telefonie für Unternehmen
              </h2>
              <p className="text-lg text-muted-foreground">
                Warum führende Unternehmen auf automatisierte Telefonie setzen
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="p-6">
                  <TrendingUp className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Höhere Effizienz</h3>
                  <p className="text-muted-foreground">
                    Automatisierung von Routine-Anrufen steigert die Produktivität 
                    und reduziert manuelle Arbeitszeiten um bis zu 80%.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <Euro className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Kostenersparnis</h3>
                  <p className="text-muted-foreground">
                    KI Telefonie kostet nur einen Bruchteil von Personalkosten. 
                    ROI bereits ab dem ersten Monat messbar.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <Users className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Bessere Kundenerfahrung</h3>
                  <p className="text-muted-foreground">
                    Sofortige Anrufannahme, keine Wartezeiten und 
                    konsistent professionelle Gesprächsführung.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-4">
              Bereit für KI Telefonie?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Starten Sie noch heute mit automatisierten Anrufen und erleben Sie 
              die Zukunft der Kundenkommunikation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/kontakt">Kostenlose Beratung</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/pricing">Preise ansehen</Link>
              </Button>
            </div>
          </div>
        </section>

        <SiteFooter />
      </div>
    </>
  );
}
