import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Clock, User } from 'lucide-react'
import { CategoryBadge } from '@/components/shared/CategoryBadge'
import type { ArticlePreview } from '@/types'

// Fallback image per category for articles that don't have an image
const categoryImages: Record<string, string> = {
  serum: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&h=450&fit=crop&auto=format',
  moisturizer: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&h=450&fit=crop&auto=format',
  sunscreen: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&h=450&fit=crop&auto=format',
  cleanser: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&h=450&fit=crop&auto=format',
  toner: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=450&fit=crop&auto=format',
  eyecare: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&h=450&fit=crop&auto=format',
  bodycare: 'https://images.unsplash.com/photo-1570213489059-0aac6626cade?w=800&h=450&fit=crop&auto=format',
}

function ArticleCard({ slug, title, category, image, kurator, estimasiBaca }: ArticlePreview) {
  const imgSrc = image || categoryImages[category] || categoryImages['serum']

  return (
    <Link
      href={`/review/${slug}`}
      className="group flex flex-col bg-card border border-border rounded-xl overflow-hidden hover:border-primary/40 transition-all duration-200 hover:shadow-md"
    >
      <div className="relative aspect-video">
        <Image
          src={imgSrc}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-4 flex flex-col gap-2 flex-1">
        <CategoryBadge category={category} />

        <h3 className="font-semibold text-foreground text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>

        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-auto pt-1">
          <span className="flex items-center gap-1">
            <User size={11} />
            {kurator}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={11} />
            {estimasiBaca} menit
          </span>
        </div>
      </div>
    </Link>
  )
}

interface ArtikelTerbaruProps {
  articles: ArticlePreview[]
}

export function ArtikelTerbaru({ articles }: ArtikelTerbaruProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">
          Artikel <span className="text-primary">Terbaru</span>
        </h2>
        <Link
          href="/kategori/serum"
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          Selengkapnya
          <ArrowRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {articles.map((article) => (
          <ArticleCard key={article.slug} {...article} />
        ))}
      </div>
    </section>
  )
}
