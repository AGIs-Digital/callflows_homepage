"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { Calendar, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ZohoEmbedProps {
  buttonText?: string;
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  showArrow?: boolean;
}

export function ZohoEmbed({ 
  buttonText = "Termin buchen", 
  className,
  variant = "default",
  size = "default",
  showArrow = false
}: ZohoEmbedProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [userTimezone, setUserTimezone] = useState<string>('Europe/Berlin'); // Fallback auf deutsche Zeit

  // Sicherstellen dass Component im Browser läuft und Zeitzone erkennen
  useEffect(() => {
    setMounted(true);
    
    // Automatische Zeitzonenerkennung
    try {
      const detectedTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      console.log('Erkannte Zeitzone:', detectedTimezone);
      setUserTimezone(detectedTimezone);
    } catch (error) {
      console.log('Zeitzonenerkennung fehlgeschlagen, verwende Fallback:', error);
      // Fallback bleibt Europe/Berlin
    }
  }, []);

  const openBooking = () => {
    setIsOpen(true);
    // Verhindert Scrollen im Hintergrund
    document.body.style.overflow = 'hidden';
  };

  const closeBooking = () => {
    setIsOpen(false);
    // Erlaubt wieder Scrollen
    document.body.style.overflow = 'unset';
  };

  // Schließen bei ESC-Taste
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeBooking();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Dynamische Zoho URL mit automatisch erkannter Zeitzone
  const getZohoUrl = () => {
    // Da Zoho die Zeitzone erst nach Datumswahl erlaubt, verwenden wir die Standard-URL
    return 'https://callflows.zohobookings.eu/portal-embed#/239899000000038052';
  };

  // Modal Content
  const modalContent = isOpen ? (
    <div 
      className="fixed inset-0 flex items-center justify-center"
      style={{
        background: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 2147483647
      }}
      onClick={closeBooking}
    >
      <div 
        className="relative w-full max-w-5xl h-[95vh] mx-4 bg-warm-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-200/20"
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)',
          position: 'relative',
          zIndex: 1
        }}
      >
        {/* Schließen-Button */}
        <button
          onClick={closeBooking}
          className="absolute top-4 right-4 z-20 w-10 h-10 bg-gray-100/90 hover:bg-gray-200/90 dark:bg-gray-800/90 dark:hover:bg-gray-700/90 rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 transition-all duration-200 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50"
          aria-label="Schließen"
        >
          <X size={18} strokeWidth={2} />
        </button>

        {/* Header mit Branding */}
        <div className="absolute top-0 left-0 right-0 bg-gray-50/95 dark:bg-gray-800/95 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50 z-10">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Calendar size={16} className="text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Beratungstermin buchen</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">callflows - KI-Voice-Agents</p>
              </div>
            </div>
          </div>
          {/* Zeitzone-Hinweis für deutsche Kunden */}
          <div className="px-4 pb-3">
            <div className="flex items-center gap-2 text-xs text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/20 px-3 py-2 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex-shrink-0">🕒</div>
              <span>
                <strong>Wichtig:</strong> Nach der Datumswahl bitte Zeitzone auf "Deutschland/Berlin" prüfen und ggf. anpassen.
              </span>
            </div>
          </div>
        </div>

        {/* iframe Container */}
        <div className="pt-20 h-full">
          <iframe
            width="100%"
            height="100%"
            src={getZohoUrl()}
            frameBorder="0"
            allowFullScreen
            className="w-full h-full"
            style={{ 
              borderRadius: '0 0 1rem 1rem',
              background: '#FFFFF0'
            }}
          />
        </div>

        {/* Subtiler Gradient-Overlay für bessere Integration */}
        <div 
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(0,0,0,0.05) 100%)',
            mixBlendMode: 'overlay'
          }}
        />
      </div>
    </div>
  ) : null;

  return (
    <>
      <Button
        onClick={openBooking}
        variant={variant}
        size={size}
        className={cn("gap-2", className)}
      >
        <Calendar size={16} />
        {buttonText}
        {showArrow && <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />}
      </Button>

      {/* Portal - rendert das Modal außerhalb der normalen DOM-Hierarchie */}
      {mounted && modalContent && createPortal(modalContent, document.body)}
    </>
  );
} 