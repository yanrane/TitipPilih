import type { Metadata } from 'next'
import Link from 'next/link'
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
  openGraph: {
    title: 'Transparansi Donasi | TitipPilih',
    description:
      'Laporan transparan penggunaan komisi affiliate TitipPilih untuk membantu warga yang membutuhkan setiap minggu.',
    url: 'https://titippilih.id/donasi',
    type: 'website',
  },
}

export default async function DonasiPage() {
  const [stats, currentWeek, timeline] = await Promise.all([
    getDonationStats(),
    getCurrentWeekReport(),
    getDonationTimeline(),
  ])

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-14">
      {/* Hero — stats for current week */}
      <DonationHero
        periode={currentWeek.periode}
        totalKomisi={currentWeek.totalKomisi}
        totalDisisihkan={currentWeek.totalDisisihkan}
        jumlahPenerima={currentWeek.jumlahPenerima}
      />

      {/* Recipient grid — current week */}
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

      {/* Monthly progress bar */}
      <DonationProgressBar terkumpul={stats.terkumpulBulan} target={stats.targetBulan} />

      {/* Previous weeks — expandable timeline */}
      <DonationTimeline reports={timeline} />

      {/* CTA */}
      <div className="text-center py-4">
        <p className="text-muted-foreground text-sm mb-4">
          Lihat semua laporan donasi dari awal TitipPilih berdiri.
        </p>
        <Link
          href="/donasi"
          className="inline-block px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
        >
          Lihat Semua Laporan
        </Link>
      </div>
    </div>
  )
}
