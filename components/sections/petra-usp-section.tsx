"use client";

import React, { useState } from "react";
import { Star, Users, Award, ChevronRight, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PetraModal } from "@/components/sections/petra-modal";
import { useI18n } from "@/lib/i18n";

export function PetraUSPSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t, locale } = useI18n();
  const isGerman = locale === 'de';

  return (
    <>
      {/* Warum callflows? Section */}
      <section className="py-20 bg-gradient-to-b from-accent/15 via-accent/25 to-accent/35 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-tertiary rounded-full blur-2xl"></div>
        </div>
        
        <div className="container max-w-4xl relative z-10">
          <div className="text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
              <span className="text-sm font-medium text-primary">Warum callflows?</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-primary leading-tight">
                Mehr als Software – ein Partner
              </h2>
              
              {/* Main Text */}
              <div className="bg-card/60 backdrop-blur-sm rounded-2xl border border-border/50 p-8 max-w-3xl mx-auto">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Viele Anbieter überlassen Ihnen die Einrichtung. Wir liefern <strong className="text-foreground">End-to-End</strong>: 
                  von Dialog-Design und Prozesslogik bis zu Integration und Betrieb. Dazu ein verständliches 
                  <strong className="text-primary"> Minuten-Modell ohne Laufzeitbindung</strong>. So bleibt KI einfach, 
                  transparent und kalkulierbar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* KI + Menschliche Expertise Section */}
      <section className="py-20 bg-gradient-to-b from-accent/35 via-accent/45 to-tertiary/25 relative overflow-hidden">
        {/* Enhanced Decorative Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-40 h-40 bg-accent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-primary rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-accent via-accent/60 to-primary rounded-full blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute top-10 right-1/3 w-24 h-24 bg-accent/80 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-10 left-1/4 w-32 h-32 bg-primary/60 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute top-1/4 left-10 w-20 h-20 bg-tertiary/60 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-20 w-28 h-28 bg-secondary/80 rounded-full blur-2xl animate-pulse"></div>
        </div>
        
        <div className="container max-w-6xl relative z-10">
          <div className="text-center space-y-8">
            {/* Main Headline */}
            <div className="space-y-4">
              <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent/90 to-accent bg-clip-text text-transparent leading-tight">
                {t('petraUsp.title')}
              </h2>
              <p className="text-2xl md:text-3xl font-semibold text-foreground">
                {isGerman ? (
                  <>
                    Wenn Technologie auf{" "}
                    <span className="text-primary decoration-primary/50">
                      20 Jahre Vertriebserfahrung
                    </span>{" "}
                    trifft
                  </>
                ) : (
                  t('petraUsp.subtitle')
                )}
              </p>
            </div>

            {/* Non-German Language Notice */}
            {!isGerman && (
              <div className="max-w-2xl mx-auto p-4 bg-amber-50/80 backdrop-blur-sm border border-amber-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-800">
                    <strong>{t('petraUsp.germanOnlyNotice')}</strong>
                  </p>
                </div>
              </div>
            )}

            {/* USP Content */}
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="bg-card/60 backdrop-blur-sm rounded-2xl border border-border/50 p-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t('petraUsp.description')}
                </p>
              </div>
              
              {/* Enhanced Key Benefits */}
              <div className="grid md:grid-cols-3 gap-6 mt-12">
                <div className="group flex flex-col items-center text-center p-8 rounded-2xl bg-card/60 border border-border/50 backdrop-blur-sm hover:bg-card/80 hover:border-primary/30 hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">{t('petraUsp.benefit1Title')}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t('petraUsp.benefit1Description')}</p>
                </div>
                
                <div className="group flex flex-col items-center text-center p-8 rounded-2xl bg-card/60 border border-border/50 backdrop-blur-sm hover:bg-card/80 hover:border-accent/30 hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
                  <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Star className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-accent transition-colors duration-300">{t('petraUsp.benefit2Title')}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t('petraUsp.benefit2Description')}</p>
                </div>
                
                <div className="group flex flex-col items-center text-center p-8 rounded-2xl bg-card/60 border border-border/50 backdrop-blur-sm hover:bg-card/80 hover:border-primary/30 hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Award className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">{t('petraUsp.benefit3Title')}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t('petraUsp.benefit3Description')}</p>
                </div>
              </div>
            </div>

            {/* Enhanced CTA Button */}
            <div className="mt-12">
              <div className="bg-card/40 backdrop-blur-sm rounded-2xl border border-border/50 p-6 max-w-lg mx-auto">
                <Button
                  onClick={() => setIsModalOpen(true)}
                  size="lg"
                  className="bg-tertiary hover:bg-[#FFB703]/90 text-white font-semibold px-8 py-4 text-lg gap-2 w-full hover:scale-105 transition-transform duration-300"
                >
                  {t('petraUsp.ctaButton')}
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      <PetraModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
} 