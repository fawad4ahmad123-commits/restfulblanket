import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
      {
        protocol: 'https',
        hostname: 'tapbookme.com',
      },
      {
        protocol: 'https',
        hostname: 'd3k81ch9hvuctc.cloudfront.net',
      },
    ],
  },
};

export default nextConfig;
