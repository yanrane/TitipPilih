import Link from 'next/link'
import Image from 'next/image'
import { Heart, Star, ShieldCheck } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-rose-50 via-background to-orange-50/30">
      {/* Decorative blob shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-rose-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-100/30 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left — text content */}
          <div className="flex flex-col gap-6">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 bg-white/80 border border-rose-100 rounded-full px-4 py-1.5 w-fit shadow-sm">
              <ShieldCheck size={14} className="text-primary" />
              <span className="text-xs font-semibold text-foreground">Review Jujur ✓ Dermatologis Approved</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              Skincare{' '}
              <span className="text-primary italic">Terpercaya</span>
              {', '}
              <br className="hidden sm:block" />
              Harga{' '}
              <span className="text-primary italic">Bersahabat</span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
              Kurator kami test langsung di kulit Indonesia — rekomendasi
              jujur tanpa bias brand. Sebagian komisi untuk donasi sosial
              yang transparan.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/kategori/serum"
                className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
              >
                Lihat Review Skincare
              </Link>
              <Link
                href="/donasi"
                className="px-6 py-3 border border-secondary text-secondary font-semibold rounded-lg hover:bg-secondary/10 transition-colors"
              >
                Cara Kerja Donasi
              </Link>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Heart size={15} className="text-primary fill-primary shrink-0" />
              <span>
                Sudah{' '}
                <strong className="text-foreground">83 orang</strong>{' '}
                terbantu dari komisi affiliate bulan ini
              </span>
            </div>
          </div>

          {/* Right — featured product card */}
          <div className="hidden md:flex items-center justify-center">
            <div className="relative w-full max-w-sm">
              {/* Outer glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 via-secondary/10 to-orange-200/20 blur-2xl" />

              <Link
                href="/review/azarine-hydrasoothe-spf45"
                className="relative block rounded-3xl border border-rose-100 bg-white overflow-hidden hover:border-primary/40 transition-all duration-300 shadow-lg hover:shadow-xl group"
              >
                <div className="relative w-full aspect-video bg-gradient-to-br from-rose-50 to-orange-50">
                  <Image
                    src="/product-images/real-sunscreen-azarine-hydrasoothe-sunscreen-gel-spf45-pa-50ml.jpg"
                    alt="Azarine Hydrasoothe Sunscreen SPF45"
                    fill
                    sizes="(max-width: 768px) 0px, 384px"
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                    priority
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-primary text-white text-xs font-semibold rounded-full shadow-sm">
                    🔥 Terlaris
                  </span>
                </div>

                <div className="p-5 flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">Sunscreen</p>
                      <h3 className="font-bold text-foreground text-base leading-snug group-hover:text-primary transition-colors">
                        Azarine Hydrasoothe SPF45 PA++++
                      </h3>
                    </div>
                    <div className="flex flex-col items-end shrink-0">
                      <span className="text-2xl font-bold text-secondary">9.4</span>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={10}
                            className="fill-primary text-primary"
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-foreground font-semibold">
                    Mulai{' '}
                    <span className="text-primary">Rp 49.000</span>
                  </p>

                  <div className="flex items-center gap-2 pt-1 border-t border-rose-50">
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
      </div>
    </section>
  )
}
