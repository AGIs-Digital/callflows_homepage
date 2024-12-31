"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useCookieConsent } from "@/hooks/use-cookie-consent";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const { acceptAll, acceptEssential, hasConsent } = useCookieConsent();

  useEffect(() => {
    // Show banner if consent hasn't been given
    if (!hasConsent) {
      setIsVisible(true);
    }
  }, [hasConsent]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t p-4 shadow-lg z-50">
      <div className="container max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-muted-foreground">
          <p>
            Wir verwenden Cookies, um Ihre Erfahrung auf unserer Website zu verbessern.
            Lesen Sie unsere{" "}
            <a href="/datenschutz" className="text-primary hover:underline">
              Datenschutzerklärung
            </a>
            {" "}für weitere Informationen.
          </p>
        </div>
        <div className="flex gap-4 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              acceptEssential();
              setIsVisible(false);
            }}
          >
            Nur Essenzielle
          </Button>
          <Button
            size="sm"
            onClick={() => {
              acceptAll();
              setIsVisible(false);
            }}
          >
            Alle akzeptieren
          </Button>
        </div>
      </div>
    </div>
  );
}