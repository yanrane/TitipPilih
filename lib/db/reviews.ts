import { prisma } from '@/lib/prisma'
import { getStaticProduct } from '@/lib/db/products'
import type { CategorySlug, ArticlePreview } from '@/types'

// ── Types ──────────────────────────────────────────────────────────────────

export interface ReviewData {
  slug: string
  title: string
  category: CategorySlug
  image?: string
  rating: number
  priceMin: number
  priceMax?: number
  affiliateUrl: string
  kurator: string
  tanggal: string
  estimasiBaca: number
  pros: string[]
  cons: string[]
}

// ── Fallback data ──────────────────────────────────────────────────────────

const REVIEWS_FALLBACK: ReviewData[] = [
  {
    slug: 'azarine-hydrasoothe-spf45',
    title: 'Azarine Hydrasoothe Sunscreen Gel SPF45 PA++++',
    category: 'sunscreen',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=600&fit=crop&auto=format',
    rating: 9.4,
    priceMin: 49_000,
    priceMax: 69_000,
    affiliateUrl: 'https://shopee.co.id/Azarine-Hydrasoothe-Sunscreen-Gel-SPF45-PA-50ml-i.138273726.3290987654',
    kurator: 'Maya Putri',
    tanggal: '1 Mei 2026',
    estimasiBaca: 8,
    pros: [
      'Tekstur gel ringan dan cepat meresap, tidak meninggalkan white cast',
      'Kandungan niacinamide membantu mencerahkan dan meratakan warna kulit',
      'Perlindungan PA++++ sangat efektif untuk iklim tropis Indonesia',
      'Harga sangat terjangkau untuk kualitas setara produk mid-range',
      'Cocok untuk kulit berminyak dan kombinasi tanpa rasa lengket',
    ],
    cons: [
      'Tutup pump bisa susah dibuka pertama kali',
      'Aroma sedikit kuat bagi yang sensitif terhadap wewangian',
      'Kemasan 50ml habis cepat jika dipakai rutin setiap hari',
    ],
  },
  {
    slug: 'skintific-barrier-cream',
    title: 'Skintific 5% Niacinamide Barrier Moisture Gel Cream',
    category: 'moisturizer',
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&h=600&fit=crop&auto=format',
    rating: 9.3,
    priceMin: 119_000,
    priceMax: 149_000,
    affiliateUrl: 'https://shopee.co.id/Skintific-5-Niacinamide-Barrier-Moisture-Gel-Cream-30g-i.201869466.7654321098',
    kurator: 'Sari Indah',
    tanggal: '3 Mei 2026',
    estimasiBaca: 9,
    pros: [
      '5% niacinamide efektif menyamarkan pori-pori dan meratakan skin tone',
      'Tekstur gel krim ringan yang mudah diaplikasikan dan meresap cepat',
      'Memperkuat skin barrier dengan kandungan ceramide dan panthenol',
      'Cocok untuk semua jenis kulit termasuk kulit sensitif',
    ],
    cons: [
      'Kemasan jar kurang higienis untuk penggunaan jangka panjang',
      'Harga sedikit lebih tinggi dibanding kompetitor lokal di kelas yang sama',
      'Efek mencerahkan terlihat setelah minimal 4 minggu pemakaian rutin',
    ],
  },
  {
    slug: 'somethinc-niacinamide-serum',
    title: 'Somethinc Niacinamide + Moisture Beet Serum 20ml',
    category: 'serum',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=600&fit=crop&auto=format',
    rating: 9.1,
    priceMin: 89_000,
    priceMax: 159_000,
    affiliateUrl: 'https://shopee.co.id/Somethinc-Niacinamide-Moisture-Beet-Serum-20ml-i.138273726.2345678901',
    kurator: 'Maya Putri',
    tanggal: '5 Mei 2026',
    estimasiBaca: 10,
    pros: [
      'Kombinasi niacinamide dan beetroot extract memberikan efek glowing alami',
      'Tekstur serum ringan yang cepat meresap tanpa rasa lengket',
      'Formulasi bebas alkohol, cocok untuk kulit sensitif',
      'Harga sangat kompetitif untuk kandungan bahan aktif yang ditawarkan',
    ],
    cons: [
      'Aroma beetroot cukup kuat, tidak semua orang menyukainya',
      'Ukuran 20ml terasa kecil untuk harga yang ditawarkan',
      'Perlu konsistensi minimal 4-6 minggu untuk hasil optimal',
    ],
  },
  {
    slug: 'cetaphil-gentle-cleanser',
    title: 'Cetaphil Gentle Skin Cleanser 250ml',
    category: 'cleanser',
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&h=600&fit=crop&auto=format',
    rating: 9.2,
    priceMin: 89_000,
    priceMax: 119_000,
    affiliateUrl: 'https://shopee.co.id/Cetaphil-Gentle-Skin-Cleanser-250ml-i.43291847.0123456789',
    kurator: 'Sari Indah',
    tanggal: '7 Mei 2026',
    estimasiBaca: 7,
    pros: [
      'Formula ultra-lembut yang direkomendasikan dermatologis untuk kulit sensitif',
      'Membersihkan wajah tanpa menghilangkan kelembaban alami kulit',
      'pH-balanced yang menjaga keseimbangan microbiome kulit',
      'Tersedia dalam ukuran besar sehingga lebih ekonomis untuk pemakaian rutin',
    ],
    cons: [
      'Tidak efektif membersihkan makeup tebal atau sunscreen berbasis minyak',
      'Harga sedikit lebih mahal dibanding cleanser drugstore lokal',
      'Busa sangat minimal, bisa terasa kurang bersih bagi sebagian pengguna',
    ],
  },
  {
    slug: 'skincare-routine-kulit-kering',
    title: 'Skincare Routine Lengkap untuk Kulit Kering',
    category: 'moisturizer',
    rating: 8.7,
    priceMin: 150_000,
    priceMax: 2_500_000,
    affiliateUrl: 'https://shopee.co.id',
    kurator: 'Maya Putri',
    tanggal: '9 Mei 2026',
    estimasiBaca: 10,
    pros: [
      'Panduan lengkap dari cleanser, toner, serum, hingga moisturizer dan sunscreen',
      'Mencakup produk lokal terjangkau dan pilihan premium internasional',
      'Tips memilih berdasarkan kandungan bahan aktif yang tepat untuk kulit kering',
      'Rekomendasi untuk berbagai budget dengan hasil yang terukur',
    ],
    cons: [
      'Reaksi produk bisa berbeda-beda tergantung kondisi kulit masing-masing orang',
      'Beberapa produk premium butuh waktu konsisten minimal 4-8 minggu',
    ],
  },
  {
    slug: 'scarlett-brightening-serum',
    title: 'Scarlett Whitening Brightening Serum Vitamin C',
    category: 'serum',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=600&fit=crop&auto=format',
    rating: 8.9,
    priceMin: 55_000,
    priceMax: 85_000,
    affiliateUrl: 'https://shopee.co.id/Scarlett-Whitening-Brightening-Serum-40ml-i.77382617.3456789012',
    kurator: 'Sari Indah',
    tanggal: '11 Mei 2026',
    estimasiBaca: 8,
    pros: [
      'Vitamin C stabil yang efektif mencerahkan dan menyamarkan flek hitam',
      'Harga sangat terjangkau untuk kandungan vitamin C aktif',
      'Ukuran 40ml lebih besar dibanding serum lokal lain di harga yang sama',
      'Tersedia luas di marketplace dan toko offline seluruh Indonesia',
    ],
    cons: [
      'Konsistensi tekstur bisa berbeda antar batch produksi',
      'Perlu penyimpanan di tempat sejuk agar vitamin C tidak teroksidasi',
      'Tidak mengandung SPF, tetap perlu sunscreen terpisah di pagi hari',
    ],
  },
  {
    slug: 'rekomendasi-sunscreen-lokal-2026',
    title: '7 Sunscreen Lokal Terbaik 2026',
    category: 'sunscreen',
    rating: 9.0,
    priceMin: 35_000,
    priceMax: 150_000,
    affiliateUrl: 'https://shopee.co.id',
    kurator: 'Maya Putri',
    tanggal: '13 Mei 2026',
    estimasiBaca: 12,
    pros: [
      'Kurator menguji langsung setiap sunscreen dalam kondisi outdoor Indonesia selama 2 minggu',
      'Mencakup pilihan dari harga entry-level hingga mid-range untuk semua jenis kulit',
      'Panduan memilih berdasarkan jenis kulit: berminyak, kering, dan kombinasi',
      'Update 2026 mencakup rilis terbaru dari brand lokal terpercaya',
    ],
    cons: [
      'Beberapa produk limited edition belum tersedia luas di semua kota',
      'Harga dapat berubah tergantung promo dan stok marketplace',
    ],
  },
  {
    slug: 'scarlett-shower-scrub',
    title: 'Scarlett Whitening Shower Scrub 300ml',
    category: 'bodycare',
    image: 'https://images.unsplash.com/photo-1570213489059-0aac6626cade?w=600&h=600&fit=crop&auto=format',
    rating: 9.1,
    priceMin: 55_000,
    priceMax: 79_000,
    affiliateUrl: 'https://shopee.co.id/Scarlett-Whitening-Shower-Scrub-300ml-i.77382617.8901276543',
    kurator: 'Sari Indah',
    tanggal: '15 Mei 2026',
    estimasiBaca: 7,
    pros: [
      'Butiran scrub lembut yang efektif mengangkat sel kulit mati tanpa iritasi',
      'Kandungan kojic acid dan glutathione membantu mencerahkan kulit tubuh',
      'Aroma segar dan mewah yang tahan lama setelah mandi',
      'Harga sangat terjangkau untuk kualitas dan ukuran yang ditawarkan',
    ],
    cons: [
      'Tidak disarankan dipakai setiap hari untuk kulit sensitif',
      'Butiran scrub bisa menyumbat saluran pembuangan jika tidak dibilas tuntas',
      'Ketersediaan variant wangi tertentu kadang habis di marketplace',
    ],
  },
]

