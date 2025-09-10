import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { I18nProvider } from '@/lib/i18n';
import { CookieBanner } from '@/components/cookie-banner';
import { Analytics } from '@/components/analytics';
import { ErrorBoundary } from '@/components/error-boundary';
import { initializeProductionLogger } from '@/lib/utils/production-logger';
import { generateMetadata } from '@/lib/seo/metadata';
import { generateOrganizationSchema, generateProductSchema, generateFAQSchema, generateServiceSchema, generateSoftwareSchema, generateLocalBusinessSchema } from '@/lib/seo/schema';
import Script from 'next/script';
import { ScrollToTop } from "@/components/scroll-to-top";
import { MobilePerformanceMonitor, MobileResourceHints } from "@/components/mobile-performance-monitor";
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
          id="production-logger"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Production Logger initialisieren (höchste Priorität)
              if (typeof window !== 'undefined') {
                const isProduction = '${process.env.NODE_ENV}' === 'production' || 
                                   '${process.env.NEXT_PUBLIC_ENVIRONMENT}' === 'production';
                if (isProduction) {
                  // Console-Logs sofort deaktivieren
                  const noop = function() {};
                  console.log = noop;
                  console.info = noop;
                  console.debug = noop;
                  console.trace = noop;
                  // Warn nur für kritische Fälle behalten
                  const originalWarn = console.warn;
                  console.warn = function(...args) {
                    if (args.some(arg => String(arg).includes('CRITICAL'))) {
                      originalWarn.apply(console, ['[callflows]', ...args]);
                    }
                  };
                }
                
                // Resource Hints Performance Boost
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
        
        {/* Mobile-First Critical Resource Preloads */}
        <link rel="preload" href="/fonts/Satoshi-Bold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/Satoshi-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/images/callflows_brand_no_claim.webp" as="image" fetchPriority="high" />
        
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
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ErrorBoundary>
              <MobilePerformanceMonitor />
              <MobileResourceHints />
              {children}
              <ScrollToTop />
              <CookieBanner />
              <Analytics />
            </ErrorBoundary>
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}