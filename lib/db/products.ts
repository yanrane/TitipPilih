import { prisma } from '@/lib/prisma'
import type { ProductCardProps, CategorySlug } from '@/types'

// ── Fallback data (used when DB is not yet connected) ──────────────────────

const TRENDING_FALLBACK: ProductCardProps[] = [
  {
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=600&fit=crop&auto=format',
    title: 'Azarine Hydrasoothe Sunscreen SPF45',
    category: 'sunscreen',
    rating: 9.4,
    priceMin: 49_000,
    priceMax: 69_000,
    slug: 'azarine-hydrasoothe-spf45',
    affiliateUrl: 'https://shopee.co.id/Azarine-Hydrasoothe-Sunscreen-Gel-SPF45-PA-50ml-i.138273726.3290987654',
  },
  {
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&h=600&fit=crop&auto=format',
    title: 'Skintific 5% Niacinamide Barrier Cream',
    category: 'moisturizer',
    rating: 9.3,
    priceMin: 119_000,
    priceMax: 149_000,
    slug: 'skintific-barrier-cream',
    affiliateUrl: 'https://shopee.co.id/Skintific-5-Niacinamide-Barrier-Moisture-Gel-Cream-30g-i.201869466.7654321098',
  },
  {
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=600&fit=crop&auto=format',
    title: 'Somethinc Niacinamide Serum 20ml',
    category: 'serum',
    rating: 9.1,
    priceMin: 89_000,
    priceMax: 159_000,
    slug: 'somethinc-niacinamide-serum',
    affiliateUrl: 'https://shopee.co.id/Somethinc-Niacinamide-Moisture-Beet-Serum-20ml-i.138273726.2345678901',
  },
]

