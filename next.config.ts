import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Tokopedia CDN
      { protocol: 'https', hostname: 'images.tokopedia.net' },
      { protocol: 'https', hostname: 'img.tokopedia.net' },
      // Shopee CDN
      { protocol: 'https', hostname: 'cf.shopee.co.id' },
      { protocol: 'https', hostname: 'down-id.img.susercontent.com' },
      // Lazada CDN
      { protocol: 'https', hostname: 'images.tokopedia.com' },
      { protocol: 'https', hostname: 'sg-live.slatic.net' },
      // Apple Newsroom
      { protocol: 'https', hostname: 'www.apple.com' },
      // Generic CDN (Cloudinary, S3, etc.)
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: '*.amazonaws.com' },
      // Placeholder images (development)
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'fastly.picsum.photos' },
    ],
  },
};

export default nextConfig;
