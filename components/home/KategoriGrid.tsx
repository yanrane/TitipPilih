import Link from 'next/link'
import {
  Droplets,
  Leaf,
  Sun,
  Waves,
  FlaskConical,
  Eye,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'
import type { CategorySlug } from '@/types'

interface CategoryItem {
  slug: CategorySlug
  label: string
  icon: LucideIcon
  color: string
  bg: string
  border: string
}

const categories: CategoryItem[] = [
  {
    slug: 'serum',
    label: 'Serum',
    icon: Droplets,
    color: 'text-rose-500',
    bg: 'bg-rose-50 hover:bg-rose-100',
    border: 'border-rose-200 hover:border-rose-300',
  },
  {
    slug: 'moisturizer',
    label: 'Moisturizer',
    icon: Leaf,
    color: 'text-emerald-500',
    bg: 'bg-emerald-50 hover:bg-emerald-100',
    border: 'border-emerald-200 hover:border-emerald-300',
  },
  {
    slug: 'sunscreen',
    label: 'Sunscreen',
    icon: Sun,
    color: 'text-amber-500',
    bg: 'bg-amber-50 hover:bg-amber-100',
    border: 'border-amber-200 hover:border-amber-300',
  },
  {
    slug: 'cleanser',
    label: 'Pembersih',
    icon: Waves,
    color: 'text-sky-500',
    bg: 'bg-sky-50 hover:bg-sky-100',
    border: 'border-sky-200 hover:border-sky-300',
  },
  {
    slug: 'toner',
    label: 'Toner',
    icon: FlaskConical,
    color: 'text-violet-500',
    bg: 'bg-violet-50 hover:bg-violet-100',
    border: 'border-violet-200 hover:border-violet-300',
  },
  {
    slug: 'eyecare',
    label: 'Mata',
    icon: Eye,
    color: 'text-pink-500',
    bg: 'bg-pink-50 hover:bg-pink-100',
    border: 'border-pink-200 hover:border-pink-300',
  },
  {
    slug: 'bodycare',
    label: 'Body Care',
    icon: Sparkles,
    color: 'text-orange-500',
    bg: 'bg-orange-50 hover:bg-orange-100',
    border: 'border-orange-200 hover:border-orange-300',
  },
]

export function KategoriGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-2xl font-bold text-foreground mb-6">
        Kategori <span className="text-primary">Skincare</span>
      </h2>

      <div className="flex gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-7 md:overflow-visible">
        {categories.map((cat) => {
          const Icon = cat.icon
          return (
            <Link
              key={cat.slug}
              href={`/kategori/${cat.slug}`}
              className={`flex flex-col items-center gap-2.5 p-4 rounded-xl border transition-all duration-200 min-w-[88px] md:min-w-0 ${cat.bg} ${cat.border}`}
            >
              <Icon size={26} className={cat.color} />
              <span className={`text-xs font-semibold ${cat.color} whitespace-nowrap`}>
                {cat.label}
              </span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
