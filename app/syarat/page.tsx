import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Syarat & Ketentuan',
  description: 'Syarat penggunaan situs TitipPilih.',
  alternates: { canonical: 'https://titippilih.id/syarat' },
}

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-foreground">Syarat & Ketentuan</h1>
      <div className="mt-6 space-y-5 text-sm leading-7 text-muted-foreground">
        <p>Informasi di TitipPilih disediakan untuk membantu riset produk, bukan pengganti konsultasi dokter atau tenaga kesehatan profesional.</p>
        <p>Periksa daftar bahan, aturan pakai, dan kecocokan produk secara mandiri. Hentikan pemakaian dan konsultasikan kepada profesional bila terjadi reaksi yang tidak diinginkan.</p>
        <p>Harga, stok, promo, dan ketersediaan di marketplace dapat berubah tanpa pemberitahuan. Keputusan transaksi dilakukan antara kamu dan marketplace atau penjual tujuan.</p>
        <p>Dengan menggunakan situs ini, kamu menyetujui penggunaan link afiliasi sesuai <a className="text-primary underline underline-offset-2" href="/disclosure">Disclosure Afiliasi</a>.</p>
      </div>
    </article>
  )
}
