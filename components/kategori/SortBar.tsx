export type SortOption = 'terpopuler' | 'rating' | 'harga_terendah' | 'terbaru'

interface SortBarProps {
  sort: SortOption
  onSortChange: (s: SortOption) => void
  totalCount: number
}

export function SortBar({ sort, onSortChange, totalCount }: SortBarProps) {
  return (
    <div className="flex items-center justify-between gap-4 flex-wrap">
      <p className="text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">{totalCount}</span> produk ditemukan
      </p>
      <select
        value={sort}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        className="px-3 py-2 text-sm bg-card border border-white/20 rounded-lg text-foreground focus:outline-none focus:border-primary/60 cursor-pointer"
      >
        <option value="terpopuler">Terpopuler</option>
        <option value="rating">Rating Tertinggi</option>
        <option value="harga_terendah">Harga Terendah</option>
        <option value="terbaru">Terbaru</option>
      </select>
    </div>
  )
}
