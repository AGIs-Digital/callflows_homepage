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
    const storedConsent = localStorage.getItem(CONSENT_KEY);
    if (storedConsent) {
      setConsent(JSON.parse(storedConsent));
    }
  }, []);

  const saveConsent = (newConsent: CookieConsent) => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(newConsent));
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