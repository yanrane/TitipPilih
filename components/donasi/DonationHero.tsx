import { formatRupiah } from '@/lib/utils'

interface StatCardProps {
  label: string
  value: string
  accent?: 'primary' | 'secondary'
}

function StatCard({ label, value, accent = 'secondary' }: StatCardProps) {
  const color = accent === 'secondary' ? 'text-secondary' : 'text-primary'
  return (
    <div className="bg-card border border-white/10 rounded-xl p-5 flex flex-col gap-1">
      <p className="text-xs text-muted-foreground uppercase tracking-wider">{label}</p>
      <p className={`text-2xl font-bold tabular-nums ${color}`}>{value}</p>
    </div>
  )
}

interface DonationHeroProps {
  periode: string
  totalKomisi: number
  totalDisisihkan: number
  jumlahPenerima: number
}

export function DonationHero({
  periode,
  totalKomisi,
  totalDisisihkan,
  jumlahPenerima,
}: DonationHeroProps) {
  return (
    <section className="flex flex-col gap-6">
      <div>
        <p className="text-sm text-muted-foreground mb-1">Periode: {periode}</p>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
          Laporan Donasi{' '}
          <span className="text-secondary italic">Minggu Ini</span>
        </h1>
        <p className="text-muted-foreground mt-2 max-w-xl text-sm leading-relaxed">
          Setiap rupiah komisi yang masuk, kami catat dan laporkan secara terbuka.
          Tidak ada yang disembunyikan — karena transparansi adalah janji kami.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          label="Total Komisi Diterima"
          value={formatRupiah(totalKomisi)}
          accent="primary"
        />
        <StatCard
          label="Total Disisihkan (15%)"
          value={formatRupiah(totalDisisihkan)}
          accent="secondary"
        />
        <StatCard
          label="Jumlah Penerima"
          value={`${jumlahPenerima} orang`}
          accent="secondary"
        />
      </div>
    </section>
  )
}
