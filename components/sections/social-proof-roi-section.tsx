"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Award } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import Link from "next/link";

export function SocialProofROISection() {
  const { t } = useI18n();

  return (
    <section className="py-20 bg-gradient-to-b from-secondary/15 via-secondary/50 to-tertiary/25">
      <div className="container max-w-6xl mx-auto">
        {/* Social Proof Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
            <Award className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-green-700 dark:text-green-300">{t('socialProofRoi.badge')}</span>
          </div>
          
          <h2 className="text-4xl font-bold text-primary dark:text-white mb-2">
            {t('socialProofRoi.title')}
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            {t('socialProofRoi.subtitle')}
          </p>
          
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl border border-border/50 p-8 max-w-4xl mx-auto mb-12">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">{t('socialProofRoi.stats.calls.value')}</div>
                <div className="text-sm text-muted-foreground">{t('socialProofRoi.stats.calls.label')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">{t('socialProofRoi.stats.leads.value')}</div>
                <div className="text-sm text-muted-foreground">{t('socialProofRoi.stats.leads.label')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent mb-2">{t('socialProofRoi.stats.relief.value')}</div>
                <div className="text-sm text-muted-foreground">{t('socialProofRoi.stats.relief.label')}</div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-border/50">
              <p className="text-muted-foreground italic">
                {t('socialProofRoi.testimonial')}
              </p>
            </div>
          </div>
        </div>

        {/* CTA für detaillierte Berechnung */}
        <div className="text-center">
          <div className="bg-card/60 backdrop-blur-sm rounded-2xl border border-border/50 p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-primary mb-4">
              {t('socialProofRoi.cta.title')}
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {t('socialProofRoi.cta.description')}
            </p>
                            <Button 
                  size="lg"
                  className="bg-[#FFB703] hover:bg-[#FFB703]/90 text-white font-semibold px-8 py-4 text-lg gap-2"
                  asChild
                >
                  <Link href="/pricing#roi-calculator">
                    {t('socialProofRoi.cta.buttonText')}
                  </Link>
                </Button>
          </div>
        </div>

        {/* Future Testimonials Section (commented out) */}
        {/*
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-center text-primary mb-12">
            Unsere Kunden vertrauen uns
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="bg-card/60 backdrop-blur-sm border border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="font-bold text-primary">B4</span>
                  </div>
                  <div>
                    <div className="font-semibold">be4work</div>
                    <div className="text-sm text-muted-foreground">Personaldienstleistung</div>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground italic">
                  "Testimonial von be4work wird hier eingefügt..."
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/60 backdrop-blur-sm border border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="font-bold text-primary">OP</span>
                  </div>
                  <div>
                    <div className="font-semibold">officepeople</div>
                    <div className="text-sm text-muted-foreground">Personalvermittlung</div>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground italic">
                  "Testimonial von officepeople wird hier eingefügt..."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        */}
      </div>
    </section>
  );
}
