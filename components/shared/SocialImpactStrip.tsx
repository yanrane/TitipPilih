import Link from 'next/link'
import { Heart } from 'lucide-react'
import { formatRupiah } from '@/lib/utils'
import { getDonationStats } from '@/lib/db/donations'

export async function SocialImpactStrip() {
  const stats = await getDonationStats()

  if (stats.totalDonasi === 0) return null

  return (
    <div className="w-full bg-secondary/10 border-y border-secondary/20 py-2.5 px-4">
      <div className="mx-auto max-w-7xl flex items-center justify-center gap-2 text-sm text-center flex-wrap">
        <Heart
          size={14}
          className="text-secondary shrink-0 fill-secondary"
          aria-hidden="true"
        />
        <span className="text-muted-foreground">
          Sudah{' '}
          <span className="text-secondary font-semibold">
            {formatRupiah(stats.totalDonasi)}
          </span>{' '}
          disalurkan kepada{' '}
          <span className="text-secondary font-semibold">
            {stats.totalPenerima} penerima manfaat
          </span>
        </span>
        <Link
          href="/donasi"
          className="text-secondary hover:text-secondary/80 font-semibold transition-colors underline-offset-2 hover:underline"
        >
          Lihat Laporan →
        </Link>
      </div>
    </div>
  )
}
