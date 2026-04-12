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
  console.log('🌱 Seeding database...')

  // ── 1. Categories ────────────────────────────────────────────────────────
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'gadget' },
      update: {},
      create: {
        slug: 'gadget',
        label: 'Gadget',
        description: 'Temukan smartphone, laptop, audio, dan aksesori elektronik terbaik pilihan kurator kami.',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'fashion' },
      update: {},
      create: {
        slug: 'fashion',
        label: 'Fashion',
        description: 'Koleksi pakaian, sepatu, dan aksesori fashion terkini dengan kualitas terbaik.',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'kesehatan' },
      update: {},
      create: {
        slug: 'kesehatan',
        label: 'Kesehatan',
        description: 'Produk kesehatan, suplemen, dan peralatan terpercaya untuk hidup lebih sehat.',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'travel' },
      update: {},
      create: {
        slug: 'travel',
        label: 'Travel',
        description: 'Koper, backpack, kamera, dan aksesori perjalanan untuk petualangan tanpa hambatan.',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'rumah' },
      update: {},
      create: {
        slug: 'rumah',
        label: 'Rumah',
        description: 'Furnitur, dekorasi, dan elektronik rumah untuk menciptakan hunian impian.',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'kecantikan' },
      update: {},
      create: {
        slug: 'kecantikan',
        label: 'Kecantikan',
        description: 'Skincare, makeup, dan perawatan rambut dari brand lokal dan internasional terbaik.',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'olahraga' },
      update: {},
      create: {
        slug: 'olahraga',
        label: 'Olahraga',
        description: 'Sepatu, pakaian, dan peralatan olahraga untuk mendukung gaya hidup aktif.',
      },
    }),
  ])
  console.log(`✅ ${categories.length} categories seeded`)

  // ── 2. Kurators ──────────────────────────────────────────────────────────
  const andi = await prisma.kurator.upsert({
    where: { id: 'kurator-andi' },
    update: {},
    create: {
      id: 'kurator-andi',
      name: 'Andi Kurniawan',
      role: 'Kurator Teknologi',
      bio: 'Lima tahun pengalaman di industri teknologi konsumen. Mantan editor di media teknologi nasional, kini fokus menghadirkan review gadget yang deep dan jujur untuk pembaca TitipPilih.',
      initials: 'AK',
      accentColor: 'text-blue-400 bg-blue-500/20 border-blue-500/30',
      categories: ['Gadget', 'Laptop', 'Audio'],
    },
  })

  const sinta = await prisma.kurator.upsert({
    where: { id: 'kurator-sinta' },
    update: {},
    create: {
      id: 'kurator-sinta',
      name: 'Sinta Dewi',
      role: 'Kurator Fashion & Olahraga',
      bio: 'Fitness enthusiast dan fashion blogger berpengalaman 7 tahun. Ahli dalam menemukan produk berkualitas di setiap kisaran harga — dari produk lokal premium hingga brand internasional.',
      initials: 'SD',
      accentColor: 'text-pink-400 bg-pink-500/20 border-pink-500/30',
      categories: ['Fashion', 'Olahraga', 'Travel'],
    },
  })

  const maya = await prisma.kurator.upsert({
    where: { id: 'kurator-maya' },
    update: {},
    create: {
      id: 'kurator-maya',
      name: 'Maya Putri',
      role: 'Kurator Kecantikan & Kesehatan',
      bio: 'Certified skincare formulator dengan latar belakang farmasi. Mengupas kandungan bahan aktif dengan bahasa sederhana — karena setiap kulit Indonesia berhak mendapat produk yang tepat.',
      initials: 'MP',
      accentColor: 'text-purple-400 bg-purple-500/20 border-purple-500/30',
      categories: ['Kecantikan', 'Kesehatan', 'Rumah'],
    },
  })
  console.log('✅ 3 kurators seeded')

  // ── 3. Products ──────────────────────────────────────────────────────────
  const productData = [
    // Gadget
    { slug: 'samsung-galaxy-s25-ultra', title: 'Samsung Galaxy S25 Ultra', categorySlug: 'gadget', rating: 9.2, priceMin: 18_999_000, priceMax: 21_999_000, affiliateUrl: 'https://shopee.co.id', trending: true },
    { slug: 'iphone-16-pro-max', title: 'iPhone 16 Pro Max 256GB', categorySlug: 'gadget', rating: 9.0, priceMin: 22_000_000, priceMax: 24_500_000, affiliateUrl: 'https://tokopedia.com', trending: false },
    { slug: 'macbook-air-m3', title: 'MacBook Air M3 13"', categorySlug: 'gadget', rating: 9.4, priceMin: 16_999_000, priceMax: 18_999_000, affiliateUrl: 'https://tokopedia.com', trending: true },
    { slug: 'redmi-note-13-pro', title: 'Redmi Note 13 Pro+', categorySlug: 'gadget', rating: 8.2, priceMin: 5_199_000, priceMax: 6_299_000, affiliateUrl: 'https://tokopedia.com', trending: false },
    { slug: 'sony-wh-1000xm5', title: 'Sony WH-1000XM5 Headphone', categorySlug: 'gadget', rating: 9.3, priceMin: 4_199_000, priceMax: 4_999_000, affiliateUrl: 'https://shopee.co.id', trending: false },
    { slug: 'ipad-pro-m4', title: 'iPad Pro M4 11" WiFi', categorySlug: 'gadget', rating: 9.1, priceMin: 14_999_000, priceMax: 16_499_000, affiliateUrl: 'https://tokopedia.com', trending: false },
    { slug: 'xiaomi-14t-pro', title: 'Xiaomi 14T Pro 12/256GB', categorySlug: 'gadget', rating: 8.5, priceMin: 8_499_000, priceMax: 9_999_000, affiliateUrl: 'https://tokopedia.com', trending: false },
    { slug: 'samsung-galaxy-tab-s9-fe', title: 'Samsung Galaxy Tab S9 FE', categorySlug: 'gadget', rating: 7.8, priceMin: 6_999_000, priceMax: 7_999_000, affiliateUrl: 'https://shopee.co.id', trending: false },
    { slug: 'anker-737-powerbank', title: 'Anker 737 Power Bank 24000mAh', categorySlug: 'gadget', rating: 8.6, priceMin: 1_299_000, affiliateUrl: 'https://shopee.co.id', trending: false },
    // Fashion
    { slug: 'uniqlo-ultra-light-down', title: 'Uniqlo Ultra Light Down Jacket', categorySlug: 'fashion', rating: 8.8, priceMin: 799_000, priceMax: 999_000, affiliateUrl: 'https://shopee.co.id', trending: false },
    { slug: 'nike-air-force-1-low', title: 'Nike Air Force 1 Low White', categorySlug: 'fashion', rating: 9.0, priceMin: 1_399_000, priceMax: 1_699_000, affiliateUrl: 'https://tokopedia.com', trending: true },
    { slug: 'levis-511-slim-jeans', title: "Levi's 511 Slim Fit Jeans", categorySlug: 'fashion', rating: 8.4, priceMin: 699_000, priceMax: 899_000, affiliateUrl: 'https://shopee.co.id', trending: false },
    { slug: 'zara-oversized-blazer-2026', title: 'Zara Oversized Blazer 2026', categorySlug: 'fashion', rating: 8.1, priceMin: 599_000, priceMax: 799_000, affiliateUrl: 'https://tokopedia.com', trending: false },
    { slug: 'adidas-stan-smith-green', title: 'Adidas Stan Smith Collegiate Green', categorySlug: 'fashion', rating: 8.7, priceMin: 999_000, priceMax: 1_299_000, affiliateUrl: 'https://shopee.co.id', trending: false },
    { slug: 'hm-basic-turtleneck', title: 'H&M Basic Turtleneck Knit', categorySlug: 'fashion', rating: 7.9, priceMin: 249_000, priceMax: 349_000, affiliateUrl: 'https://shopee.co.id', trending: false },
    { slug: 'coach-tabby-26', title: 'Coach Tabby 26 Shoulder Bag', categorySlug: 'fashion', rating: 9.2, priceMin: 5_499_000, priceMax: 6_299_000, affiliateUrl: 'https://tokopedia.com', trending: false },
    { slug: 'converse-chuck-taylor', title: 'Converse Chuck Taylor All Star', categorySlug: 'fashion', rating: 8.3, priceMin: 799_000, priceMax: 999_000, affiliateUrl: 'https://shopee.co.id', trending: false },
    { slug: 'tenun-ikat-ntt-scarf', title: 'Tenun Ikat NTT Premium Scarf', categorySlug: 'fashion', rating: 8.9, priceMin: 450_000, priceMax: 650_000, affiliateUrl: 'https://tokopedia.com', trending: false },
    // Kesehatan
    { slug: 'blackmores-probiotics-daily', title: 'Blackmores Probiotics+ Daily 30 Kapsul', categorySlug: 'kesehatan', rating: 8.6, priceMin: 299_000, priceMax: 349_000, affiliateUrl: 'https://shopee.co.id', trending: false },
    { slug: 'omron-hem-7156t', title: 'Omron HEM-7156T Tensimeter Digital', categorySlug: 'kesehatan', rating: 9.1, priceMin: 799_000, priceMax: 899_000, affiliateUrl: 'https://tokopedia.com', trending: false },
    { slug: 'nature-republic-aloe-gel', title: 'Nature Republic Aloe Vera 92% Gel', categorySlug: 'kesehatan', rating: 8.3, priceMin: 79_000, priceMax: 99_000, affiliateUrl: 'https://shopee.co.id', trending: false },
    { slug: 'scotts-dha-gummies', title: "Scott's DHA Gummies Omega-3 Anak", categorySlug: 'kesehatan', rating: 8.5, priceMin: 149_000, priceMax: 179_000, affiliateUrl: 'https://tokopedia.com', trending: false },
    { slug: 'garmin-forerunner-165', title: 'Garmin Forerunner 165 GPS Watch', categorySlug: 'kesehatan', rating: 8.9, priceMin: 3_799_000, priceMax: 4_299_000, affiliateUrl: 'https://tokopedia.com', trending: false },
    { slug: 'xiaomi-mi-scale-2-pro', title: 'Xiaomi Mi Smart Scale 2 Pro', categorySlug: 'kesehatan', rating: 8.2, priceMin: 299_000, priceMax: 399_000, affiliateUrl: 'https://shopee.co.id', trending: false },
    { slug: 'avoskin-skin-bae-toner', title: 'Avoskin Your Skin Bae Toner 100ml', categorySlug: 'kesehatan', rating: 8.7, priceMin: 179_000, priceMax: 229_000, affiliateUrl: 'https://tokopedia.com', trending: false },
    { slug: 'herbalife-formula-1-vanilla', title: 'Herbalife Formula 1 Vanilla 550g', categorySlug: 'kesehatan', rating: 7.8, priceMin: 499_000, priceMax: 599_000, affiliateUrl: 'https://shopee.co.id', trending: false },
    { slug: 'nestle-milo-3in1', title: 'Nestle Milo 3in1 Active Go 30s', categorySlug: 'kesehatan', rating: 8.0, priceMin: 89_000, priceMax: 109_000, affiliateUrl: 'https://tokopedia.com', trending: false },
    // Travel
    { slug: 'samsonite-omni-max-75', title: 'Samsonite Omni Max 75cm Hardside', categorySlug: 'travel', rating: 9.0, priceMin: 4_499_000, priceMax: 5_499_000, affiliateUrl: 'https://tokopedia.com', trending: false },
    { slug: 'osprey-farpoint-40', title: 'Osprey Farpoint 40L Travel Pack', categorySlug: 'travel', rating: 9.2, priceMin: 2_799_000, priceMax: 3_299_000, affiliateUrl: 'https://shopee.co.id', trending: false },
    { slug: 'sony-zv-1f-vlog', title: 'Sony ZV-1F Vlog Camera', categorySlug: 'travel', rating: 8.8, priceMin: 5_499_000, priceMax: 6_299_000, affiliateUrl: 'https://tokopedia.com', trending: false },
    { slug: 'delsey-chatelet-55', title: 'Delsey Paris Chatelet Air 2.0 55cm', categorySlug: 'travel', rating: 8.6, priceMin: 3_199_000, priceMax: 3_799_000, affiliateUrl: 'https://shopee.co.id', trending: false },
    { slug: 'gopro-hero-12-black', title: 'GoPro Hero 12 Black Action Camera', categorySlug: 'travel', rating: 9.1, priceMin: 6_199_000, priceMax: 6_999_000, affiliateUrl: 'https://tokopedia.com', trending: true },
    { slug: 'pacsafe-venturesafe-65', title: 'Pacsafe Venturesafe 65L EXP Pack', categorySlug: 'travel', rating: 8.4, priceMin: 2_499_000, priceMax: 2_999_000, affiliateUrl: 'https://shopee.co.id', trending: false },
    { slug: 'anker-511-powercore', title: 'Anker 511 PowerCore 20000mAh PD', categorySlug: 'travel', rating: 8.7, priceMin: 599_000, priceMax: 699_000, affiliateUrl: 'https://tokopedia.com', trending: false },
    { slug: 'victorinox-swiss-army-classic', title: 'Victorinox Swiss Army Knife Classic', categorySlug: 'travel', rating: 8.3, priceMin: 249_000, priceMax: 349_000, affiliateUrl: 'https://shopee.co.id', trending: false },
    { slug: 'bose-qc45-travel', title: 'Bose QuietComfort 45 Travel Edition', categorySlug: 'travel', rating: 9.0, priceMin: 4_999_000, priceMax: 5_499_000, affiliateUrl: 'https://tokopedia.com', trending: false },
    // Rumah
    { slug: 'modena-kuro-3d-induction', title: 'Modena Kuro 3D Induction Cooker', categorySlug: 'rumah', rating: 8.7, priceMin: 1_899_000, priceMax: 2_299_000, affiliateUrl: 'https://tokopedia.com', trending: false },
    { slug: 'ikea-hemnes-daybed', title: 'IKEA HEMNES Daybed Frame White', categorySlug: 'rumah', rating: 8.4, priceMin: 3_999_000, priceMax: 4_599_000, affiliateUrl: 'https://shopee.co.id', trending: false },
    { slug: 'philips-air-fryer-3l', title: 'Philips HD9252 Air Fryer 3L', categorySlug: 'rumah', rating: 8.9, priceMin: 1_299_000, priceMax: 1_599_000, affiliateUrl: 'https://tokopedia.com', trending: true },
    { slug: 'ikea-kallax-4x4', title: 'IKEA KALLAX Shelving Unit 4x4', categorySlug: 'rumah', rating: 8.5, priceMin: 2_499_000, priceMax: 2_999_000, affiliateUrl: 'https://shopee.co.id', trending: false },
    { slug: 'dyson-v15-detect', title: 'Dyson V15 Detect Cordless Vacuum', categorySlug: 'rumah', rating: 9.3, priceMin: 10_999_000, priceMax: 12_499_000, affiliateUrl: 'https://tokopedia.com', trending: false },
    { slug: 'pensonic-robovac-pro', title: 'Pensonic Robotic Vacuum Cleaner Pro', categorySlug: 'rumah', rating: 8.1, priceMin: 1_499_000, priceMax: 1_899_000, affiliateUrl: 'https://shopee.co.id', trending: false },
    { slug: 'nanit-pro-baby-monitor', title: 'Nanit Pro Smart Baby Monitor', categorySlug: 'rumah', rating: 8.8, priceMin: 5_999_000, priceMax: 6_999_000, affiliateUrl: 'https://tokopedia.com', trending: false },
    { slug: 'cornell-24l-microwave', title: 'Cornell 24L Microwave Oven Grill', categorySlug: 'rumah', rating: 8.2, priceMin: 799_000, priceMax: 999_000, affiliateUrl: 'https://shopee.co.id', trending: false },
    { slug: 'tanamera-signature-blend', title: 'Tanamera Coffee Signature Blend 250g', categorySlug: 'rumah', rating: 8.6, priceMin: 129_000, priceMax: 159_000, affiliateUrl: 'https://tokopedia.com', trending: false },
    // Kecantikan
    { slug: 'dyson-airwrap-complete', title: 'Dyson Airwrap Complete Long', categorySlug: 'kecantikan', rating: 9.5, priceMin: 7_999_000, affiliateUrl: 'https://lazada.co.id', trending: true },
    { slug: 'wardah-lightening-serum', title: 'Wardah Lightening Serum 20ml', categorySlug: 'kecantikan', rating: 8.3, priceMin: 89_000, priceMax: 119_000, affiliateUrl: 'https://shopee.co.id', trending: false },
    { slug: 'la-mer-moisturizing-cream', title: 'La Mer The Moisturizing Cream 60ml', categorySlug: 'kecantikan', rating: 9.0, priceMin: 3_999_000, priceMax: 4_499_000, affiliateUrl: 'https://tokopedia.com', trending: false },
    { slug: 'emina-bright-stuff-toner', title: 'Emina Bright Stuff Face Toner 100ml', categorySlug: 'kecantikan', rating: 8.1, priceMin: 35_000, priceMax: 49_000, affiliateUrl: 'https://shopee.co.id', trending: false },
    { slug: 'somethinc-niacinamide-serum', title: 'Somethinc 10% Niacinamide Serum', categorySlug: 'kecantikan', rating: 8.7, priceMin: 159_000, priceMax: 199_000, affiliateUrl: 'https://tokopedia.com', trending: false },
    { slug: 'makeover-ultra-hi-matte', title: 'Make Over Ultra Hi-Matte Lip 3.8g', categorySlug: 'kecantikan', rating: 8.4, priceMin: 99_000, priceMax: 139_000, affiliateUrl: 'https://shopee.co.id', trending: false },
    { slug: 'skin1004-centella-serum', title: 'Skin1004 Madagascar Centella Serum', categorySlug: 'kecantikan', rating: 8.9, priceMin: 249_000, priceMax: 299_000, affiliateUrl: 'https://tokopedia.com', trending: false },
    { slug: 'bioaqua-pearl-mask', title: 'BIOAQUA Pearl Facial Mask Set 10pcs', categorySlug: 'kecantikan', rating: 7.9, priceMin: 79_000, priceMax: 99_000, affiliateUrl: 'https://shopee.co.id', trending: false },
    { slug: 'maybelline-sky-high', title: 'Maybelline Sky High Mascara', categorySlug: 'kecantikan', rating: 8.6, priceMin: 129_000, priceMax: 159_000, affiliateUrl: 'https://tokopedia.com', trending: false },
    // Olahraga
    { slug: 'adidas-ultraboost-24', title: 'Adidas Ultraboost 24', categorySlug: 'olahraga', rating: 8.8, priceMin: 1_899_000, priceMax: 2_200_000, affiliateUrl: 'https://shopee.co.id', trending: true },
    { slug: 'nike-dri-fit-training-set', title: 'Nike Dri-FIT Training Set Pria', categorySlug: 'olahraga', rating: 8.3, priceMin: 599_000, priceMax: 799_000, affiliateUrl: 'https://tokopedia.com', trending: false },
    { slug: 'eiger-trekking-pole', title: 'EIGER Vertical Trekking Pole Pair', categorySlug: 'olahraga', rating: 8.6, priceMin: 499_000, priceMax: 699_000, affiliateUrl: 'https://shopee.co.id', trending: false },
    { slug: 'garmin-forerunner-165-sport', title: 'Garmin Forerunner 165 GPS Watch (Sport)', categorySlug: 'olahraga', rating: 8.9, priceMin: 3_799_000, priceMax: 4_299_000, affiliateUrl: 'https://tokopedia.com', trending: false },
    { slug: 'on-gold-standard-whey', title: 'Optimum Nutrition Gold Standard Whey', categorySlug: 'olahraga', rating: 9.0, priceMin: 699_000, priceMax: 849_000, affiliateUrl: 'https://shopee.co.id', trending: false },
    { slug: 'kettlebell-12kg-vinyl', title: 'Kettlebell Cast Iron 12kg Vinyl', categorySlug: 'olahraga', rating: 8.4, priceMin: 299_000, priceMax: 399_000, affiliateUrl: 'https://tokopedia.com', trending: false },
    { slug: 'nb-fresh-foam-1080v13', title: 'New Balance Fresh Foam X 1080v13', categorySlug: 'olahraga', rating: 8.7, priceMin: 2_199_000, priceMax: 2_699_000, affiliateUrl: 'https://shopee.co.id', trending: false },
    { slug: 'specs-rebel-running', title: 'Specs Rebel Running Shoes Pria', categorySlug: 'olahraga', rating: 8.0, priceMin: 499_000, priceMax: 649_000, affiliateUrl: 'https://tokopedia.com', trending: false },
    { slug: 'ua-rush-seamless-tight', title: 'Under Armour UA Rush Seamless Tight', categorySlug: 'olahraga', rating: 8.5, priceMin: 699_000, priceMax: 899_000, affiliateUrl: 'https://shopee.co.id', trending: false },
    // Roundup articles (no associated product)
    { slug: 'rekomendasi-sepatu-lari-2026', title: '7 Sepatu Lari Terbaik 2026', categorySlug: 'olahraga', rating: 9.0, priceMin: 499_000, priceMax: 4_999_000, affiliateUrl: 'https://tokopedia.com', trending: false },
    { slug: 'skincare-routine-kulit-kering', title: 'Skincare Routine untuk Kulit Kering', categorySlug: 'kecantikan', rating: 8.7, priceMin: 150_000, priceMax: 2_500_000, affiliateUrl: 'https://shopee.co.id', trending: false },
  ]

  let productCount = 0
  for (const p of productData) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: p,
    })
    productCount++
  }
  console.log(`✅ ${productCount} products seeded`)

  // ── 4. Reviews ───────────────────────────────────────────────────────────
  const reviewData = [
    {
      slug: 'samsung-galaxy-s25-ultra',
      title: 'Samsung Galaxy S25 Ultra',
      categorySlug: 'gadget',
      kuratorId: andi.id,
      tanggal: new Date('2026-04-05'),
      estimasiBaca: 12,
      rating: 9.2,
      priceMin: 18_999_000,
      priceMax: 21_999_000,
      affiliateUrl: 'https://shopee.co.id',
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
      categorySlug: 'gadget',
      kuratorId: andi.id,
      tanggal: new Date('2026-03-28'),
      estimasiBaca: 8,
      rating: 8.2,
      priceMin: 5_199_000,
      priceMax: 6_299_000,
      affiliateUrl: 'https://tokopedia.com',
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
      categorySlug: 'gadget',
      kuratorId: andi.id,
      tanggal: new Date('2026-04-10'),
      estimasiBaca: 14,
      rating: 9.4,
      priceMin: 16_999_000,
      priceMax: 18_999_000,
      affiliateUrl: 'https://tokopedia.com',
      pros: [
        'Chip M3 menghadirkan performa luar biasa untuk semua kebutuhan kreatif',
        'Daya tahan baterai hingga 18 jam pemakaian nyata sehari-hari',
        'Desain tipis 11.3mm tanpa kipas, senyap sempurna dalam kondisi apapun',
        'Layar Liquid Retina 13.6" yang sangat tajam dengan 500 nits kecerahan',
        'Mendukung dua layar eksternal secara bersamaan',
      ],
      cons: [
        'Hanya 2 port Thunderbolt, kurang untuk pengguna yang butuh banyak aksesoris',
        'RAM base 8GB mulai terasa sempit untuk multitasking berat',
        'Tidak ada slot SD card',
      ],
    },
    {
      slug: 'adidas-ultraboost-24',
      title: 'Adidas Ultraboost 24',
      categorySlug: 'olahraga',
      kuratorId: sinta.id,
      tanggal: new Date('2026-04-01'),
      estimasiBaca: 10,
      rating: 8.8,
      priceMin: 1_899_000,
      priceMax: 2_200_000,
      affiliateUrl: 'https://shopee.co.id',
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
      categorySlug: 'olahraga',
      kuratorId: sinta.id,
      tanggal: new Date('2026-04-03'),
      estimasiBaca: 12,
      rating: 9.0,
      priceMin: 499_000,
      priceMax: 4_999_000,
      affiliateUrl: 'https://tokopedia.com',
      pros: [
        'Kurator menguji langsung setiap sepatu dalam kondisi nyata selama 2 minggu',
        'Mencakup pilihan dari budget entry-level hingga premium',
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
      categorySlug: 'kecantikan',
      kuratorId: maya.id,
      tanggal: new Date('2026-04-07'),
      estimasiBaca: 11,
      rating: 9.5,
      priceMin: 7_999_000,
      affiliateUrl: 'https://lazada.co.id',
      pros: [
        'Teknologi Coanda effect mengeringkan dan men-styling rambut secara bersamaan',
        'Panas lebih merata dan terkontrol, meminimalisir kerusakan rambut',
        'Paket Complete Long dilengkapi 8 attachment untuk berbagai gaya rambut',
        'Hasil styling bertahan lebih lama dibanding alat konvensional',
        'Desain premium dan material berkualitas tinggi',
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
      categorySlug: 'kecantikan',
      kuratorId: maya.id,
      tanggal: new Date('2026-04-09'),
      estimasiBaca: 10,
      rating: 8.7,
      priceMin: 150_000,
      priceMax: 2_500_000,
      affiliateUrl: 'https://shopee.co.id',
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

  let reviewCount = 0
  for (const r of reviewData) {
    await prisma.review.upsert({
      where: { slug: r.slug },
      update: {},
      create: r,
    })
    reviewCount++
  }
  console.log(`✅ ${reviewCount} reviews seeded`)

  // ── 5. Donation Weeks ────────────────────────────────────────────────────
  const week1 = await prisma.donationWeek.upsert({
    where: { id: 'w-apr-8-14' },
    update: {},
    create: {
      id: 'w-apr-8-14',
      periode: '8 April – 14 April 2026',
      periodeStart: new Date('2026-04-08'),
      periodeEnd: new Date('2026-04-14'),
      totalKomisi: 2_840_000,
      totalDisisihkan: 426_000,
      persentase: 15,
    },
  })

  const week2 = await prisma.donationWeek.upsert({
    where: { id: 'w-apr-1-7' },
    update: {},
    create: {
      id: 'w-apr-1-7',
      periode: '1 April – 7 April 2026',
      periodeStart: new Date('2026-04-01'),
      periodeEnd: new Date('2026-04-07'),
      totalKomisi: 3_120_000,
      totalDisisihkan: 468_000,
      persentase: 15,
    },
  })

  const week3 = await prisma.donationWeek.upsert({
    where: { id: 'w-mar-25-31' },
    update: {},
    create: {
      id: 'w-mar-25-31',
      periode: '25 Maret – 31 Maret 2026',
      periodeStart: new Date('2026-03-25'),
      periodeEnd: new Date('2026-03-31'),
      totalKomisi: 2_680_000,
      totalDisisihkan: 402_000,
      persentase: 15,
    },
  })
  console.log('✅ 3 donation weeks seeded')

  // ── 6. Recipients ────────────────────────────────────────────────────────
  const recipientsWeek1 = [
    { inisial: 'Bpk. S.', wilayah: 'Margahayu, Bandung', nominal: 75_000, tanggal: new Date('2026-04-09') },
    { inisial: 'Ibu. R.', wilayah: 'Kebayoran, Jakarta Sel.', nominal: 100_000, tanggal: new Date('2026-04-09') },
    { inisial: 'Bpk. H.', wilayah: 'Tembalang, Semarang', nominal: 50_000, tanggal: new Date('2026-04-10') },
    { inisial: 'Ibu. W.', wilayah: 'Lowokwaru, Malang', nominal: 75_000, tanggal: new Date('2026-04-10') },
    { inisial: 'Bpk. T.', wilayah: 'Rappocini, Makassar', nominal: 75_000, tanggal: new Date('2026-04-11') },
    { inisial: 'Ibu. M.', wilayah: 'Denpasar Selatan, Bali', nominal: 51_000, tanggal: new Date('2026-04-11') },
  ]

  const recipientsWeek2 = [
    { inisial: 'Bpk. A.', wilayah: 'Cibeunying, Bandung', nominal: 100_000, tanggal: new Date('2026-04-03') },
    { inisial: 'Ibu. S.', wilayah: 'Pasar Minggu, Jakarta Sel.', nominal: 75_000, tanggal: new Date('2026-04-03') },
    { inisial: 'Bpk. J.', wilayah: 'Pedurungan, Semarang', nominal: 75_000, tanggal: new Date('2026-04-04') },
    { inisial: 'Ibu. N.', wilayah: 'Klojen, Malang', nominal: 100_000, tanggal: new Date('2026-04-04') },
    { inisial: 'Bpk. Y.', wilayah: 'Manggala, Makassar', nominal: 68_000, tanggal: new Date('2026-04-05') },
    { inisial: 'Ibu. K.', wilayah: 'Gianyar, Bali', nominal: 50_000, tanggal: new Date('2026-04-05') },
  ]

  const recipientsWeek3 = [
    { inisial: 'Ibu. D.', wilayah: 'Coblong, Bandung', nominal: 75_000, tanggal: new Date('2026-03-27') },
    { inisial: 'Bpk. R.', wilayah: 'Tebet, Jakarta Sel.', nominal: 100_000, tanggal: new Date('2026-03-27') },
    { inisial: 'Ibu. L.', wilayah: 'Banyumanik, Semarang', nominal: 50_000, tanggal: new Date('2026-03-28') },
    { inisial: 'Bpk. F.', wilayah: 'Sukun, Malang', nominal: 75_000, tanggal: new Date('2026-03-28') },
    { inisial: 'Ibu. E.', wilayah: 'Tamalanrea, Makassar', nominal: 52_000, tanggal: new Date('2026-03-29') },
  ]

  let recipientCount = 0
  for (const [week, recipients] of [
    [week1, recipientsWeek1],
    [week2, recipientsWeek2],
    [week3, recipientsWeek3],
  ] as const) {
    for (const r of recipients) {
      await prisma.recipient.create({
        data: { ...r, donationWeekId: week.id, foto: '' },
      })
      recipientCount++
    }
  }
  console.log(`✅ ${recipientCount} recipients seeded`)

  console.log('🎉 Seeding complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
