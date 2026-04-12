import type { MetadataRoute } from 'next'

const BASE_URL = 'https://titippilih.id'

const categorySlugList = [
  'gadget',
  'fashion',
  'kesehatan',
  'travel',
  'rumah',
  'kecantikan',
  'olahraga',
]

const reviewSlugList = [
  'samsung-galaxy-a55-review',
  'nike-air-zoom-pegasus-review',
  'hanasui-moisturizer-review',
  'xiaomi-redmi-note-13-review',
  'somethinc-serum-vitamin-c-review',
  'eiger-adventure-backpack-review',
  'philips-air-fryer-hd9252-review',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${BASE_URL}/donasi`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/tentang`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  const categoryRoutes: MetadataRoute.Sitemap = categorySlugList.map((slug) => ({
    url: `${BASE_URL}/kategori/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const reviewRoutes: MetadataRoute.Sitemap = reviewSlugList.map((slug) => ({
    url: `${BASE_URL}/review/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticRoutes, ...categoryRoutes, ...reviewRoutes]
}
