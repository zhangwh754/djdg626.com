// next.config.js
const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.djdg626.com',
        port: '',
      },
    ],
  },
  async redirects() {
    return [
      // Basic redirect
      {
        source: '/archives',
        destination: '/archives/posts',
        permanent: true,
      },
    ]
  },
}

module.exports = withContentlayer(nextConfig)
