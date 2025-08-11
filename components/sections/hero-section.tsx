"use client";

import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { AnimatedText } from "@/components/ui/animated-text";
import { WavyBackground } from "@/components/ui/wavy-background";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Phone } from "lucide-react";
import { ZohoEmbed } from "@/components/booking/zoho-embed";
import { useI18n } from "@/lib/i18n";

export function HeroSection() {
  const { theme } = useTheme();
  const { t, locale } = useI18n();
  const [showWidget, setShowWidget] = useState(true);
  const [widgetError, setWidgetError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  // Animierte Wörter basierend auf der Sprache
  const getAnimatedWords = () => {
    switch (locale) {
      case 'en':
        return ["Simple.", "Automatic.", "Successful."];
      case 'fr':
        return ["Simple.", "Automatique.", "Efficace."];
      case 'es':
        return ["Simple.", "Automático.", "Exitoso."];
      default:
        return ["Einfach.", "Automatisch.", "Erfolgreich."];
    }
  };
  
  // Widget-Loading-Handler
  const handleWidgetLoad = () => {
    setIsLoading(false);
  };

  const handleWidgetError = () => {
    setWidgetError(true);
    setIsLoading(false);
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] overflow-hidden">
      <div className="container max-w-6xl relative py-4 md:py-6 lg:py-8">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Linke Spalte - Text */}
          <div className="relative z-20 space-y-8 md:space-y-10 animate-slideIn">
            {/* Problem-Headline */}
            <div className="space-y-8 pt-8 md:pt-12">
              <h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"
              >
                {t('home.hero.headline1')}
                <br />
                {t('home.hero.headline2')}
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl">
                {t('home.hero.description')}
              </p>
            </div>

            {/* Lösung mit Animated Text */}
            <div className="space-y-6">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-foreground">
                {t('home.hero.solution')}{" "}
                <AnimatedText
                  words={getAnimatedWords()}
                  className="text-primary inline-block"
                />
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-[600px]">
                {t('home.hero.solutionDescription')}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 justify-center sm:justify-start">
              <ZohoEmbed 
                buttonText={t('home.hero.cta')}
                size="lg" 
                className="bg-[#FFB703] hover:bg-tertiary/70 text-white font-semibold px-8 py-4 text-lg gap-2"
              />
            </div>
          </div>
          
          {/* Rechte Spalte - KI-Widget */}
          <div className="relative z-20 h-[450px] lg:h-[600px] rounded-xl border border-border/50 bg-card/30 flex items-center justify-center overflow-hidden">
            {showWidget && !widgetError ? (
              <>
                {/* Loading Skeleton - wird angezeigt während das Widget lädt */}
                
                <iframe 
                  ref={iframeRef}
                  id="audio_iframe" 
                  title="KI Voice Agent Demo - Testen Sie unseren intelligenten Telefonassistenten"
                  src="https://widget.synthflow.ai/widget/v2/526c890d-a2a8-471a-88ef-b9ba987ad08b/1747756443431x376634649512029800" 
                  allow="microphone; camera; autoplay; clipboard-write; encrypted-media" 
                  width="100%" 
                  height="100%" 
                  className={`iframe-widget ${isLoading ? 'loading' : 'loaded'}`}
                  onLoad={handleWidgetLoad}
                  onError={handleWidgetError}
                />
              </>
            ) : (
              <div className="text-center p-8 flex flex-col items-center justify-center h-full">
                <div className="text-6xl mb-4">🚧</div>
                <h3 className="text-lg font-semibold mb-2">{t('home.hero.widgetUnavailable')}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {t('home.hero.widgetUnavailableDescription')}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* WavyBackground am unteren Rand mit höherem z-index */}
      <WavyBackground
        containerClassName="absolute bottom-0 left-0 right-0 h-32 w-full"
        colors={["#004aad", "#0f62d5", "#def0f2", "#ffb703"]}
        backgroundFill="transparent"
        waveOpacity={1}
        speed="slow"
        waveSettings={[
          { width: 100, speed: 0.5 },   // Dunkelblau: breiter, langsamer
          { width: 100, speed: 1.0 },   // Blau: Standard
          { width: 80, speed: 2.0 },    // Hellblau: schmaler, schneller
          { width: 5, speed: 4.5 }     // Gelb: sehr schmal, sehr schnell
        ]}
      >
        <div className="hidden">Wavy Animation</div>
      </WavyBackground>
    </div>
  );
}