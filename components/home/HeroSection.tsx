import Link from 'next/link'
import Image from 'next/image'
import { Heart, Star } from 'lucide-react'

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

        {/* Right — featured product card */}
        <div className="hidden md:flex items-center justify-center">
          <div className="relative w-full max-w-sm">
            {/* Outer glow */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/25 via-secondary/10 to-primary/5 blur-2xl" />

            <Link
              href="/review/iphone-17-pro-max"
              className="relative block rounded-3xl border border-white/10 bg-card overflow-hidden hover:border-primary/40 transition-colors group"
            >
              {/* Product image */}
              <div className="relative w-full aspect-video bg-gradient-to-br from-slate-800 to-slate-900">
                <Image
                  src="/iphone-17-pro-max.png"
                  alt="iPhone 17 Pro Max"
                  fill
                  sizes="(max-width: 768px) 0px, 384px"
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                  priority
                />
                {/* Featured badge */}
                <span className="absolute top-3 left-3 px-2.5 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                  🔥 Trending
                </span>
              </div>

              {/* Product info */}
              <div className="p-5 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">Gadget</p>
                    <h3 className="font-bold text-foreground text-base leading-snug group-hover:text-primary transition-colors">
                      iPhone 17 Pro Max 256GB
                    </h3>
                  </div>
                  <div className="flex flex-col items-end shrink-0">
                    <span className="text-2xl font-bold text-secondary">9.2</span>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={10}
                          className={i < 5 ? 'fill-primary text-primary' : 'text-muted-foreground'}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-sm text-foreground font-semibold">
                  Mulai{' '}
                  <span className="text-primary">Rp 24.999.000</span>
                </p>

                <div className="flex items-center gap-2 pt-1 border-t border-white/10">
                  <Heart size={12} className="text-secondary fill-secondary shrink-0" />
                  <p className="text-xs text-muted-foreground">
                    Sebagian komisi untuk donasi sosial
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
