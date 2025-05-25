"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ZohoEmbedProps {
  buttonText?: string;
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

export function ZohoEmbed({ 
  buttonText = "Termin buchen", 
  className,
  variant = "default",
  size = "default"
}: ZohoEmbedProps) {
  const [isOpen, setIsOpen] = useState(false);

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
      </Button>

      {isOpen && (
        <div 
          className="fixed inset-0 z-[99999] flex items-center justify-center"
          style={{
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh'
          }}
          onClick={closeBooking}
        >
          <div 
            className="relative w-full max-w-5xl h-[95vh] mx-4 bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-200/20"
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
            <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-r from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 border-b border-gray-200/30 dark:border-gray-700/30 backdrop-blur-sm">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Calendar size={16} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">Beratungstermin buchen</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">callflows - KI Voice Agents</p>
                  </div>
                </div>
              </div>
            </div>

            {/* iframe Container */}
            <div className="pt-20 h-full">
              <iframe
                width="100%"
                height="100%"
                src="https://callflows.zohobookings.eu/portal-embed#/239899000000038052"
                frameBorder="0"
                allowFullScreen
                className="w-full h-full"
                style={{ 
                  borderRadius: '0 0 1rem 1rem',
                  background: 'white'
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
      )}
    </>
  );
} 