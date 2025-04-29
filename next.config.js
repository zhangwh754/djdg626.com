// next.config.js
const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/blog',
  reactStrictMode: false,
  images: {
    unoptimized: true,
  },
}

module.exports = withContentlayer(nextConfig)
