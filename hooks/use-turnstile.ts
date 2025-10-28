import { useState, useEffect, useCallback } from 'react';

interface TurnstileOptions {
  siteKey: string;
  action?: string;
  theme?: 'light' | 'dark' | 'auto';
  size?: 'normal' | 'compact';
  retry?: 'auto' | 'never';
  retryInterval?: number;
  refreshExpired?: 'auto' | 'manual' | 'never';
}

interface UseTurnstileReturn {
  token: string | null;
  isLoading: boolean;
  isReady: boolean;
  error: string | null;
  execute: () => Promise<string | null>;
  reset: () => void;
  widgetId: string | null;
}

/**
 * Hook für Cloudflare Turnstile (reCAPTCHA-Alternative)
 * 
 * Setup:
 * 1. Turnstile aktivieren: https://dash.cloudflare.com/?to=/:account/turnstile
 * 2. Site-Key + Secret-Key holen
 * 3. Domain whitelist hinzufügen (callflows.de)
 * 
 * @param options - Turnstile-Konfiguration
 * @returns Turnstile-State & Methoden
 */
export function useTurnstile(options: TurnstileOptions): UseTurnstileReturn {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [widgetId, setWidgetId] = useState<string | null>(null);

  // Turnstile-Script laden
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check ob Script bereits geladen
    if (window.turnstile) {
      setIsReady(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    script.async = true;
    script.defer = true;

    script.onload = () => {
      setIsReady(true);
    };

    script.onerror = () => {
      setError('Failed to load Turnstile script');
      setIsReady(false);
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup: Script entfernen
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  // Execute Turnstile Challenge (explizit)
  const execute = useCallback(async (): Promise<string | null> => {
    if (!isReady) {
      setError('Turnstile not ready');
      return null;
    }

    if (!window.turnstile) {
      setError('Turnstile script not loaded');
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      return new Promise((resolve, reject) => {
        const container = document.createElement('div');
        container.style.display = 'none';
        document.body.appendChild(container);

        const id = window.turnstile.render(container, {
          sitekey: options.siteKey,
          action: options.action || 'widget-call',
          theme: options.theme || 'auto',
          size: options.size || 'normal',
          retry: options.retry || 'auto',
          'retry-interval': options.retryInterval || 8000,
          'refresh-expired': options.refreshExpired || 'auto',
          callback: (responseToken: string) => {
            setToken(responseToken);
            setIsLoading(false);
            setWidgetId(id);
            resolve(responseToken);
            
            // Cleanup
            if (container.parentNode) {
              container.parentNode.removeChild(container);
            }
          },
          'error-callback': (errorCode: string) => {
            const errorMessage = getTurnstileError(errorCode);
            setError(errorMessage);
            setIsLoading(false);
            reject(new Error(errorMessage));
            
            // Cleanup
            if (container.parentNode) {
              container.parentNode.removeChild(container);
            }
          },
          'timeout-callback': () => {
            const errorMessage = 'Turnstile challenge timed out';
            setError(errorMessage);
            setIsLoading(false);
            reject(new Error(errorMessage));
            
            // Cleanup
            if (container.parentNode) {
              container.parentNode.removeChild(container);
            }
          }
        });
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      setIsLoading(false);
      return null;
    }
  }, [isReady, options]);

  // Reset Turnstile
  const reset = useCallback(() => {
    if (widgetId && window.turnstile) {
      window.turnstile.reset(widgetId);
      setToken(null);
      setError(null);
    }
  }, [widgetId]);

  return {
    token,
    isLoading,
    isReady,
    error,
    execute,
    reset,
    widgetId
  };
}

/**
 * Menschenlesbare Fehlermeldungen für Turnstile-Error-Codes
 */
function getTurnstileError(code: string): string {
  const errorMap: Record<string, string> = {
    'network-error': 'Netzwerkfehler. Bitte Internetverbindung prüfen.',
    'internal-error': 'Interner Fehler. Bitte erneut versuchen.',
    'invalid-input-response': 'Ungültige Challenge-Antwort.',
    'invalid-widget-configuration': 'Ungültige Turnstile-Konfiguration.',
    'invalid-parsed-secret': 'Ungültiger Secret-Key (Server-seitig).',
    'missing-input-response': 'Keine Challenge-Antwort erhalten.',
    'missing-input-secret': 'Secret-Key fehlt (Server-seitig).',
    'bad-request': 'Ungültige Anfrage an Turnstile-Server.',
    'timeout-or-duplicate': 'Token abgelaufen oder bereits verwendet.',
    'interactive-challenge-required': 'Interaktive Challenge erforderlich.',
    'unsupported-browser': 'Browser wird nicht unterstützt.'
  };

  return errorMap[code] || `Unbekannter Turnstile-Fehler: ${code}`;
}

/**
 * TypeScript-Deklaration für Cloudflare Turnstile
 */
declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement | string,
        options: {
          sitekey: string;
          action?: string;
          theme?: 'light' | 'dark' | 'auto';
          size?: 'normal' | 'compact';
          retry?: 'auto' | 'never';
          'retry-interval'?: number;
          'refresh-expired'?: 'auto' | 'manual' | 'never';
          callback?: (token: string) => void;
          'error-callback'?: (errorCode: string) => void;
          'timeout-callback'?: () => void;
        }
      ) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
      getResponse: (widgetId: string) => string;
    };
  }
}

