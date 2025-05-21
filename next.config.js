/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    domains: ['staging.callflows.de', 'callflows.de'],
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://widget.synthflow.ai; connect-src 'self' https://widget.synthflow.ai; frame-src 'self' https://widget.synthflow.ai; media-src 'self' https://widget.synthflow.ai; img-src 'self' data: https:; style-src 'self' 'unsafe-inline';"
          },
          {
            key: 'Permissions-Policy',
            value: 'microphone=self https://widget.synthflow.ai, camera=self https://widget.synthflow.ai'
          }
        ]
      }
    ];
  }
}

module.exports = nextConfig