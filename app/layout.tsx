import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { CookieBanner } from '@/components/cookie-banner';
import { Analytics } from '@/components/analytics';
import { ErrorBoundary } from '@/components/error-boundary';
import { generateMetadata } from '@/lib/seo/metadata';
import { generateOrganizationSchema } from '@/lib/seo/schema';
import Script from 'next/script';

export const metadata = {
  ...generateMetadata({
  title: 'callflows - Kommunikation mit KI',
  description: 'Wir automatisieren mit Ihnen Ihre Prozesse. Von Sales über Marketing und Support bis hin zur Terminbuchung.',
  path: '/',
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
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Script
          id="schema-org"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateOrganizationSchema())
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
      </head>
      <body>
        <ErrorBoundary>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
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