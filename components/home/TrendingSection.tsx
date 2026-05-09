import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ProductCard } from '@/components/kategori/ProductCard'
import type { ProductCardProps } from '@/types'

interface TrendingSectionProps {
  products: ProductCardProps[]
}

export function TrendingSection({ products }: TrendingSectionProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">
          Trending <span className="text-primary">Pekan Ini</span>
        </h2>
        <Link
          href="/kategori/serum"
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          Lihat Semua
          <ArrowRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {products.map((product) => (
          <ProductCard key={product.slug} {...product} />
        ))}
      </div>
    </section>
  )
}
