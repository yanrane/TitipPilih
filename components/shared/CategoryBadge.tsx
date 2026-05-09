import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { CategorySlug } from '@/types'

const categoryColors: Record<CategorySlug, string> = {
  serum: 'bg-rose-100 text-rose-700 border-rose-200',
  moisturizer: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  sunscreen: 'bg-amber-100 text-amber-700 border-amber-200',
  cleanser: 'bg-sky-100 text-sky-700 border-sky-200',
  toner: 'bg-violet-100 text-violet-700 border-violet-200',
  eyecare: 'bg-pink-100 text-pink-700 border-pink-200',
  bodycare: 'bg-orange-100 text-orange-700 border-orange-200',
}

const categoryLabels: Record<CategorySlug, string> = {
  serum: 'Serum',
  moisturizer: 'Moisturizer',
  sunscreen: 'Sunscreen',
  cleanser: 'Pembersih',
  toner: 'Toner',
  eyecare: 'Perawatan Mata',
  bodycare: 'Body Care',
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
