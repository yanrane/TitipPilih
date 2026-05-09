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
    prisma.product.create({ data: { slug: 'scarlett-brightening-serum', title: 'Scarlett Whitening Brightening Serum Vit C 40ml', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=600&fit=crop&auto=format', categorySlug: 'serum', rating: 8.9, priceMin: 55000, priceMax: 85000, affiliateUrl: 'https://shopee.co.id/Scarlett-Whitening-Brightening-Serum-40ml-i.77382617.3456789012', trending: false } }),
    prisma.product.create({ data: { slug: 'avoskin-miraculous-retinol', title: 'Avoskin Miraculous Retinol Serum 0.1% 20ml', image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&h=600&fit=crop&auto=format', categorySlug: 'serum', rating: 8.7, priceMin: 179000, priceMax: 220000, affiliateUrl: 'https://shopee.co.id/Avoskin-Miraculous-Retinol-Serum-0.1-20ml-i.96345871.1234567890', trending: false } }),
    prisma.product.create({ data: { slug: 'garnier-bright-vit-c-serum', title: 'Garnier Bright Complete Vitamin C Serum 30ml', image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&h=600&fit=crop&auto=format', categorySlug: 'serum', rating: 8.5, priceMin: 59000, priceMax: 89000, affiliateUrl: 'https://shopee.co.id/Garnier-Bright-Complete-Vitamin-C-Serum-30ml-i.7291847.4567890123', trending: false } }),
    // Moisturizer
    prisma.product.create({ data: { slug: 'skintific-barrier-cream', title: 'Skintific 5% Niacinamide Barrier Moisture Gel Cream 30g', image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&h=600&fit=crop&auto=format', categorySlug: 'moisturizer', rating: 9.3, priceMin: 119000, priceMax: 149000, affiliateUrl: 'https://shopee.co.id/Skintific-5-Niacinamide-Barrier-Moisture-Gel-Cream-30g-i.201869466.7654321098', trending: true } }),
    prisma.product.create({ data: { slug: 'emina-bright-stuff-cream', title: 'Emina Bright Stuff Moisturizing Cream 20ml', image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=600&fit=crop&auto=format', categorySlug: 'moisturizer', rating: 8.4, priceMin: 25000, priceMax: 35000, affiliateUrl: 'https://shopee.co.id/Emina-Bright-Stuff-Moisturizing-Cream-20ml-i.14728364.5678901234', trending: false } }),
    prisma.product.create({ data: { slug: 'wardah-aloe-vera-gel', title: 'Wardah Aloe Vera Gel 100ml', image: 'https://images.unsplash.com/photo-1519415943484-9fa1873496d4?w=600&h=600&fit=crop&auto=format', categorySlug: 'moisturizer', rating: 8.6, priceMin: 29000, priceMax: 45000, affiliateUrl: 'https://shopee.co.id/Wardah-Aloe-Vera-Gel-100ml-i.4829173.6789012345', trending: false } }),
    prisma.product.create({ data: { slug: 'bio-beauty-lab-collagen', title: 'Bio Beauty Lab Collagen Series Moisturizer 30g', image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&h=600&fit=crop&auto=format', categorySlug: 'moisturizer', rating: 8.8, priceMin: 89000, priceMax: 115000, affiliateUrl: 'https://shopee.co.id/Bio-Beauty-Lab-Collagen-Series-Moisturizer-30g-i.28193746.7890123456', trending: false } }),
    // Sunscreen
    prisma.product.create({ data: { slug: 'azarine-hydrasoothe-spf45', title: 'Azarine Hydrasoothe Sunscreen Gel SPF45 PA++++ 50ml', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=600&fit=crop&auto=format', categorySlug: 'sunscreen', rating: 9.4, priceMin: 49000, priceMax: 69000, affiliateUrl: 'https://shopee.co.id/Azarine-Hydrasoothe-Sunscreen-Gel-SPF45-PA-50ml-i.138273726.3290987654', trending: true } }),
    prisma.product.create({ data: { slug: 'skintific-mineral-spf50', title: 'Skintific Aqua Light Mineral Sunscreen SPF50+ PA++++ 30g', image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&h=600&fit=crop&auto=format', categorySlug: 'sunscreen', rating: 9.0, priceMin: 89000, priceMax: 119000, affiliateUrl: 'https://shopee.co.id/Skintific-Aqua-Light-Mineral-Sunscreen-SPF50-30g-i.201869466.8901234567', trending: false } }),
    prisma.product.create({ data: { slug: 'wardah-uv-shield-spf30', title: 'Wardah UV Shield Essential Sunscreen SPF30 PA+++ 40ml', image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=600&fit=crop&auto=format', categorySlug: 'sunscreen', rating: 8.5, priceMin: 35000, priceMax: 55000, affiliateUrl: 'https://shopee.co.id/Wardah-UV-Shield-Essential-Sunscreen-SPF30-PA-40ml-i.4829173.9012345678', trending: false } }),
    // Cleanser
    prisma.product.create({ data: { slug: 'cetaphil-gentle-cleanser', title: 'Cetaphil Gentle Skin Cleanser 250ml', image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&h=600&fit=crop&auto=format', categorySlug: 'cleanser', rating: 9.2, priceMin: 89000, priceMax: 119000, affiliateUrl: 'https://shopee.co.id/Cetaphil-Gentle-Skin-Cleanser-250ml-i.43291847.0123456789', trending: false } }),
    prisma.product.create({ data: { slug: 'hada-labo-hydrating-cleanser', title: 'Hada Labo Gokujyun Hyaluronic Acid Face Wash 100g', image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&h=600&fit=crop&auto=format', categorySlug: 'cleanser', rating: 9.0, priceMin: 79000, priceMax: 109000, affiliateUrl: 'https://shopee.co.id/Hada-Labo-Gokujyun-Hyaluronic-Acid-Face-Wash-100g-i.19283746.1234509876', trending: false } }),
    prisma.product.create({ data: { slug: 'emina-bright-stuff-facewash', title: 'Emina Bright Stuff Face Wash 100ml', image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=600&fit=crop&auto=format', categorySlug: 'cleanser', rating: 8.3, priceMin: 22000, priceMax: 32000, affiliateUrl: 'https://shopee.co.id/Emina-Bright-Stuff-Face-Wash-100ml-i.14728364.2345610987', trending: false } }),
    // Toner
    prisma.product.create({ data: { slug: 'somethinc-aha-bha-toner', title: 'Somethinc AHA BHA PHA Toner 2% 100ml', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=600&fit=crop&auto=format', categorySlug: 'toner', rating: 8.8, priceMin: 115000, priceMax: 145000, affiliateUrl: 'https://shopee.co.id/Somethinc-AHA-BHA-PHA-Toner-2-100ml-i.138273726.3456721098', trending: false } }),
    prisma.product.create({ data: { slug: 'skintific-mugwort-toner', title: 'Skintific Mugwort Pore Toner 100ml', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=600&fit=crop&auto=format', categorySlug: 'toner', rating: 8.9, priceMin: 89000, priceMax: 119000, affiliateUrl: 'https://shopee.co.id/Skintific-Mugwort-Pore-Toner-100ml-i.201869466.4567832109', trending: false } }),
    prisma.product.create({ data: { slug: 'dear-me-barrier-toner', title: 'Dear Me Beauty Barrier Booster Toner 100ml', image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&h=600&fit=crop&auto=format', categorySlug: 'toner', rating: 8.6, priceMin: 99000, priceMax: 129000, affiliateUrl: 'https://shopee.co.id/Dear-Me-Beauty-Barrier-Booster-Toner-100ml-i.63829174.5678943210', trending: false } }),
    // Eye care
    prisma.product.create({ data: { slug: 'skintific-vit-c-eye-cream', title: 'Skintific Vitamin C Brightening Eye Cream 20g', image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&h=600&fit=crop&auto=format', categorySlug: 'eyecare', rating: 8.7, priceMin: 109000, priceMax: 139000, affiliateUrl: 'https://shopee.co.id/Skintific-Vitamin-C-Eye-Cream-20g-i.201869466.6789054321', trending: false } }),
    prisma.product.create({ data: { slug: 'garnier-bright-eye-cream', title: 'Garnier Bright Complete Vitamin C Eye Cream 15ml', image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=600&fit=crop&auto=format', categorySlug: 'eyecare', rating: 8.4, priceMin: 65000, priceMax: 89000, affiliateUrl: 'https://shopee.co.id/Garnier-Bright-Complete-Vitamin-C-Eye-Cream-15ml-i.7291847.7890165432', trending: false } }),
    // Body care
    prisma.product.create({ data: { slug: 'scarlett-shower-scrub', title: 'Scarlett Whitening Shower Scrub 300ml', image: 'https://images.unsplash.com/photo-1570213489059-0aac6626cade?w=600&h=600&fit=crop&auto=format', categorySlug: 'bodycare', rating: 9.1, priceMin: 55000, priceMax: 79000, affiliateUrl: 'https://shopee.co.id/Scarlett-Whitening-Shower-Scrub-300ml-i.77382617.8901276543', trending: false } }),
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
  console.log('   Categories: 7 | Products: 20 | Reviews: 5 | Kurators: 2')
}

main()
  .catch((e) => { console.error('❌ Seed error:', e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
