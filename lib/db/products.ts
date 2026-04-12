import { prisma } from '@/lib/prisma'
import type { ProductCardProps, CategorySlug } from '@/types'

// ── Fallback data (used when DB is not yet connected) ──────────────────────

const TRENDING_FALLBACK: ProductCardProps[] = [
  { image: '', title: 'Samsung Galaxy S25 Ultra', category: 'gadget', rating: 9.2, priceMin: 18_999_000, priceMax: 21_999_000, slug: 'samsung-galaxy-s25-ultra', affiliateUrl: 'https://shopee.co.id' },
  { image: '', title: 'Adidas Ultraboost 24', category: 'olahraga', rating: 8.8, priceMin: 1_899_000, priceMax: 2_200_000, slug: 'adidas-ultraboost-24', affiliateUrl: 'https://tokopedia.com' },
  { image: '', title: 'Dyson Airwrap Complete Long', category: 'kecantikan', rating: 9.5, priceMin: 7_999_000, slug: 'dyson-airwrap-complete', affiliateUrl: 'https://lazada.co.id' },
]

const CATEGORY_FALLBACK: Record<CategorySlug, ProductCardProps[]> = {
  gadget: [
    { image: '', title: 'Samsung Galaxy S25 Ultra', category: 'gadget', rating: 9.2, priceMin: 18_999_000, priceMax: 21_999_000, slug: 'samsung-galaxy-s25-ultra', affiliateUrl: '#' },
    { image: '', title: 'iPhone 16 Pro Max 256GB', category: 'gadget', rating: 9.0, priceMin: 22_000_000, priceMax: 24_500_000, slug: 'iphone-16-pro-max', affiliateUrl: '#' },
    { image: '', title: 'Xiaomi 14T Pro 12/256GB', category: 'gadget', rating: 8.5, priceMin: 8_499_000, priceMax: 9_999_000, slug: 'xiaomi-14t-pro', affiliateUrl: '#' },
    { image: '', title: 'Sony WH-1000XM5 Headphone', category: 'gadget', rating: 9.3, priceMin: 4_199_000, priceMax: 4_999_000, slug: 'sony-wh-1000xm5', affiliateUrl: '#' },
    { image: '', title: 'MacBook Air M3 13"', category: 'gadget', rating: 9.4, priceMin: 16_999_000, priceMax: 18_999_000, slug: 'macbook-air-m3', affiliateUrl: '#' },
    { image: '', title: 'iPad Pro M4 11" WiFi', category: 'gadget', rating: 9.1, priceMin: 14_999_000, priceMax: 16_499_000, slug: 'ipad-pro-m4', affiliateUrl: '#' },
    { image: '', title: 'Redmi Note 13 Pro+ 12/512GB', category: 'gadget', rating: 8.2, priceMin: 5_199_000, priceMax: 6_299_000, slug: 'redmi-note-13-pro', affiliateUrl: '#' },
    { image: '', title: 'Samsung Galaxy Tab S9 FE', category: 'gadget', rating: 7.8, priceMin: 6_999_000, priceMax: 7_999_000, slug: 'samsung-galaxy-tab-s9-fe', affiliateUrl: '#' },
    { image: '', title: 'Anker 737 Power Bank 24000mAh', category: 'gadget', rating: 8.6, priceMin: 1_299_000, slug: 'anker-737-powerbank', affiliateUrl: '#' },
  ],
  fashion: [
    { image: '', title: 'Uniqlo Ultra Light Down Jacket', category: 'fashion', rating: 8.8, priceMin: 799_000, priceMax: 999_000, slug: 'uniqlo-ultra-light-down', affiliateUrl: '#' },
    { image: '', title: 'Nike Air Force 1 Low White', category: 'fashion', rating: 9.0, priceMin: 1_399_000, priceMax: 1_699_000, slug: 'nike-air-force-1-low', affiliateUrl: '#' },
    { image: '', title: "Levi's 511 Slim Fit Jeans", category: 'fashion', rating: 8.4, priceMin: 699_000, priceMax: 899_000, slug: 'levis-511-slim-jeans', affiliateUrl: '#' },
    { image: '', title: 'Zara Oversized Blazer 2026', category: 'fashion', rating: 8.1, priceMin: 599_000, priceMax: 799_000, slug: 'zara-oversized-blazer-2026', affiliateUrl: '#' },
    { image: '', title: 'Adidas Stan Smith Collegiate Green', category: 'fashion', rating: 8.7, priceMin: 999_000, priceMax: 1_299_000, slug: 'adidas-stan-smith-green', affiliateUrl: '#' },
    { image: '', title: 'H&M Basic Turtleneck Knit', category: 'fashion', rating: 7.9, priceMin: 249_000, priceMax: 349_000, slug: 'hm-basic-turtleneck', affiliateUrl: '#' },
    { image: '', title: 'Coach Tabby 26 Shoulder Bag', category: 'fashion', rating: 9.2, priceMin: 5_499_000, priceMax: 6_299_000, slug: 'coach-tabby-26', affiliateUrl: '#' },
    { image: '', title: 'Converse Chuck Taylor All Star', category: 'fashion', rating: 8.3, priceMin: 799_000, priceMax: 999_000, slug: 'converse-chuck-taylor', affiliateUrl: '#' },
    { image: '', title: 'Tenun Ikat NTT Premium Scarf', category: 'fashion', rating: 8.9, priceMin: 450_000, priceMax: 650_000, slug: 'tenun-ikat-ntt-scarf', affiliateUrl: '#' },
  ],
  kesehatan: [
    { image: '', title: 'Blackmores Probiotics+ Daily 30 Kapsul', category: 'kesehatan', rating: 8.6, priceMin: 299_000, priceMax: 349_000, slug: 'blackmores-probiotics-daily', affiliateUrl: '#' },
    { image: '', title: 'Omron HEM-7156T Tensimeter Digital', category: 'kesehatan', rating: 9.1, priceMin: 799_000, priceMax: 899_000, slug: 'omron-hem-7156t', affiliateUrl: '#' },
    { image: '', title: 'Nature Republic Aloe Vera 92% Gel', category: 'kesehatan', rating: 8.3, priceMin: 79_000, priceMax: 99_000, slug: 'nature-republic-aloe-gel', affiliateUrl: '#' },
    { image: '', title: "Scott's DHA Gummies Omega-3 Anak", category: 'kesehatan', rating: 8.5, priceMin: 149_000, priceMax: 179_000, slug: 'scotts-dha-gummies', affiliateUrl: '#' },
    { image: '', title: 'Garmin Forerunner 165 GPS Watch', category: 'kesehatan', rating: 8.9, priceMin: 3_799_000, priceMax: 4_299_000, slug: 'garmin-forerunner-165', affiliateUrl: '#' },
    { image: '', title: 'Xiaomi Mi Smart Scale 2 Pro', category: 'kesehatan', rating: 8.2, priceMin: 299_000, priceMax: 399_000, slug: 'xiaomi-mi-scale-2-pro', affiliateUrl: '#' },
    { image: '', title: 'Avoskin Your Skin Bae Toner 100ml', category: 'kesehatan', rating: 8.7, priceMin: 179_000, priceMax: 229_000, slug: 'avoskin-skin-bae-toner', affiliateUrl: '#' },
    { image: '', title: 'Herbalife Formula 1 Vanilla 550g', category: 'kesehatan', rating: 7.8, priceMin: 499_000, priceMax: 599_000, slug: 'herbalife-formula-1-vanilla', affiliateUrl: '#' },
    { image: '', title: 'Nestle Milo 3in1 Active Go 30s', category: 'kesehatan', rating: 8.0, priceMin: 89_000, priceMax: 109_000, slug: 'nestle-milo-3in1', affiliateUrl: '#' },
  ],
  travel: [
    { image: '', title: 'Samsonite Omni Max 75cm Hardside', category: 'travel', rating: 9.0, priceMin: 4_499_000, priceMax: 5_499_000, slug: 'samsonite-omni-max-75', affiliateUrl: '#' },
    { image: '', title: 'Osprey Farpoint 40L Travel Pack', category: 'travel', rating: 9.2, priceMin: 2_799_000, priceMax: 3_299_000, slug: 'osprey-farpoint-40', affiliateUrl: '#' },
    { image: '', title: 'Sony ZV-1F Vlog Camera', category: 'travel', rating: 8.8, priceMin: 5_499_000, priceMax: 6_299_000, slug: 'sony-zv-1f-vlog', affiliateUrl: '#' },
    { image: '', title: 'Delsey Paris Chatelet Air 2.0 55cm', category: 'travel', rating: 8.6, priceMin: 3_199_000, priceMax: 3_799_000, slug: 'delsey-chatelet-55', affiliateUrl: '#' },
    { image: '', title: 'GoPro Hero 12 Black Action Camera', category: 'travel', rating: 9.1, priceMin: 6_199_000, priceMax: 6_999_000, slug: 'gopro-hero-12-black', affiliateUrl: '#' },
    { image: '', title: 'Pacsafe Venturesafe 65L EXP Pack', category: 'travel', rating: 8.4, priceMin: 2_499_000, priceMax: 2_999_000, slug: 'pacsafe-venturesafe-65', affiliateUrl: '#' },
    { image: '', title: 'Anker 511 PowerCore 20000mAh PD', category: 'travel', rating: 8.7, priceMin: 599_000, priceMax: 699_000, slug: 'anker-511-powercore', affiliateUrl: '#' },
    { image: '', title: 'Victorinox Swiss Army Knife Classic', category: 'travel', rating: 8.3, priceMin: 249_000, priceMax: 349_000, slug: 'victorinox-swiss-army-classic', affiliateUrl: '#' },
    { image: '', title: 'Bose QuietComfort 45 Travel Edition', category: 'travel', rating: 9.0, priceMin: 4_999_000, priceMax: 5_499_000, slug: 'bose-qc45-travel', affiliateUrl: '#' },
  ],
  rumah: [
    { image: '', title: 'Modena Kuro 3D Induction Cooker', category: 'rumah', rating: 8.7, priceMin: 1_899_000, priceMax: 2_299_000, slug: 'modena-kuro-3d-induction', affiliateUrl: '#' },
    { image: '', title: 'IKEA HEMNES Daybed Frame White', category: 'rumah', rating: 8.4, priceMin: 3_999_000, priceMax: 4_599_000, slug: 'ikea-hemnes-daybed', affiliateUrl: '#' },
    { image: '', title: 'Philips HD9252 Air Fryer 3L', category: 'rumah', rating: 8.9, priceMin: 1_299_000, priceMax: 1_599_000, slug: 'philips-air-fryer-3l', affiliateUrl: '#' },
    { image: '', title: 'IKEA KALLAX Shelving Unit 4x4', category: 'rumah', rating: 8.5, priceMin: 2_499_000, priceMax: 2_999_000, slug: 'ikea-kallax-4x4', affiliateUrl: '#' },
    { image: '', title: 'Dyson V15 Detect Cordless Vacuum', category: 'rumah', rating: 9.3, priceMin: 10_999_000, priceMax: 12_499_000, slug: 'dyson-v15-detect', affiliateUrl: '#' },
    { image: '', title: 'Pensonic Robotic Vacuum Cleaner Pro', category: 'rumah', rating: 8.1, priceMin: 1_499_000, priceMax: 1_899_000, slug: 'pensonic-robovac-pro', affiliateUrl: '#' },
    { image: '', title: 'Nanit Pro Smart Baby Monitor', category: 'rumah', rating: 8.8, priceMin: 5_999_000, priceMax: 6_999_000, slug: 'nanit-pro-baby-monitor', affiliateUrl: '#' },
    { image: '', title: 'Cornell 24L Microwave Oven Grill', category: 'rumah', rating: 8.2, priceMin: 799_000, priceMax: 999_000, slug: 'cornell-24l-microwave', affiliateUrl: '#' },
    { image: '', title: 'Tanamera Coffee Signature Blend 250g', category: 'rumah', rating: 8.6, priceMin: 129_000, priceMax: 159_000, slug: 'tanamera-signature-blend', affiliateUrl: '#' },
  ],
  kecantikan: [
    { image: '', title: 'Dyson Airwrap Complete Long 2026', category: 'kecantikan', rating: 9.5, priceMin: 7_999_000, slug: 'dyson-airwrap-complete', affiliateUrl: '#' },
    { image: '', title: 'Wardah Lightening Serum 20ml', category: 'kecantikan', rating: 8.3, priceMin: 89_000, priceMax: 119_000, slug: 'wardah-lightening-serum', affiliateUrl: '#' },
    { image: '', title: 'La Mer The Moisturizing Cream 60ml', category: 'kecantikan', rating: 9.0, priceMin: 3_999_000, priceMax: 4_499_000, slug: 'la-mer-moisturizing-cream', affiliateUrl: '#' },
    { image: '', title: 'Emina Bright Stuff Face Toner 100ml', category: 'kecantikan', rating: 8.1, priceMin: 35_000, priceMax: 49_000, slug: 'emina-bright-stuff-toner', affiliateUrl: '#' },
    { image: '', title: 'Somethinc 10% Niacinamide Serum', category: 'kecantikan', rating: 8.7, priceMin: 159_000, priceMax: 199_000, slug: 'somethinc-niacinamide-serum', affiliateUrl: '#' },
    { image: '', title: 'Make Over Ultra Hi-Matte Lip 3.8g', category: 'kecantikan', rating: 8.4, priceMin: 99_000, priceMax: 139_000, slug: 'makeover-ultra-hi-matte', affiliateUrl: '#' },
    { image: '', title: 'Skin1004 Madagascar Centella Serum', category: 'kecantikan', rating: 8.9, priceMin: 249_000, priceMax: 299_000, slug: 'skin1004-centella-serum', affiliateUrl: '#' },
    { image: '', title: 'BIOAQUA Pearl Facial Mask Set 10pcs', category: 'kecantikan', rating: 7.9, priceMin: 79_000, priceMax: 99_000, slug: 'bioaqua-pearl-mask', affiliateUrl: '#' },
    { image: '', title: 'Maybelline Sky High Mascara', category: 'kecantikan', rating: 8.6, priceMin: 129_000, priceMax: 159_000, slug: 'maybelline-sky-high', affiliateUrl: '#' },
  ],
  olahraga: [
    { image: '', title: 'Adidas Ultraboost 24 Running Shoes', category: 'olahraga', rating: 8.8, priceMin: 1_899_000, priceMax: 2_200_000, slug: 'adidas-ultraboost-24', affiliateUrl: '#' },
    { image: '', title: 'Nike Dri-FIT Training Set Pria', category: 'olahraga', rating: 8.3, priceMin: 599_000, priceMax: 799_000, slug: 'nike-dri-fit-training-set', affiliateUrl: '#' },
    { image: '', title: 'EIGER Vertical Trekking Pole Pair', category: 'olahraga', rating: 8.6, priceMin: 499_000, priceMax: 699_000, slug: 'eiger-trekking-pole', affiliateUrl: '#' },
    { image: '', title: 'Garmin Forerunner 165 GPS Watch', category: 'olahraga', rating: 8.9, priceMin: 3_799_000, priceMax: 4_299_000, slug: 'garmin-forerunner-165-sport', affiliateUrl: '#' },
    { image: '', title: 'Optimum Nutrition Gold Standard Whey', category: 'olahraga', rating: 9.0, priceMin: 699_000, priceMax: 849_000, slug: 'on-gold-standard-whey', affiliateUrl: '#' },
    { image: '', title: 'Kettlebell Cast Iron 12kg Vinyl', category: 'olahraga', rating: 8.4, priceMin: 299_000, priceMax: 399_000, slug: 'kettlebell-12kg-vinyl', affiliateUrl: '#' },
    { image: '', title: 'New Balance Fresh Foam X 1080v13', category: 'olahraga', rating: 8.7, priceMin: 2_199_000, priceMax: 2_699_000, slug: 'nb-fresh-foam-1080v13', affiliateUrl: '#' },
    { image: '', title: 'Specs Rebel Running Shoes Pria', category: 'olahraga', rating: 8.0, priceMin: 499_000, priceMax: 649_000, slug: 'specs-rebel-running', affiliateUrl: '#' },
    { image: '', title: 'Under Armour UA Rush Seamless Tight', category: 'olahraga', rating: 8.5, priceMin: 699_000, priceMax: 899_000, slug: 'ua-rush-seamless-tight', affiliateUrl: '#' },
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
