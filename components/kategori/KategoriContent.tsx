'use client'

import { useState, useMemo } from 'react'
import type { ProductCardProps } from '@/types'
import { SidebarFilter, type FilterState } from './SidebarFilter'
import { SortBar, type SortOption } from './SortBar'
import { ProductGrid } from './ProductGrid'
import { Pagination } from './Pagination'

const PRODUCTS_PER_PAGE = 6

// Sub-kategori options per category
const subKategoriMap: Record<string, string[]> = {
  gadget: ['Smartphone', 'Laptop', 'Tablet', 'Audio', 'Aksesori'],
  fashion: ['Atasan', 'Bawahan', 'Sepatu', 'Tas', 'Aksesori'],
  kesehatan: ['Suplemen', 'Peralatan', 'Skincare', 'Herbal'],
  travel: ['Koper', 'Backpack', 'Kamera', 'Aksesori'],
  rumah: ['Furnitur', 'Dekorasi', 'Dapur', 'Elektronik'],
  kecantikan: ['Skincare', 'Makeup', 'Rambut', 'Parfum'],
  olahraga: ['Sepatu', 'Pakaian', 'Gym', 'Outdoor'],
}

interface KategoriContentProps {
  slug: string
  products: ProductCardProps[]
}

export function KategoriContent({ slug, products }: KategoriContentProps) {
  const subKategoriOptions = subKategoriMap[slug] ?? []

  const [filters, setFilters] = useState<FilterState>({
    subKategori: [],
    priceMin: 0,
    priceMax: 50_000_000,
  })
  const [sort, setSort] = useState<SortOption>('terpopuler')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    let result = products.filter(
      (p) => p.priceMin >= filters.priceMin && p.priceMin <= filters.priceMax,
    )
    if (sort === 'rating') {
      result = [...result].sort((a, b) => b.rating - a.rating)
    } else if (sort === 'harga_terendah') {
      result = [...result].sort((a, b) => a.priceMin - b.priceMin)
    }
    // 'terpopuler' and 'terbaru' keep source order for now
    return result
  }, [products, filters, sort])

  const totalPages = Math.ceil(filtered.length / PRODUCTS_PER_PAGE)
  const paginated = filtered.slice(
    (page - 1) * PRODUCTS_PER_PAGE,
    page * PRODUCTS_PER_PAGE,
  )

  const handleFilterChange = (f: FilterState) => {
    setFilters(f)
    setPage(1)
  }
  const handleSortChange = (s: SortOption) => {
    setSort(s)
    setPage(1)
  }

  return (
    <div className="flex flex-col gap-4">
      <SortBar
        sort={sort}
        onSortChange={handleSortChange}
        totalCount={filtered.length}
      />

      <div className="flex gap-6 items-start">
        {/* Desktop sidebar */}
        <div className="hidden lg:block w-64 shrink-0">
          <SidebarFilter
            subKategoriOptions={subKategoriOptions}
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </div>

        {/* Main content area */}
        <div className="flex flex-col gap-6 flex-1 min-w-0">
          {/* Mobile filter trigger */}
          <div className="lg:hidden">
            <SidebarFilter
              subKategoriOptions={subKategoriOptions}
              filters={filters}
              onFilterChange={handleFilterChange}
              mobile
            />
          </div>

          <ProductGrid products={paginated} />

          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      </div>
    </div>
  )
}
