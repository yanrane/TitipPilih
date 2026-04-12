'use client'

import { useState, useEffect } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { formatRupiah } from '@/lib/utils'

export interface FilterState {
  subKategori: string[]
  priceMin: number
  priceMax: number
}

interface FilterPanelProps {
  subKategoriOptions: string[]
  filters: FilterState
  onFilterChange: (f: FilterState) => void
}

function FilterPanel({ subKategoriOptions, filters, onFilterChange }: FilterPanelProps) {
  const [local, setLocal] = useState<FilterState>(filters)

  // Sync when parent resets from outside (e.g. mobile applies then desktop opens)
  useEffect(() => {
    setLocal(filters)
  }, [filters])

  const toggleSub = (sub: string) =>
    setLocal((prev) => ({
      ...prev,
      subKategori: prev.subKategori.includes(sub)
        ? prev.subKategori.filter((s) => s !== sub)
        : [...prev.subKategori, sub],
    }))

  const handleApply = () => onFilterChange(local)

  const handleReset = () => {
    const reset: FilterState = { subKategori: [], priceMin: 0, priceMax: 50_000_000 }
    setLocal(reset)
    onFilterChange(reset)
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Sub-kategori checkboxes */}
      <div>
        <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3">
          Sub-Kategori
        </p>
        <div className="flex flex-col gap-2.5">
          {subKategoriOptions.map((sub) => (
            <label key={sub} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                className="accent-primary w-4 h-4 rounded shrink-0"
                checked={local.subKategori.includes(sub)}
                onChange={() => toggleSub(sub)}
              />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors select-none">
                {sub}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price range — two sliders for min and max */}
      <div>
        <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3">
          Rentang Harga
        </p>
        <div className="flex justify-between text-xs text-muted-foreground mb-2">
          <span>{formatRupiah(local.priceMin)}</span>
          <span>{formatRupiah(local.priceMax)}</span>
        </div>
        <div className="flex flex-col gap-2">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Min</p>
            <input
              type="range"
              min={0}
              max={50_000_000}
              step={100_000}
              value={local.priceMin}
              onChange={(e) =>
                setLocal((prev) => ({
                  ...prev,
                  priceMin: Math.min(Number(e.target.value), prev.priceMax - 100_000),
                }))
              }
              className="w-full accent-primary"
            />
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Maks</p>
            <input
              type="range"
              min={0}
              max={50_000_000}
              step={100_000}
              value={local.priceMax}
              onChange={(e) =>
                setLocal((prev) => ({
                  ...prev,
                  priceMax: Math.max(Number(e.target.value), prev.priceMin + 100_000),
                }))
              }
              className="w-full accent-primary"
            />
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2">
        <button
          onClick={handleApply}
          className="flex-1 py-2 px-4 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:bg-primary/90 transition-colors"
        >
          Terapkan Filter
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 border border-white/20 text-muted-foreground text-sm rounded-lg hover:bg-white/5 transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  )
}

interface SidebarFilterProps {
  subKategoriOptions: string[]
  filters: FilterState
  onFilterChange: (f: FilterState) => void
  mobile?: boolean
}

export function SidebarFilter({
  subKategoriOptions,
  filters,
  onFilterChange,
  mobile,
}: SidebarFilterProps) {
  const [open, setOpen] = useState(false)

  // Mobile: Sheet drawer
  if (mobile) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger className="flex items-center gap-2 px-4 py-2 border border-white/20 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors">
          <SlidersHorizontal size={15} />
          Filter
        </SheetTrigger>
        <SheetContent side="left" showCloseButton className="w-80 bg-card p-0">
          <SheetHeader className="border-b border-white/10">
            <SheetTitle>Filter Produk</SheetTitle>
          </SheetHeader>
          <div className="p-5 overflow-y-auto">
            <FilterPanel
              subKategoriOptions={subKategoriOptions}
              filters={filters}
              onFilterChange={(f) => {
                onFilterChange(f)
                setOpen(false)
              }}
            />
          </div>
        </SheetContent>
      </Sheet>
    )
  }

  // Desktop: inline sidebar card
  return (
    <div className="bg-card border border-white/10 rounded-xl p-5">
      <h3 className="font-semibold text-foreground text-sm mb-5">Filter Produk</h3>
      <FilterPanel
        subKategoriOptions={subKategoriOptions}
        filters={filters}
        onFilterChange={onFilterChange}
      />
    </div>
  )
}
