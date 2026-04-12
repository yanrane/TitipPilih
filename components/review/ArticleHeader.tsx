import Link from 'next/link'
import Image from 'next/image'
import { Clock, User, ChevronRight } from 'lucide-react'
import { CategoryBadge } from '@/components/shared/CategoryBadge'
import type { CategorySlug } from '@/types'

const categoryLabels: Record<CategorySlug, string> = {
  gadget: 'Gadget',
  fashion: 'Fashion',
  kesehatan: 'Kesehatan',
  travel: 'Travel',
  rumah: 'Rumah',
  kecantikan: 'Kecantikan',
  olahraga: 'Olahraga',
}

// Category-specific emoji for hero image placeholder
const categoryEmoji: Record<CategorySlug, string> = {
  gadget: '📱',
  fashion: '👗',
  kesehatan: '💊',
  travel: '✈️',
  rumah: '🏠',
  kecantikan: '💄',
  olahraga: '👟',
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
  const emoji = categoryEmoji[category]

  // Derive kurator initials for avatar placeholder
  const initials = kurator
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  // Split title for italic orange accent on last word
  const words = title.split(' ')
  const lastWord = words.pop()
  const restOfTitle = words.join(' ')

  return (
    <header className="flex flex-col gap-5">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground flex-wrap">
        <Link href="/" className="hover:text-foreground transition-colors">
          Beranda
        </Link>
        <ChevronRight size={12} />
        <Link
          href={`/kategori/${category}`}
          className="hover:text-foreground transition-colors"
        >
          {categoryLabel}
        </Link>
        <ChevronRight size={12} />
        <span className="text-foreground line-clamp-1">{title}</span>
      </nav>

      {/* Category badge + Title */}
      <div className="flex flex-col gap-3">
        <CategoryBadge category={category} />
        <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
          {restOfTitle}{' '}
          <span className="text-primary italic">{lastWord}</span>
        </h1>
      </div>

      {/* Kurator info */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* Avatar */}
        <div className="w-9 h-9 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0">
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

      {/* Hero image */}
      {image ? (
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 1024px) 100vw, 65vw"
            className="object-cover"
            priority
          />
        </div>
      ) : (
        <div className="w-full aspect-video rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-white/10 flex items-center justify-center overflow-hidden">
          <div className="flex flex-col items-center gap-3">
            <span className="text-8xl select-none">{emoji}</span>
            <span className="text-sm text-muted-foreground font-medium">{title}</span>
          </div>
        </div>
      )}
    </header>
  )
}
