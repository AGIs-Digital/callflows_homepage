import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { CookieBanner } from '@/components/cookie-banner';
import { Analytics } from '@/components/analytics';
import { ErrorBoundary } from '@/components/error-boundary';
import { generateMetadata } from '@/lib/seo/metadata';
import { generateOrganizationSchema, generateProductSchema, generateFAQSchema } from '@/lib/seo/schema';
import Script from 'next/script';

export const metadata = {
  ...generateMetadata({
    title: 'callflows - KI-gestützte Voice Agents für automatisierte Telefonkommunikation',
    description: 'Automatisieren Sie Ihre Telefonkommunikation mit KI Voice Agents. Optimieren Sie Kundenservice, Vertrieb und Support mit intelligenten Sprachassistenten.',
    path: '/',
    keywords: ['KI Telefonie', 'Telefon KI', 'Voice Agent', 'KI Voice Agent', 'Automatisierte Telefonie'],
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
}: {
  children: React.ReactNode;
}) {
  // Generiere alle Schema.org Daten
  const organizationSchema = generateOrganizationSchema();
  const productSchema = generateProductSchema();
  const faqSchema = generateFAQSchema();

  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Script
          id="schema-org"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema)
          }}
        />
        <Script
          id="product-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(productSchema)
          }}
        />
        <Script
          id="faq-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema)
          }}
        />
        <Script
          id="error-handler"
          strategy="beforeInteractive"
        >
          {`
            window.onerror = function(msg, url, lineNo, columnNo, error) {
              console.error('Global error:', { msg, url, lineNo, columnNo, error });
              return false;
            };
            window.addEventListener('unhandledrejection', function(event) {
              console.error('Unhandled promise rejection:', event.reason);
            });
          `}
        </Script>
        <link rel="canonical" href="https://callflows.de" />
        <link rel="alternate" hrefLang="de" href="https://callflows.de" />
        <link rel="alternate" hrefLang="x-default" href="https://callflows.de" />
        <Script src="https://cal.com/embed.js" strategy="lazyOnload" />
      </head>
      <body>
        <ErrorBoundary>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
          >
            <CookieBanner />
            {children}
            <Analytics />
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}