import Link from 'next/link'
import { Heart } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left — text content */}
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
            Rekomendasi{' '}
            <span className="text-primary italic">Jujur</span>
            {', '}
            <br className="hidden sm:block" />
            Berbagi{' '}
            <span className="text-primary italic">Tulus</span>
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
            Kurator terpercaya merekomendasikan produk terbaik untuk Anda.
            Setiap pembelian berkontribusi untuk sesama — transparan, nyata,
            terdokumentasi.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/kategori/gadget"
              className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
            >
              Lihat Rekomendasi
            </Link>
            <Link
              href="/donasi"
              className="px-6 py-3 border border-secondary text-secondary font-semibold rounded-lg hover:bg-secondary/10 transition-colors"
            >
              Tentang Donasi
            </Link>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Heart size={15} className="text-secondary fill-secondary shrink-0" />
            <span>
              Sudah{' '}
              <strong className="text-foreground">83 orang</strong>{' '}
              terbantu bulan ini
            </span>
          </div>
        </div>

        {/* Right — product collage (placeholder, replaced when assets ready) */}
        <div className="hidden md:flex items-center justify-center">
          <div className="relative w-full max-w-sm aspect-square">
            {/* Outer glow ring */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 via-secondary/10 to-primary/5 blur-2xl" />
            <div className="relative w-full h-full rounded-3xl border border-white/10 bg-card p-6 grid grid-cols-2 gap-3">
              {[
                { emoji: '📱', label: 'Gadget' },
                { emoji: '👟', label: 'Olahraga' },
                { emoji: '✈️', label: 'Travel' },
                { emoji: '💄', label: 'Kecantikan' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-background border border-white/10 hover:border-primary/30 transition-colors p-4"
                >
                  <span className="text-4xl">{item.emoji}</span>
                  <span className="text-xs text-muted-foreground font-medium">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
