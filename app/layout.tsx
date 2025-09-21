import './globals.css';
import { ModernThemeProvider } from '@/components/theme/modern-theme-provider';
import { ThemeStyleInjector } from '@/components/theme/theme-style-injector';
import { ThemeIndicator, ThemeStatus } from '@/components/theme/theme-indicator';
import { I18nProvider } from '@/lib/i18n';
import { CookieBanner } from '@/components/cookie-banner';
import { Analytics } from '@/components/analytics';
import { ErrorBoundary } from '@/components/error-boundary';
import { BookingModalProvider } from '@/components/booking/microsoft-bookings-embed';
import { generateMetadata } from '@/lib/seo/metadata';
import { generateOrganizationSchema, generateProductSchema, generateFAQSchema, generateServiceSchema, generateSoftwareSchema, generateLocalBusinessSchema } from '@/lib/seo/schema';
import Script from 'next/script';
import { ScrollToTop } from "@/components/scroll-to-top";
import { MobilePerformanceMonitor, MobileResourceHints } from "@/components/mobile-performance-monitor";
import { MobileLCPOptimizer } from "@/components/mobile-lcp-optimizer";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  ...generateMetadata({
    title: 'KI Telefonie & Voice Bot Deutschland | callflows – Automatisierte Anrufe ohne Vertragslaufzeit',
    description: 'KI Telefonie Software für automatisierte Anrufe & Voice Bots. Telefonassistent mit KI für Mittelstand - Pay-per-Use, ohne Abo. Jetzt kostenlose Demo testen!',
    path: '/',
    keywords: ['KI Telefonie', 'Voice Bot', 'KI Telefonassistent', 'automatisierte Telefonie', 'KI für Kundenservice', 'automatische Anrufbearbeitung', 'KI Callcenter Software', 'Voice Agent Deutschland', 'Telefonie Automatisierung', 'KI Anrufe automatisieren', 'Pay per Use Telefonie', 'ohne Vertragslaufzeit', 'KI‑callflow', 'Mittelstand KI Telefonie'],
    images: [{
      url: '/images/callflows_brand_no_claim.webp',
      width: 1200,
      height: 630,
      alt: 'callflows – KI‑Voice‑Agents für automatisierte Anrufe im B2B‑Vertrieb'
    }]
  }),
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icon.webp', sizes: '192x192', type: 'image/webp' }
    ],
    apple: { url: '/icon.webp', sizes: '192x192', type: 'image/webp' }
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Script
          id="schema-org"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                generateOrganizationSchema(),
                generateProductSchema(),
                generateFAQSchema(),
                generateServiceSchema(),
                generateSoftwareSchema(),
                generateLocalBusinessSchema()
              ]
            })
          }}
        />
        <Script
          src="/js/error-handler.js"
          strategy="afterInteractive"
        />
        <Script
          src="/js/ios-debug.js"
          strategy="afterInteractive"
        />
        <Script
          id="production-logger"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Production Logger initialisieren (höchste Priorität)
              if (typeof window !== 'undefined') {
                const isProduction = '${process.env.NODE_ENV}' === 'production' || 
                                   '${process.env.NEXT_PUBLIC_ENVIRONMENT}' === 'production';
                if (isProduction) {
                  // ALLE Console-Logs für Production deaktivieren
                  const noop = function() {};
                  const originalConsole = {
                    log: console.log,
                    info: console.info,
                    warn: console.warn,
                    error: console.error,
                    debug: console.debug,
                    trace: console.trace
                  };
                  
                  // Store original console for emergency debugging
                  window.__originalConsole = originalConsole;
                  
                  // Replace all console methods with noop
                  console.log = noop;
                  console.info = noop;
                  console.warn = noop;
                  console.error = noop;
                  console.debug = noop;
                  console.trace = noop;
                  console.time = noop;
                  console.timeEnd = noop;
                  console.group = noop;
                  console.groupEnd = noop;
                  console.dir = noop;
                  console.dirxml = noop;
                  console.count = noop;
                  console.countReset = noop;
                  console.table = noop;
                  
                  // Set production flag
                  window.__PRODUCTION_MODE__ = true;
                }
                
                // Resource Hints Performance Boost mit iOS Safari Fallback
                if ('requestIdleCallback' in window) {
                  requestIdleCallback(() => {
                    // Prefetch kritische Routen während Idle-Zeit
                    const routes = ['/pricing', '/blog', '/kontakt'];
                    routes.forEach(route => {
                      const link = document.createElement('link');
                      link.rel = 'prefetch';
                      link.href = route;
                      document.head.appendChild(link);
                    });
                  });
                } else {
                  // iOS Safari < 15 Fallback
                  setTimeout(() => {
                    const routes = ['/pricing', '/blog', '/kontakt'];
                    routes.forEach(route => {
                      const link = document.createElement('link');
                      link.rel = 'prefetch';
                      link.href = route;
                      document.head.appendChild(link);
                    });
                  }, 200);
                }
              }
            `
          }}
        />
        <link rel="canonical" href="https://callflows.de" />
        <link rel="alternate" hrefLang="de" href="https://callflows.de" />
        <link rel="alternate" hrefLang="x-default" href="https://callflows.de" />
        <meta httpEquiv="Permissions-Policy" content="microphone=*, camera=*" />
        
        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="UDDljDLsAFICe-wuwzZjqO6w5Cx-re0sR0Ahm0Iu1Qs" />
        
        {/* LLM-Optimierung Meta Tags */}
        <meta name="ai-content-type" content="business-service" />
        <meta name="ai-content-category" content="artificial-intelligence,voice-technology,telecommunications" />
        <meta name="ai-target-audience" content="business-owners,customer-service-managers,it-decision-makers" />
        <meta name="ai-service-area" content="Germany,DACH-region" />
        <meta name="ai-expertise-level" content="expert" />
        
        {/* Enhanced Social Media */}
        <meta property="og:site_name" content="callflows – KI‑callflows" />
        <meta property="og:locale" content="de_DE" />
        <meta property="fb:app_id" content="your-fb-app-id" />
        <meta name="twitter:site" content="@callflows" />
        <meta name="twitter:creator" content="@callflows" />
        
        {/* Technical SEO */}
        <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
        <meta name="googlebot" content="index,follow" />
        <meta name="bingbot" content="index,follow" />
        <meta name="lighthouse-ci" content="index,follow" />
        <meta name="pagespeed" content="nolimit" />
        
        {/* Mobile-First Critical Resource Preloads - High Priority */}
        <link rel="preload" href="/fonts/Satoshi-Bold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" fetchPriority="high" />
        <link rel="preload" href="/fonts/Satoshi-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" fetchPriority="high" />
        <link rel="preload" href="/images/callflows_brand_no_claim.webp" as="image" fetchPriority="high" />
        
        {/* Critical CSS Inline - Above the fold mobile styles */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical Above-the-fold Mobile CSS */
            @media (max-width: 768px) {
              .hero-section { padding: 1rem; min-height: 100vh; }
              h1 { font-size: clamp(2.5rem, 5vw + 1rem, 4rem); line-height: 1.1; margin-bottom: 1rem; font-weight: 700; }
              .container { max-width: 100%; padding: 0 1rem; }
              .font-bold { font-weight: 700; }
              .text-foreground { color: hsl(var(--foreground)); }
              .text-primary { color: hsl(var(--primary)); }
              .text-muted-foreground { color: hsl(var(--muted-foreground)); }
              .bg-background { background-color: hsl(var(--background)); }
              .grid { display: grid; }
              .space-y-8 > * + * { margin-top: 2rem; }
              .space-y-6 > * + * { margin-top: 1.5rem; }
              .text-center { text-align: center; }
              .mb-8 { margin-bottom: 2rem; }
              .pt-8 { padding-top: 2rem; }
              .relative { position: relative; }
              .min-h-screen { min-height: 100vh; }
              .overflow-hidden { overflow: hidden; }
            }
            /* Dark mode variables fallback */
            :root {
              --background: 0 0% 100%;
              --foreground: 222.2 84% 4.9%;
              --primary: 221.2 83.2% 53.3%;
              --muted-foreground: 215.4 16.3% 46.9%;
            }
            [data-theme="dark"] {
              --background: 222.2 84% 4.9%;
              --foreground: 210 40% 98%;
              --primary: 217.2 91.2% 59.8%;
              --muted-foreground: 215 20.2% 65.1%;
            }
          `
        }} />
        
        {/* Mobile Viewport & Performance */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        
        {/* DNS Performance Hints */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        

        
        {/* Critical CSS Resource Hints - Nur tatsächlich genutzte Ressourcen */}
        
        {/* Security Headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      </head>
      <body className={inter.className}>
        <I18nProvider>
          <ModernThemeProvider>
            <BookingModalProvider>
              <ThemeStyleInjector />
              <ErrorBoundary>
                <MobileLCPOptimizer />
                <MobilePerformanceMonitor />
                <MobileResourceHints />
                {children}
                <ScrollToTop />
                <CookieBanner />
                <Analytics />
                <ThemeIndicator />
                <ThemeStatus />
              </ErrorBoundary>
            </BookingModalProvider>
          </ModernThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}