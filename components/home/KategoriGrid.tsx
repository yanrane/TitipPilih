import Link from 'next/link'
import {
  Smartphone,
  ShoppingBag,
  Heart,
  Plane,
  Home,
  Sparkles,
  Dumbbell,
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
    slug: 'gadget',
    label: 'Gadget',
    icon: Smartphone,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10 hover:bg-blue-500/20',
    border: 'border-blue-500/20 hover:border-blue-400/40',
  },
  {
    slug: 'fashion',
    label: 'Fashion',
    icon: ShoppingBag,
    color: 'text-pink-400',
    bg: 'bg-pink-500/10 hover:bg-pink-500/20',
    border: 'border-pink-500/20 hover:border-pink-400/40',
  },
  {
    slug: 'kesehatan',
    label: 'Kesehatan',
    icon: Heart,
    color: 'text-green-400',
    bg: 'bg-green-500/10 hover:bg-green-500/20',
    border: 'border-green-500/20 hover:border-green-400/40',
  },
  {
    slug: 'travel',
    label: 'Travel',
    icon: Plane,
    color: 'text-teal-400',
    bg: 'bg-teal-500/10 hover:bg-teal-500/20',
    border: 'border-teal-500/20 hover:border-teal-400/40',
  },
  {
    slug: 'rumah',
    label: 'Rumah',
    icon: Home,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10 hover:bg-amber-500/20',
    border: 'border-amber-500/20 hover:border-amber-400/40',
  },
  {
    slug: 'kecantikan',
    label: 'Kecantikan',
    icon: Sparkles,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10 hover:bg-purple-500/20',
    border: 'border-purple-500/20 hover:border-purple-400/40',
  },
  {
    slug: 'olahraga',
    label: 'Olahraga',
    icon: Dumbbell,
    color: 'text-red-400',
    bg: 'bg-red-500/10 hover:bg-red-500/20',
    border: 'border-red-500/20 hover:border-red-400/40',
  },
]

export function KategoriGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-2xl font-bold text-foreground mb-6">
        Kategori <span className="text-primary">Pilihan</span>
      </h2>

      {/* Horizontal scroll on mobile, 7-column grid on desktop */}
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
