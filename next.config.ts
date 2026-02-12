/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  swcMinify: true,

};

module.exports = nextConfig;
