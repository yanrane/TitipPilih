import { MapPin, Calendar } from 'lucide-react'
import { formatRupiah } from '@/lib/utils'
import type { RecipientCardProps } from '@/types'

export function RecipientCard({
  inisial,
  wilayah,
  nominal,
  tanggal,
}: RecipientCardProps) {
  return (
    <div className="bg-card border border-white/10 rounded-xl overflow-hidden hover:border-secondary/40 transition-colors">
      {/* Photo placeholder — no real face shown, privacy maintained */}
      <div className="aspect-square bg-gradient-to-br from-secondary/10 to-primary/10 flex flex-col items-center justify-center gap-2 select-none">
        <span className="text-4xl">🤝</span>
        <span className="text-xs text-muted-foreground font-semibold">{inisial}</span>
      </div>

      <div className="p-3 flex flex-col gap-1.5">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin size={11} className="shrink-0" />
          <span className="line-clamp-1">{wilayah}</span>
        </div>

        <p className="text-sm font-bold text-secondary tabular-nums">
          {formatRupiah(nominal)}
        </p>

        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Calendar size={11} className="shrink-0" />
          <span>{tanggal}</span>
        </div>
      </div>
    </div>
  )
}
