const config = {
  output: 'export',
  distDir: 'out',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true }, 
  trailingSlash: true, // Wichtig für statisches Hosting
};

module.exports = config;
