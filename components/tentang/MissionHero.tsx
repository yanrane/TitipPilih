import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { ShieldCheck } from 'lucide-react'

export function MissionHero() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-6">
      {/* Left — text */}
      <div className="flex flex-col gap-6">
        <div>
          <Badge variant="outline" className="mb-4 border-secondary/40 text-secondary gap-1.5">
            <ShieldCheck size={13} />
            Jujur &amp; Transparan
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
            Bukan sekadar rekomendasi,
            <br />
            <span className="text-primary italic">tapi aksi nyata.</span>
          </h1>
        </div>

        <p className="text-muted-foreground leading-relaxed max-w-lg">
          TitipPilih lahir dari keyakinan sederhana: rekomendasi yang jujur adalah
          bentuk kasih sayang kepada sesama konsumen. Dan dengan menyisihkan sebagian
          komisi, setiap klik menjadi aksi nyata yang mengubah kehidupan orang lain.
        </p>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/kategori/gadget"
            className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
          >
            Mulai Menjelajah
          </Link>
          <Link
            href="/donasi"
            className="px-6 py-3 border border-secondary text-secondary font-semibold rounded-lg hover:bg-secondary/10 transition-colors"
          >
            Lihat Laporan Donasi
          </Link>
        </div>
      </div>

      {/* Right — illustration */}
      <div className="hidden md:flex justify-center">
        <div className="relative w-full max-w-sm aspect-square">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-secondary/20 via-primary/10 to-secondary/5 blur-2xl" />
          <div className="relative w-full h-full rounded-3xl border border-white/10 bg-card flex flex-col items-center justify-center gap-5 p-8">
            <div className="grid grid-cols-3 gap-3 w-full">
              {[
                { emoji: '🤝', label: 'Jujur' },
                { emoji: '💚', label: 'Peduli' },
                { emoji: '📊', label: 'Transparan' },
                { emoji: '🇮🇩', label: 'Indonesia' },
                { emoji: '⭐', label: 'Terpercaya' },
                { emoji: '❤️', label: 'Berbagi' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col items-center gap-1 p-2 rounded-xl bg-background border border-white/10"
                >
                  <span className="text-2xl">{item.emoji}</span>
                  <span className="text-xs text-muted-foreground">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