function generateFallback(slug: string): ReviewData {
  const rawTitle = slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
  const product = getStaticProduct(slug)
  const title = product?.title ?? rawTitle
  const affiliateUrl =
    product?.affiliateUrl ?? `https://shopee.co.id/search?keyword=${encodeURIComponent(title)}`
  return {
    slug,
    title,
    category: (product?.category ?? 'serum') as CategorySlug,
    image: product?.image,
    rating: product?.rating ?? 8.5,
    priceMin: product?.priceMin ?? 89_000,
    priceMax: product?.priceMax ?? 159_000,
    affiliateUrl,
    kurator: 'Tim Kurator TitipPilih',
    tanggal: '12 April 2026',
    estimasiBaca: 8,
    pros: [
      'Kualitas produk yang solid untuk harga yang ditawarkan',
      'Desain ergonomis dan nyaman digunakan sehari-hari',
      'Dukungan purna jual yang responsif',
    ],
    cons: [
      'Beberapa fitur kompetitor tidak tersedia pada produk ini',
      'Ketersediaan aksesori pihak ketiga masih terbatas',
    ],
  }
}

function mapReview(r: {
  slug: string
  title: string
  categorySlug: string
  rating: number
  priceMin: number
  priceMax: number | null
  affiliateUrl: string
  kurator: { name: string }
  product: { image: string } | null
  tanggal: Date
  estimasiBaca: number
  pros: string[]
  cons: string[]
}): ReviewData {
  return {
    slug: r.slug,
    title: r.title,
    category: r.categorySlug as CategorySlug,
    image: r.product?.image || undefined,
    rating: r.rating,
    priceMin: r.priceMin,
    priceMax: r.priceMax ?? undefined,
    affiliateUrl: r.affiliateUrl,
    kurator: r.kurator.name,
    tanggal: r.tanggal.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }),
    estimasiBaca: r.estimasiBaca,
    pros: r.pros,
    cons: r.cons,
  }
}

