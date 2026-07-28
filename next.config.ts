import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],

    deviceSizes: [320, 480, 640, 768, 1024, 1280, 1536],

    imageSizes: [32, 64, 96, 128, 256, 384],

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
      {
        protocol: 'https',
        hostname: 'secure.gravatar.com',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
    ],
  },
};

export default nextConfig;
