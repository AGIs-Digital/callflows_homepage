"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { BookingButton } from "@/components/booking/booking-button";
import { useI18n } from "@/lib/i18n";
import { Shield, CheckCircle, Server, Activity } from "@/lib/icons";

// Critical Path: Load immediately, no delay
// Non-Critical: Load after initial render
const AnimatedText = dynamic(() => import("@/components/ui/animated-text").then(mod => ({ default: mod.AnimatedText })), {
  ssr: false,
  loading: () => <span className="text-primary">Automatisch.</span>
});

const WavyBackground = dynamic(() => import("@/components/ui/wavy-background").then(mod => ({ default: mod.WavyBackground })), {
  ssr: false,
  loading: () => null
});

const WidgetCall = dynamic(() => import("@/components/widget-call/widget-call").then(mod => ({ default: mod.WidgetCall })), {
  ssr: false,
  loading: () => (
    <div className="w-full max-w-md mx-auto lg:mx-0 border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg p-6 animate-pulse">
      <div className="text-center space-y-4">
        <div className="h-6 w-6 bg-primary/20 rounded-full mx-auto"></div>
        <div className="h-6 bg-primary/20 rounded mx-auto max-w-[200px]"></div>
        <div className="h-4 bg-primary/10 rounded mx-auto max-w-[150px]"></div>
        <div className="space-y-2">
          <div className="h-10 bg-primary/10 rounded"></div>
          <div className="h-10 bg-primary/10 rounded"></div>
          <div className="h-12 bg-primary/20 rounded"></div>
        </div>
      </div>
    </div>
  )
});

export function HeroSection() {
  const { t, tArray, locale } = useI18n();
  
  const highlightCallflows = (text: string) => {
    return text.replace(/callflows/gi, '<strong class="text-primary">callflows</strong>');
  };
  
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

  return (
    <div className="relative min-h-[calc(100vh-80px)] overflow-hidden hero-gradient">
      <div className="container max-w-6xl relative py-4 md:py-6 lg:py-8">
        {/* H1 über die volle Breite */}
        <div className="text-center mb-8 md:mb-12 pt-8 md:pt-12">
          <h1 
            className="font-bold text-foreground leading-[1.1]"
            style={{
              fontFamily: '"Satoshi", sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(2.5rem, 5vw + 1rem, 4rem)'
            }}
          >
            {t('home.hero.headline1')}
            <br />
            {t('home.hero.headline2')}
          </h1>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          {/* Linke Spalte - Text Content */}
          <div className="relative z-20 space-y-8 md:space-y-10 animate-slideIn">
            {/* Subline */}
            <div className="space-y-6">
              <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground leading-relaxed">
                {t('home.hero.description')}
              </p>
              
              {/* Microproof */}
              <div className="flex flex-col gap-3 pt-2">
                {tArray('home.hero.microproof').map((item, index) => {
                  const icons = [Shield, CheckCircle, Server, Activity];
                  const Icon = icons[index] || CheckCircle;
                  return (
                    <div key={index} className="flex items-center gap-3 text-sm sm:text-base text-muted-foreground">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <span>{item}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CTA Button links auf Höhe des Widget-Buttons */}
            <div className="pt-6 flex justify-center">
              <BookingButton 
                buttonText={t('home.hero.cta')}
                size="lg" 
                className="bg-[#FFB703] hover:bg-tertiary/70 text-white font-semibold px-8 py-4 text-lg gap-2 w-full max-w-[280px]"
                bookingUrl="https://outlook.office.com/book/info1@callflows.de/?ismsaljsauthenabled"
              />
            </div>
          </div>
          
          {/* Rechte Spalte - Call Test Widget mit Micro Trust */}
          <div 
            className="relative z-20 space-y-4"
            role="region"
            aria-label="KI Voice Agent Live Test"
            aria-describedby="call-widget-description"
          >
            <div id="call-widget-description" className="sr-only">
              Live-Test unseres KI Voice Agents. Geben Sie Ihre Telefonnummer ein und unser intelligenter Assistent ruft Sie sofort an.
            </div>
            
            {/* Call Test Widget */}
            <div className="w-full max-w-lg mx-auto lg:mx-0">
              <Suspense fallback={
                <div className="w-full max-w-md mx-auto lg:mx-0 border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg p-6 animate-pulse">
                  <div className="text-center space-y-4">
                    <div className="h-6 w-6 bg-primary/20 rounded-full mx-auto"></div>
                    <div className="h-6 bg-primary/20 rounded mx-auto max-w-[200px]"></div>
                    <div className="h-4 bg-primary/10 rounded mx-auto max-w-[150px]"></div>
                    <div className="space-y-2">
                      <div className="h-10 bg-primary/10 rounded"></div>
                      <div className="h-10 bg-primary/10 rounded"></div>
                      <div className="h-12 bg-primary/20 rounded"></div>
                    </div>
                  </div>
                </div>
              }>
                <WidgetCall className="w-full widget-call" />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
      
      {/* WavyBackground am unteren Rand mit höherem z-index - Lazy loaded */}
      <Suspense fallback={null}>
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
      </Suspense>
    </div>
  );
}