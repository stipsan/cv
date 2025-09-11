import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  experimental: {
    cacheComponents: true,
    reactCompiler: true,
  },
} satisfies NextConfig

export default nextConfig
