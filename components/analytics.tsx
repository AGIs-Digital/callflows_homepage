"use client";

import Script from 'next/script';
import { useEffect } from 'react';

// Google Analytics Type Assertions verwenden (window as any).gtag

export function Analytics() {
  useEffect(() => {
    // SEO Events für LLM-Optimierung
    const trackSEOEvents = () => {
      // Track page views mit erweiterten Daten
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'page_view', {
          page_title: document.title,
          page_location: window.location.href,
          content_group1: 'KI Voice Agents',
          content_group2: 'Automatisierte Telefonie',
          custom_map: {
            dimension1: 'seo_optimized_content'
          }
        });

        // Track AI-relevante Interaktionen
        const trackAIInteractions = () => {
          // Track CTA clicks
          document.querySelectorAll('[data-track="cta-click"]').forEach(button => {
            button.addEventListener('click', () => {
              (window as any).gtag('event', 'cta_click', {
                event_category: 'engagement',
                event_label: 'ki_voice_agent_interest',
                value: 1
              });
            });
          });

          // Track FAQ interactions (wichtig für LLM)
          document.querySelectorAll('[data-track="faq-click"]').forEach(faq => {
            faq.addEventListener('click', () => {
              (window as any).gtag('event', 'faq_interaction', {
                event_category: 'content',
                event_label: 'knowledge_seeking',
                value: 1
              });
            });
          });
        };

        trackAIInteractions();
      }
    };

    // Delay tracking to ensure DOM is ready
    setTimeout(trackSEOEvents, 1000);
  }, []);

  if (process.env.NODE_ENV !== 'production') {
    return null;
  }

  return (
    <>
      {/* Google Analytics 4 */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XXXXXXXXXX', {
            page_title: document.title,
            page_location: window.location.href,
            // SEO-optimierte Konfiguration
            custom_map: {
              'custom_parameter.seo_category': 'dimension1',
              'custom_parameter.content_type': 'dimension2',
              'custom_parameter.ai_optimized': 'dimension3'
            },
            // Enhanced E-Commerce für Service-Tracking
            send_page_view: true,
            allow_google_signals: true,
            allow_ad_personalization_signals: false
          });

          // SEO-relevante Events
          gtag('event', 'seo_optimized_page', {
            event_category: 'seo',
            event_label: 'ki_telefonie_landing',
            custom_parameter: {
              seo_category: 'ki_voice_agents',
              content_type: 'service_page',
              ai_optimized: 'true'
            }
          });
        `}
      </Script>

      {/* Google Search Console Verification */}
      <Script id="search-console-verification" strategy="beforeInteractive">
        {`
          // Search Console Verification wird via meta tag gemacht
          console.log('SEO Analytics initialized for callflows.de');
        `}
      </Script>

      {/* Structured Data Testing */}
      <Script id="structured-data-validation" strategy="afterInteractive">
        {`
          // Validierung der strukturierten Daten für Entwicklung
          if (window.location.hostname === 'localhost') {
            console.log('Structured data validation active');
            // Test Schema.org markup
            const scripts = document.querySelectorAll('script[type="application/ld+json"]');
            scripts.forEach((script, index) => {
              try {
                const data = JSON.parse(script.textContent);
                console.log('Schema ' + index + ':', data);
              } catch (e) {
                console.error('Invalid JSON-LD schema:', e);
              }
            });
          }
        `}
      </Script>
    </>
  );
}