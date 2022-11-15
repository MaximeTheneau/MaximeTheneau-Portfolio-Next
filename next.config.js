/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    formats: ['image/webp'],
  },
  extends: [
    //...
    'plugin:@next/next/recommended',
  ],
}

module.exports = nextConfig
