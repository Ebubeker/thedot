import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  i18n: {
    locales: ['en-US', 'shq'],
    defaultLocale: 'en-US',
    localeDetection: false,
  },
  trailingSlash: true,
};

export default nextConfig;
