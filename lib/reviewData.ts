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
    slug: 'samsung-galaxy-s25-ultra',
    title: 'Samsung Galaxy S25 Ultra',
    category: 'gadget',
    rating: 9.2,
    priceMin: 18_999_000,
    priceMax: 21_999_000,
    affiliateUrl: 'https://shopee.co.id',
    kurator: 'Andi Kurniawan',
    tanggal: '5 April 2026',
    estimasiBaca: 12,
    pros: [
      'Layar 6.9" Dynamic AMOLED 2X dengan refresh 120Hz yang sangat mulus',
      'Kamera 200MP dengan zoom optis 5x dan performa malam hari luar biasa',
      'Performa flagship bertenaga Snapdragon 8 Elite tanpa kompromi',
      'S Pen terintegrasi dengan latensi sangat rendah untuk produktivitas',
      'Baterai 5000mAh dengan fast charging 45W dan wireless charging',
    ],
    cons: [
      'Harga sangat premium, tidak ramah di kantong semua segmen pasar',
      'Desain berat (218g) dan tebal karena slot S Pen internal',
      'Peningkatan dibanding Galaxy S24 Ultra tidak terlalu signifikan',
    ],
  },
  {
    slug: 'redmi-note-13-pro',
    title: 'Redmi Note 13 Pro+',
    category: 'gadget',
    rating: 8.2,
    priceMin: 5_199_000,
    priceMax: 6_299_000,
    affiliateUrl: 'https://tokopedia.com',
    kurator: 'Budi Santoso',
    tanggal: '28 Maret 2026',
    estimasiBaca: 8,
    pros: [
      'Kamera 200MP dengan sensor Samsung ISOCELL HP3 yang sangat detail',
      'Desain premium dengan material Corning Gorilla Glass Victus di depan dan belakang',
      'Layar AMOLED 120Hz dengan kecerahan puncak hingga 1800 nits',
      'Harga sangat kompetitif untuk spesifikasi yang ditawarkan',
    ],
    cons: [
      'Chipset Dimensity 7200 Ultra masih kalah dari flagship tier',
      'Tidak ada charger bawaan dalam paket penjualan di beberapa region',
      'Kamera ultrawide resolusinya jauh di bawah kamera utama',
    ],
  },
  {
    slug: 'macbook-air-m3',
    title: 'MacBook Air M3 13"',
    category: 'gadget',
    rating: 9.4,
    priceMin: 16_999_000,
    priceMax: 18_999_000,
    affiliateUrl: 'https://tokopedia.com',
    kurator: 'Andi Kurniawan',
    tanggal: '10 April 2026',
    estimasiBaca: 14,
    pros: [
      'Chip M3 menghadirkan performa luar biasa untuk semua kebutuhan kreatif',
      'Daya tahan baterai hingga 18 jam pemakaian nyata sehari-hari',
      'Desain tipis 11.3mm tanpa kipas, senyap sempurna dalam kondisi apapun',
      'Layar Liquid Retina 13.6" yang sangat tajam dengan 500 nits kecerahan',
      'Mendukung dua layar eksternal secara bersamaan (lebih dari M2)',
    ],
    cons: [
      'Hanya 2 port Thunderbolt, kurang untuk pengguna yang butuh banyak aksesoris',
      'RAM base 8GB mulai terasa sempit untuk multitasking berat',
      'Tidak ada slot SD card dan MagSafe hanya tersedia di sisi kiri',
    ],
  },
  {
    slug: 'adidas-ultraboost-24',
    title: 'Adidas Ultraboost 24',
    category: 'olahraga',
    rating: 8.8,
    priceMin: 1_899_000,
    priceMax: 2_200_000,
    affiliateUrl: 'https://shopee.co.id',
    kurator: 'Sinta Dewi',
    tanggal: '1 April 2026',
    estimasiBaca: 10,
    pros: [
      'Midsole Boost memberikan cushioning sangat responsif dan nyaman',
      'Upper Primeknit+ memeluk kaki dengan sempurna dan sangat breathable',
      'Outsole Continental Rubber memberikan grip luar biasa di berbagai medan',
      'Desain elegan yang cocok dipakai casual maupun lari santai',
    ],
    cons: [
      'Harga premium dibanding pesaing di kelas yang sama',
      'Kurang cocok untuk lari tempo cepat atau kompetisi karena stack tinggi',
      'Ukuran true to size tapi terasa narrow bagi yang punya kaki lebar',
    ],
  },
  {
    slug: 'rekomendasi-sepatu-lari-2026',
    title: '7 Sepatu Lari Terbaik 2026',
    category: 'olahraga',
    rating: 9.0,
    priceMin: 499_000,
    priceMax: 4_999_000,
    affiliateUrl: 'https://tokopedia.com',
    kurator: 'Sinta Dewi',
    tanggal: '3 April 2026',
    estimasiBaca: 12,
    pros: [
      'Kurator menguji langsung setiap sepatu dalam kondisi nyata selama 2 minggu',
      'Mencakup pilihan dari budget entry-level hingga premium untuk semua kebutuhan',
      'Panduan memilih berdasarkan tipe kaki dan gaya berlari',
      'Update 2026 mencakup model terbaru dari Nike, Adidas, Brooks, dan lokal',
    ],
    cons: [
      'Beberapa model belum tersedia luas di marketplace lokal',
      'Harga dapat berubah tergantung promo dan stok',
    ],
  },
  {
    slug: 'dyson-airwrap-complete',
    title: 'Dyson Airwrap Complete Long',
    category: 'kecantikan',
    rating: 9.5,
    priceMin: 7_999_000,
    affiliateUrl: 'https://lazada.co.id',
    kurator: 'Maya Putri',
    tanggal: '7 April 2026',
    estimasiBaca: 11,
    pros: [
      'Teknologi Coanda effect mengeringkan dan men-styling rambut secara bersamaan',
      'Panas lebih merata dan terkontrol, meminimalisir kerusakan rambut',
      'Paket Complete Long dilengkapi 8 attachment untuk berbagai gaya rambut',
      'Hasil styling bertahan lebih lama dibanding alat konvensional',
      'Desain premium dan material berkualitas tinggi untuk pemakaian bertahun-tahun',
    ],
    cons: [
      'Harga sangat tinggi, investasi besar untuk alat styling rambut',
      'Butuh waktu belajar untuk mendapat hasil optimal dari setiap attachment',
      'Berat (0.78kg) bisa melelahkan untuk sesi styling panjang',
    ],
  },
  {
    slug: 'skincare-routine-kulit-kering',
    title: 'Skincare Routine untuk Kulit Kering',
    category: 'kecantikan',
    rating: 8.7,
    priceMin: 150_000,
    priceMax: 2_500_000,
    affiliateUrl: 'https://shopee.co.id',
    kurator: 'Maya Putri',
    tanggal: '9 April 2026',
    estimasiBaca: 10,
    pros: [
      'Panduan lengkap dari cleanser, toner, serum, hingga moisturizer',
      'Mencakup produk lokal terjangkau dan pilihan premium internasional',
      'Tips memilih berdasarkan kandungan bahan aktif yang tepat untuk kulit kering',
      'Rekomendasi untuk berbagai budget dengan hasil yang terukur',
    ],
    cons: [
      'Reaksi produk bisa berbeda-beda tergantung kondisi kulit masing-masing orang',
      'Beberapa produk premium butuh waktu konsisten minimal 4-8 minggu',
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
    category: 'gadget',
    rating: 8.5,
    priceMin: 1_000_000,
    priceMax: 1_500_000,
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
