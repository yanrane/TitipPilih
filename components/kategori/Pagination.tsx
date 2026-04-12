import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  page: number
  totalPages: number
  onPageChange: (p: number) => void
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null

  return (
    <nav
      className="flex items-center justify-center gap-1.5 py-4"
      aria-label="Pagination"
    >
      {/* Previous */}
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        aria-label="Halaman sebelumnya"
        className="flex items-center gap-1 px-3 py-2 rounded-lg border border-white/20 text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 disabled:opacity-40 disabled:pointer-events-none transition-colors"
      >
        <ChevronLeft size={15} />
        Prev
      </button>

      {/* Page numbers */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          aria-label={`Halaman ${p}`}
          aria-current={p === page ? 'page' : undefined}
          className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
            p === page
              ? 'bg-primary text-primary-foreground'
              : 'border border-white/20 text-muted-foreground hover:text-foreground hover:bg-white/5'
          }`}
        >
          {p}
        </button>
      ))}

      {/* Next */}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Halaman berikutnya"
        className="flex items-center gap-1 px-3 py-2 rounded-lg border border-white/20 text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 disabled:opacity-40 disabled:pointer-events-none transition-colors"
      >
        Next
        <ChevronRight size={15} />
      </button>
    </nav>
  )
}
