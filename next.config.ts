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
      // Unsplash (product mockup photos)
      { protocol: 'https', hostname: 'images.unsplash.com' },
      // GSMArena (product specs images)
      { protocol: 'https', hostname: 'fdn.gsmarena.com' },
      { protocol: 'https', hostname: 'fdn2.gsmarena.com' },
      { protocol: 'https', hostname: 'cdn.gsmarena.com' },
      // Samsung Global News
      { protocol: 'https', hostname: 'img.global.news.samsung.com' },
      { protocol: 'https', hostname: 'images.samsung.com' },
    ],
  },
};

export default nextConfig;
