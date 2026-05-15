import type { MetadataRoute } from 'next'

const BASE_URL = 'https://titippilih.id'

const categorySlugList = [
  'serum',
  'moisturizer',
  'sunscreen',
  'cleanser',
  'toner',
  'eyecare',
  'bodycare',
]

const reviewSlugList = [
  'azarine-hydrasoothe-spf45',
  'skintific-barrier-cream',
  'somethinc-niacinamide-serum',
  'cetaphil-gentle-cleanser',
  'scarlett-brightening-serum',
  'skincare-routine-kulit-kering',
  'rekomendasi-sunscreen-lokal-2026',
  'scarlett-shower-scrub',
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
