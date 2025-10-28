const withNextIntl = require('next-intl/plugin')('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  webpack: (config) => {
    config.ignoreWarnings = [
      {
        module: /@supabase\/realtime-js/,
      },
    ];
    return config;
  },
};



module.exports = withNextIntl(nextConfig);
