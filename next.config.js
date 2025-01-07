/** @type {import('next').NextConfig} */
const config = {
  output: 'export',
  distDir: 'out',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true
  },
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  }
};

module.exports = config;