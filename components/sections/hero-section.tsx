"use client";

import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { AnimatedText } from "@/components/ui/animated-text";
import { WavyBackground } from "@/components/ui/wavy-background";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Phone } from "lucide-react";
import { ZohoEmbed } from "@/components/booking/zoho-embed";

export function HeroSection() {
  const { theme } = useTheme();
  const [showWidget, setShowWidget] = useState(true);
  const [widgetError, setWidgetError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  // Widget-Loading-Handler
  const handleWidgetLoad = () => {
    setIsLoading(false);
  };

  const handleWidgetError = () => {
    setWidgetError(true);
    setIsLoading(false);
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)]">
      <div className="container relative py-12 md:py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Linke Spalte - Text */}
          <div className="relative z-20 space-y-8 md:space-y-10 animate-slideIn">
            {/* Problem-Headline */}
            <div className="space-y-8 pt-8 md:pt-12">
              <h1 
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary dark:text-white max-w-4xl"
                style={{ lineHeight: '1.2' }}
              >
                Überlastet mit Standardanrufen oder zu wenig Zeit für wichtige Aufgaben?
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl">
                Während Sie im Anruf-Chaos versinken, gehen die wirklich wichtigen Aufgaben unter – Zeit für eine Revolution!
              </p>
            </div>

            {/* Lösung mit Animated Text */}
            <div className="space-y-6">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-foreground">
                KI-Telefonie macht es{" "}
                <AnimatedText
                  words={["Einfach.", "Automatisch.", "Erfolgreich."]}
                  className="text-primary inline-block"
                />
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-[600px]">
                Von Sales über Marketing bis Support – automatisieren Sie mit uns Ihre Prozesse zur Kundenkommunikation.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <ZohoEmbed 
                buttonText="Kostenlose Beratung" 
                size="lg" 
                className="bg-[#FFB703] hover:bg-[#FFB703]/90 text-white font-semibold px-8 py-4 text-lg gap-2"
              />
            </div>

            {/* Trust Indicators */}
            <div className="pt-8 border-t border-border/30">
              <div className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span>Kostenlose Beratung</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span>Risikofrei testen</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span>Maßgeschneidert</span>
                </div>
              </div>
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
                  src="https://widget.synthflow.ai/widget/v2/526c890d-a2a8-471a-88ef-b9ba987ad08b/1747756443431x376634649512029800" 
                  allow="microphone; camera; autoplay; clipboard-write; encrypted-media" 
                  width="100%" 
                  height="100%" 
                  style={{ 
                    border: 'none', 
                    borderRadius: '0.75rem',
                    opacity: isLoading ? 0 : 1,
                    transition: 'opacity 0.3s ease-in-out'
                  }}
                  onLoad={handleWidgetLoad}
                  onError={handleWidgetError}
                />
              </>
            ) : (
              <div className="text-center p-8 flex flex-col items-center justify-center h-full">
                <div className="text-6xl mb-4">🚧</div>
                <h3 className="text-lg font-semibold mb-2">Widget temporär nicht verfügbar</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Keine Sorge - das passiert manchmal bei Live-Demos
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* WavyBackground am unteren Rand mit niedrigerem z-index */}
      <WavyBackground
        containerClassName="absolute bottom-0 left-0 right-0 h-32 w-full z-10"
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