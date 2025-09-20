"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { Calendar, X, ArrowRight, Clock, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface MicrosoftBookingsEmbedProps {
  buttonText?: string;
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  showArrow?: boolean;
  bookingUrl?: string;
}

export function MicrosoftBookingsEmbed({ 
  buttonText = "Termin buchen", 
  className,
  variant = "default",
  size = "default",
  showArrow = false,
  bookingUrl = "https://outlook.office.com/book/callflowsBeratungstermin@callflows.de/?ismsaljsauthenabled"
}: MicrosoftBookingsEmbedProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [userTimezone, setUserTimezone] = useState<string>('Europe/Berlin');

  useEffect(() => {
    setMounted(true);
    
    try {
      const detectedTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      setUserTimezone(detectedTimezone);
    } catch (error) {
      // Fallback bleibt Europe/Berlin
    }
  }, []);

  const openBooking = () => {
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeBooking = () => {
    setIsOpen(false);
    document.body.style.overflow = 'unset';
  };

  // ESC-Taste Handling
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

  // Microsoft Bookings URL
  const getBookingUrl = () => {
    // Ersetze 'your-booking-page' mit deiner tatsächlichen Microsoft Bookings URL
    return bookingUrl;
  };

  // Modal Content
  const modalContent = isOpen ?
    <div 
      className="fixed inset-0 flex items-center justify-center"
      style={{ zIndex: 9999 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          closeBooking();
        }
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      
      {/* Modal */}
      <div className="relative w-full max-w-6xl h-[90vh] mx-4 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={closeBooking}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
          aria-label="Schließen"
        >
          <X size={16} className="text-gray-700 dark:text-gray-300" />
        </button>

        {/* Header mit Branding */}
        <div className="absolute top-0 left-0 right-0 bg-gray-50/95 dark:bg-gray-800/95 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50 z-10">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                <Calendar size={16} className="text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Beratungstermin buchen</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">callflows - KI-callflow</p>
              </div>
            </div>
          </div>
        </div>

        {/* iframe Container */}
        <div className="pt-24 h-full">
          <iframe
            width="100%"
            height="100%"
            src={getBookingUrl()}
            frameBorder="0"
            allowFullScreen
            className="w-full h-full"
            style={{ 
              borderRadius: '0 0 1rem 1rem',
              background: '#FFFFF0'
            }}
            title="Microsoft Bookings - Terminbuchung"
          />
        </div>

        {/* Subtiler Gradient-Overlay für bessere Integration */}
        <div 
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, transparent 0%, rgba(255, 183, 3, 0.02) 100%)'
          }}
        />
      </div>
    </div> : null;

  if (!mounted) return null;

  return (
    <>
      <Button
        onClick={openBooking}
        variant={variant}
        size={size}
        className={cn(
          "group transition-all duration-300 hover:scale-105",
          className
        )}
      >
        <Calendar className="w-4 h-4 mr-2" />
        {buttonText}
        {showArrow && (
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
        )}
      </Button>
      
      {createPortal(modalContent, document.body)}
    </>
  );
}
