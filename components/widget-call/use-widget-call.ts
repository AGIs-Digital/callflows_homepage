import { useState, useCallback } from 'react';
import { CallData, CallStatus, RateLimitData, PhoneValidationResult } from './widget-call.types';

const RATE_LIMIT_KEY = 'widget_call_rate_limit';
const RATE_LIMIT_MAX_CALLS = 3;
const RATE_LIMIT_WINDOW = 10 * 60 * 1000; // 10 Minuten

export function useWidgetCall() {
  const [callStatus, setCallStatus] = useState<CallStatus>('idle');
  const [isLoading, setIsLoading] = useState(false);

  // Rate Limiting Logic
  const checkRateLimit = useCallback((): boolean => {
    try {
      const stored = localStorage.getItem(RATE_LIMIT_KEY);
      if (!stored) return true;

      const data: RateLimitData = JSON.parse(stored);
      const now = Date.now();

      // Reset wenn Zeitfenster abgelaufen
      if (now > data.resetTime) {
        localStorage.removeItem(RATE_LIMIT_KEY);
        return true;
      }

      // Filtere alte Calls (älter als Zeitfenster)
      const recentCalls = data.calls.filter(timestamp => now - timestamp < RATE_LIMIT_WINDOW);
      
      if (recentCalls.length >= RATE_LIMIT_MAX_CALLS) {
        return false;
      }

      return true;
    } catch {
      return true; // Bei Fehlern erlauben
    }
  }, []);

  const updateRateLimit = useCallback(() => {
    try {
      const stored = localStorage.getItem(RATE_LIMIT_KEY);
      const now = Date.now();
      
      let data: RateLimitData;
      if (stored) {
        data = JSON.parse(stored);
        // Filtere alte Calls
        data.calls = data.calls.filter(timestamp => now - timestamp < RATE_LIMIT_WINDOW);
      } else {
        data = { calls: [], resetTime: now + RATE_LIMIT_WINDOW };
      }

      data.calls.push(now);
      localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(data));
    } catch {
      // Ignoriere Fehler beim Speichern
    }
  }, []);

  // Internationale Telefonnummer-Validierung
  const validatePhoneNumber = useCallback((phone: string): PhoneValidationResult => {
    // Entferne alle Leerzeichen, Bindestriche, Klammern
    const cleaned = phone.replace(/[\s\-\(\)]/g, '');
    
    // Internationale Regex für verschiedene Länder
    const patterns = [
      // Deutschland: +49 oder 0
      { pattern: /^(\+49|0)(\d{10,11})$/, countryCode: '+49' },
      // Österreich: +43
      { pattern: /^(\+43)(\d{10,11})$/, countryCode: '+43' },
      // Schweiz: +41
      { pattern: /^(\+41)(\d{9,10})$/, countryCode: '+41' },
      // USA/Kanada: +1
      { pattern: /^(\+1)(\d{10})$/, countryCode: '+1' },
      // UK: +44
      { pattern: /^(\+44)(\d{10,11})$/, countryCode: '+44' },
      // Frankreich: +33
      { pattern: /^(\+33)(\d{9})$/, countryCode: '+33' },
      // Italien: +39
      { pattern: /^(\+39)(\d{9,10})$/, countryCode: '+39' },
      // Spanien: +34
      { pattern: /^(\+34)(\d{9})$/, countryCode: '+34' },
      // Niederlande: +31
      { pattern: /^(\+31)(\d{9})$/, countryCode: '+31' },
      // Belgien: +32
      { pattern: /^(\+32)(\d{9})$/, countryCode: '+32' },
      // Generische internationale Nummer (7-15 Ziffern nach +)
      { pattern: /^(\+\d{1,3})(\d{7,14})$/, countryCode: 'international' }
    ];

    for (const { pattern, countryCode } of patterns) {
      const match = cleaned.match(pattern);
      if (match) {
        let normalized = cleaned;
        
        // Deutsche Nummern normalisieren (0 -> +49)
        if (countryCode === '+49' && cleaned.startsWith('0')) {
          normalized = '+49' + cleaned.slice(1);
        }
        
        return {
          isValid: true,
          normalized,
          countryCode
        };
      }
    }

    return {
      isValid: false,
      normalized: cleaned
    };
  }, []);

  // Name-Validierung
  const validateName = useCallback((name: string): boolean => {
    const trimmed = name.trim();
    return trimmed.length >= 2 && /^[a-zA-ZäöüÄÖÜß\s\-']+$/.test(trimmed);
  }, []);

  // Hauptfunktion: Call starten
  const startCall = useCallback(async (data: CallData): Promise<void> => {
    // Rate Limit prüfen
    if (!checkRateLimit()) {
      throw new Error('RATE_LIMIT_EXCEEDED');
    }

    // Validierung
    const phoneValidation = validatePhoneNumber(data.customer_phonenumber);
    if (!phoneValidation.isValid) {
      throw new Error('INVALID_PHONE');
    }

    if (!validateName(data.customer_name)) {
      throw new Error('INVALID_NAME');
    }

    setIsLoading(true);
    setCallStatus('calling');

    try {
      // Payload für n8n Webhook
      const payload = {
        customer_name: data.customer_name.trim(),
        customer_phonenumber: phoneValidation.normalized
      };

      const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;
      const isDevelopment = process.env.NODE_ENV === 'development';
      
      if (!webhookUrl) {
        if (isDevelopment) {
          // Development Mock: Simuliere erfolgreichen Webhook Call
          console.log('🔥 MOCK CALL TRIGGERED (DEV MODE):', payload);
          
          // Simuliere API Delay
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          // Rate Limit aktualisieren
          updateRateLimit();
          
          setCallStatus('success');
          
          // Auto-Reset nach 15 Sekunden
          setTimeout(() => {
            setCallStatus('idle');
          }, 15000);
          
          return; // Mock erfolgreich, beende Funktion
        } else {
          throw new Error('WEBHOOK_URL_NOT_CONFIGURED');
        }
      }

      // Honeypot-Feld prüfen (falls vorhanden)
      const honeypotField = document.querySelector('[name="website"]') as HTMLInputElement;
      if (honeypotField && honeypotField.value) {
        throw new Error('BOT_DETECTED');
      }

      // FormData verwenden (wie das alte Widget)
      const formData = new FormData();
      formData.append('phone', payload.customer_phonenumber);
      formData.append('name', payload.customer_name);

      const response = await fetch(webhookUrl, {
        method: 'POST',
        mode: 'no-cors', // Umgeht CORS-Probleme
        headers: {
          'User-Agent': 'callflows-widget/2.0',
          'X-Webhook-Source': 'widget-call'
          // KEIN Content-Type Header - FormData setzt das automatisch
        },
        body: formData,
      });

      if (response.ok || response.status === 0) {
        // Status 0 bei no-cors Mode ist normal und bedeutet Request wurde gesendet
        // Rate Limit aktualisieren
        updateRateLimit();
        
        setCallStatus('success');
        
        // Auto-Reset nach 15 Sekunden
        setTimeout(() => {
          setCallStatus('idle');
        }, 15000);
      } else {
        throw new Error(`WEBHOOK_ERROR_${response.status}`);
      }

    } catch (error) {
      console.error('Widget Call Error:', error);
      setCallStatus('error');
      
      // Auto-Reset nach 8 Sekunden
      setTimeout(() => {
        setCallStatus('idle');
      }, 8000);
      
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [checkRateLimit, validatePhoneNumber, validateName, updateRateLimit]);

  return {
    callStatus,
    isLoading,
    startCall,
    validatePhoneNumber,
    validateName,
    checkRateLimit
  };
}
