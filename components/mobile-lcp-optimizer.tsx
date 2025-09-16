"use client";

import { useEffect } from "react";

/**
 * Mobile LCP Optimizer - Kritische Performance-Optimierungen für mobile Geräte
 * Optimiert speziell für Mobile First und Largest Contentful Paint
 */
export function MobileLCPOptimizer() {
  useEffect(() => {
    // Nur auf Client-Seite ausführen
    if (typeof window === 'undefined') return;

    const optimizeMobilePerformance = () => {
      try {
        // 1. Critical Resource Hints für mobile Verbindungen
        const criticalResources = [
          '/fonts/Satoshi-Bold.woff2',
          '/fonts/Satoshi-Regular.woff2',
          '/images/callflows_brand_no_claim.webp'
        ];

        criticalResources.forEach(resource => {
          const link = document.createElement('link');
          link.rel = 'prefetch';
          link.href = resource;
          link.setAttribute('fetchpriority', 'high');
          document.head.appendChild(link);
        });

        // 2. Viewport Meta-Tag Optimierung für mobile Performance
        const viewportMeta = document.querySelector('meta[name="viewport"]');
        if (viewportMeta) {
          viewportMeta.setAttribute('content', 
            'width=device-width, initial-scale=1.0, viewport-fit=cover, user-scalable=no'
          );
        }

        // 3. Passive Event Listeners für bessere Scroll-Performance
        const handlePassiveScroll = () => {
          // Throttle für bessere Performance
          requestAnimationFrame(() => {
            // Intersection Observer für lazy loading ist bereits implementiert
          });
        };

        document.addEventListener('scroll', handlePassiveScroll, { passive: true });
        document.addEventListener('touchstart', () => {}, { passive: true });
        document.addEventListener('touchmove', () => {}, { passive: true });

        // 4. Mobile-spezifische Performance-Hints
        if ('connection' in navigator) {
          const connection = (navigator as any).connection;
          if (connection && connection.effectiveType) {
            // Bei langsamer Verbindung aggressive Optimierungen
            if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
              document.documentElement.style.setProperty('--animation-duration', '0s');
              document.documentElement.classList.add('reduce-motion');
            }
          }
        }

        // 5. Critical CSS Enforcement für mobile
        const style = document.createElement('style');
        style.innerHTML = `
          /* LCP-optimierte kritische Styles für mobile */
          @media (max-width: 768px) {
            /* Text-Rendering Optimierung */
            * {
              text-rendering: optimizeSpeed;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }
            
            /* Reduziere Layout Shifts */
            img, video {
              height: auto;
              max-width: 100%;
            }
            
            /* Optimiere Animationen für mobile */
            .reduce-motion * {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
            
            /* Critical LCP Element Priorität */
            h1 {
              contain: layout style;
              will-change: auto;
            }
            
            /* Button Performance */
            button, [role="button"] {
              touch-action: manipulation;
              -webkit-tap-highlight-color: transparent;
            }
          }
        `;
        document.head.appendChild(style);

        // 6. Web Vitals Optimierung
        if ('requestIdleCallback' in window) {
          requestIdleCallback(() => {
            // Preload kritischer Next.js chunks
            const nextScripts = document.querySelectorAll('script[src*="_next"]');
            nextScripts.forEach(script => {
              const link = document.createElement('link');
              link.rel = 'prefetch';
              link.href = script.getAttribute('src') || '';
              document.head.appendChild(link);
            });
          });
        }

        // 7. Memory Management für mobile Geräte
        const cleanupTimer = setTimeout(() => {
          // Cleanup von nicht-kritischen Event Listeners
          document.removeEventListener('scroll', handlePassiveScroll);
        }, 10000); // Nach 10 Sekunden

        return () => {
          clearTimeout(cleanupTimer);
          document.removeEventListener('scroll', handlePassiveScroll);
        };

      } catch (error) {
        // Silent fail - Performance-Optimierungen sollen nicht den App-Start blockieren
        if (process.env.NODE_ENV === 'development') {
          console.warn('Mobile LCP Optimizer Error:', error);
        }
      }
    };

    // Starte Optimierungen nach DOM-Ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', optimizeMobilePerformance);
    } else {
      optimizeMobilePerformance();
    }

  }, []);

  // Keine Render-Ausgabe - reine Performance-Optimierung
  return null;
}

/**
 * Intersection Observer Hook für progressive Komponenten-Ladung
 */
export function useProgressiveLoad(threshold = 0.1) {
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { 
        threshold,
        rootMargin: '50px 0px' // Lädt Komponenten 50px vor dem Sichtbereich
      }
    );

    // Beobachte alle lazy-loadbaren Elemente
    const lazyElements = document.querySelectorAll('[data-lazy]');
    lazyElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [threshold]);
}
