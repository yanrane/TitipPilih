import Link from 'next/link'
import Image from 'next/image'
import { Star } from 'lucide-react'
import { CategoryBadge } from '@/components/shared/CategoryBadge'
import { formatRupiah } from '@/lib/utils'
import type { ProductCardProps } from '@/types'

export function ProductCard({
  image,
  title,
  category,
  rating,
  priceMin,
  priceMax,
  slug,
}: ProductCardProps) {
  const stars = Math.round(rating / 2) // 0–10 → 0–5

  return (
    <div className="group flex flex-col bg-card border border-border rounded-xl overflow-hidden hover:border-primary/40 transition-colors">
      {/* Thumbnail */}
      <div className="relative aspect-square">
        <Image
          src={image || 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop&auto=format'}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
      </div>

      <div className="p-4 flex flex-col gap-2 flex-1">
        <CategoryBadge category={category} />

        <h3 className="font-semibold text-foreground text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>

        {/* Star rating */}
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={12}
              className={
                i < stars
                  ? 'fill-primary text-primary'
                  : 'text-muted-foreground'
              }
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1.5">
            {rating}/10
          </span>
        </div>

        {/* Price */}
        <p className="text-sm font-semibold text-foreground">
          {formatRupiah(priceMin)}
          {priceMax && (
            <span className="text-muted-foreground font-normal">
              {' '}– {formatRupiah(priceMax)}
            </span>
          )}
        </p>

        <Link
          href={`/review/${slug}`}
          className="mt-auto block text-center py-2 px-4 bg-primary/10 text-primary text-sm font-medium rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          Baca Review
        </Link>
      </div>
    </div>
  )
}
