import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { I18nProvider } from '@/lib/i18n';
import { CookieBanner } from '@/components/cookie-banner';
import { Analytics } from '@/components/analytics';
import { ErrorBoundary } from '@/components/error-boundary';
import { generateMetadata } from '@/lib/seo/metadata';
import { generateOrganizationSchema, generateProductSchema, generateFAQSchema, generateServiceSchema, generateSoftwareSchema, generateLocalBusinessSchema } from '@/lib/seo/schema';
import Script from 'next/script';
import { ScrollToTop } from "@/components/scroll-to-top";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  ...generateMetadata({
    title: 'KI-Telefonie & Voice Agents für Unternehmen',
    description: 'Revolutionieren Sie Ihren Kundenservice mit intelligenten KI-Voice-Agents. Automatisierte Telefonie für bessere Kundenkommunikation, höhere Effizienz und 24/7 Verfügbarkeit. Jetzt risikofrei testen!',
    path: '/',
    keywords: ['KI Telefonie', 'Telefon KI', 'Voice Agent', 'KI-Voice-Agents', 'Automatisierte Telefonie'],
    images: [{
      url: '/images/callflows_brand_no_claim.png',
      width: 1200,
      height: 630,
      alt: 'callflows Logo'
    }]
  }),
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icon.png', sizes: '192x192', type: 'image/png' }
    ],
    apple: { url: '/icon.png', sizes: '192x192', type: 'image/png' }
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
        <meta property="og:site_name" content="callflows - KI Voice Agents" />
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
        
        {/* Performance Hints */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
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