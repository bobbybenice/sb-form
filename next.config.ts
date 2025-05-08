import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  middleware: {
    '/api/*': './app/api/middleware.ts',
  },
};

export default nextConfig;
