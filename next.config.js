/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['callflows.de', 'staging.callflows.de'],
  },
  // Stellt sicher, dass Client-Komponenten korrekt hydratisiert werden
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
  // Verbessert die Fehlerbehandlung
  onDemandEntries: {
    // Periode, in der kompilierte Seiten im Speicher gehalten werden
    maxInactiveAge: 60 * 60 * 1000,
    // Anzahl der Seiten, die im Speicher gehalten werden
    pagesBufferLength: 5,
  },
};

module.exports = nextConfig;