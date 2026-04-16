import Image from 'next/image'
import { Star, Heart, ShoppingCart } from 'lucide-react'
import { formatRupiah } from '@/lib/utils'
import type { ProductSidebarProps } from '@/types'

export function ProductSidebar({
  image,
  title,
  rating,
  priceMin,
  priceMax,
  affiliateUrl,
}: ProductSidebarProps) {
  const stars = Math.round(rating / 2) // 0–10 → 0–5
  const ratingColor =
    rating >= 9 ? 'text-secondary' : rating >= 7 ? 'text-primary' : 'text-yellow-400'

  return (
    <div className="bg-card border border-white/10 rounded-2xl overflow-hidden">
      {/* Product image */}
      <div className="relative aspect-square">
        <Image
          src={image || `https://picsum.photos/seed/${encodeURIComponent(title)}/400/400`}
          alt={title}
          fill
          sizes="340px"
          className="object-cover"
          priority
        />
      </div>

      <div className="p-5 flex flex-col gap-4">
        {/* Title */}
        <h2 className="font-bold text-foreground text-base leading-snug">{title}</h2>

        {/* Rating — large display */}
        <div className="flex items-center gap-3">
          <span className={`text-4xl font-bold ${ratingColor} tabular-nums`}>
            {rating.toFixed(1)}
          </span>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={
                    i < stars
                      ? 'fill-primary text-primary'
                      : 'text-muted-foreground'
                  }
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">Skor kurator /10</span>
          </div>
        </div>

        {/* Price */}
        <div>
          <p className="text-xs text-muted-foreground mb-0.5">Harga mulai</p>
          <p className="text-xl font-bold text-foreground">
            {formatRupiah(priceMin)}
          </p>
          {priceMax && (
            <p className="text-xs text-muted-foreground">
              s/d {formatRupiah(priceMax)}
            </p>
          )}
        </div>

        {/* CTA — affiliate link */}
        <a
          href={affiliateUrl}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-colors text-sm"
          aria-label={`Beli ${title} sekarang`}
        >
          <ShoppingCart size={16} />
          Beli Sekarang
        </a>

        {/* Donation note */}
        <div className="flex items-start gap-2 p-3 bg-secondary/10 rounded-lg border border-secondary/20">
          <Heart size={14} className="text-secondary fill-secondary shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            Komisi dari pembelian ini sebagian disumbangkan untuk warga yang
            membutuhkan.{' '}
            <a
              href="/donasi"
              className="text-secondary hover:underline underline-offset-2"
            >
              Lihat laporan
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
