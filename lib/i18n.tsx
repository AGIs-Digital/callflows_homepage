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

// Übersetzungs-Typ
export type Translations = {
  [key: string]: string | string[] | Translations;
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

// Browser-Sprache erkennen
const detectBrowserLanguage = (): Locale => {
  if (typeof window === 'undefined') return 'de';
  
  const stored = localStorage.getItem('callflows-locale') as Locale;
  if (stored && stored in SUPPORTED_LOCALES) return stored;
  
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
    const detectedLocale = detectBrowserLanguage();
    setLocaleState(detectedLocale);
    
    const newTranslations = getTranslations(detectedLocale);
    setTranslations(newTranslations);
    setIsLoading(false);
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