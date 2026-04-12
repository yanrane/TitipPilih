import { CheckCircle } from 'lucide-react'

const pledgePoints = [
  'Review independen — kami tidak menerima bayaran dari brand untuk ulasan positif',
  'Semua produk diuji langsung sebelum direkomendasikan kepada pembaca',
  'Laporan donasi dipublikasikan setiap minggu dengan data yang bisa diverifikasi',
  'Afiliasi link selalu ditandai jelas — tidak ada hidden partnership',
]

export function TransparencyPledge() {
  return (
    <section className="rounded-2xl bg-secondary/5 border border-secondary/20 px-8 py-10 md:px-14 md:py-14">
      <div className="max-w-2xl mx-auto text-center flex flex-col items-center gap-6">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
          Transparansi 100%{' '}
          <span className="text-secondary italic">adalah janji kami.</span>
        </h2>

        <p className="text-muted-foreground text-sm leading-relaxed">
          Di TitipPilih, kejujuran bukan strategi pemasaran — itu fondasi dari
          setiap keputusan yang kami buat. Berikut metodologi yang kami jalankan
          tanpa kompromi.
        </p>

        <ul className="flex flex-col gap-3 text-left w-full">
          {pledgePoints.map((point, i) => (
            <li key={i} className="flex items-start gap-3">
              <CheckCircle
                size={16}
                className="text-secondary shrink-0 mt-0.5"
              />
              <span className="text-sm text-muted-foreground leading-relaxed">
                {point}
              </span>
            </li>
          ))}
        </ul>

        <a
          href="#"
          className="inline-block px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
          aria-label="Unduh Laporan Tahunan 2024 TitipPilih"
        >
          Unduh Laporan 2024
        </a>
      </div>
    </section>
  )
}
