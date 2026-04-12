import Link from 'next/link'
import { X, Camera, Music2 } from 'lucide-react'
import { formatRupiah } from '@/lib/utils'

const kategoriLinks = [
  { label: 'Gadget', slug: 'gadget' },
  { label: 'Fashion', slug: 'fashion' },
  { label: 'Kesehatan', slug: 'kesehatan' },
  { label: 'Travel', slug: 'travel' },
  { label: 'Rumah', slug: 'rumah' },
  { label: 'Kecantikan', slug: 'kecantikan' },
  { label: 'Olahraga', slug: 'olahraga' },
]

const halamanLinks = [
  { label: 'Beranda', href: '/' },
  { label: 'Transparansi Donasi', href: '/donasi' },
  { label: 'Tentang Kami', href: '/tentang' },
]

const legalLinks = [
  { label: 'Kebijakan Privasi', href: '/privasi' },
  { label: 'Syarat & Ketentuan', href: '/syarat' },
  { label: 'Disclosure Afiliasi', href: '/disclosure' },
]

// Placeholder data — akan diganti dengan fetch dari DB di Stage 2+
const totalDonasi = 12_450_000

export function Footer() {
  return (
    <footer className="bg-card border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Col 1 — Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="font-bold text-2xl">
              <span className="text-foreground">Titip</span>
              <span className="text-primary">Pilih</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Rekomendasi jujur dari kurator terpercaya. Setiap pembelian melalui
              link kami berkontribusi untuk sesama.
            </p>
            <div className="mt-2">
              <p className="text-xs text-muted-foreground mb-1">Total donasi tersalurkan</p>
              <p className="text-lg font-bold text-secondary">
                {formatRupiah(totalDonasi)}
              </p>
            </div>
          </div>

          {/* Col 2 — Links */}
          <div className="grid grid-cols-2 gap-8">
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold text-foreground uppercase tracking-wider">
                Kategori
              </p>
              <ul className="flex flex-col gap-2">
                {kategoriLinks.map((k) => (
                  <li key={k.slug}>
                    <Link
                      href={`/kategori/${k.slug}`}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {k.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold text-foreground uppercase tracking-wider">
                Halaman
              </p>
              <ul className="flex flex-col gap-2">
                {halamanLinks.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Col 3 — Legal & Social */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold text-foreground uppercase tracking-wider">
                Legal
              </p>
              <ul className="flex flex-col gap-2">
                {legalLinks.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center gap-3 mt-2">
              <a
                href="https://twitter.com/titippilih"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-white/10"
                aria-label="TitipPilih di Twitter/X"
              >
                <X size={18} />
              </a>
              <a
                href="https://instagram.com/titippilih"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-white/10"
                aria-label="TitipPilih di Instagram"
              >
                <Camera size={18} />
              </a>
              <a
                href="https://tiktok.com/@titippilih"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-white/10"
                aria-label="TitipPilih di TikTok"
              >
                <Music2 size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© 2026 TitipPilih. Dibuat dengan ♥ untuk Indonesia.</p>
          <p>
            Website ini mengandung link afiliasi.{' '}
            <Link href="/disclosure" className="hover:text-foreground transition-colors underline underline-offset-2">
              Selengkapnya
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
