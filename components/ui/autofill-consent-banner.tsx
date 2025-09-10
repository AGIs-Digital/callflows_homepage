"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, X, Check, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useI18n } from '@/lib/i18n';
import { useCookieConsent } from '@/hooks/use-cookie-consent';

interface AutofillConsentBannerProps {
  isVisible: boolean;
  onAccept: () => void;
  onDecline: () => void;
  className?: string;
}

export function AutofillConsentBanner({ 
  isVisible, 
  onAccept, 
  onDecline, 
  className 
}: AutofillConsentBannerProps) {
  const [isClosing, setIsClosing] = useState(false);
  const [cookieBannerHeight, setCookieBannerHeight] = useState(0);
  const { t } = useI18n();
  const { hasConsent: hasCookieConsent } = useCookieConsent();

  // Intelligente Positionierung basierend auf Cookie-Banner
  useEffect(() => {
    if (!hasCookieConsent) {
      // Cookie-Banner ist aktiv - positioniere oberhalb
      const updateHeight = () => {
        const cookieBanner = document.querySelector('.cookie-banner-z');
        if (cookieBanner) {
          setCookieBannerHeight(cookieBanner.getBoundingClientRect().height + 16);
        }
      };
      
      updateHeight();
      window.addEventListener('resize', updateHeight);
      return () => window.removeEventListener('resize', updateHeight);
    } else {
      setCookieBannerHeight(0);
    }
  }, [hasCookieConsent]);

  if (!isVisible && !isClosing) return null;

  const handleAccept = () => {
    setIsClosing(true);
    setTimeout(() => {
      onAccept();
      setIsClosing(false);
    }, 300);
  };

  const handleDecline = () => {
    setIsClosing(true);
    setTimeout(() => {
      onDecline();
      setIsClosing(false);
    }, 300);
  };

  return (
    <div 
      className={cn(
        "fixed left-4 right-4 md:left-auto md:right-4 md:max-w-md transition-all duration-300",
        "z-40", // Unter Cookie-Banner (z-50) aber über anderen Content
        isClosing ? "opacity-0 translate-y-full" : "opacity-100 translate-y-0",
        className
      )}
      style={{
        bottom: `${Math.max(16, cookieBannerHeight)}px`
      }}
    >
      <Card className="border-2 border-primary/20 bg-background/95 backdrop-blur-sm shadow-xl">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 p-2 bg-primary/10 rounded-lg">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            
            <div className="flex-1 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-sm">
                    {t('autofill.consentTitle')}
                  </h3>
                  <Badge variant="secondary" className="text-xs">
                    <Info className="h-3 w-3 mr-1" />
                    {t('autofill.optionalBadge')}
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDecline}
                  className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
                  aria-label={t('autofill.closeLabel')}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {t('autofill.consentText')}
              </p>

              <div className="flex gap-2 pt-1">
                <Button
                  onClick={handleAccept}
                  size="sm"
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <Check className="h-4 w-4 mr-2" />
                  {t('autofill.acceptButton')}
                </Button>
                <Button
                  onClick={handleDecline}
                  variant="outline"
                  size="sm"
                  className="flex-1"
                >
                  {t('autofill.declineButton')}
                </Button>
              </div>

              <p className="text-xs text-muted-foreground">
                {t('autofill.privacyNote')}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
