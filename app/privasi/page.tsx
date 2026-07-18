import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kebijakan Privasi',
  description: 'Kebijakan privasi TitipPilih untuk penggunaan situs dan link afiliasi.',
  alternates: { canonical: 'https://titippilih.id/privasi' },
}

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-foreground">Kebijakan Privasi</h1>
      <div className="mt-6 space-y-5 text-sm leading-7 text-muted-foreground">
        <p>TitipPilih menggunakan data teknis minimum yang diperlukan untuk menjalankan situs, mengamankan layanan, dan mengukur klik link afiliasi.</p>
        <p>Saat kamu membuka link afiliasi, kami dapat menyimpan data klik seperti produk, sumber kampanye, waktu, referrer, user-agent, dan hash alamat IP. Kami tidak menyimpan isi pembayaran marketplace atau data kartu pembayaranmu.</p>
        <p>Marketplace dan layanan pihak ketiga memiliki kebijakan privasi masing-masing. Setelah kamu meninggalkan TitipPilih, pemrosesan data mengikuti kebijakan platform tujuan.</p>
        <p>Jika kebijakan ini berubah secara material, halaman ini akan diperbarui.</p>
      </div>
    </article>
  )
}
