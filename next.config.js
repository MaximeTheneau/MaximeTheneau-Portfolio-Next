/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['src'],
  },
  images: {
    unoptimized: true,
    formats: ['image/webp'],
  },
};

module.exports = nextConfig;
