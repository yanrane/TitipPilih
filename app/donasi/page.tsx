import type { Metadata } from 'next'
import Link from 'next/link'
import { Clock } from 'lucide-react'
import { DonationHero } from '@/components/donasi/DonationHero'
import { RecipientCard } from '@/components/donasi/RecipientCard'
import { DonationTimeline } from '@/components/donasi/DonationTimeline'
import { DonationProgressBar } from '@/components/donasi/DonationProgressBar'
import { getDonationStats, getCurrentWeekReport, getDonationTimeline } from '@/lib/db/donations'

export const metadata: Metadata = {
  title: 'Transparansi Donasi',
  description:
    'Laporan transparan penggunaan komisi affiliate TitipPilih untuk membantu warga yang membutuhkan setiap minggu.',
  keywords: [
    'donasi transparan',
    'laporan donasi',
    'komisi affiliate donasi',
    'TitipPilih donasi',
    'bantuan sosial Indonesia',
  ],
  alternates: {
    canonical: 'https://titippilih.id/donasi',
  },
  openGraph: {
    title: 'Transparansi Donasi | TitipPilih',
    description:
      'Laporan transparan penggunaan komisi affiliate TitipPilih untuk membantu warga yang membutuhkan setiap minggu.',
    url: 'https://titippilih.id/donasi',
    type: 'website',
    images: [{ url: 'https://titippilih.id/opengraph-image.png', width: 1200, height: 630 }],
  },
}

export default async function DonasiPage() {
  const [stats, currentWeek, timeline] = await Promise.all([
    getDonationStats(),
    getCurrentWeekReport(),
    getDonationTimeline(),
  ])

  const hasData = currentWeek !== null || timeline.length > 0

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-14">

      {hasData ? (
        <>
          {/* Hero — stats for current week */}
          {currentWeek && (
            <DonationHero
              periode={currentWeek.periode}
              totalKomisi={currentWeek.totalKomisi}
              totalDisisihkan={currentWeek.totalDisisihkan}
              jumlahPenerima={currentWeek.jumlahPenerima}
            />
          )}

          {/* Recipient grid — current week */}
          {currentWeek && currentWeek.penerima.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-foreground mb-5">
                Penerima <span className="text-secondary">Minggu Ini</span>
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {currentWeek.penerima.map((p, i) => (
                  <RecipientCard key={i} {...p} />
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-3 italic">
                * Nama lengkap dan alamat tidak ditampilkan untuk menjaga privasi penerima.
              </p>
            </section>
          )}

          {/* Monthly progress bar */}
          {stats.terkumpulBulan > 0 && (
            <DonationProgressBar terkumpul={stats.terkumpulBulan} target={stats.targetBulan} />
          )}

          {/* Previous weeks — expandable timeline */}
          {timeline.length > 0 && <DonationTimeline reports={timeline} />}
        </>
      ) : (
        /* Empty state — website baru, belum ada laporan */
        <section className="flex flex-col items-center text-center py-16 gap-6">
          <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center">
            <Clock size={28} className="text-secondary" />
          </div>
          <div className="max-w-lg">
            <h1 className="text-2xl font-bold text-foreground mb-3">
              Laporan Donasi <span className="text-secondary italic">Segera Hadir</span>
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed">
              TitipPilih baru saja diluncurkan. Laporan donasi mingguan pertama akan
              dipublikasikan segera setelah komisi affiliate pertama kami diterima.
              Kami berkomitmen penuh untuk transparansi — setiap rupiah akan dilaporkan
              secara terbuka di sini.
            </p>
          </div>
          <div className="bg-card border border-white/10 rounded-xl p-6 max-w-md w-full text-left flex flex-col gap-3">
            <p className="text-sm font-semibold text-foreground">Yang akan dilaporkan setiap minggu:</p>
            <ul className="text-sm text-muted-foreground flex flex-col gap-2">
              <li className="flex items-start gap-2"><span className="text-secondary mt-0.5">✓</span> Total komisi diterima dari semua klik affiliate</li>
              <li className="flex items-start gap-2"><span className="text-secondary mt-0.5">✓</span> Jumlah yang disisihkan (15%) untuk donasi</li>
              <li className="flex items-start gap-2"><span className="text-secondary mt-0.5">✓</span> Identitas penerima (inisial & wilayah — privasi terjaga)</li>
              <li className="flex items-start gap-2"><span className="text-secondary mt-0.5">✓</span> Foto dokumentasi penyerahan</li>
            </ul>
          </div>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
          >
            Lihat Rekomendasi Produk
          </Link>
        </section>
      )}
    </div>
  )
}
