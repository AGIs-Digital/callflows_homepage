const config = {
  output: 'export',
  distDir: 'out',
  experimental: {
    turbotrace: {
      memoryLimit: 4096
    }
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true }, 
  trailingSlash: true,
  onDemandEntries: {
    maxInactiveAge: 60 * 60 * 1000,
    pagesBufferLength: 5
  }
};

module.exports = config;
