'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Statische Imports der Übersetzungen
import deTranslations from '@/translations/de.json';
import enTranslations from '@/translations/en.json';
import frTranslations from '@/translations/fr.json';
import esTranslations from '@/translations/es.json';

// Unterstützte Sprachen
export const SUPPORTED_LOCALES = {
  de: { name: 'Deutsch', flag: '🇩🇪' },
  en: { name: 'English', flag: '🇺🇸' },
  fr: { name: 'Français', flag: '🇫🇷' },
  es: { name: 'Español', flag: '🇪🇸' },
} as const;

export type Locale = keyof typeof SUPPORTED_LOCALES;
export type Translations = Record<string, any>;

// Land-zu-Sprache Mapping
const COUNTRY_TO_LANGUAGE: Record<string, Locale> = {
  // Englischsprachige Länder
  'US': 'en', 'GB': 'en', 'CA': 'en', 'AU': 'en', 'NZ': 'en', 'IE': 'en',
  'ZA': 'en', 'SG': 'en', 'HK': 'en', 'IN': 'en', 'PH': 'en', 'MY': 'en',
  
  // Deutschsprachige Länder
  'DE': 'de', 'AT': 'de', 'CH': 'de', 'LI': 'de', 'LU': 'de',
  
  // Französischsprachige Länder
  'FR': 'fr', 'BE': 'fr', 'MC': 'fr', 'SN': 'fr', 'CI': 'fr', 'MA': 'fr',
  'TN': 'fr', 'DZ': 'fr', 'MG': 'fr', 'CM': 'fr', 'BF': 'fr', 'ML': 'fr',
  'NE': 'fr', 'TD': 'fr', 'CF': 'fr', 'CG': 'fr', 'GA': 'fr', 'BJ': 'fr',
  'TG': 'fr', 'RW': 'fr', 'BI': 'fr', 'DJ': 'fr', 'KM': 'fr', 'VU': 'fr',
  'NC': 'fr', 'PF': 'fr', 'WF': 'fr', 'PM': 'fr', 'MQ': 'fr', 'GP': 'fr',
  'GF': 'fr', 'RE': 'fr', 'YT': 'fr',
  
  // Spanischsprachige Länder
  'ES': 'es', 'MX': 'es', 'AR': 'es', 'CO': 'es', 'PE': 'es', 'VE': 'es',
  'CL': 'es', 'EC': 'es', 'GT': 'es', 'CU': 'es', 'BO': 'es', 'DO': 'es',
  'HN': 'es', 'PY': 'es', 'SV': 'es', 'NI': 'es', 'CR': 'es', 'PA': 'es',
  'UY': 'es', 'PR': 'es', 'GQ': 'es',
};

// Übersetzungs-Map
const TRANSLATIONS_MAP: Record<Locale, Translations> = {
  de: deTranslations,
  en: enTranslations,
  fr: frTranslations,
  es: esTranslations,
};

// Context
interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  tArray: (key: string) => string[];
  isLoading: boolean;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

// Übersetzungen laden (jetzt synchron)
const getTranslations = (locale: Locale): Translations => {
  const translations = TRANSLATIONS_MAP[locale] || TRANSLATIONS_MAP.de;
  return translations;
};

// Geolocation API Interface
interface GeolocationResponse {
  country_code?: string;
  country?: string;
}

// Browser-Sprache erkennen (synchron, als Fallback)
const detectBrowserLanguage = (): Locale => {
  if (typeof window === 'undefined') return 'de';
  
  const stored = localStorage.getItem('callflows-locale') as Locale;
  if (stored && stored in SUPPORTED_LOCALES) return stored;
  
  const browserLang = navigator.language.split('-')[0] as Locale;
  return browserLang in SUPPORTED_LOCALES ? browserLang : 'de';
};

// Benutzersprache basierend auf Geolocation und Browser erkennen (asynchron)
const detectUserLanguage = async (): Promise<Locale> => {
  if (typeof window === 'undefined') return 'de';
  
  // Zuerst prüfen ob eine Sprache bereits gespeichert ist
  const stored = localStorage.getItem('callflows-locale') as Locale;
  if (stored && stored in SUPPORTED_LOCALES) return stored;
  
  try {
    // Geolocation über IP ermitteln (kostenlose API ohne API-Key)
    const response = await fetch('https://ipapi.co/json/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    
    if (response.ok) {
      const data: GeolocationResponse = await response.json();
      const countryCode = data.country_code;
      
      if (countryCode && COUNTRY_TO_LANGUAGE[countryCode]) {
        const geoLanguage = COUNTRY_TO_LANGUAGE[countryCode];
        console.log(`Geolocation erkannt: ${countryCode} -> ${geoLanguage}`);
        return geoLanguage;
      }
    }
  } catch (error) {
    console.warn('Geolocation-Erkennung fehlgeschlagen, verwende Browser-Sprache:', error);
  }
  
  // Fallback auf Browser-Sprache
  const browserLang = navigator.language.split('-')[0] as Locale;
  return browserLang in SUPPORTED_LOCALES ? browserLang : 'de';
};

// Provider Component
export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('de');
  const [translations, setTranslations] = useState<Translations>({});
  const [isLoading, setIsLoading] = useState(true);

  // Übersetzungen laden
  useEffect(() => {
    const loadInitialLanguage = async () => {
      try {
        const detectedLocale = await detectUserLanguage();
        setLocaleState(detectedLocale);
        
        const newTranslations = getTranslations(detectedLocale);
        setTranslations(newTranslations);
      } catch (error) {
        console.warn('Fehler beim Laden der Sprache, verwende Standard:', error);
        // Fallback auf synchrone Browser-Erkennung
        const fallbackLocale = detectBrowserLanguage();
        setLocaleState(fallbackLocale);
        
        const newTranslations = getTranslations(fallbackLocale);
        setTranslations(newTranslations);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialLanguage();
  }, []);

  // Sprache wechseln
  const setLocale = (newLocale: Locale) => {
    setIsLoading(true);
    setLocaleState(newLocale);
    localStorage.setItem('callflows-locale', newLocale);
    
    const newTranslations = getTranslations(newLocale);
    setTranslations(newTranslations);
    setIsLoading(false);
  };

  // Übersetzungsfunktion
  const t = (key: string): string => {
    if (isLoading) {
      return key;
    }

    const keys = key.split('.');
    let value: any = translations;
    
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) {
        break;
      }
    }
    
    if (typeof value === 'string') {
      return value;
    }
    if (Array.isArray(value)) return JSON.stringify(value);
    
    return key;
  };

  // Array-Übersetzungsfunktion
  const tArray = (key: string): string[] => {
    if (isLoading) return [];

    const keys = key.split('.');
    let value: any = translations;
    
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) break;
    }
    
    if (Array.isArray(value)) return value;
    return [];
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, tArray, isLoading }}>
      {children}
    </I18nContext.Provider>
  );
}

// Hook
export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
} 