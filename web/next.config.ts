import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  experimental: {
    reactCompiler: true,
  },
} satisfies NextConfig

export default nextConfig
