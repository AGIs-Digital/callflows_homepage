'use client';

import { useEffect } from 'react';

export function MobilePerformanceMonitor() {
  useEffect(() => {
    // Mobile Performance Monitoring
    if (typeof window !== 'undefined') {
      // Critical Web Vitals für mobile Optimierung
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'navigation') {
            const navEntry = entry as PerformanceNavigationTiming;
            
            // Messe mobile-spezifische Metriken
            const ttfb = navEntry.responseStart - navEntry.fetchStart;
            const fcp = performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0;
            const lcp = performance.getEntriesByName('largest-contentful-paint')[0]?.startTime || 0;
            
            // Mobile Performance Thresholds
            const isMobile = window.innerWidth <= 768;
            
            if (isMobile) {
              // Mobile-optimierte Thresholds
              // Mobile performance metrics - silently tracked
              if (ttfb > 800 || fcp > 1800 || lcp > 2500) {
                // Send to analytics in production instead of console
                if (window.gtag) {
                  window.gtag('event', 'performance_issue', {
                    ttfb: ttfb,
                    fcp: fcp,
                    lcp: lcp,
                    device: 'mobile'
                  });
                }
              }
            }
          }
        }
      });
      
      // Beobachte Navigation und Paint-Events
      try {
        observer.observe({ entryTypes: ['navigation', 'paint', 'largest-contentful-paint'] });
      } catch (e) {
        // Fallback für ältere Browser
        // Performance Observer nicht unterstützt - silent fallback
      }
      
      // Cleanup
      return () => observer.disconnect();
    }
  }, []);

  return null; // Kein UI-Element
}

// Mobile-spezifische Resource Hints
export function MobileResourceHints() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isMobile = window.innerWidth <= 768;
      
      if (isMobile) {
        // Preload kritische mobile Ressourcen
        const criticalImages = [
          '/images/callflows_brand_no_claim.webp'
        ];
        
        criticalImages.forEach(src => {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.as = 'image';
          link.href = src;
          document.head.appendChild(link);
        });
        
        // Prefetch next-page Ressourcen für mobile Navigation
        const nextPageResources = ['/pricing', '/kontakt'];
        
        requestIdleCallback(() => {
          nextPageResources.forEach(href => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = href;
            document.head.appendChild(link);
          });
        });
      }
    }
  }, []);

  return null;
}
