import type { CategorySlug } from '@/types'

export interface ReviewData {
  slug: string
  title: string
  category: CategorySlug
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

const reviews: ReviewData[] = [
  {
    slug: 'azarine-hydrasoothe-spf45',
    title: 'Azarine Hydrasoothe Sunscreen Gel SPF45 PA++++',
    category: 'sunscreen',
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
]

// Generate a fallback review for unknown slugs
function generateFallback(slug: string): ReviewData {
  const title = slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
  return {
    slug,
    title,
    category: 'serum',
    rating: 8.5,
    priceMin: 89_000,
    priceMax: 159_000,
    affiliateUrl: '#',
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

export function getReviewBySlug(slug: string): ReviewData {
  return reviews.find((r) => r.slug === slug) ?? generateFallback(slug)
}

export function getRelatedReviews(
  currentSlug: string,
  category: CategorySlug,
): ReviewData[] {
  // Same category first, then any category — exclude current
  const sameCategory = reviews.filter(
    (r) => r.slug !== currentSlug && r.category === category,
  )
  const others = reviews.filter(
    (r) => r.slug !== currentSlug && r.category !== category,
  )
  return [...sameCategory, ...others].slice(0, 3)
}
