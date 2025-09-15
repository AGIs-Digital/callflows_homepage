import { useState, useEffect, useCallback } from 'react';
import { useCookieConsent } from './use-cookie-consent';

interface AutofillData {
  name?: string;
  phone?: string;
  email?: string;
}

interface UseAutofillOptions {
  storageKey?: string;
  enableLocalStorage?: boolean;
  onDataLoaded?: (data: AutofillData) => void;
}

const DEFAULT_STORAGE_KEY = 'ki-callflow-autofill-data';

export function useAutofill(options: UseAutofillOptions = {}) {
  const {
    storageKey = DEFAULT_STORAGE_KEY,
    enableLocalStorage = true,
    onDataLoaded
  } = options;

  const [autofillData, setAutofillData] = useState<AutofillData>({});
  const [isLoading, setIsLoading] = useState(true);
  
  // Verwende Cookie-Consent für Autofill-Berechtigung
  const { consent } = useCookieConsent();
  const hasConsent = consent?.essential || false;

  // Lade gespeicherte Daten und Einverständnis beim Mount
  useEffect(() => {
    if (!enableLocalStorage) {
      setIsLoading(false);
      return;
    }

    try {
      // Lade Daten nur wenn Cookie-Einverständnis vorhanden
      if (hasConsent) {
        // iOS Safari Private Mode Fallback
        try {
          const savedData = localStorage.getItem(storageKey);
          if (savedData) {
            const parsedData = JSON.parse(savedData) as AutofillData;
            setAutofillData(parsedData);
            onDataLoaded?.(parsedData);
          }
        } catch (storageError) {
          // localStorage nicht verfügbar (Private Mode, iOS Safari)
          console.warn('localStorage nicht verfügbar:', storageError);
          setAutofillData({});
        }
      } else {
        // Lösche gespeicherte Daten wenn kein Consent mehr vorhanden
        setAutofillData({});
      }
    } catch (error) {
      // Silently handle autofill loading errors
      console.warn('Autofill loading error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [storageKey, enableLocalStorage, onDataLoaded, hasConsent]);

  // Speichere Daten
  const saveAutofillData = useCallback((data: Partial<AutofillData>) => {
    if (!enableLocalStorage || !hasConsent) return;

    try {
      const currentData = { ...autofillData, ...data };
      
      // Entferne leere Werte
      const cleanedData = Object.fromEntries(
        Object.entries(currentData).filter(([_, value]) => value && value.trim() !== '')
      );

      // iOS Safari Private Mode safeguard
      try {
        localStorage.setItem(storageKey, JSON.stringify(cleanedData));
        setAutofillData(cleanedData);
      } catch (storageError) {
        // localStorage write failed (Private Mode, iOS Safari)
        console.warn('localStorage write failed:', storageError);
        // Update state anyway for session-only storage
        setAutofillData(cleanedData);
      }
    } catch (error) {
      // Silently handle autofill saving errors
      console.warn('Autofill saving error:', error);
    }
  }, [autofillData, hasConsent, enableLocalStorage, storageKey]);

  // Daten löschen (z.B. bei widerrufener Einwilligung)
  const clearAutofillData = useCallback(() => {
    if (!enableLocalStorage) return;

    try {
      localStorage.removeItem(storageKey);
      setAutofillData({});
    } catch (error) {
      // Silently handle autofill deletion errors
    }
  }, [enableLocalStorage, storageKey]);

  // Generiere optimale autocomplete-Attribute
  const getAutocompleteProps = useCallback((field: keyof AutofillData) => {
    const autocompleteMap = {
      name: 'name',
      phone: 'tel',
      email: 'email'
    };

    return {
      autoComplete: autocompleteMap[field],
      'data-autofill': field,
      ...(hasConsent && autofillData[field] ? { defaultValue: autofillData[field] } : {})
    };
  }, [hasConsent, autofillData]);

  // Prüfe ob Browser Autofill unterstützt
  const browserSupportsAutofill = useCallback(() => {
    return typeof window !== 'undefined' && 'requestStorageAccess' in document;
  }, []);

  return {
    // Daten
    autofillData,
    hasConsent,
    isLoading,
    
    // Aktionen
    saveAutofillData,
    clearAutofillData,
    getAutocompleteProps,
    
    // Utilities
    browserSupportsAutofill,
    
    // Berechnete Werte
    hasStoredData: Object.keys(autofillData).length > 0,
    canSaveData: enableLocalStorage && hasConsent
  };
}

export type { AutofillData, UseAutofillOptions };
