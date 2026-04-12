import Link from 'next/link'
import { ArrowRight, Clock, User } from 'lucide-react'
import { CategoryBadge } from '@/components/shared/CategoryBadge'
import type { ArticlePreview } from '@/types'

function ArticleCard({ slug, title, category, kurator, estimasiBaca }: ArticlePreview) {
  return (
    <Link
      href={`/review/${slug}`}
      className="group flex flex-col bg-card border border-white/10 rounded-xl overflow-hidden hover:border-primary/40 transition-colors"
    >
      {/* Thumbnail placeholder */}
      <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-4xl select-none">
        📝
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
          href="/kategori/gadget"
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
