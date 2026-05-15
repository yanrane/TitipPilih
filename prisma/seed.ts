import { config } from 'dotenv'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

config()

const connectionString = process.env.DATABASE_URL
if (!connectionString) {
  console.error('❌ DATABASE_URL is required for seeding')
  process.exit(1)
}

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('🌱 Seeding skincare database...')

  // ── Hapus data lama ──────────────────────────────────────────────────────
  await prisma.review.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()
  await prisma.kurator.deleteMany()
  await prisma.recipient.deleteMany()
  await prisma.donationWeek.deleteMany()
  console.log('✓ Cleared old data')

  // ── 1. Kurator ───────────────────────────────────────────────────────────
  const maya = await prisma.kurator.create({
    data: {
      name: 'Maya Putri',
      role: 'Skincare Curator',
      bio: 'Spesialis skincare dengan 5 tahun pengalaman merumuskan rutinitas perawatan kulit untuk iklim tropis Indonesia.',
      initials: 'MP',
      accentColor: 'text-rose-400 bg-rose-500/20 border-rose-500/30',
      categories: ['serum', 'sunscreen', 'toner'],
    },
  })

  const sari = await prisma.kurator.create({
    data: {
      name: 'Sari Indah',
      role: 'Beauty Reviewer',
      bio: 'Beauty enthusiast yang fokus pada produk skincare lokal Indonesia dengan skin type combination-oily.',
      initials: 'SI',
      accentColor: 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30',
      categories: ['moisturizer', 'cleanser', 'eyecare'],
    },
  })
  console.log('✓ Kurators created')

  // ── 2. Categories ────────────────────────────────────────────────────────
  await Promise.all([
    prisma.category.create({ data: { slug: 'serum', label: 'Serum', description: 'Serum skincare terbaik untuk kulit cerah, lembab, dan bebas jerawat.' } }),
    prisma.category.create({ data: { slug: 'moisturizer', label: 'Moisturizer', description: 'Pelembab wajah terbaik untuk menjaga hidrasi dan skin barrier.' } }),
    prisma.category.create({ data: { slug: 'sunscreen', label: 'Sunscreen', description: 'Sunscreen terbaik untuk iklim tropis Indonesia.' } }),
    prisma.category.create({ data: { slug: 'cleanser', label: 'Pembersih', description: 'Sabun cuci muka terbaik untuk kulit bersih tanpa rusak skin barrier.' } }),
    prisma.category.create({ data: { slug: 'toner', label: 'Toner', description: 'Toner skincare untuk pH balance dan persiapan serum.' } }),
    prisma.category.create({ data: { slug: 'eyecare', label: 'Perawatan Mata', description: 'Krim mata terbaik untuk kantung mata dan kerutan.' } }),
    prisma.category.create({ data: { slug: 'bodycare', label: 'Body Care', description: 'Produk perawatan tubuh terbaik untuk kulit cerah dan lembab.' } }),
  ])
  console.log('✓ 7 skincare categories created')

  // ── 3. Products ──────────────────────────────────────────────────────────
  const products = await Promise.all([
    // Serum
    prisma.product.create({ data: { slug: 'somethinc-niacinamide-serum', title: 'Somethinc Niacinamide + Moisture Beet Serum 20ml', image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=600&fit=crop&auto=format', categorySlug: 'serum', rating: 9.1, priceMin: 89000, priceMax: 159000, affiliateUrl: 'https://shopee.co.id/Somethinc-Niacinamide-Moisture-Beet-Serum-20ml-i.138273726.2345678901', trending: true } }),
    prisma.product.create({ data: { slug: 'scarlett-brightening-serum', title: 'Scarlett Whitening Brightening Serum Vitamin C 40ml', image: 'https://images.unsplash.com/photo-1576426863848-c21f53c60b19?w=600&h=600&fit=crop&auto=format', categorySlug: 'serum', rating: 8.9, priceMin: 55000, priceMax: 85000, affiliateUrl: 'https://shopee.co.id/Scarlett-Whitening-Brightening-Serum-40ml-i.77382617.3456789012', trending: false } }),
    prisma.product.create({ data: { slug: 'avoskin-miraculous-retinol', title: 'Avoskin Miraculous Retinol Serum 0.1% 20ml', image: 'https://images.unsplash.com/photo-1627811015433-368c148f6c3c?w=600&h=600&fit=crop&auto=format', categorySlug: 'serum', rating: 8.7, priceMin: 179000, priceMax: 220000, affiliateUrl: 'https://shopee.co.id/Avoskin-Miraculous-Retinol-Serum-0.1-20ml-i.96345871.1234567890', trending: false } }),
    prisma.product.create({ data: { slug: 'garnier-bright-vit-c-serum', title: 'Garnier Bright Complete Vitamin C Serum 30ml', image: 'https://images.unsplash.com/photo-1573575155376-b5010099301b?w=600&h=600&fit=crop&auto=format', categorySlug: 'serum', rating: 8.5, priceMin: 59000, priceMax: 89000, affiliateUrl: 'https://shopee.co.id/Garnier-Bright-Complete-Vitamin-C-Serum-30ml-i.7291847.4567890123', trending: false } }),
    prisma.product.create({ data: { slug: 'glow-fx-glow-bomb-serum', title: 'GLOW FX Glow Bomb Serum 20ml — 19% Brightening Power', image: 'https://images.unsplash.com/photo-1619166855062-f63c187def3d?w=600&h=600&fit=crop&auto=format', categorySlug: 'serum', rating: 8.8, priceMin: 49000, priceMax: 59900, affiliateUrl: 'https://shopee.co.id/GLOW-FX-Glow-Bomb-Serum-20ml-19-Brightening-Power-Serum-Glowing-Samarkan-Noda-Hitam-Bekas-Jerawat-i.1418365655.51209633461', trending: false } }),
    prisma.product.create({ data: { slug: 'garnier-vit-c-booster-serum', title: 'Garnier Bright Complete Vitamin C Booster Serum 30ml', image: 'https://images.unsplash.com/photo-1676809180101-1f215d615829?w=600&h=600&fit=crop&auto=format', categorySlug: 'serum', rating: 8.8, priceMin: 15000, priceMax: 19800, affiliateUrl: 'https://shopee.co.id/Terlaris-GARNIER-Bright-Complete-Vitamin-C-Booster-Serum-Mencerahkan-Noda-Hitam-30ml-i.1104427895.53306242263', trending: false } }),
    prisma.product.create({ data: { slug: 'glad2glow-3pcs-serum-bundle', title: 'Glad2Glow 3PCS Serum Bundle — Niacinamide + AHA + Retinol', image: 'https://images.unsplash.com/photo-1680537260333-20fd95432044?w=600&h=600&fit=crop&auto=format', categorySlug: 'serum', rating: 9.1, priceMin: 89000, priceMax: 101500, affiliateUrl: 'https://shopee.co.id/-100-ORI-Glad2Glow-3PCS-Facial-Serum-Essence-Pomegranate-Niacinamide-Power-Bright-Serum-Centella-Salicylic-Acid-Acne-Serum-Peach-Retinol-Serum-377-Dark-Spot-Serum-PEELING-SOLUTION-g2g-glad2glow-official-store-i.1447314129.27382396572', trending: false } }),
    prisma.product.create({ data: { slug: 'glowfx-serum-bundle', title: 'GLOWFX Bundle Serum — Glow Bomb + Acne Pure', image: 'https://images.unsplash.com/photo-1741896135490-4062a3b21abf?w=600&h=600&fit=crop&auto=format', categorySlug: 'serum', rating: 9.1, priceMin: 99000, priceMax: 127200, affiliateUrl: 'https://shopee.co.id/(ADA-BUNDLING!!)-GLOWFX-Glow-fx-Serum-Series-Glow-Bomb-Serum-Acne-Pure-Serum-berbarcode-i.5474744.27961990732', trending: false } }),
    prisma.product.create({ data: { slug: 'skintific-niacinamide-10-serum', title: 'Skintific Niacinamide 10% Brightening Face Serum', image: 'https://images.unsplash.com/photo-1643379850623-7eb6442cd262?w=600&h=600&fit=crop&auto=format', categorySlug: 'serum', rating: 9.5, priceMin: 69000, priceMax: 83200, affiliateUrl: 'https://shopee.co.id/Serum-Wajah-Skintific-Niacinamide-10-Mencerahkan-Menyamarkan-Noda-Hitam-Menghaluskan-Kulit-i.1316425009.54558936639', trending: true } }),
    prisma.product.create({ data: { slug: 'hanasui-power-bright-serum', title: 'Hanasui Power Bright Expert Serum Niacinamide 10%', image: 'https://images.unsplash.com/photo-1643379850274-77d2e3703ef9?w=600&h=600&fit=crop&auto=format', categorySlug: 'serum', rating: 9.1, priceMin: 29000, priceMax: 36500, affiliateUrl: 'https://shopee.co.id/(REAL-10-ADVANCE-NIACINAMIDE)-Hanasui-Power-Bright-Expert-Serum-Mencerahkan-Kurangi-Bintik-Hitam-Bekas-Jerawat-i.129681299.20628506418', trending: false } }),
    prisma.product.create({ data: { slug: 'glad2glow-aha-bha-pha-peeling', title: 'Glad2Glow AHA BHA PHA Intensive Peeling Solution Serum', image: 'https://images.unsplash.com/photo-1643747394944-89b11e7fb616?w=600&h=600&fit=crop&auto=format', categorySlug: 'serum', rating: 8.4, priceMin: 24000, priceMax: 30400, affiliateUrl: 'https://shopee.co.id/-SALE-GLAD2GLOW-AHA-BHA-PHA-Intensive-Peeling-Solution-Serum-Lactic-Acid-Serum-Exfoliasi-Wajah-i.1563427312.42407480877', trending: false } }),
    prisma.product.create({ data: { slug: 'hanasui-brightening-serum', title: 'Hanasui Brightening Serum Wajah 20ml', image: 'https://images.unsplash.com/photo-1643379852776-308d9bbf8645?w=600&h=600&fit=crop&auto=format', categorySlug: 'serum', rating: 9.1, priceMin: 15000, priceMax: 20000, affiliateUrl: 'https://shopee.co.id/*-FELIZ-*-HANASUI-Serum-20ml-i.383972992.13426953301', trending: false } }),
    prisma.product.create({ data: { slug: 'whitelab-n10-niacinamide-serum', title: 'Whitelab N10-Dose+ Intense Brightening Serum Niacinamide 10%', image: 'https://images.unsplash.com/photo-1638301868496-43577744a46c?w=600&h=600&fit=crop&auto=format', categorySlug: 'serum', rating: 8.8, priceMin: 15000, priceMax: 19200, affiliateUrl: 'https://shopee.co.id/WHITELAB-N10-Dose-Intense-Brightening-Serum-Niacinamide-10-Mencerahkan-Melembabkan-XX340-i.1546760103.26436837925', trending: false } }),
    prisma.product.create({ data: { slug: 'nutrishe-intensive-bright-glow-serum', title: 'Nutrishe Intensive Bright & Glow Serum (Halal)', image: 'https://images.unsplash.com/photo-1605204359736-9a08b7175fc7?w=600&h=600&fit=crop&auto=format', categorySlug: 'serum', rating: 9.1, priceMin: 95000, priceMax: 117000, affiliateUrl: 'https://shopee.co.id/(HALAL)-Nutrishe-Intensive-Bright-Glow-Serum-i.593789.4546230356', trending: false } }),
    prisma.product.create({ data: { slug: 'originote-niacinamide-10-serum', title: 'The Originote Niacinamide 10% Brightening Serum', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=600&fit=crop&auto=format', categorySlug: 'serum', rating: 9.1, priceMin: 29000, priceMax: 38000, affiliateUrl: 'https://shopee.co.id/The-Originote-Niacinamide-10-Serum-Serum-Brightening-untuk-Mencerahkan-Wajah-Meratakan-Warna-Kulit-Wajah-Menyamarkan-Dark-Spot-Noda-Hitam-Serum-Muka-dengan-Niacinamide-i.710619388.10489363768', trending: false } }),
    prisma.product.create({ data: { slug: 'camille-happy-joy-serum', title: 'Camille Happy Joy Brightening Face Serum', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=600&fit=crop&auto=format', categorySlug: 'serum', rating: 8.5, priceMin: 70000, priceMax: 85000, affiliateUrl: 'https://shopee.co.id/Camille-Happy-Joy-Serum-i.975924137.49703409756', trending: false } }),
    prisma.product.create({ data: { slug: 'serum-anti-aging-botox-effect', title: 'Serum Anti-Aging Botox Effect Pengencang Wajah Instan', image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&h=600&fit=crop&auto=format', categorySlug: 'serum', rating: 9.5, priceMin: 30000, priceMax: 37200, affiliateUrl: 'https://shopee.co.id/-Pengurangan-Kerutan-Instan-Serum-Botox-Perawatan-Wajah-AntiPenuaan-untuk-Garis-Dahi-Lipatan-Nasolabial-Kerutan-Esensi-Pengencang-yang-Cepat-Meresap-Serum-Botox-AntiKerutan-Pengencang-Wajah-Penyerapan-Cepat-Perawatan-Kerutan-i.1457617205.42577749596', trending: false } }),
    // Moisturizer
    prisma.product.create({ data: { slug: 'skintific-barrier-cream', title: 'Skintific 5% Niacinamide Barrier Moisture Gel Cream 30g', image: 'https://images.unsplash.com/photo-1638609927040-8a7e97cd9d6a?w=600&h=600&fit=crop&auto=format', categorySlug: 'moisturizer', rating: 9.3, priceMin: 119000, priceMax: 149000, affiliateUrl: 'https://shopee.co.id/Skintific-5-Niacinamide-Barrier-Moisture-Gel-Cream-30g-i.201869466.7654321098', trending: true } }),
    prisma.product.create({ data: { slug: 'emina-bright-stuff-cream', title: 'Emina Bright Stuff Moisturizing Cream 20ml', image: 'https://images.unsplash.com/photo-1629732047847-50219e9c5aef?w=600&h=600&fit=crop&auto=format', categorySlug: 'moisturizer', rating: 8.4, priceMin: 25000, priceMax: 35000, affiliateUrl: 'https://shopee.co.id/Emina-Bright-Stuff-Moisturizing-Cream-20ml-i.14728364.5678901234', trending: false } }),
    prisma.product.create({ data: { slug: 'wardah-aloe-vera-gel', title: 'Wardah Aloe Vera Gel 100ml', image: 'https://images.unsplash.com/photo-1519415943484-9fa1873496d4?w=600&h=600&fit=crop&auto=format', categorySlug: 'moisturizer', rating: 8.6, priceMin: 29000, priceMax: 45000, affiliateUrl: 'https://shopee.co.id/Wardah-Aloe-Vera-Gel-100ml-i.4829173.6789012345', trending: false } }),
    prisma.product.create({ data: { slug: 'bio-beauty-lab-collagen', title: 'Bio Beauty Lab Collagen Series Moisturizer 30g', image: 'https://images.unsplash.com/photo-1629380108660-bd39c778a721?w=600&h=600&fit=crop&auto=format', categorySlug: 'moisturizer', rating: 8.8, priceMin: 89000, priceMax: 115000, affiliateUrl: 'https://shopee.co.id/Bio-Beauty-Lab-Collagen-Series-Moisturizer-30g-i.28193746.7890123456', trending: false } }),
    // Sunscreen
    prisma.product.create({ data: { slug: 'azarine-hydrasoothe-spf45', title: 'Azarine Hydrasoothe Sunscreen Gel SPF45 PA++++ 50ml', image: 'https://images.unsplash.com/photo-1598662972299-5408ddb8a3dc?w=600&h=600&fit=crop&auto=format', categorySlug: 'sunscreen', rating: 9.4, priceMin: 49000, priceMax: 69000, affiliateUrl: 'https://shopee.co.id/Azarine-Hydrasoothe-Sunscreen-Gel-SPF45-PA-50ml-i.138273726.3290987654', trending: true } }),
    prisma.product.create({ data: { slug: 'skintific-mineral-spf50', title: 'Skintific Aqua Light Mineral Sunscreen SPF50+ PA++++ 30g', image: 'https://images.unsplash.com/photo-1598662957563-ee4965d4d72c?w=600&h=600&fit=crop&auto=format', categorySlug: 'sunscreen', rating: 9.0, priceMin: 89000, priceMax: 119000, affiliateUrl: 'https://shopee.co.id/Skintific-Aqua-Light-Mineral-Sunscreen-SPF50-30g-i.201869466.8901234567', trending: false } }),
    prisma.product.create({ data: { slug: 'wardah-uv-shield-spf30', title: 'Wardah UV Shield Essential Sunscreen SPF30 PA+++ 40ml', image: 'https://images.unsplash.com/photo-1662729182165-3612bfed89f4?w=600&h=600&fit=crop&auto=format', categorySlug: 'sunscreen', rating: 8.5, priceMin: 35000, priceMax: 55000, affiliateUrl: 'https://shopee.co.id/Wardah-UV-Shield-Essential-Sunscreen-SPF30-PA-40ml-i.4829173.9012345678', trending: false } }),
    // Cleanser
    prisma.product.create({ data: { slug: 'cetaphil-gentle-cleanser', title: 'Cetaphil Gentle Skin Cleanser 250ml', image: 'https://images.unsplash.com/photo-1739285094922-e3c6cf72d470?w=600&h=600&fit=crop&auto=format', categorySlug: 'cleanser', rating: 9.2, priceMin: 89000, priceMax: 119000, affiliateUrl: 'https://shopee.co.id/Cetaphil-Gentle-Skin-Cleanser-250ml-i.43291847.0123456789', trending: false } }),
    prisma.product.create({ data: { slug: 'hada-labo-hydrating-cleanser', title: 'Hada Labo Gokujyun Hyaluronic Acid Face Wash 100g', image: 'https://images.unsplash.com/photo-1556228994-efb7c88fa0f9?w=600&h=600&fit=crop&auto=format', categorySlug: 'cleanser', rating: 9.0, priceMin: 79000, priceMax: 109000, affiliateUrl: 'https://shopee.co.id/Hada-Labo-Gokujyun-Hyaluronic-Acid-Face-Wash-100g-i.19283746.1234509876', trending: false } }),
    prisma.product.create({ data: { slug: 'emina-bright-stuff-facewash', title: 'Emina Bright Stuff Face Wash 100ml', image: 'https://images.unsplash.com/photo-1556227702-b89ac3b94ff9?w=600&h=600&fit=crop&auto=format', categorySlug: 'cleanser', rating: 8.3, priceMin: 22000, priceMax: 32000, affiliateUrl: 'https://shopee.co.id/Emina-Bright-Stuff-Face-Wash-100ml-i.14728364.2345610987', trending: false } }),
    // Toner
    prisma.product.create({ data: { slug: 'somethinc-aha-bha-toner', title: 'Somethinc AHA BHA PHA Toner 2% 100ml', image: 'https://images.unsplash.com/photo-1770717984643-2a1545902579?w=600&h=600&fit=crop&auto=format', categorySlug: 'toner', rating: 8.8, priceMin: 115000, priceMax: 145000, affiliateUrl: 'https://shopee.co.id/Somethinc-AHA-BHA-PHA-Toner-2-100ml-i.138273726.3456721098', trending: false } }),
    prisma.product.create({ data: { slug: 'skintific-mugwort-toner', title: 'Skintific Mugwort Pore Toner 100ml', image: 'https://images.unsplash.com/photo-1770717984650-21665d4362b9?w=600&h=600&fit=crop&auto=format', categorySlug: 'toner', rating: 8.9, priceMin: 89000, priceMax: 119000, affiliateUrl: 'https://shopee.co.id/Skintific-Mugwort-Pore-Toner-100ml-i.201869466.4567832109', trending: false } }),
    prisma.product.create({ data: { slug: 'dear-me-barrier-toner', title: 'Dear Me Beauty Barrier Booster Toner 100ml', image: 'https://images.unsplash.com/photo-1770717984664-1c266191d8e4?w=600&h=600&fit=crop&auto=format', categorySlug: 'toner', rating: 8.6, priceMin: 99000, priceMax: 129000, affiliateUrl: 'https://shopee.co.id/Dear-Me-Beauty-Barrier-Booster-Toner-100ml-i.63829174.5678943210', trending: false } }),
    // Eye care
    prisma.product.create({ data: { slug: 'skintific-vit-c-eye-cream', title: 'Skintific Vitamin C Brightening Eye Cream 20g', image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&h=600&fit=crop&auto=format', categorySlug: 'eyecare', rating: 8.7, priceMin: 109000, priceMax: 139000, affiliateUrl: 'https://shopee.co.id/Skintific-Vitamin-C-Eye-Cream-20g-i.201869466.6789054321', trending: false } }),
    prisma.product.create({ data: { slug: 'garnier-bright-eye-cream', title: 'Garnier Bright Complete Vitamin C Eye Cream 15ml', image: 'https://images.unsplash.com/photo-1629380108574-40c083555579?w=600&h=600&fit=crop&auto=format', categorySlug: 'eyecare', rating: 8.4, priceMin: 65000, priceMax: 89000, affiliateUrl: 'https://shopee.co.id/Garnier-Bright-Complete-Vitamin-C-Eye-Cream-15ml-i.7291847.7890165432', trending: false } }),
    // Body care
    prisma.product.create({ data: { slug: 'scarlett-shower-scrub', title: 'Scarlett Whitening Shower Scrub 300ml', image: 'https://images.unsplash.com/photo-1709551265087-b51442b4fc66?w=600&h=600&fit=crop&auto=format', categorySlug: 'bodycare', rating: 9.1, priceMin: 55000, priceMax: 79000, affiliateUrl: 'https://shopee.co.id/Scarlett-Whitening-Shower-Scrub-300ml-i.77382617.8901276543', trending: false } }),
  ])
  console.log(`✓ ${products.length} products created`)

  // ── 4. Reviews ───────────────────────────────────────────────────────────
  const azarine = products.find(p => p.slug === 'azarine-hydrasoothe-spf45')!
  const skintific = products.find(p => p.slug === 'skintific-barrier-cream')!
  const somethinc = products.find(p => p.slug === 'somethinc-niacinamide-serum')!
  const cetaphil = products.find(p => p.slug === 'cetaphil-gentle-cleanser')!
  const scarlettSerum = products.find(p => p.slug === 'scarlett-brightening-serum')!

  await prisma.review.createMany({
    data: [
      {
        slug: 'azarine-hydrasoothe-spf45',
        title: 'Azarine Hydrasoothe Sunscreen Gel SPF45 PA++++',
        categorySlug: 'sunscreen',
        productId: azarine.id,
        rating: 9.4,
        priceMin: 49000,
        priceMax: 69000,
        affiliateUrl: 'https://shopee.co.id/Azarine-Hydrasoothe-Sunscreen-Gel-SPF45-PA-50ml-i.138273726.3290987654',
        kuratorId: maya.id,
        tanggal: new Date('2026-05-05'),
        estimasiBaca: 8,
        pros: ['Tekstur gel ringan tidak lengket, nyaman di iklim tropis', 'SPF45 PA++++ perlindungan UV sangat baik', 'Tidak meninggalkan white cast', 'Formula Hydrasoothe menjaga kelembaban kulit', 'Harga sangat terjangkau'],
        cons: ['Kandungan alkohol bisa kurang cocok kulit sensitif ekstrem', 'Perlu reapply setiap 2-3 jam', 'Packaging pump rentan tersumbat'],
        published: true,
      },
      {
        slug: 'skintific-barrier-cream',
        title: 'Skintific 5% Niacinamide Barrier Moisture Gel Cream',
        categorySlug: 'moisturizer',
        productId: skintific.id,
        rating: 9.3,
        priceMin: 119000,
        priceMax: 149000,
        affiliateUrl: 'https://shopee.co.id/Skintific-5-Niacinamide-Barrier-Moisture-Gel-Cream-30g-i.201869466.7654321098',
        kuratorId: maya.id,
        tanggal: new Date('2026-05-03'),
        estimasiBaca: 9,
        pros: ['5% Niacinamide efektif meratakan warna kulit', 'Formula gel ringan cocok kulit berminyak', 'Memperkuat skin barrier dengan ceramide', 'Cocok untuk kulit sensitif', 'Paraben-free, cruelty-free'],
        cons: ['Jar packaging kurang higienis', 'Efek brightening terasa setelah 3-4 minggu', 'Ukuran 30g cepat habis'],
        published: true,
      },
      {
        slug: 'somethinc-niacinamide-serum',
        title: 'Somethinc Niacinamide + Moisture Beet Serum 20ml',
        categorySlug: 'serum',
        productId: somethinc.id,
        rating: 9.1,
        priceMin: 89000,
        priceMax: 159000,
        affiliateUrl: 'https://shopee.co.id/Somethinc-Niacinamide-Moisture-Beet-Serum-20ml-i.138273726.2345678901',
        kuratorId: sari.id,
        tanggal: new Date('2026-05-01'),
        estimasiBaca: 10,
        pros: ['Kombinasi Niacinamide + Moisture Beet Extract', 'Tekstur ringan menyerap cepat', 'Perbedaan cerah terlihat dalam 1-2 minggu', 'BPOM Indonesia, aman ibu hamil', 'Brand lokal transparan'],
        cons: ['Niacinamide 10% kuat untuk kulit sangat sensitif', 'Harga varian 40ml cukup mahal', 'Dropper rentan kontaminasi'],
        published: true,
      },
      {
        slug: 'cetaphil-gentle-cleanser',
        title: 'Cetaphil Gentle Skin Cleanser 250ml',
        categorySlug: 'cleanser',
        productId: cetaphil.id,
        rating: 9.2,
        priceMin: 89000,
        priceMax: 119000,
        affiliateUrl: 'https://shopee.co.id/Cetaphil-Gentle-Skin-Cleanser-250ml-i.43291847.0123456789',
        kuratorId: sari.id,
        tanggal: new Date('2026-04-28'),
        estimasiBaca: 7,
        pros: ['Formula ultra-lembut direkomendasikan dermatologis', 'Soap-free, tidak bikin kulit tight', 'pH-balanced menjaga skin barrier', 'Bisa dipakai tanpa air', 'Hypoallergenic untuk kulit sensitif'],
        cons: ['Kurang efektif untuk makeup tebal', 'Beberapa merasa terlalu ringan', 'Harga lebih tinggi dari cleanser lokal'],
        published: true,
      },
      {
        slug: 'scarlett-brightening-serum',
        title: 'Scarlett Whitening Brightening Serum Vit C 40ml',
        categorySlug: 'serum',
        productId: scarlettSerum.id,
        rating: 8.9,
        priceMin: 55000,
        priceMax: 85000,
        affiliateUrl: 'https://shopee.co.id/Scarlett-Whitening-Brightening-Serum-40ml-i.77382617.3456789012',
        kuratorId: sari.id,
        tanggal: new Date('2026-04-22'),
        estimasiBaca: 8,
        pros: ['Vitamin C stable + Niacinamide memperkuat brightening', 'Harga terjangkau untuk kualitas terbukti', 'Lightweight tidak menyumbat pori', 'Efek cerah terasa dalam 2-3 minggu', 'Bottle 40ml value for money'],
        cons: ['Kandungan wangi bisa kurang cocok kulit sensitif', 'Tidak ada Hyaluronic Acid untuk kulit sangat kering', 'Efek whitening bervariasi tiap orang'],
        published: true,
      },
    ],
  })
  console.log('✓ 5 reviews created')

  console.log('\n✅ Skincare seed complete!')
  console.log('   Categories: 7 | Products: 33 | Reviews: 5 | Kurators: 2')
}

main()
  .catch((e) => { console.error('❌ Seed error:', e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
