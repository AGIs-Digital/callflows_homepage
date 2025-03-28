/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    domains: ['staging.callflows.de', 'callflows.de'],
    unoptimized: true,
  },
}

module.exports = nextConfig