import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { CookieBanner } from '@/components/cookie-banner';
import { Analytics } from '@/components/analytics';
import { ErrorBoundary } from '@/components/error-boundary';
import { generateMetadata } from '@/lib/seo/metadata';
import { generateOrganizationSchema, generateProductSchema, generateFAQSchema } from '@/lib/seo/schema';
import Script from 'next/script';
import { ScrollToTop } from "@/components/scroll-to-top";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  ...generateMetadata({
    title: 'callflows - automatisierte Kundenkommunikation',
    description: 'Optimieren Sie Kundenservice, Vertrieb und Support mit intelligenten Systemen.',
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
                generateFAQSchema()
              ]
            })
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
        <meta http-equiv="Permissions-Policy" content="microphone=*, camera=*" />
      </head>
      <body className={inter.className}>
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
      </body>
    </html>
  );
}