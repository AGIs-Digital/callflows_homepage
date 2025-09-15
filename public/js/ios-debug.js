// iOS Safari Debug Script für callflows.de
(function() {
  'use strict';
  
  // Prüfe ob iOS Safari
  const isIOSSafari = /iPad|iPhone|iPod/.test(navigator.userAgent) && /Safari/.test(navigator.userAgent);
  
  if (!isIOSSafari) return;
  
  // iOS Version Detection
  const iOSVersion = navigator.userAgent.match(/OS (\d+)_(\d+)_?(\d+)?/);
  const version = iOSVersion ? `${iOSVersion[1]}.${iOSVersion[2]}` : 'unknown';
  
  console.log(`🍎 iOS Safari ${version} detected`);
  
  // Feature Detection mit Logging
  const features = {
    requestIdleCallback: 'requestIdleCallback' in window,
    performanceObserver: 'PerformanceObserver' in window,
    intersectionObserver: 'IntersectionObserver' in window,
    resizeObserver: 'ResizeObserver' in window,
    webGL: !!window.WebGLRenderingContext,
    localStorage: (() => {
      try {
        window.localStorage.setItem('test', 'test');
        window.localStorage.removeItem('test');
        return true;
      } catch(e) {
        return false;
      }
    })(),
    privateMode: (() => {
      try {
        // Private Mode Detection für iOS Safari
        var storage = window.sessionStorage;
        storage.setItem('test', '1');
        storage.removeItem('test');
        return false; // Normal mode
      } catch(e) {
        return true; // Private mode
      }
    })(),
    fetch: 'fetch' in window,
    promises: 'Promise' in window,
    es6Classes: (() => {
      try {
        eval('class Test {}');
        return true;
      } catch(e) {
        return false;
      }
    })()
  };
  
  console.table(features);
  
  // Error Tracking für fehlende Features
  const missingFeatures = Object.entries(features)
    .filter(([, supported]) => !supported)
    .map(([feature]) => feature);
    
  if (missingFeatures.length > 0 || features.privateMode) {
    console.warn('⚠️ iOS Safari Kompatibilitätsprobleme:', {
      missingFeatures,
      privateMode: features.privateMode,
      version: version
    });
    
    // Send to Analytics wenn verfügbar
    if (window.gtag) {
      window.gtag('event', 'ios_compatibility_issue', {
        ios_version: version,
        missing_features: missingFeatures.join(','),
        private_mode: features.privateMode,
        user_agent: navigator.userAgent.substring(0, 100)
      });
    }
  }
  
  // Spezielle Private Mode Warnung
  if (features.privateMode) {
    console.warn('🔒 iOS Safari Private Mode erkannt - localStorage/sessionStorage nicht verfügbar');
  }
  
  // Enhanced Error Handling für iOS
  const originalError = window.onerror;
  window.onerror = function(msg, url, lineNo, columnNo, error) {
    console.error('🍎 iOS Safari Error:', {
      message: msg,
      url: url,
      line: lineNo,
      column: columnNo,
      error: error,
      version: version,
      timestamp: new Date().toISOString()
    });
    
    // Analytics Event
    if (window.gtag) {
      window.gtag('event', 'ios_safari_error', {
        error_message: String(msg).substring(0, 100),
        ios_version: version,
        url: String(url).substring(0, 100)
      });
    }
    
    // Call original handler
    if (originalError) {
      return originalError.apply(this, arguments);
    }
    return false;
  };
  
  // Promise Rejection Handler
  window.addEventListener('unhandledrejection', function(event) {
    console.error('🍎 iOS Safari Promise Rejection:', {
      reason: event.reason,
      version: version,
      timestamp: new Date().toISOString()
    });
    
    if (window.gtag) {
      window.gtag('event', 'ios_safari_promise_rejection', {
        reason: String(event.reason).substring(0, 100),
        ios_version: version
      });
    }
  });
  
})();
