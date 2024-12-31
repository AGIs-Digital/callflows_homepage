import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme-provider';
import { CookieBanner } from '@/components/cookie-banner';
import { FeedbackButton } from '@/components/feedback/feedback-button';
import { Analytics } from '@/components/analytics';
import { ErrorBoundary } from '@/components/error-boundary';

export const metadata: Metadata = {
  title: 'Callflows - KI-gestützte Voice Agents',
  description: 'Automatisieren Sie Ihre Kommunikation mit unserem intelligenten Voice Agents.',
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        sizes: '32x32',
      },
      {
        url: '/icon.png',
        sizes: '192x192',
        type: 'image/png',
      },
    ],
    apple: {
      url: '/icon.png',
      sizes: '192x192',
      type: 'image/png',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" suppressHydrationWarning>
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