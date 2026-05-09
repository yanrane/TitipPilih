import type { Metadata } from 'next'
import { KategoriContent } from '@/components/kategori/KategoriContent'
import { getProductsByCategory } from '@/lib/db/products'
import type { CategorySlug } from '@/types'

const categoryInfo: Record<string, { label: string; description: string }> = {
  serum: {
    label: 'Serum',
    description: 'Serum skincare terbaik untuk kulit cerah, lembab, dan bebas jerawat. Pilihan terpercaya untuk niacinamide, retinol, dan vitamin C.',
  },
  moisturizer: {
    label: 'Moisturizer',
    description: 'Pelembab wajah terbaik untuk menjaga hidrasi kulit dan memperkuat skin barrier sepanjang hari.',
  },
  sunscreen: {
    label: 'Sunscreen',
    description: 'Sunscreen terbaik untuk iklim tropis Indonesia — ringan, tidak lengket, dan melindungi kulit dari sinar UV setiap hari.',
  },
  cleanser: {
    label: 'Pembersih',
    description: 'Sabun cuci muka dan pembersih wajah terbaik untuk kulit bersih optimal tanpa merusak skin barrier.',
  },
  toner: {
    label: 'Toner',
    description: 'Toner skincare untuk menyeimbangkan pH kulit, mengecilkan pori, dan mempersiapkan kulit menyerap serum.',
  },
  eyecare: {
    label: 'Perawatan Mata',
    description: 'Krim mata dan produk perawatan area mata terbaik untuk mengatasi kantung mata, kerutan, dan lingkaran hitam.',
  },
  bodycare: {
    label: 'Body Care',
    description: 'Produk perawatan tubuh terbaik untuk kulit cerah, lembab, dan wangi sepanjang hari.',
  },
}

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const info = categoryInfo[slug]
  const label = info?.label ?? slug
  const description =
    info?.description ?? `Rekomendasi produk ${label} terbaik pilihan kurator TitipPilih.`
  return {
    title: `Kategori ${label}`,
    description,
    keywords: [
      `review ${label.toLowerCase()} terbaik`,
      `rekomendasi ${label.toLowerCase()} Indonesia`,
      `produk ${label.toLowerCase()} pilihan kurator`,
      'TitipPilih',
    ],
    openGraph: {
      title: `Kategori ${label} | TitipPilih`,
      description,
      url: `https://titippilih.id/kategori/${slug}`,
      type: 'website',
    },
  }
}

export default async function KategoriPage({ params }: Props) {
  const { slug } = await params
  const info = categoryInfo[slug]
  const label = info?.label ?? slug
  const description =
    info?.description ??
    `Rekomendasi produk ${label} terbaik pilihan kurator TitipPilih.`

  const products = await getProductsByCategory(slug as CategorySlug)

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Kategori <span className="text-primary">{label}</span>
        </h1>
        <p className="text-muted-foreground max-w-xl text-sm leading-relaxed">
          {description}
        </p>
      </div>

      <KategoriContent slug={slug} products={products} />
    </div>
  )
}
