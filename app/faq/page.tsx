"use client";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { WavyBackground } from "@/components/ui/wavy-background";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Head from "next/head";
import { useI18n } from "@/lib/i18n";
import { HelpCircle, MessageSquare, Phone } from "@/lib/icons";

// Metadata wird jetzt dynamisch über i18n generiert

export default function FAQPage() {
  const { t } = useI18n();
  
  // FAQ-Daten aus den Übersetzungen
  const faqItems = Array.from({ length: 12 }, (_, i) => ({
    question: t(`faq.question${i + 1}`),
    answer: t(`faq.answer${i + 1}`)
  }));

  // Funktion zum Formatieren von FAQ-Antworten für bessere Lesbarkeit
  const formatAnswer = (answer: string) => {
    if (!answer) return '';
    
    // Teile den Text bei Doppelpunkten und erstelle strukturierte Listen
    const parts = answer.split('\n\n');
    
    return parts.map((part, index) => {
      // Wenn der Teil mit einem Begriff: startet, formatiere es als Überschrift
      if (part.includes(':') && part.split(':')[0].length < 50) {
        const [title, ...content] = part.split(':');
        return (
          <div key={index} className="mb-4">
            <h4 className="font-semibold text-primary mb-2 text-base">{title.trim()}:</h4>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {content.join(':').trim()}
            </p>
          </div>
        );
      }
      
      // Normale Absätze
      return (
        <p key={index} className="mb-3 text-sm leading-relaxed text-muted-foreground">
          {part.trim()}
        </p>
      );
    });
  };
  
  return (
    <>
      <Head>
        <title>FAQ KI-Voice-Agents & automatisierte Telefonie | callflows</title>
        <meta name="description" content="Häufige Fragen zu KI-Voice-Agents, automatisierte Anrufe im B2B-Vertrieb, Pay-per-Use Abrechnung ohne Vertragslaufzeit. Alles über KI-Callflows." />
        <meta name="keywords" content="KI-Voice-Agent FAQ, automatisierte Telefonie Fragen, KI-Callflow Antworten, Pay-per-Use, ohne Vertragslaufzeit" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-b from-background via-section-light-blue to-section-blue">
        <SiteHeader />
        
        {/* Hero Section mit modernem Design */}
        <div className="relative pt-24 pb-16 overflow-hidden">
          <div className="container max-w-4xl relative z-10">
            {/* Header mit Icon und Badge */}
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <div className="bg-primary/10 rounded-full p-4 border border-primary/20">
                  <HelpCircle className="w-8 h-8 text-primary" />
                </div>
              </div>
              
              <Badge variant="outline" className="mb-4 bg-white/50 backdrop-blur-sm border-primary/20">
                <MessageSquare className="w-3 h-3 mr-1" />
                KI-callflow Support
              </Badge>
              
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                {t('faq.pageTitle')}
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {t('faq.pageSubtitle')}
              </p>
            </div>

            {/* Beschreibungsbox */}
            <Card className="mb-12 bg-white/80 backdrop-blur-sm border-primary/10 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-4">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t('faq.description')}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Wavy Background Element */}
          <WavyBackground
            containerClassName="absolute bottom-0 left-0 right-0 h-24 w-full opacity-30"
            colors={["#004aad", "#0f62d5", "#def0f2", "#ffb703"]}
            backgroundFill="transparent"
            waveOpacity={0.6}
            speed="slow"
          />
        </div>

        {/* FAQ Content */}
        <main className="container max-w-4xl pb-16 relative z-10">
          <Card className="bg-white/90 backdrop-blur-sm border-primary/10 shadow-xl">
            <CardContent className="p-8">
              <Accordion type="single" collapsible className="w-full space-y-4">
                {faqItems.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    data-faq-id={index}
                    data-track="faq-click"
                    className="border border-primary/10 rounded-lg bg-white/50 backdrop-blur-sm overflow-hidden hover:shadow-md transition-all duration-200"
                  >
                    <AccordionTrigger className="text-left font-semibold py-6 px-6 text-base md:text-lg hover:text-primary transition-colors duration-200 no-underline hover:no-underline">
                      <span className="flex items-start gap-3">
                        <Badge variant="outline" className="mt-1 bg-primary/10 text-primary border-primary/20 text-xs font-medium shrink-0">
                          {String(index + 1).padStart(2, '0')}
                        </Badge>
                        <span className="text-left leading-tight">{faq.question}</span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <div className="pl-10 border-l-2 border-primary/20 ml-2">
                        <div className="prose prose-sm max-w-none">
                          {formatAnswer(faq.answer)}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* Support CTA */}
          <Card className="mt-12 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Weitere Fragen zu KI-callflows?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Unser Expertenteam steht Ihnen gerne für eine persönliche Beratung zur Verfügung.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/kontakt" 
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Kontakt aufnehmen
                </a>
                <a 
                  href="/pricing" 
                  className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary border border-primary/20 rounded-lg font-medium hover:bg-primary/5 transition-colors duration-200"
                >
                  Preise ansehen
                </a>
              </div>
            </CardContent>
          </Card>
        </main>

        <SiteFooter />
      </div>
    </>
  );
} 