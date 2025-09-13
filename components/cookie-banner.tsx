"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, X, Check, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";
import { useCookieConsent } from "@/hooks/use-cookie-consent";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const { acceptAll, acceptEssential, consent } = useCookieConsent();
  const { t } = useI18n();

  useEffect(() => {
    // Zeige Banner nur wenn noch keine Einwilligung vorliegt
    // Kurze Verzögerung um Flackern beim ersten Laden zu vermeiden
    const timer = setTimeout(() => {
      setIsVisible(!consent);
    }, 100);

    return () => clearTimeout(timer);
  }, [consent]);

  if (!isVisible && !isClosing) return null;

  const handleAcceptAll = () => {
    setIsClosing(true);
    setTimeout(() => {
      acceptAll();
      setIsVisible(false);
      setIsClosing(false);
    }, 300);
  };

  const handleAcceptEssential = () => {
    setIsClosing(true);
    setTimeout(() => {
      acceptEssential();
      setIsVisible(false);
      setIsClosing(false);
    }, 300);
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      acceptEssential(); // Standardverhalten: nur essenzielle Cookies
      setIsVisible(false);
      setIsClosing(false);
    }, 300);
  };

  return (
    <div 
      className={cn(
        "fixed left-4 right-4 bottom-4 md:left-auto md:right-4 md:max-w-lg transition-all duration-300 z-50",
        isClosing ? "opacity-0 translate-y-full" : "opacity-100 translate-y-0"
      )}
    >
      <Card className="border-2 border-primary/20 bg-background/95 backdrop-blur-sm shadow-xl cookie-banner-z">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 p-2 bg-primary/10 rounded-lg">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            
            <div className="flex-1 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-sm">
                    Cookie-Einstellungen
                  </h3>
                  <Badge variant="secondary" className="text-xs">
                    <Info className="h-3 w-3 mr-1" />
                    Datenschutz
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClose}
                  className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
                  aria-label="Schließen"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                Wir verwenden Cookies, um Ihre Erfahrung auf unserer Website zu verbessern.
                Lesen Sie unsere{" "}
                <a href="/datenschutz" className="text-primary hover:underline font-medium">
                  Datenschutzerklärung
                </a>
                {" "}für weitere Informationen.
              </p>

              <div className="flex gap-2 pt-1">
                <Button
                  onClick={handleAcceptAll}
                  size="sm"
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <Check className="h-4 w-4 mr-2" />
                  Alle akzeptieren
                </Button>
                <Button
                  onClick={handleAcceptEssential}
                  variant="outline"
                  size="sm"
                  className="flex-1"
                >
                  Nur Essenzielle
                </Button>
              </div>

              <p className="text-xs text-muted-foreground">
                Sie können Ihre Einstellungen jederzeit in der Datenschutzerklärung ändern.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}