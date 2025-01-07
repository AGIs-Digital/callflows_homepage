const config = {
  output: 'export',
  distDir: 'out',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  trailingSlash: true, // Wichtig für statisches Hosting
  assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX || '',
};

module.exports = config;
