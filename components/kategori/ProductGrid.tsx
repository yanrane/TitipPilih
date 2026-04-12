import Link from 'next/link'
import { ProductCard } from '@/components/kategori/ProductCard'
import type { ProductCardProps } from '@/types'

// CTA card inserted at this grid position (0-indexed)
const CTA_POSITION = 3

function BingungCard() {
  return (
    <Link
      href="/tentang"
      className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl bg-primary/10 border border-primary/30 hover:bg-primary/20 transition-colors text-center min-h-[220px]"
    >
      <span className="text-4xl select-none">🤔</span>
      <div>
        <h3 className="font-bold text-foreground text-base mb-1">Bingung Pilih Mana?</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Kurator kami siap bantu kamu menemukan produk terbaik sesuai kebutuhan dan budget.
        </p>
      </div>
      <span className="text-sm font-semibold text-primary">Kenali Kurator kami →</span>
    </Link>
  )
}

interface ProductGridProps {
  products: ProductCardProps[]
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
        <span className="text-4xl select-none">🔍</span>
        <p className="text-muted-foreground">Tidak ada produk yang sesuai filter.</p>
        <p className="text-xs text-muted-foreground">
          Coba sesuaikan rentang harga atau reset filter untuk melihat semua produk.
        </p>
      </div>
    )
  }

  // Build items with CTA slot inserted at CTA_POSITION
  type GridItem =
    | { type: 'product'; data: ProductCardProps }
    | { type: 'cta' }

  const items: GridItem[] = []
  products.forEach((p, i) => {
    if (i === CTA_POSITION) items.push({ type: 'cta' })
    items.push({ type: 'product', data: p })
  })
  // Append CTA at end if fewer products than CTA_POSITION
  if (products.length <= CTA_POSITION) items.push({ type: 'cta' })

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {items.map((item) => {
        if (item.type === 'cta') {
          return <BingungCard key="cta" />
        }
        return <ProductCard key={item.data.slug} {...item.data} />
      })}
    </div>
  )
}
