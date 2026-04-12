import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { CategorySlug } from '@/types'

const categoryColors: Record<CategorySlug, string> = {
  gadget: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  fashion: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
  kesehatan: 'bg-green-500/20 text-green-300 border-green-500/30',
  travel: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
  rumah: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  kecantikan: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  olahraga: 'bg-red-500/20 text-red-300 border-red-500/30',
}

const categoryLabels: Record<CategorySlug, string> = {
  gadget: 'Gadget',
  fashion: 'Fashion',
  kesehatan: 'Kesehatan',
  travel: 'Travel',
  rumah: 'Rumah',
  kecantikan: 'Kecantikan',
  olahraga: 'Olahraga',
}

interface CategoryBadgeProps {
  category: CategorySlug
  className?: string
}

export function CategoryBadge({ category, className }: CategoryBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        'border font-medium text-xs',
        categoryColors[category],
        className
      )}
    >
      {categoryLabels[category]}
    </Badge>
  )
}
