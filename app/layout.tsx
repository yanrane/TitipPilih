import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { SocialImpactStrip } from '@/components/shared/SocialImpactStrip'

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: '--font-sans',
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://titippilih.id'),
  title: {
    template: '%s | TitipPilih',
    default: 'TitipPilih — Rekomendasi Jujur, Berbagi Tulus',
  },
  description:
    'Rekomendasi produk terpercaya dari kurator Indonesia. Sebagian komisi affiliate kami disumbangkan untuk warga yang membutuhkan.',
  keywords: [
    'rekomendasi produk',
    'review produk Indonesia',
    'affiliate Indonesia',
    'produk terbaik',
    'kurator produk',
    'donasi sosial',
    'transparansi donasi',
    'TitipPilih',
  ],
  openGraph: {
    siteName: 'TitipPilih',
    locale: 'id_ID',
    type: 'website',
    title: 'TitipPilih — Rekomendasi Jujur, Berbagi Tulus',
    description:
      'Rekomendasi produk terpercaya dari kurator Indonesia. Sebagian komisi affiliate kami disumbangkan untuk warga yang membutuhkan.',
    url: 'https://titippilih.id',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TitipPilih — Rekomendasi Jujur, Berbagi Tulus',
    description:
      'Rekomendasi produk terpercaya dari kurator Indonesia. Sebagian komisi affiliate kami disumbangkan untuk warga yang membutuhkan.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className={`${plusJakartaSans.variable} dark`}>
      <body className="min-h-screen flex flex-col bg-background text-foreground antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <SocialImpactStrip />
        <Footer />
      </body>
    </html>
  )
}
