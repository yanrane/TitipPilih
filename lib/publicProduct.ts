type ProductWithPrivateFields = {
  id: string
  slug: string
  title: string
  image: string
  categorySlug: string
  rating: number
  priceMin: number
  priceMax: number | null
  trending: boolean
  affiliateUrl: string
  category: { slug: string; label: string } | null
  createdAt: Date
  updatedAt: Date
}

/**
 * Shape exposed by GET /api/products. Marketplace destinations stay server-side
 * and are only reached through the tracked /go/[slug] route.
 */
export function toPublicProduct(product: ProductWithPrivateFields) {
  return {
    slug: product.slug,
    title: product.title,
    image: product.image,
    categorySlug: product.categorySlug,
    rating: product.rating,
    priceMin: product.priceMin,
    priceMax: product.priceMax,
    trending: product.trending,
    category: product.category,
  }
}
