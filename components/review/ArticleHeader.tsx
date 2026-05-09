import Link from 'next/link'
import Image from 'next/image'
import { Clock, User, ChevronRight } from 'lucide-react'
import { CategoryBadge } from '@/components/shared/CategoryBadge'
import type { CategorySlug } from '@/types'

const categoryLabels: Record<CategorySlug, string> = {
  serum: 'Serum',
  moisturizer: 'Moisturizer',
  sunscreen: 'Sunscreen',
  cleanser: 'Pembersih',
  toner: 'Toner',
  eyecare: 'Perawatan Mata',
  bodycare: 'Body Care',
}

// Fallback image per category — NO picsum.photos
const categoryHeroImages: Record<CategorySlug, string> = {
  serum: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=1200&h=675&fit=crop&auto=format',
  moisturizer: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=1200&h=675&fit=crop&auto=format',
  sunscreen: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=1200&h=675&fit=crop&auto=format',
  cleanser: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=1200&h=675&fit=crop&auto=format',
  toner: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&h=675&fit=crop&auto=format',
  eyecare: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=1200&h=675&fit=crop&auto=format',
  bodycare: 'https://images.unsplash.com/photo-1570213489059-0aac6626cade?w=1200&h=675&fit=crop&auto=format',
}

interface ArticleHeaderProps {
  title: string
  category: CategorySlug
  kurator: string
  tanggal: string
  estimasiBaca: number
  image?: string
}

export function ArticleHeader({
  title,
  category,
  kurator,
  tanggal,
  estimasiBaca,
  image,
}: ArticleHeaderProps) {
  const categoryLabel = categoryLabels[category]
  const heroImage = image || categoryHeroImages[category]

  const initials = kurator
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  const words = title.split(' ')
  const lastWord = words.pop()
  const restOfTitle = words.join(' ')

  return (
    <header className="flex flex-col gap-5">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground flex-wrap">
        <Link href="/" className="hover:text-foreground transition-colors">Beranda</Link>
        <ChevronRight size={12} />
        <Link href={`/kategori/${category}`} className="hover:text-foreground transition-colors">
          {categoryLabel}
        </Link>
        <ChevronRight size={12} />
        <span className="text-foreground line-clamp-1">{title}</span>
      </nav>

      {/* Title */}
      <div className="flex flex-col gap-3">
        <CategoryBadge category={category} />
        <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
          {restOfTitle}{' '}
          <span className="text-primary italic">{lastWord}</span>
        </h1>
      </div>

      {/* Kurator */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
          <span className="text-xs font-bold text-primary">{initials}</span>
        </div>
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2 text-sm">
            <User size={13} className="text-muted-foreground" />
            <span className="font-medium text-foreground">{kurator}</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span>{tanggal}</span>
            <span className="flex items-center gap-1">
              <Clock size={11} />
              {estimasiBaca} menit baca
            </span>
          </div>
        </div>
      </div>

      {/* Hero image — TIDAK lagi pakai picsum.photos */}
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-border">
        <Image
          src={heroImage}
          alt={title}
          fill
          sizes="(max-width: 1024px) 100vw, 65vw"
          className="object-cover"
          priority
        />
      </div>
    </header>
  )
}
