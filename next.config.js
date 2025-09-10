/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  // Komprimierung und Bundle-Optimierung
  compress: true,
  
  // Parallele Builds für bessere Performance
  experimental: {
    // Nur bewährte, stabile Features
    esmExternals: true, // ESM-Module externalisieren
    serverComponentsExternalPackages: ['sharp'], // Sharp extern halten
  },
  
  webpack: (config, { dev, isServer, webpack }) => {
    // Performance-Optimierungen für alle Builds
    
    // Mobile-optimierte Bundle-Aufteilung für kleinere Initial Load
    config.optimization.splitChunks = {
      chunks: 'all',
      minSize: 5000,   // Sehr kleine Chunks für mobile
      maxSize: 50000,  // Deutlich kleinere Chunks für mobile Performance
      maxAsyncRequests: 40,
      maxInitialRequests: 15, // Weniger Initial Requests für mobile
      cacheGroups: {
        // React Framework
        react: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'react',
          chunks: 'all',
          priority: 20,
          enforce: true,
        },
        // UI Libraries
        ui: {
          test: /[\\/]node_modules[\\/](@radix-ui|lucide-react|@hookform)[\\/]/,
          name: 'ui-components',
          chunks: 'all',
          priority: 15,
          enforce: true,
        },
        // Utils und kleine Libraries
        utils: {
          test: /[\\/]node_modules[\\/](clsx|class-variance-authority|tailwind-merge)[\\/]/,
          name: 'utils',
          chunks: 'all',
          priority: 10,
        },
        // Große Vendor Libraries einzeln
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: -10,
          enforce: true,
          maxSize: 80000, // Große Vendors aufteilen
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
          maxSize: 50000,
        },
      },
    };

    // Build-Performance optimieren
    if (!dev) {
      // Minimierung aktivieren
      config.optimization.minimize = true;
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
      config.optimization.innerGraph = true;
      config.optimization.providedExports = true;
      config.optimization.concatenateModules = true;
      
      // Cache optimieren
      config.cache = {
        type: 'filesystem',
        cacheDirectory: path.resolve(__dirname, '.next/cache/webpack'),
        buildDependencies: {
          config: [__filename],
        },
      };
      
      // Weitere Bundle-Optimierungen
      config.resolve.alias = {
        ...config.resolve.alias,
        // Kleinere Alternativen für große Libraries
        'react-dom$': 'react-dom/client',
      };
    }

    // Module-Resolution optimieren
    config.resolve.symlinks = false;
    config.resolve.cacheWithContext = false;
    
    return config;
  },
  
  // Statische Optimierung
  trailingSlash: true,
  
  // Image-Optimierung
  images: {
    unoptimized: true, // Da wir WebP selbst generieren
    formats: ['image/webp'],
  },
  
  // Tree-shaking für kleinere Bundles
  swcMinify: true,
  
  // Bundle-Größe reduzieren
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Ausgabe-Optimierung
  output: 'export',
  distDir: 'out',
  trailingSlash: true,
  
  // Externe Libraries optimieren für statischen Export
  transpilePackages: [
    '@radix-ui/react-icons',
    'lucide-react'
  ],
  
  // Tree Shaking für bessere Bundle-Größe
  // Entferne modularizeImports da es Probleme bei statischem Export verursacht
};

module.exports = nextConfig