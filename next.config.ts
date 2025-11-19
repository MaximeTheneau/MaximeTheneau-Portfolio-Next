/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  sassOptions: {
    silenceDeprecations: ['legacy-js-api'],
  },
};

module.exports = nextConfig;
