import type { Metadata } from 'next'
import { KategoriContent } from '@/components/kategori/KategoriContent'
import { getProductsByCategory } from '@/lib/db/products'
import type { CategorySlug } from '@/types'

const categoryInfo: Record<string, { label: string; description: string }> = {
  gadget: {
    label: 'Gadget',
    description:
      'Temukan smartphone, laptop, audio, dan aksesori elektronik terbaik pilihan kurator kami.',
  },
  fashion: {
    label: 'Fashion',
    description:
      'Koleksi pakaian, sepatu, dan aksesori fashion terkini dengan kualitas terbaik.',
  },
  kesehatan: {
    label: 'Kesehatan',
    description:
      'Produk kesehatan, suplemen, dan peralatan terpercaya untuk hidup lebih sehat.',
  },
  travel: {
    label: 'Travel',
    description:
      'Koper, backpack, kamera, dan aksesori perjalanan untuk petualangan tanpa hambatan.',
  },
  rumah: {
    label: 'Rumah',
    description:
      'Furnitur, dekorasi, dan elektronik rumah untuk menciptakan hunian impian.',
  },
  kecantikan: {
    label: 'Kecantikan',
    description:
      'Skincare, makeup, dan perawatan rambut dari brand lokal dan internasional terbaik.',
  },
  olahraga: {
    label: 'Olahraga',
    description:
      'Sepatu, pakaian, dan peralatan olahraga untuk mendukung gaya hidup aktif.',
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
