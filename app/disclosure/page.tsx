import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Disclosure Afiliasi',
  description: 'Penjelasan cara kerja link afiliasi TitipPilih dan bagaimana kami menjaga transparansi rekomendasi.',
  alternates: { canonical: 'https://titippilih.id/disclosure' },
}

export default function DisclosurePage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-foreground">Disclosure Afiliasi</h1>
      <div className="mt-6 space-y-5 text-sm leading-7 text-muted-foreground">
        <p>
          TitipPilih dapat menerima komisi apabila kamu membeli produk melalui link afiliasi di situs ini. Harga yang kamu bayar tidak bertambah karena penggunaan link tersebut.
        </p>
        <p>
          Tombol seperti <strong className="text-foreground">Beli Sekarang</strong> mengarahkanmu ke marketplace melalui link terukur. Kami mencatat klik secara terbatas untuk memahami performa rekomendasi; data klik tidak sama dengan data pembelian atau komisi yang dibayarkan marketplace.
        </p>
        <p>
          Skor, harga, dan ketersediaan dapat berubah. Periksa kembali detail produk, kecocokan kulit, serta informasi penjual di marketplace sebelum membeli.
        </p>
        <p>
          Jika ada program donasi, laporan hanya akan ditampilkan setelah dana benar-benar diterima dan disalurkan. Lihat statusnya di <Link className="text-primary underline underline-offset-2" href="/donasi">Transparansi Donasi</Link>.
        </p>
      </div>
    </article>
  )
}
