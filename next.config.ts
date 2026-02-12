/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  turbopack: {},
  webpack: (config: any, { isServer }: { isServer: boolean }) => {
    if (!isServer) {
      const polyfillPath = require.resolve(
        'next/dist/build/polyfills/polyfill-module'
      );
      config.resolve.alias[polyfillPath] = false;
    }
    return config;
  },
};

module.exports = nextConfig;
