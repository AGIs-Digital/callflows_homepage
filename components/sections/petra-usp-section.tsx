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
      <section className="py-20 bg-gradient-to-b from-accent/20 via-accent/40 to-primary/30 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-40 h-40 bg-accent rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-accent via-accent/60 to-primary rounded-full blur-3xl opacity-30"></div>
          <div className="absolute top-10 right-1/3 w-24 h-24 bg-accent/80 rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 left-1/4 w-32 h-32 bg-primary/60 rounded-full blur-2xl"></div>
        </div>
        
        <div className="container max-w-4xl relative z-10">
          <div className="text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
              <Award className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">{t('petraUsp.badge')}</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent/90 to-accent bg-clip-text text-transparent leading-tight">
                {t('petraUsp.title')}
              </h2>
              <p className="text-2xl md:text-3xl font-semibold text-foreground">
                {isGerman ? (
                  <>
                    Wenn Technologie auf{" "}
                    <span className="text-primary underline decoration-wavy decoration-primary/50">
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
              <div className="max-w-2xl mx-auto p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-800">
                    <strong>{t('petraUsp.germanOnlyNotice')}</strong>
                  </p>
                </div>
              </div>
            )}

            {/* USP Content */}
            <div className="max-w-3xl mx-auto space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('petraUsp.description')}
              </p>
              
              {/* Key Benefits */}
              <div className="grid md:grid-cols-3 gap-6 mt-12">
                <div className="flex flex-col items-center text-center p-6 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{t('petraUsp.benefit1Title')}</h3>
                  <p className="text-sm text-muted-foreground">{t('petraUsp.benefit1Description')}</p>
                </div>
                
                <div className="flex flex-col items-center text-center p-6 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                    <Star className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{t('petraUsp.benefit2Title')}</h3>
                  <p className="text-sm text-muted-foreground">{t('petraUsp.benefit2Description')}</p>
                </div>
                
                <div className="flex flex-col items-center text-center p-6 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{t('petraUsp.benefit3Title')}</h3>
                  <p className="text-sm text-muted-foreground">{t('petraUsp.benefit3Description')}</p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-12">
              <Button
                onClick={() => setIsModalOpen(true)}
                size="lg"
                className="bg-tertiary hover:bg-[#FFB703]/90 text-white font-semibold px-8 py-4 text-lg gap-2"
              >
                {t('petraUsp.ctaButton')}
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      <PetraModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
} 