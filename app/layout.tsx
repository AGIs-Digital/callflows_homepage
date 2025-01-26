import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme-provider';
import { CookieBanner } from '@/components/cookie-banner';
import { FeedbackButton } from '@/components/feedback/feedback-button';
import { Analytics } from '@/components/analytics';
import { ErrorBoundary } from '@/components/error-boundary';
import { generateMetadata } from '@/lib/seo/metadata';
import { generateOrganizationSchema } from '@/lib/seo/schema';
import Script from 'next/script';

export const metadata = {
  ...generateMetadata({
  title: 'Ihre Kommunikation mit unseren KI-Lösungen',
  description: 'Wir automatisieren mit Ihnen Ihre Prozesse. Von Sales über Marketing und Support bis hin zur Terminbuchung.',
  path: '/',
  images: [{
    url: '/images/callflows_brand_no_claim.png',
    width: 1200,
    height: 630,
    alt: 'Callflows Logo'
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
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateOrganizationSchema())
          }}
        />
      </head>
      <body>
        <ErrorBoundary>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            <FeedbackButton />
            <CookieBanner />
            {children}
            <Analytics />
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}