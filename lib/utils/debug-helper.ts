/**
 * Debug Helper für Production-Debugging
 * Nur für temporäre Debugging-Zwecke in Production verwenden
 */

export class DebugHelper {
  private static instance: DebugHelper;
  
  static getInstance(): DebugHelper {
    if (!DebugHelper.instance) {
      DebugHelper.instance = new DebugHelper();
    }
    return DebugHelper.instance;
  }

  // Temporäre Console-Aktivierung für Debugging
  enableTemporaryLogging(duration: number = 30000) {
    if (typeof window === 'undefined') return;
    
    const originalConsole = window.__originalConsole;
    if (!originalConsole) {
      console.log('Original Console nicht verfügbar');
      return;
    }

    // Wiederherstellung für kurze Zeit
    Object.assign(console, originalConsole);
    console.log('🔧 TEMPORARY DEBUGGING ENABLED für', duration / 1000, 'Sekunden');
    
    // Automatisch wieder deaktivieren
    setTimeout(() => {
      this.disableLogging();
      console.log('🔧 TEMPORARY DEBUGGING DISABLED');
    }, duration);
  }

  // Console wieder deaktivieren
  disableLogging() {
    if (typeof window === 'undefined') return;
    
    const noop = function() {};
    console.log = noop;
    console.info = noop;
    console.warn = noop;
    console.error = noop;
    console.debug = noop;
    console.trace = noop;
  }

  // Logs aus Silent Logger anzeigen
  showSilentLogs() {
    const silentLogger = require('./silent-logger').silentLogger;
    const logs = silentLogger.getLogs();
    
    if (window.__originalConsole) {
      window.__originalConsole.table(logs);
    }
    
    return logs;
  }

  // Performance-Daten anzeigen
  showPerformanceData() {
    if (typeof window === 'undefined') return;
    
    const perfData = {
      navigation: performance.getEntriesByType('navigation'),
      paint: performance.getEntriesByType('paint'),
      resource: performance.getEntriesByType('resource').slice(-10) // Nur die letzten 10
    };

    if (window.__originalConsole) {
      window.__originalConsole.group('Performance Data');
      window.__originalConsole.table(perfData.navigation);
      window.__originalConsole.table(perfData.paint);
      window.__originalConsole.table(perfData.resource);
      window.__originalConsole.groupEnd();
    }

    return perfData;
  }
}

// Global verfügbar machen für Browser-Console
if (typeof window !== 'undefined') {
  (window as any).debugHelper = DebugHelper.getInstance();
}

export const debugHelper = DebugHelper.getInstance();

// Shortcuts für schnelles Debugging
export const enableDebug = (duration?: number) => debugHelper.enableTemporaryLogging(duration);
export const showLogs = () => debugHelper.showSilentLogs();
export const showPerf = () => debugHelper.showPerformanceData();
