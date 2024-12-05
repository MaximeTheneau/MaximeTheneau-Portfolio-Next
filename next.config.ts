import withBundleAnalyzer from '@next/bundle-analyzer';
import { NextConfig } from 'next';

/**
 * @type {import('next').NextConfig}
 */
const nextConfig: NextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  sassOptions: {
    silenceDeprecations: ['legacy-js-api'],
  },
};
const withAnalyzer = process.env.ANALYSE === 'true' ? withBundleAnalyzer({
  enabled: true,
}) : (config: NextConfig) => config;

export default withAnalyzer(nextConfig);

// const nextConfig: NextConfig = {
//   // Ajoutez vos autres configurations Next.js ici si nécessaire
// };

// const withAnalyzer = withBundleAnalyzer({
//   enabled: process.env.ANALYZE === 'true',
// });

// export default withAnalyzer(nextConfig);
