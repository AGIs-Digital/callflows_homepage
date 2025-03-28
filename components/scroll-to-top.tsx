"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Überprüfen, ob der Benutzer weit genug gescrollt hat
  useEffect(() => {
    const toggleVisibility = () => {
      // Zeige den Button erst, wenn der Benutzer mindestens 500px nach unten gescrollt hat
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Funktion zum Scrollen nach oben (2 Sektionen)
  const scrollToTop = () => {
    // Aktuelle Position ermitteln
    const currentPosition = window.scrollY;
    
    // Durchschnittliche Höhe einer Sektion (ca. 800px, kann angepasst werden)
    const sectionHeight = 800;
    
    // Zielposition berechnen (2 Sektionen nach oben)
    const targetPosition = Math.max(0, currentPosition - (sectionHeight * 2));
    
    window.scrollTo({
      top: targetPosition,
      behavior: "smooth"
    });
  };

  return (
    <Button
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-6 right-6 z-50 rounded-full p-3 shadow-lg transition-all duration-300",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      )}
      size="icon"
      aria-label="Zwei Sektionen nach oben scrollen"
    >
      <ArrowUp className="h-5 w-5" />
    </Button>
  );
} 