import { useState, useCallback } from 'react';
import { CallData, CallStatus, RateLimitData, PhoneValidationResult } from './widget-call.types';
import { useTurnstile } from '@/hooks/use-turnstile';

const RATE_LIMIT_KEY = 'widget_call_rate_limit';
const RATE_LIMIT_MAX_CALLS = 3;
const RATE_LIMIT_WINDOW = 10 * 60 * 1000; // 10 Minuten
const WIDGET_OPEN_KEY = 'widget_open_timestamp';

// Simple Browser-Fingerprinting
const getBrowserFingerprint = (): string => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return 'unknown';
  
  ctx.textBaseline = 'top';
  ctx.font = '14px Arial';
  ctx.fillText('🔒', 2, 2);
  
  const dataUrl = canvas.toDataURL();
  let hash = 0;
  for (let i = 0; i < dataUrl.length; i++) {
    hash = ((hash << 5) - hash) + dataUrl.charCodeAt(i);
    hash = hash & hash;
  }
  
  const fingerprint = `${hash}-${navigator.userAgent.length}-${screen.width}x${screen.height}-${new Date().getTimezoneOffset()}`;
  return fingerprint;
};

interface UseWidgetCallOptions {
  enableTurnstile?: boolean;
  turnstileSiteKey?: string;
}

export function useWidgetCall(options: UseWidgetCallOptions = {}) {
  const [callStatus, setCallStatus] = useState<CallStatus>('idle');
  const [isLoading, setIsLoading] = useState(false);
  const [formOpenTime] = useState<number>(() => {
    // Speichere Zeitpunkt, wann Widget geöffnet wurde
    const timestamp = Date.now();
    sessionStorage.setItem(WIDGET_OPEN_KEY, timestamp.toString());
    return timestamp;
  });

  // Turnstile (optional)
  const turnstile = useTurnstile({
    siteKey: options.turnstileSiteKey || process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '',
    action: 'widget-call',
    theme: 'auto',
    size: 'normal'
  });

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

    // Zeitstempel-Check: Formular darf nicht in < 2 Sekunden ausgefüllt werden
    const formOpenTimestamp = sessionStorage.getItem(WIDGET_OPEN_KEY);
    if (formOpenTimestamp) {
      const timeSinceOpen = Date.now() - parseInt(formOpenTimestamp, 10);
      if (timeSinceOpen < 2000) {
        console.warn('⚠️ Bot detected: Form filled too quickly');
        throw new Error('BOT_DETECTED_SPEED');
      }
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
      // Turnstile-Challenge (falls aktiviert)
      let turnstileToken: string | null = null;
      if (options.enableTurnstile && turnstile.isReady) {
        try {
          turnstileToken = await turnstile.execute();
          if (!turnstileToken) {
            throw new Error('TURNSTILE_FAILED');
          }
        } catch (error) {
          console.error('Turnstile error:', error);
          throw new Error('TURNSTILE_FAILED');
        }
      }

      // Browser-Fingerprint generieren
      const fingerprint = getBrowserFingerprint();
      
      // Payload für n8n Webhook
      const payload = {
        customer_name: data.customer_name.trim(),
        customer_phonenumber: phoneValidation.normalized,
        // Metadaten für n8n Spam-Protection
        metadata: {
          fingerprint,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          language: navigator.language,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          referrer: document.referrer || 'direct',
          screenResolution: `${screen.width}x${screen.height}`,
          turnstileToken: turnstileToken || undefined
        }
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

      // JSON-Payload statt FormData (bessere Metadaten-Übertragung)
      const response = await fetch(webhookUrl, {
        method: 'POST',
        mode: 'cors', // CORS aktivieren für bessere Header-Übertragung
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'callflows-widget/2.0',
          'X-Webhook-Source': 'widget-call',
          'X-Request-Timestamp': payload.metadata.timestamp,
          'X-Fingerprint': payload.metadata.fingerprint
        },
        body: JSON.stringify(payload),
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
    checkRateLimit,
    turnstile: options.enableTurnstile ? turnstile : undefined
  };
}
