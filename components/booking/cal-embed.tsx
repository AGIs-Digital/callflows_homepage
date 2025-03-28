"use client";

import { useEffect, useState } from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { getCalApi } from "@calcom/embed-react";

interface CalEmbedProps extends ButtonProps {
  buttonText?: string;
}

export function CalEmbed({ 
  buttonText = "Beratungstermin buchen", 
  className = "",
  ...props 
}: CalEmbedProps) {
  const [calLoaded, setCalLoaded] = useState(false);

  useEffect(() => {
    const loadCal = async () => {
      try {
        const cal = await getCalApi();
        cal("ui", {
          styles: { branding: { brandColor: "#0f26d5" } },
          hideEventTypeDetails: false,
          layout: "month_view"
        });
        setCalLoaded(true);
      } catch (error) {
        console.error("Fehler beim Laden des Cal.com Widgets:", error);
      }
    };
    
    loadCal();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!calLoaded) {
      e.preventDefault();
      console.warn("Cal.com Widget noch nicht geladen");
      // Alternativ: Direkter Link zu Cal.com
      window.open("https://cal.com/callflows/55min", "_blank");
    }
  };

  return (
    <Button
      className={`${className}`}
      data-cal-link="callflows/55min"
      data-cal-config='{"layout":"popup"}'
      onClick={handleClick}
      {...props}
    >
      {buttonText}
      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
    </Button>
  );
} 