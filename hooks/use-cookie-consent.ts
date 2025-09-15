"use client";

import { useState, useEffect } from "react";

const CONSENT_KEY = "cookie-consent";

interface CookieConsent {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

export function useCookieConsent() {
  const [consent, setConsent] = useState<CookieConsent | null>(null);

  useEffect(() => {
    try {
      const storedConsent = localStorage.getItem(CONSENT_KEY);
      if (storedConsent) {
        setConsent(JSON.parse(storedConsent));
      }
    } catch (error) {
      // localStorage nicht verfügbar (iOS Safari Private Mode)
      console.warn('localStorage für Cookie Consent nicht verfügbar:', error);
      // Verwende Session-only defaults
      setConsent(null);
    }
  }, []);

  const saveConsent = (newConsent: CookieConsent) => {
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify(newConsent));
    } catch (error) {
      // localStorage write fehlgeschlagen (iOS Safari Private Mode)
      console.warn('localStorage write für Cookie Consent fehlgeschlagen:', error);
      // Continue with session-only consent
    }
    setConsent(newConsent);
  };

  const acceptAll = () => {
    saveConsent({
      essential: true,
      analytics: true,
      marketing: true,
    });
  };

  const acceptEssential = () => {
    saveConsent({
      essential: true,
      analytics: false,
      marketing: false,
    });
  };

  return {
    consent,
    acceptAll,
    acceptEssential,
    hasConsent: !!consent,
  };
}