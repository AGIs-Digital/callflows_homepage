"use client";

import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { AnimatedText } from "@/components/ui/animated-text";
import { WavyBackground } from "@/components/ui/wavy-background";
import { useTheme } from "next-themes";

export function HeroSection() {
  const { theme } = useTheme();
  const [showWidget, setShowWidget] = useState(false);
  const [widgetError, setWidgetError] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  // Widget nach dem Laden der Seite aktivieren
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWidget(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-[calc(100vh-80px)]">
      <div className="container relative py-8 md:py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Linke Spalte - Text */}
          <div className="relative z-20 space-y-4 md:space-y-6 animate-slideIn">
            <h1 className="text-3xl sm:text-4xl md:text-[56px] font-bold leading-tight text-primary dark:text-white">
              <AnimatedText
                words={["Intelligent.", "Automatisiert.", "Erfolgreich."]}
                className="leading-tight"
              />
            </h1>
            <h2 className="text-l sm:text-2xl md:text-4xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-[600px]">
              Die Revolution der Kommunikation mit Ihren Kunden.
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-full md:max-w-[700px]">
              Von Sales und Marketing über Support - wir automatisieren Ihre Prozesse zur Kundenkommunikation.
            </p>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-full md:max-w-[700px]">
              Mit umfassender Beratung und maßgeschneiderten Lösungen unterstützen wir Sie bei der digitalen Transformation Ihrer Kommunikation.
            </p>
          </div>
          
          {/* Rechte Spalte - KI-Widget */}
          <div className="relative z-20 h-[450px] lg:h-[550px] rounded-xl border border-border/50 bg-card/30 flex items-center justify-center overflow-hidden">
            {showWidget && !widgetError ? (
              <iframe 
                ref={iframeRef}
                id="audio_iframe" 
                src="https://widget.synthflow.ai/widget/v2/526c890d-a2a8-471a-88ef-b9ba987ad08b/1747756443431x376634649512029800" 
                allow="microphone; camera; autoplay; clipboard-write; encrypted-media" 
                width="100%" 
                height="100%" 
                style={{ border: 'none', borderRadius: '0.75rem' }}
                onError={() => setWidgetError(true)}
              />
            ) : (
              <div className="text-center p-8 flex flex-col items-center justify-center h-full">
                <div className="text-6xl mb-4">🚧</div>
                <h3 className="text-2xl font-bold text-[#FFB703] mb-2">
                  Im Wartungsmodus
                </h3>
                <p className="text-muted-foreground max-w-md">
                  Unser KI-Assistent verbessert sich gerade und wird in Kürze wieder verfügbar sein. Bitte versuchen Sie es später erneut.
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