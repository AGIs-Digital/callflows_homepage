"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "@/lib/icons";
import { useI18n } from "@/lib/i18n";
import { BreadcrumbSEO } from "@/components/ui/breadcrumb-seo";

export function AboutSection() {
  const { t, locale } = useI18n();
  
  const highlightCallflows = (text: string) => {
    return text.replace(/callflows/gi, '<strong class="text-primary">callflows</strong>');
  };
  
  const getFeatures = () => {
    const features = {
      de: [
        {
          title: "Alles aus einer Hand",
          description: "Vom ersten Anruf bis zum Abschluss – wir übernehmen alles. Inklusive Datenaufbereitung und konkrete Handlungsanweisungen für Ihr Team."
        },
        {
          title: "Ihr Team wird geschult",
          description: "Unsere Vertriebsexperten zeigen Ihren Mitarbeitern, wie sie die KI-Informationen optimal für Folgekontakte nutzen."
        },
        {
          title: "Transparent & Fair",
          description: "Minutenabrechnung, keine Laufzeiten, ständige Verbesserungen – ohne dass Sie danach fragen müssen."
        }
      ],
      en: [
        {
          title: "Everything from one source",
          description: "From the first call to closing – we handle everything. Including data processing and concrete action instructions for your team."
        },
        {
          title: "Your team gets trained",
          description: "Our sales experts show your employees how to optimally use AI information for follow-up contacts."
        },
        {
          title: "Transparent & Fair",
          description: "Per-minute billing, no contract terms, continuous improvements – without you having to ask."
        }
      ],
      fr: [
        {
          title: "Tout en un",
          description: "Du premier appel à la conclusion – nous nous occupons de tout. Y compris le traitement des données et des instructions d'action concrètes pour votre équipe."
        },
        {
          title: "Votre équipe est formée",
          description: "Nos experts en vente montrent à vos employés comment utiliser de manière optimale les informations IA pour les contacts de suivi."
        },
        {
          title: "Transparent & Équitable",
          description: "Facturation à la minute, pas de durées contractuelles, améliorations continues – sans que vous ayez à demander."
        }
      ],
      es: [
        {
          title: "Todo de una fuente",
          description: "Desde la primera llamada hasta el cierre – manejamos todo. Incluyendo procesamiento de datos e instrucciones de acción concretas para su equipo."
        },
        {
          title: "Su equipo se capacita",
          description: "Nuestros expertos en ventas muestran a sus empleados cómo usar óptimamente la información de IA para contactos de seguimiento."
        },
        {
          title: "Transparente y Justo",
          description: "Facturación por minuto, sin términos contractuales, mejoras continuas – sin que tenga que preguntar."
        }
      ]
    };
    
    return features[locale] || features.de;
  };

  const getMissionContent = () => {
    const content = {
      de: {
        headline: "Neue Vertriebsstandards setzen.",
        how: "Wir übernehmen Routine-Anrufe – automatisiert und rund um die Uhr. Ihr Team konzentriert sich auf das Wesentliche.",
        benefit: "Entlastete Mitarbeiter, mehr qualifizierte Leads und messbar höhere Abschlussquoten."
      },
      en: {
        headline: "Setting new sales standards.",
        how: "We handle routine calls – automated and around the clock. Your team focuses on what matters.",
        benefit: "Relieved employees, more qualified leads, and measurably higher conversion rates."
      },
      fr: {
        headline: "Établir de nouveaux standards de vente.",
        how: "Nous prenons en charge les appels de routine – automatisés et disponibles 24/7. Votre équipe se concentre sur l'essentiel.",
        benefit: "Employés soulagés, plus de leads qualifiés et taux de conversion mesurables plus élevés."
      },
      es: {
        headline: "Establecer nuevos estándares de ventas.",
        how: "Nos encargamos de las llamadas de rutina – automatizadas y disponibles las 24 horas. Su equipo se concentra en lo esencial.",
        benefit: "Empleados aliviados, más leads cualificados y tasas de conversión mediblemente más altas."
      }
    };
    
    return content[locale] || content.de;
  };
  
  return (
    <section className="py-20 bg-gradient-to-b from-secondary via-secondary/50 to-accent/20">
      <div className="container max-w-6xl">
        {/* Breadcrumbs */}
        <BreadcrumbSEO 
          items={[
            { name: t('nav.about'), url: "https://callflows.de/about" }
          ]}
        />
        
        {/* Zentriertes Logo mit Claim als Überschrift */}
        <div className="text-center mb-16">
          <Image
            src="/images/callflows_brand_small.png"
            alt={t('about.logoAlt')}
            title={t('about.logoTitle')}
            width={300}
            height={120}
            className="mx-auto"
            priority
          />
        </div>
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Linke Spalte - Überschrift, Text und Bild */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-foreground mb-2 underline decoration-accent">
              {t('about.title')}
            </h2>
            
            <div className="space-y-4">
              <p className="text-lg text-black/75 dark:text-foreground">
                {t('about.intro1')}
              </p>
              <p 
                className="text-lg text-black/75 dark:text-foreground"
                dangerouslySetInnerHTML={{ __html: highlightCallflows(t('about.intro2')) }}
              />
              <p className="text-lg text-black/75 dark:text-foreground">
                {t('about.intro3')}
              </p>
            </div>
            
            {/* Bild nach dem Text */}
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden mt-6 max-w-md">
              <Image
                src="/images/team.webp"
                alt={t('about.teamImageAlt')}
                title={t('about.teamImageTitle')}
                fill
                className="object-cover"
              />
            </div>
            
            {/* Team-Beschreibung als Box unter das Bild */}
            <div className="bg-warm-white dark:bg-gray-800 p-6 rounded-xl shadow-sm text-center mt-6 max-w-md">
              <p className="text-lg text-black/75 dark:text-foreground font-medium">
                <strong className="text-primary">callflows</strong> {t('about.teamDescription')}
              </p>
            </div>
          </div>

          {/* Rechte Spalte - Mission & Features */}
          <div className="space-y-8">
            {/* Unsere Mission zuerst */}
            <div className="bg-warm-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border-l-4 border-primary">
              <div className="mb-6">
                <span className="text-lg font-bold text-accent dark:text-accent uppercase tracking-wider">
                  {t('about.mission')}
                </span>
                <h3 className="text-2xl font-bold text-foreground mt-2 mb-6">
                  {getMissionContent().headline}
                </h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-bold text-primary dark:text-primary mb-2">
                    {t('about.how')}
                  </h4>
                  <p className="text-black/80 dark:text-foreground leading-relaxed">
                    {getMissionContent().how}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-lg font-bold text-primary dark:text-primary mb-2">
                    {t('about.benefit')}
                  </h4>
                  <p className="text-black/80 dark:text-foreground leading-relaxed">
                    {getMissionContent().benefit}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Was uns besonders macht danach */}
            <div className="bg-warm-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-foreground mb-6">
                {t('about.special')}
              </h3>
              
              <div className="space-y-5">
                {getFeatures().map((feature, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-white dark:bg-gray-700 rounded-lg border border-gray-100 dark:border-gray-600">
                    <div className="flex-shrink-0 w-7 h-7 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-primary dark:text-primary mb-2">
                        {feature.title}
                      </h4>
                      <p className="text-black/75 dark:text-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 