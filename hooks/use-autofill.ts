import { useState, useEffect, useCallback } from 'react';

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

const AUTOFILL_CONSENT_KEY = 'ki-callflow-autofill-consent';
const DEFAULT_STORAGE_KEY = 'ki-callflow-autofill-data';

export function useAutofill(options: UseAutofillOptions = {}) {
  const {
    storageKey = DEFAULT_STORAGE_KEY,
    enableLocalStorage = true,
    onDataLoaded
  } = options;

  const [autofillData, setAutofillData] = useState<AutofillData>({});
  const [hasConsent, setHasConsent] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  // Lade gespeicherte Daten und Einverständnis beim Mount
  useEffect(() => {
    if (!enableLocalStorage) {
      setIsLoading(false);
      return;
    }

    try {
      // Prüfe Einverständnis
      const consent = localStorage.getItem(AUTOFILL_CONSENT_KEY);
      const hasValidConsent = consent === 'true';
      setHasConsent(hasValidConsent);

      // Lade Daten nur wenn Einverständnis vorhanden
      if (hasValidConsent) {
        const savedData = localStorage.getItem(storageKey);
        if (savedData) {
          const parsedData = JSON.parse(savedData) as AutofillData;
          setAutofillData(parsedData);
          onDataLoaded?.(parsedData);
        }
      }
    } catch (error) {
      console.warn('Fehler beim Laden der Autofill-Daten:', error);
    } finally {
      setIsLoading(false);
    }
  }, [storageKey, enableLocalStorage, onDataLoaded]);

  // Speichere Daten
  const saveAutofillData = useCallback((data: Partial<AutofillData>) => {
    if (!enableLocalStorage || !hasConsent) return;

    try {
      const currentData = { ...autofillData, ...data };
      
      // Entferne leere Werte
      const cleanedData = Object.fromEntries(
        Object.entries(currentData).filter(([_, value]) => value && value.trim() !== '')
      );

      localStorage.setItem(storageKey, JSON.stringify(cleanedData));
      setAutofillData(cleanedData);
    } catch (error) {
      console.warn('Fehler beim Speichern der Autofill-Daten:', error);
    }
  }, [autofillData, hasConsent, enableLocalStorage, storageKey]);

  // Einverständnis erteilen
  const grantConsent = useCallback(() => {
    if (!enableLocalStorage) return;

    try {
      localStorage.setItem(AUTOFILL_CONSENT_KEY, 'true');
      setHasConsent(true);
    } catch (error) {
      console.warn('Fehler beim Speichern des Einverständnisses:', error);
    }
  }, [enableLocalStorage]);

  // Einverständnis widerrufen und Daten löschen
  const revokeConsent = useCallback(() => {
    if (!enableLocalStorage) return;

    try {
      localStorage.removeItem(AUTOFILL_CONSENT_KEY);
      localStorage.removeItem(storageKey);
      setHasConsent(false);
      setAutofillData({});
    } catch (error) {
      console.warn('Fehler beim Löschen der Autofill-Daten:', error);
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
    grantConsent,
    revokeConsent,
    getAutocompleteProps,
    
    // Utilities
    browserSupportsAutofill,
    
    // Berechnete Werte
    hasStoredData: Object.keys(autofillData).length > 0,
    canSaveData: enableLocalStorage && hasConsent
  };
}

export type { AutofillData, UseAutofillOptions };
