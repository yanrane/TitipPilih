import { prisma } from '@/lib/prisma'
import type { ProductCardProps, CategorySlug } from '@/types'

// ── Fallback data (used when DB is not yet connected) ──────────────────────

const TRENDING_FALLBACK: ProductCardProps[] = [
  {
    image: 'https://images.unsplash.com/photo-1598662972299-5408ddb8a3dc?w=600&h=600&fit=crop&auto=format',
    title: 'Azarine Hydrasoothe Sunscreen SPF45',
    category: 'sunscreen',
    rating: 9.4,
    priceMin: 49_000,
    priceMax: 69_000,
    slug: 'azarine-hydrasoothe-spf45',
    affiliateUrl: 'https://shopee.co.id/Azarine-Hydrasoothe-Sunscreen-Gel-SPF45-PA-50ml-i.138273726.3290987654',
  },
  {
    image: 'https://images.unsplash.com/photo-1638609927040-8a7e97cd9d6a?w=600&h=600&fit=crop&auto=format',
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
    { image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=600&fit=crop&auto=format', title: 'Somethinc Niacinamide + Moisture Beet Serum 20ml', category: 'serum', rating: 9.1, priceMin: 89_000, priceMax: 159_000, slug: 'somethinc-niacinamide-serum', affiliateUrl: 'https://shopee.co.id/Somethinc-Niacinamide-Moisture-Beet-Serum-20ml-i.138273726.2345678901' },
    { image: 'https://images.unsplash.com/photo-1576426863848-c21f53c60b19?w=600&h=600&fit=crop&auto=format', title: 'Scarlett Whitening Brightening Serum Vitamin C 40ml', category: 'serum', rating: 8.9, priceMin: 55_000, priceMax: 85_000, slug: 'scarlett-brightening-serum', affiliateUrl: 'https://shopee.co.id/Scarlett-Whitening-Brightening-Serum-40ml-i.77382617.3456789012' },
    { image: 'https://images.unsplash.com/photo-1627811015433-368c148f6c3c?w=600&h=600&fit=crop&auto=format', title: 'Avoskin Miraculous Retinol Serum 0.1% 20ml', category: 'serum', rating: 8.7, priceMin: 179_000, priceMax: 220_000, slug: 'avoskin-miraculous-retinol', affiliateUrl: 'https://shopee.co.id/Avoskin-Miraculous-Retinol-Serum-0.1-20ml-i.96345871.1234567890' },
    { image: 'https://images.unsplash.com/photo-1573575155376-b5010099301b?w=600&h=600&fit=crop&auto=format', title: 'Garnier Bright Complete Vitamin C Serum 30ml', category: 'serum', rating: 8.5, priceMin: 59_000, priceMax: 89_000, slug: 'garnier-bright-vit-c-serum', affiliateUrl: 'https://shopee.co.id/Garnier-Bright-Complete-Vitamin-C-Serum-30ml-i.7291847.4567890123' },
    { image: 'https://images.unsplash.com/photo-1619166855062-f63c187def3d?w=600&h=600&fit=crop&auto=format', title: 'GLOW FX Glow Bomb Serum 20ml — 19% Brightening Power', category: 'serum', rating: 8.8, priceMin: 49_000, priceMax: 59_900, slug: 'glow-fx-glow-bomb-serum', affiliateUrl: 'https://shopee.co.id/GLOW-FX-Glow-Bomb-Serum-20ml-19-Brightening-Power-Serum-Glowing-Samarkan-Noda-Hitam-Bekas-Jerawat-i.1418365655.51209633461' },
    { image: 'https://images.unsplash.com/photo-1676809180101-1f215d615829?w=600&h=600&fit=crop&auto=format', title: 'Garnier Bright Complete Vitamin C Booster Serum 30ml', category: 'serum', rating: 8.8, priceMin: 15_000, priceMax: 19_800, slug: 'garnier-vit-c-booster-serum', affiliateUrl: 'https://shopee.co.id/Terlaris-GARNIER-Bright-Complete-Vitamin-C-Booster-Serum-Mencerahkan-Noda-Hitam-30ml-i.1104427895.53306242263' },
    { image: 'https://images.unsplash.com/photo-1680537260333-20fd95432044?w=600&h=600&fit=crop&auto=format', title: 'Glad2Glow 3PCS Serum Bundle — Niacinamide + AHA + Retinol', category: 'serum', rating: 9.1, priceMin: 89_000, priceMax: 101_500, slug: 'glad2glow-3pcs-serum-bundle', affiliateUrl: 'https://shopee.co.id/-100-ORI-Glad2Glow-3PCS-Facial-Serum-Essence-Pomegranate-Niacinamide-Power-Bright-Serum-Centella-Salicylic-Acid-Acne-Serum-Peach-Retinol-Serum-377-Dark-Spot-Serum-PEELING-SOLUTION-g2g-glad2glow-official-store-i.1447314129.27382396572' },
    { image: 'https://images.unsplash.com/photo-1741896135490-4062a3b21abf?w=600&h=600&fit=crop&auto=format', title: 'GLOWFX Bundle Serum — Glow Bomb + Acne Pure', category: 'serum', rating: 9.1, priceMin: 99_000, priceMax: 127_200, slug: 'glowfx-serum-bundle', affiliateUrl: 'https://shopee.co.id/(ADA-BUNDLING!!)-GLOWFX-Glow-fx-Serum-Series-Glow-Bomb-Serum-Acne-Pure-Serum-berbarcode-i.5474744.27961990732' },
    { image: 'https://images.unsplash.com/photo-1643379850623-7eb6442cd262?w=600&h=600&fit=crop&auto=format', title: 'Skintific Niacinamide 10% Brightening Face Serum', category: 'serum', rating: 9.5, priceMin: 69_000, priceMax: 83_200, slug: 'skintific-niacinamide-10-serum', affiliateUrl: 'https://shopee.co.id/Serum-Wajah-Skintific-Niacinamide-10-Mencerahkan-Menyamarkan-Noda-Hitam-Menghaluskan-Kulit-i.1316425009.54558936639' },
    { image: 'https://images.unsplash.com/photo-1643379850274-77d2e3703ef9?w=600&h=600&fit=crop&auto=format', title: 'Hanasui Power Bright Expert Serum Niacinamide 10%', category: 'serum', rating: 9.1, priceMin: 29_000, priceMax: 36_500, slug: 'hanasui-power-bright-serum', affiliateUrl: 'https://shopee.co.id/(REAL-10-ADVANCE-NIACINAMIDE)-Hanasui-Power-Bright-Expert-Serum-Mencerahkan-Kurangi-Bintik-Hitam-Bekas-Jerawat-i.129681299.20628506418' },
    { image: 'https://images.unsplash.com/photo-1643747394944-89b11e7fb616?w=600&h=600&fit=crop&auto=format', title: 'Glad2Glow AHA BHA PHA Intensive Peeling Solution Serum', category: 'serum', rating: 8.4, priceMin: 24_000, priceMax: 30_400, slug: 'glad2glow-aha-bha-pha-peeling', affiliateUrl: 'https://shopee.co.id/-SALE-GLAD2GLOW-AHA-BHA-PHA-Intensive-Peeling-Solution-Serum-Lactic-Acid-Serum-Exfoliasi-Wajah-i.1563427312.42407480877' },
    { image: 'https://images.unsplash.com/photo-1643379852776-308d9bbf8645?w=600&h=600&fit=crop&auto=format', title: 'Hanasui Brightening Serum Wajah 20ml', category: 'serum', rating: 9.1, priceMin: 15_000, priceMax: 20_000, slug: 'hanasui-brightening-serum', affiliateUrl: 'https://shopee.co.id/*-FELIZ-*-HANASUI-Serum-20ml-i.383972992.13426953301' },
    { image: 'https://images.unsplash.com/photo-1638301868496-43577744a46c?w=600&h=600&fit=crop&auto=format', title: 'Whitelab N10-Dose+ Intense Brightening Serum Niacinamide 10%', category: 'serum', rating: 8.8, priceMin: 15_000, priceMax: 19_200, slug: 'whitelab-n10-niacinamide-serum', affiliateUrl: 'https://shopee.co.id/WHITELAB-N10-Dose-Intense-Brightening-Serum-Niacinamide-10-Mencerahkan-Melembabkan-XX340-i.1546760103.26436837925' },
    { image: 'https://images.unsplash.com/photo-1605204359736-9a08b7175fc7?w=600&h=600&fit=crop&auto=format', title: 'Nutrishe Intensive Bright & Glow Serum (Halal)', category: 'serum', rating: 9.1, priceMin: 95_000, priceMax: 117_000, slug: 'nutrishe-intensive-bright-glow-serum', affiliateUrl: 'https://shopee.co.id/(HALAL)-Nutrishe-Intensive-Bright-Glow-Serum-i.593789.4546230356' },
    { image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=600&fit=crop&auto=format', title: 'The Originote Niacinamide 10% Brightening Serum', category: 'serum', rating: 9.1, priceMin: 29_000, priceMax: 38_000, slug: 'originote-niacinamide-10-serum', affiliateUrl: 'https://shopee.co.id/The-Originote-Niacinamide-10-Serum-Serum-Brightening-untuk-Mencerahkan-Wajah-Meratakan-Warna-Kulit-Wajah-Menyamarkan-Dark-Spot-Noda-Hitam-Serum-Muka-dengan-Niacinamide-i.710619388.10489363768' },
    { image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=600&fit=crop&auto=format', title: 'Camille Happy Joy Brightening Face Serum', category: 'serum', rating: 8.5, priceMin: 70_000, priceMax: 85_000, slug: 'camille-happy-joy-serum', affiliateUrl: 'https://shopee.co.id/Camille-Happy-Joy-Serum-i.975924137.49703409756' },
    { image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&h=600&fit=crop&auto=format', title: 'Serum Anti-Aging Botox Effect Pengencang Wajah Instan', category: 'serum', rating: 9.5, priceMin: 30_000, priceMax: 37_200, slug: 'serum-anti-aging-botox-effect', affiliateUrl: 'https://shopee.co.id/-Pengurangan-Kerutan-Instan-Serum-Botox-Perawatan-Wajah-AntiPenuaan-untuk-Garis-Dahi-Lipatan-Nasolabial-Kerutan-Esensi-Pengencang-yang-Cepat-Meresap-Serum-Botox-AntiKerutan-Pengencang-Wajah-Penyerapan-Cepat-Perawatan-Kerutan-i.1457617205.42577749596' },
  ],
  moisturizer: [
    { image: 'https://images.unsplash.com/photo-1638609927040-8a7e97cd9d6a?w=600&h=600&fit=crop&auto=format', title: 'Skintific 5% Niacinamide Barrier Moisture Gel Cream', category: 'moisturizer', rating: 9.3, priceMin: 119_000, priceMax: 149_000, slug: 'skintific-barrier-cream', affiliateUrl: 'https://shopee.co.id/Skintific-5-Niacinamide-Barrier-Moisture-Gel-Cream-30g-i.201869466.7654321098' },
    { image: 'https://images.unsplash.com/photo-1629732047847-50219e9c5aef?w=600&h=600&fit=crop&auto=format', title: 'Emina Bright Stuff Moisturizing Cream 20ml', category: 'moisturizer', rating: 8.4, priceMin: 25_000, priceMax: 35_000, slug: 'emina-bright-stuff-cream', affiliateUrl: 'https://shopee.co.id/Emina-Bright-Stuff-Moisturizing-Cream-20ml-i.14728364.5678901234' },
    { image: 'https://images.unsplash.com/photo-1519415943484-9fa1873496d4?w=600&h=600&fit=crop&auto=format', title: 'Wardah Aloe Vera Gel 100ml', category: 'moisturizer', rating: 8.6, priceMin: 29_000, priceMax: 45_000, slug: 'wardah-aloe-vera-gel', affiliateUrl: 'https://shopee.co.id/Wardah-Aloe-Vera-Gel-100ml-i.4829173.6789012345' },
    { image: 'https://images.unsplash.com/photo-1629380108660-bd39c778a721?w=600&h=600&fit=crop&auto=format', title: 'Bio Beauty Lab Collagen Moisturizer 30g', category: 'moisturizer', rating: 8.8, priceMin: 89_000, priceMax: 115_000, slug: 'bio-beauty-lab-collagen', affiliateUrl: 'https://shopee.co.id/Bio-Beauty-Lab-Collagen-Series-Moisturizer-30g-i.28193746.7890123456' },
  ],
  sunscreen: [
    { image: 'https://images.unsplash.com/photo-1598662972299-5408ddb8a3dc?w=600&h=600&fit=crop&auto=format', title: 'Azarine Hydrasoothe Sunscreen Gel SPF45 PA++++', category: 'sunscreen', rating: 9.4, priceMin: 49_000, priceMax: 69_000, slug: 'azarine-hydrasoothe-spf45', affiliateUrl: 'https://shopee.co.id/Azarine-Hydrasoothe-Sunscreen-Gel-SPF45-PA-50ml-i.138273726.3290987654' },
    { image: 'https://images.unsplash.com/photo-1598662957563-ee4965d4d72c?w=600&h=600&fit=crop&auto=format', title: 'Skintific Aqua Light Mineral Sunscreen SPF50+ PA++++', category: 'sunscreen', rating: 9.0, priceMin: 89_000, priceMax: 119_000, slug: 'skintific-mineral-spf50', affiliateUrl: 'https://shopee.co.id/Skintific-Aqua-Light-Mineral-Sunscreen-SPF50-30g-i.201869466.8901234567' },
    { image: 'https://images.unsplash.com/photo-1662729182165-3612bfed89f4?w=600&h=600&fit=crop&auto=format', title: 'Wardah UV Shield Sunscreen SPF30 PA+++', category: 'sunscreen', rating: 8.5, priceMin: 35_000, priceMax: 55_000, slug: 'wardah-uv-shield-spf30', affiliateUrl: 'https://shopee.co.id/Wardah-UV-Shield-Essential-Sunscreen-SPF30-PA-40ml-i.4829173.9012345678' },
  ],
  cleanser: [
    { image: 'https://images.unsplash.com/photo-1739285094922-e3c6cf72d470?w=600&h=600&fit=crop&auto=format', title: 'Cetaphil Gentle Skin Cleanser 250ml', category: 'cleanser', rating: 9.2, priceMin: 89_000, priceMax: 119_000, slug: 'cetaphil-gentle-cleanser', affiliateUrl: 'https://shopee.co.id/Cetaphil-Gentle-Skin-Cleanser-250ml-i.43291847.0123456789' },
    { image: 'https://images.unsplash.com/photo-1556228994-efb7c88fa0f9?w=600&h=600&fit=crop&auto=format', title: 'Hada Labo Gokujyun Hyaluronic Acid Face Wash', category: 'cleanser', rating: 9.0, priceMin: 79_000, priceMax: 109_000, slug: 'hada-labo-hydrating-cleanser', affiliateUrl: 'https://shopee.co.id/Hada-Labo-Gokujyun-Hyaluronic-Acid-Face-Wash-100g-i.19283746.1234509876' },
    { image: 'https://images.unsplash.com/photo-1556227702-b89ac3b94ff9?w=600&h=600&fit=crop&auto=format', title: 'Emina Bright Stuff Face Wash 100ml', category: 'cleanser', rating: 8.3, priceMin: 22_000, priceMax: 32_000, slug: 'emina-bright-stuff-facewash', affiliateUrl: 'https://shopee.co.id/Emina-Bright-Stuff-Face-Wash-100ml-i.14728364.2345610987' },
  ],
  toner: [
    { image: 'https://images.unsplash.com/photo-1770717984643-2a1545902579?w=600&h=600&fit=crop&auto=format', title: 'Somethinc AHA BHA PHA Toner 2% 100ml', category: 'toner', rating: 8.8, priceMin: 115_000, priceMax: 145_000, slug: 'somethinc-aha-bha-toner', affiliateUrl: 'https://shopee.co.id/Somethinc-AHA-BHA-PHA-Toner-2-100ml-i.138273726.3456721098' },
    { image: 'https://images.unsplash.com/photo-1770717984650-21665d4362b9?w=600&h=600&fit=crop&auto=format', title: 'Skintific Mugwort Pore Toner 100ml', category: 'toner', rating: 8.9, priceMin: 89_000, priceMax: 119_000, slug: 'skintific-mugwort-toner', affiliateUrl: 'https://shopee.co.id/Skintific-Mugwort-Pore-Toner-100ml-i.201869466.4567832109' },
    { image: 'https://images.unsplash.com/photo-1770717984664-1c266191d8e4?w=600&h=600&fit=crop&auto=format', title: 'Dear Me Beauty Barrier Booster Toner 100ml', category: 'toner', rating: 8.6, priceMin: 99_000, priceMax: 129_000, slug: 'dear-me-barrier-toner', affiliateUrl: 'https://shopee.co.id/Dear-Me-Beauty-Barrier-Booster-Toner-100ml-i.63829174.5678943210' },
  ],
  eyecare: [
    { image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&h=600&fit=crop&auto=format', title: 'Skintific Vitamin C Brightening Eye Cream 20g', category: 'eyecare', rating: 8.7, priceMin: 109_000, priceMax: 139_000, slug: 'skintific-vit-c-eye-cream', affiliateUrl: 'https://shopee.co.id/Skintific-Vitamin-C-Eye-Cream-20g-i.201869466.6789054321' },
    { image: 'https://images.unsplash.com/photo-1629380108574-40c083555579?w=600&h=600&fit=crop&auto=format', title: 'Garnier Bright Complete Vitamin C Eye Cream', category: 'eyecare', rating: 8.4, priceMin: 65_000, priceMax: 89_000, slug: 'garnier-bright-eye-cream', affiliateUrl: 'https://shopee.co.id/Garnier-Bright-Complete-Vitamin-C-Eye-Cream-15ml-i.7291847.7890165432' },
  ],
  bodycare: [
    { image: 'https://images.unsplash.com/photo-1709551265087-b51442b4fc66?w=600&h=600&fit=crop&auto=format', title: 'Scarlett Whitening Shower Scrub 300ml', category: 'bodycare', rating: 9.1, priceMin: 55_000, priceMax: 79_000, slug: 'scarlett-shower-scrub', affiliateUrl: 'https://shopee.co.id/Scarlett-Whitening-Shower-Scrub-300ml-i.77382617.8901276543' },
  ],
}

// ── Static lookups ─────────────────────────────────────────────────────────

export function getStaticProduct(slug: string): ProductCardProps | null {
  for (const products of Object.values(CATEGORY_FALLBACK)) {
    const found = products.find((p) => p.slug === slug)
    if (found) return found
  }
  return null
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
