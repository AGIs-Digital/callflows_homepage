/**
 * Production Logger - Deaktiviert Console-Logs in Production
 * Für bessere Performance und Sicherheit
 */

declare global {
  interface Window {
    __PRODUCTION_LOGGER_INITIALIZED__?: boolean;
  }
}

interface LogLevel {
  log: boolean;
  info: boolean;
  warn: boolean;
  error: boolean;
  debug: boolean;
  trace: boolean;
}

const PRODUCTION_LOG_LEVELS: LogLevel = {
  log: false,      // Vollständig deaktiviert
  info: false,     // Vollständig deaktiviert  
  warn: false,     // Deaktiviert (nur kritische Warnungen)
  error: true,     // Aktiviert für wichtige Fehler
  debug: false,    // Vollständig deaktiviert
  trace: false     // Vollständig deaktiviert
};

const DEVELOPMENT_LOG_LEVELS: LogLevel = {
  log: true,
  info: true,
  warn: true,
  error: true,
  debug: true,
  trace: true
};

export function initializeProductionLogger() {
  if (typeof window === 'undefined') return;
  if (window.__PRODUCTION_LOGGER_INITIALIZED__) return;

  const isProduction = process.env.NODE_ENV === 'production' || 
                       process.env.NEXT_PUBLIC_ENVIRONMENT === 'production';

  if (!isProduction) {
    // In Development: Alle Logs aktiviert mit verbessertem Styling
    console.log(
      '%c🚀 callflows - Development Mode',
      'background: #4CAF50; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold;'
    );
    return;
  }

  // Production: Console-Logs überschreiben
  const originalConsole = {
    log: console.log,
    info: console.info,
    warn: console.warn,
    error: console.error,
    debug: console.debug,
    trace: console.trace
  };

  // Utility für sichere Error-Logs
  const safeErrorLog = (method: keyof typeof originalConsole, ...args: any[]) => {
    try {
      // Nur kritische Informationen loggen, keine sensiblen Daten
      const sanitizedArgs = args.map(arg => {
        if (typeof arg === 'object' && arg !== null) {
          // Entferne potentiell sensible Daten
          const sanitized = { ...arg };
          delete sanitized.password;
          delete sanitized.token;
          delete sanitized.apiKey;
          delete sanitized.credentials;
          return sanitized;
        }
        return arg;
      });

      originalConsole[method]('[callflows]', ...sanitizedArgs);
    } catch (e) {
      // Fallback: Komplett stille Behandlung
    }
  };

  // Console-Methoden überschreiben
  console.log = PRODUCTION_LOG_LEVELS.log ? 
    originalConsole.log : 
    () => {};

  console.info = PRODUCTION_LOG_LEVELS.info ? 
    originalConsole.info : 
    () => {};

  console.warn = PRODUCTION_LOG_LEVELS.warn ? 
    (...args: any[]) => safeErrorLog('warn', ...args) : 
    () => {};

  console.error = PRODUCTION_LOG_LEVELS.error ? 
    (...args: any[]) => safeErrorLog('error', ...args) : 
    () => {};

  console.debug = PRODUCTION_LOG_LEVELS.debug ? 
    originalConsole.debug : 
    () => {};

  console.trace = PRODUCTION_LOG_LEVELS.trace ? 
    originalConsole.trace : 
    () => {};

  // Performance-Logs für wichtige Metriken beibehalten
  (window as any).__originalConsole = originalConsole;

  window.__PRODUCTION_LOGGER_INITIALIZED__ = true;
}

/**
 * Für wichtige Performance-Metriken die auch in Production sichtbar sein sollen
 */
export function logPerformanceMetric(metric: string, value: number, unit = 'ms') {
  if (typeof window === 'undefined') return;
  
  const isProduction = process.env.NODE_ENV === 'production';
  
  if (isProduction) {
    // In Production: Nur an Analytics senden, nicht in Console
    if ((window as any).gtag) {
      (window as any).gtag('event', 'performance_metric', {
        custom_map: { metric, value, unit },
        non_interaction: true
      });
    }
  } else {
    // In Development: Console + Analytics
    console.log(`📊 Performance: ${metric} = ${value}${unit}`);
  }
}

/**
 * Für kritische Fehler die immer geloggt werden sollen
 */
export function logCriticalError(error: Error | string, context?: string) {
  const isProduction = process.env.NODE_ENV === 'production';
  const originalConsole = (window as any)?.__originalConsole;

  const errorMessage = typeof error === 'string' ? error : error.message;
  const logData = {
    message: errorMessage,
    context: context || 'unknown',
    timestamp: new Date().toISOString(),
    userAgent: navigator?.userAgent?.substring(0, 100) || 'unknown'
  };

  if (isProduction && originalConsole) {
    // In Production: Verwende Original-Console für kritische Fehler
    originalConsole.error('[CRITICAL]', logData);
  } else {
    // In Development: Normale Behandlung
    console.error('[CRITICAL]', logData);
  }

  // An Error-Tracking Service senden (falls verfügbar)
  if ((window as any).gtag) {
    (window as any).gtag('event', 'exception', {
      description: errorMessage,
      fatal: false,
      custom_map: logData
    });
  }
}
