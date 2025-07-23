/** @type {import('next').NextConfig} */
const nextConfig = {
  // Bestehende Konfiguration
  
  // Performance-Optimierungen für Deploy-Speed
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  
  // Komprimierung und Bundle-Optimierung
  compress: true,
  
  webpack: (config, { dev, isServer }) => {
    // Nur für Production-Builds
    if (!dev && !isServer) {
      // Bundle-Splitting für besseres Caching
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            maxSize: 100000, // 100KB Chunks
          },
        },
      };
      
      // Minimierung
      config.optimization.minimize = true;
    }
    
    return config;
  },
  
  // Statische Optimierung
  trailingSlash: true,
  
  // Image-Optimierung
  images: {
    domains: ['staging.callflows.de', 'callflows.de'],
    unoptimized: true,
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000, // 1 Jahr Cache
  },
  
  // Tree-shaking für kleinere Bundles
  swcMinify: true,
  
  // Ausgabe-Optimierung
  output: 'export',
  distDir: 'out',
};

module.exports = nextConfig