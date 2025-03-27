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
    // Kurze Verzögerung, um sicherzustellen, dass die Seite vollständig geladen ist
    const timer = setTimeout(() => {
      setShowWidget(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Fehlerbehandlung für das Widget
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Prüfen, ob die Nachricht vom Widget kommt
      if (event.data && typeof event.data === 'string') {
        try {
          const data = JSON.parse(event.data);
          // Prüfen auf Fehlermeldungen vom Widget
          if (data.type === 'error' || (data.error && data.error.includes('server-side exception'))) {
            setWidgetError(true);
          }
        } catch (e) {
          // Ignoriere Parsing-Fehler
        }
      }
    };

    // Fehler beim Laden des iframes erkennen
    const handleIframeError = () => {
      setWidgetError(true);
    };

    window.addEventListener('message', handleMessage);
    
    // Iframe-Fehler überwachen, falls das Widget nicht geladen werden kann
    const iframe = iframeRef.current;
    if (iframe) {
      iframe.addEventListener('error', handleIframeError);
    }
    
    return () => {
      window.removeEventListener('message', handleMessage);
      if (iframe) {
        iframe.removeEventListener('error', handleIframeError);
      }
    };
  }, [showWidget]);

  // Alternative Methode zur Fehlerprüfung
  useEffect(() => {
    if (!showWidget) return;

    const checkForErrorMessage = () => {
      // Prüfe, ob die Fehlermeldung im DOM vorhanden ist
      const iframeDocument = iframeRef.current?.contentDocument;
      if (iframeDocument) {
        const pageText = iframeDocument.body.textContent || '';
        if (pageText.includes('Application error') || pageText.includes('Digest: 895244412')) {
          setWidgetError(true);
        }
      }
    };

    // Überprüfe nach einer kurzen Verzögerung
    const timer = setTimeout(checkForErrorMessage, 1000);
    
    // Wiederhole die Prüfung alle 2 Sekunden
    const interval = setInterval(checkForErrorMessage, 2000);
    
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [showWidget]);

  // Direkte Fehlerprüfung durch Überwachung des Widget-Containers
  useEffect(() => {
    if (!showWidget) return;
    
    // Setze einen Timeout, um nach einer bestimmten Zeit zu prüfen, ob das Widget geladen wurde
    const errorTimeout = setTimeout(() => {
      // Wenn das Widget nach 5 Sekunden nicht geladen ist, zeige die Fehlermeldung an
      const iframe = iframeRef.current;
      if (iframe) {
        try {
          // Versuche auf den Inhalt zuzugreifen - wenn dies fehlschlägt, ist das Widget möglicherweise fehlerhaft
          const iframeContent = iframe.contentWindow || iframe.contentDocument;
          if (!iframeContent) {
            setWidgetError(true);
          }
        } catch (e) {
          // Bei einem Fehler beim Zugriff auf den iframe-Inhalt (z.B. aufgrund von CORS)
          setWidgetError(true);
        }
      }
    }, 5000);
    
    return () => {
      clearTimeout(errorTimeout);
    };
  }, [showWidget]);

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
              Die Revolution der Geschäftskommunikation
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-full md:max-w-[700px]">
              Von Sales und Marketing über Support - wir automatisieren Ihre Prozesse zur Kundenkommunikation.
            </p>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-full md:max-w-[700px]">
              Mit umfassender Beratung und maßgeschneiderten Lösungen unterstützen wir Sie bei der digitalen Transformation Ihrer Kommunikation.
            </p>
          </div>
          
          {/* Rechte Spalte - KI-Widget */}
          <div className="relative z-20 h-[400px] lg:h-[550px] rounded-xl border border-border/50 bg-card/30 flex items-center justify-center">
            {showWidget && !widgetError ? (
              <iframe 
                id="audio_iframe" 
                ref={iframeRef}
                src="https://whitelabel-widget-dev.synthflow.dev/widget/v2/1734458300743x316318366914512640/1734458300564x710091014548361600" 
                allow="microphone" 
                width="100%" 
                height="100%" 
                style={{ border: 'none', borderRadius: '0.75rem', overflow: 'hidden' }}
                onError={() => setWidgetError(true)}
                onLoad={(e) => {
                  // Prüfe nach dem Laden, ob der Inhalt des iframes eine Fehlermeldung enthält
                  try {
                    const iframe = e.currentTarget;
                    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
                    if (iframeDoc && iframeDoc.body.textContent?.includes('Application error')) {
                      setWidgetError(true);
                    }
                  } catch (err) {
                    // CORS-Fehler ignorieren
                  }
                }}
              />
            ) : widgetError ? (
              <div className="text-center p-8 flex flex-col items-center justify-center h-full">
                <div className="text-6xl mb-4">🚧</div>
                <h3 className="text-2xl font-bold text-[#FFB703] mb-2">
                  Im Wartungsmodus
                </h3>
                <p className="text-muted-foreground max-w-md">
                  Unser KI-Assistent verbessert sich gerade und wird in Kürze wieder verfügbar sein. Bitte versuchen Sie es später erneut.
                </p>
              </div>
            ) : (
              <div className="text-center p-4">
                <p className="text-muted-foreground">KI-Widget wird geladen...</p>
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