import Link from 'next/link'
import { Clock, User, Star } from 'lucide-react'
import { CategoryBadge } from '@/components/shared/CategoryBadge'
import { getRelatedReviews } from '@/lib/db/reviews'
import type { CategorySlug } from '@/types'

interface RelatedReviewsProps {
  currentSlug: string
  category: CategorySlug
}

export async function RelatedReviews({ currentSlug, category }: RelatedReviewsProps) {
  const related = await getRelatedReviews(currentSlug, category)

  if (related.length === 0) return null

  return (
    <section>
      <h2 className="text-xl font-bold text-foreground mb-5">
        Ulasan <span className="text-primary">Terkait</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {related.map((review) => {
          const stars = Math.round(review.rating / 2)
          return (
            <Link
              key={review.slug}
              href={`/review/${review.slug}`}
              className="group flex flex-col bg-card border border-white/10 rounded-xl overflow-hidden hover:border-primary/40 transition-colors"
            >
              {/* Thumbnail */}
              <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-3xl select-none">
                📝
              </div>

              <div className="p-4 flex flex-col gap-2 flex-1">
                <CategoryBadge category={review.category} />

                <h3 className="font-semibold text-foreground text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                  {review.title}
                </h3>

                {/* Stars */}
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={11}
                      className={
                        i < stars
                          ? 'fill-primary text-primary'
                          : 'text-muted-foreground'
                      }
                    />
                  ))}
                  <span className="text-xs text-muted-foreground ml-1">
                    {review.rating}/10
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs text-muted-foreground mt-auto pt-1">
                  <span className="flex items-center gap-1">
                    <User size={10} />
                    {review.kurator}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={10} />
                    {review.estimasiBaca} mnt
                  </span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