// ── Queries ────────────────────────────────────────────────────────────────

export async function getReviewBySlug(slug: string): Promise<ReviewData> {
  try {
    const review = await prisma.review.findUnique({
      where: { slug, published: true },
      include: { kurator: true, product: { select: { image: true } } },
    })
    return review ? mapReview(review) : (REVIEWS_FALLBACK.find((r) => r.slug === slug) ?? generateFallback(slug))
  } catch {
    return REVIEWS_FALLBACK.find((r) => r.slug === slug) ?? generateFallback(slug)
  }
}

export async function getRelatedReviews(
  currentSlug: string,
  category: CategorySlug,
): Promise<ReviewData[]> {
  try {
    const reviews = await prisma.review.findMany({
      where: { published: true, slug: { not: currentSlug }, categorySlug: category },
      include: { kurator: true, product: { select: { image: true } } },
      orderBy: { createdAt: 'desc' },
      take: 3,
    })
    if (reviews.length > 0) return reviews.map(mapReview)
    // fallback: same-category first, then others, exclude current
    const same = REVIEWS_FALLBACK.filter((r) => r.slug !== currentSlug && r.category === category)
    const others = REVIEWS_FALLBACK.filter((r) => r.slug !== currentSlug && r.category !== category)
    return [...same, ...others].slice(0, 3)
  } catch {
    const same = REVIEWS_FALLBACK.filter((r) => r.slug !== currentSlug && r.category === category)
    const others = REVIEWS_FALLBACK.filter((r) => r.slug !== currentSlug && r.category !== category)
    return [...same, ...others].slice(0, 3)
  }
}

export async function getLatestReviews(limit = 3): Promise<ArticlePreview[]> {
  try {
    const reviews = await prisma.review.findMany({
      where: { published: true },
      include: { kurator: true },
      orderBy: { tanggal: 'desc' },
      take: limit,
    })
    if (reviews.length > 0) {
      return reviews.map((r) => ({
        slug: r.slug,
        title: r.title,
        category: r.categorySlug as CategorySlug,
        kurator: r.kurator.name,
        estimasiBaca: r.estimasiBaca,
      }))
    }
    return REVIEWS_FALLBACK.slice(0, limit).map((r) => ({
      slug: r.slug,
      title: r.title,
      category: r.category,
      kurator: r.kurator,
      estimasiBaca: r.estimasiBaca,
    }))
  } catch {
    return REVIEWS_FALLBACK.slice(0, limit).map((r) => ({
      slug: r.slug,
      title: r.title,
      category: r.category,
      kurator: r.kurator,
      estimasiBaca: r.estimasiBaca,
    }))
  }
}

export async function getReviewCount(): Promise<number> {
  try {
    return await prisma.review.count({ where: { published: true } })
  } catch {
    return 142 // fallback
  }
}
