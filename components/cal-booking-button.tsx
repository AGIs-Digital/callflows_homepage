"use client";

import { useEffect } from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface CalBookingButtonProps extends ButtonProps {
  calLink: string;
  children: React.ReactNode;
  showArrow?: boolean;
}

export function CalBookingButton({ 
  calLink, 
  children, 
  showArrow = true, 
  className = "", 
  ...props 
}: CalBookingButtonProps) {
  
  useEffect(() => {
    // Cal.com Embed-Skript laden
    const script = document.createElement('script');
    script.src = 'https://cal.com/embed.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    
    return () => {
      // Skript entfernen, wenn die Komponente unmounted wird
      document.body.removeChild(script);
    };
  }, []);
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Cal.com Popover öffnen
    if (window.Cal) {
      window.Cal("ui", {
        styles: { branding: { brandColor: "#0055FF" } },
        hideEventTypeDetails: false,
        layout: "month_view"
      });
      
      window.Cal("inline", {
        elementOrSelector: "#cal-booking-placeholder",
        calLink: calLink,
        config: {
          layout: "month_view",
        },
      });
      
      window.Cal("modal", {
        calLink: calLink,
        config: {
          layout: "month_view",
        },
      });
    } else {
      // Fallback: Wenn Cal.com-Skript nicht geladen wurde, öffne den Link in einem neuen Tab
      window.open(`https://cal.com/${calLink}`, "_blank");
    }
  };
  
  return (
    <>
      <Button 
        onClick={handleClick} 
        className={`${className} ${showArrow ? 'gap-2' : ''}`} 
        {...props}
      >
        {children}
        {showArrow && <ArrowRight size={16} className="hidden sm:inline" />}
      </Button>
      <div id="cal-booking-placeholder" style={{ display: 'none' }}></div>
    </>
  );
} 