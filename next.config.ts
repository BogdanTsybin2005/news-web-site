/** @type {import('next').NextConfig} */
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEWS_API_KEY: process.env.NEWS_API_KEY,
    NEWS_API_COUNTRY: process.env.NEWS_API_COUNTRY,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

module.exports = nextConfig
