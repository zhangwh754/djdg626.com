// next.config.js
const { withContentlayer } = require('next-contentlayer2')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: process.platform === 'win32' ? undefined : 'standalone',
  reactStrictMode: false,
  experimental: {
    //指定分配cpu 防止 build cpu 占用过高
    workerThreads: false,
    cpus: 1,
    webpackBuildWorker: true,
  },
  // build 阶段禁止 ts 类型检查
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    // build 阶段禁止 eslint
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.084612.xyz',
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
