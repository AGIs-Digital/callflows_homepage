/**
 * Silent Logger für Production - Ersetzt alle console.* Aufrufe
 * Sammelt wichtige Fehler für Analytics, zeigt aber nichts in der Console
 */

interface LogEntry {
  timestamp: number;
  level: 'log' | 'info' | 'warn' | 'error' | 'debug';
  message: string;
  data?: any;
  stack?: string;
}

class SilentLogger {
  private logs: LogEntry[] = [];
  private maxLogs = 50; // Nur die letzten 50 Logs behalten
  private isProduction: boolean;

  constructor() {
    this.isProduction = typeof window !== 'undefined' && !!window.__PRODUCTION_MODE__;
  }

  private addLog(level: LogEntry['level'], message: string, data?: any) {
    const entry: LogEntry = {
      timestamp: Date.now(),
      level,
      message,
      data,
      stack: level === 'error' ? new Error().stack : undefined
    };

    this.logs.push(entry);
    
    // Logs begrenzen
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }

    // In Development: Normal loggen
    if (!this.isProduction && typeof window !== 'undefined' && window.__originalConsole) {
      const original = window.__originalConsole;
      original[level]?.(message, data);
    }

    // Critical Errors an Analytics senden
    if (level === 'error' && this.isProduction && typeof window !== 'undefined') {
      this.sendToAnalytics(entry);
    }
  }

  private sendToAnalytics(entry: LogEntry) {
    try {
      // Google Analytics Event
      if (window.gtag) {
        window.gtag('event', 'client_error', {
          error_message: entry.message,
          error_level: entry.level,
          custom_map: {
            timestamp: entry.timestamp,
            url: window.location.href
          }
        });
      }

      // Hier könntest du auch andere Error-Tracking-Services hinzufügen
      // z.B. Sentry, LogRocket, etc.
    } catch (e) {
      // Silent fail - niemals Fehler beim Error-Logging zeigen
    }
  }

  log(message: string, data?: any) {
    this.addLog('log', message, data);
  }

  info(message: string, data?: any) {
    this.addLog('info', message, data);
  }

  warn(message: string, data?: any) {
    this.addLog('warn', message, data);
  }

  error(message: string | Error, data?: any) {
    const errorMessage = message instanceof Error ? message.message : message;
    this.addLog('error', errorMessage, data);
  }

  debug(message: string, data?: any) {
    this.addLog('debug', message, data);
  }

  // Für Development/Debugging: Logs abrufen
  getLogs(): LogEntry[] {
    return [...this.logs];
  }

  // Für Development: Original Console wiederherstellen
  restoreConsole() {
    if (typeof window !== 'undefined' && window.__originalConsole) {
      Object.assign(console, window.__originalConsole);
    }
  }
}

// Singleton Instance
export const silentLogger = new SilentLogger();

// TypeScript Deklarationen für globale Variablen
declare global {
  interface Window {
    __PRODUCTION_MODE__?: boolean;
    __originalConsole?: typeof console;
    gtag?: Function;
  }
}

// Helper für bestehenden Code - Drop-in Replacement
export const safeConsole = {
  log: silentLogger.log.bind(silentLogger),
  info: silentLogger.info.bind(silentLogger),
  warn: silentLogger.warn.bind(silentLogger),
  error: silentLogger.error.bind(silentLogger),
  debug: silentLogger.debug.bind(silentLogger),
};
