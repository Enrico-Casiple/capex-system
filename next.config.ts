import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  turbopack: {},
  typescript: {
    // Build won't fail on TS errors (run `npm run type-check` separately)
    ignoreBuildErrors: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        net: false,
        tls: false,
        fs: false,
        dns: false,
      };
    }
    return config;
  },
};

export default nextConfig;