const CATEGORY_FALLBACK: Record<CategorySlug, ProductCardProps[]> = {
  serum: [
    { image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=600&fit=crop&auto=format', title: 'Somethinc Niacinamide + Moisture Beet Serum', category: 'serum', rating: 9.1, priceMin: 89_000, priceMax: 159_000, slug: 'somethinc-niacinamide-serum', affiliateUrl: 'https://shopee.co.id/Somethinc-Niacinamide-Moisture-Beet-Serum-20ml-i.138273726.2345678901' },
    { image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=600&fit=crop&auto=format', title: 'Scarlett Whitening Brightening Serum Vit C', category: 'serum', rating: 8.9, priceMin: 55_000, priceMax: 85_000, slug: 'scarlett-brightening-serum', affiliateUrl: 'https://shopee.co.id/Scarlett-Whitening-Brightening-Serum-40ml-i.77382617.3456789012' },
    { image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&h=600&fit=crop&auto=format', title: 'Avoskin Miraculous Retinol Serum 0.1%', category: 'serum', rating: 8.7, priceMin: 179_000, priceMax: 220_000, slug: 'avoskin-miraculous-retinol', affiliateUrl: 'https://shopee.co.id/Avoskin-Miraculous-Retinol-Serum-0.1-20ml-i.96345871.1234567890' },
    { image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&h=600&fit=crop&auto=format', title: 'Garnier Bright Complete Vitamin C Serum', category: 'serum', rating: 8.5, priceMin: 59_000, priceMax: 89_000, slug: 'garnier-bright-vit-c-serum', affiliateUrl: 'https://shopee.co.id/Garnier-Bright-Complete-Vitamin-C-Serum-30ml-i.7291847.4567890123' },
  ],
  moisturizer: [
    { image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&h=600&fit=crop&auto=format', title: 'Skintific 5% Niacinamide Barrier Moisture Gel Cream', category: 'moisturizer', rating: 9.3, priceMin: 119_000, priceMax: 149_000, slug: 'skintific-barrier-cream', affiliateUrl: 'https://shopee.co.id/Skintific-5-Niacinamide-Barrier-Moisture-Gel-Cream-30g-i.201869466.7654321098' },
    { image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=600&fit=crop&auto=format', title: 'Emina Bright Stuff Moisturizing Cream 20ml', category: 'moisturizer', rating: 8.4, priceMin: 25_000, priceMax: 35_000, slug: 'emina-bright-stuff-cream', affiliateUrl: 'https://shopee.co.id/Emina-Bright-Stuff-Moisturizing-Cream-20ml-i.14728364.5678901234' },
    { image: 'https://images.unsplash.com/photo-1519415943484-9fa1873496d4?w=600&h=600&fit=crop&auto=format', title: 'Wardah Aloe Vera Gel 100ml', category: 'moisturizer', rating: 8.6, priceMin: 29_000, priceMax: 45_000, slug: 'wardah-aloe-vera-gel', affiliateUrl: 'https://shopee.co.id/Wardah-Aloe-Vera-Gel-100ml-i.4829173.6789012345' },
    { image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&h=600&fit=crop&auto=format', title: 'Bio Beauty Lab Collagen Moisturizer 30g', category: 'moisturizer', rating: 8.8, priceMin: 89_000, priceMax: 115_000, slug: 'bio-beauty-lab-collagen', affiliateUrl: 'https://shopee.co.id/Bio-Beauty-Lab-Collagen-Series-Moisturizer-30g-i.28193746.7890123456' },
  ],
  sunscreen: [
    { image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=600&fit=crop&auto=format', title: 'Azarine Hydrasoothe Sunscreen Gel SPF45 PA++++', category: 'sunscreen', rating: 9.4, priceMin: 49_000, priceMax: 69_000, slug: 'azarine-hydrasoothe-spf45', affiliateUrl: 'https://shopee.co.id/Azarine-Hydrasoothe-Sunscreen-Gel-SPF45-PA-50ml-i.138273726.3290987654' },
    { image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&h=600&fit=crop&auto=format', title: 'Skintific Aqua Light Mineral Sunscreen SPF50+ PA++++', category: 'sunscreen', rating: 9.0, priceMin: 89_000, priceMax: 119_000, slug: 'skintific-mineral-spf50', affiliateUrl: 'https://shopee.co.id/Skintific-Aqua-Light-Mineral-Sunscreen-SPF50-30g-i.201869466.8901234567' },
    { image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=600&fit=crop&auto=format', title: 'Wardah UV Shield Sunscreen SPF30 PA+++', category: 'sunscreen', rating: 8.5, priceMin: 35_000, priceMax: 55_000, slug: 'wardah-uv-shield-spf30', affiliateUrl: 'https://shopee.co.id/Wardah-UV-Shield-Essential-Sunscreen-SPF30-PA-40ml-i.4829173.9012345678' },
  ],
  cleanser: [
    { image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&h=600&fit=crop&auto=format', title: 'Cetaphil Gentle Skin Cleanser 250ml', category: 'cleanser', rating: 9.2, priceMin: 89_000, priceMax: 119_000, slug: 'cetaphil-gentle-cleanser', affiliateUrl: 'https://shopee.co.id/Cetaphil-Gentle-Skin-Cleanser-250ml-i.43291847.0123456789' },
    { image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&h=600&fit=crop&auto=format', title: 'Hada Labo Gokujyun Hyaluronic Acid Face Wash', category: 'cleanser', rating: 9.0, priceMin: 79_000, priceMax: 109_000, slug: 'hada-labo-hydrating-cleanser', affiliateUrl: 'https://shopee.co.id/Hada-Labo-Gokujyun-Hyaluronic-Acid-Face-Wash-100g-i.19283746.1234509876' },
    { image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=600&fit=crop&auto=format', title: 'Emina Bright Stuff Face Wash 100ml', category: 'cleanser', rating: 8.3, priceMin: 22_000, priceMax: 32_000, slug: 'emina-bright-stuff-facewash', affiliateUrl: 'https://shopee.co.id/Emina-Bright-Stuff-Face-Wash-100ml-i.14728364.2345610987' },
  ],
  toner: [
    { image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=600&fit=crop&auto=format', title: 'Somethinc AHA BHA PHA Toner 2% 100ml', category: 'toner', rating: 8.8, priceMin: 115_000, priceMax: 145_000, slug: 'somethinc-aha-bha-toner', affiliateUrl: 'https://shopee.co.id/Somethinc-AHA-BHA-PHA-Toner-2-100ml-i.138273726.3456721098' },
    { image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=600&fit=crop&auto=format', title: 'Skintific Mugwort Pore Toner 100ml', category: 'toner', rating: 8.9, priceMin: 89_000, priceMax: 119_000, slug: 'skintific-mugwort-toner', affiliateUrl: 'https://shopee.co.id/Skintific-Mugwort-Pore-Toner-100ml-i.201869466.4567832109' },
    { image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&h=600&fit=crop&auto=format', title: 'Dear Me Beauty Barrier Booster Toner 100ml', category: 'toner', rating: 8.6, priceMin: 99_000, priceMax: 129_000, slug: 'dear-me-barrier-toner', affiliateUrl: 'https://shopee.co.id/Dear-Me-Beauty-Barrier-Booster-Toner-100ml-i.63829174.5678943210' },
  ],
  eyecare: [
    { image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&h=600&fit=crop&auto=format', title: 'Skintific Vitamin C Brightening Eye Cream 20g', category: 'eyecare', rating: 8.7, priceMin: 109_000, priceMax: 139_000, slug: 'skintific-vit-c-eye-cream', affiliateUrl: 'https://shopee.co.id/Skintific-Vitamin-C-Eye-Cream-20g-i.201869466.6789054321' },
    { image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=600&fit=crop&auto=format', title: 'Garnier Bright Complete Vitamin C Eye Cream', category: 'eyecare', rating: 8.4, priceMin: 65_000, priceMax: 89_000, slug: 'garnier-bright-eye-cream', affiliateUrl: 'https://shopee.co.id/Garnier-Bright-Complete-Vitamin-C-Eye-Cream-15ml-i.7291847.7890165432' },
  ],
  bodycare: [
    { image: 'https://images.unsplash.com/photo-1570213489059-0aac6626cade?w=600&h=600&fit=crop&auto=format', title: 'Scarlett Whitening Shower Scrub 300ml', category: 'bodycare', rating: 9.1, priceMin: 55_000, priceMax: 79_000, slug: 'scarlett-shower-scrub', affiliateUrl: 'https://shopee.co.id/Scarlett-Whitening-Shower-Scrub-300ml-i.77382617.8901276543' },
  ],
}

// ── Helpers ────────────────────────────────────────────────────────────────

function mapProduct(p: {
  image: string
  title: string
  categorySlug: string
  rating: number
  priceMin: number
  priceMax: number | null
  slug: string
  affiliateUrl: string
}): ProductCardProps {
  return {
    image: p.image,
    title: p.title,
    category: p.categorySlug as CategorySlug,
    rating: p.rating,
    priceMin: p.priceMin,
    priceMax: p.priceMax ?? undefined,
    slug: p.slug,
    affiliateUrl: p.affiliateUrl,
  }
}

// ── Queries ────────────────────────────────────────────────────────────────

export async function getTrendingProducts(): Promise<ProductCardProps[]> {
  try {
    const products = await prisma.product.findMany({
      where: { trending: true },
      orderBy: { createdAt: 'desc' },
      take: 3,
    })
    return products.length > 0 ? products.map(mapProduct) : TRENDING_FALLBACK
  } catch {
    return TRENDING_FALLBACK
  }
}

export async function getProductsByCategory(
  slug: string,
): Promise<ProductCardProps[]> {
  try {
    const products = await prisma.product.findMany({
      where: { categorySlug: slug },
      orderBy: { createdAt: 'desc' },
    })
    const fallback = CATEGORY_FALLBACK[slug as CategorySlug] ?? []
    return products.length > 0 ? products.map(mapProduct) : fallback
  } catch {
    return CATEGORY_FALLBACK[slug as CategorySlug] ?? []
  }
}
