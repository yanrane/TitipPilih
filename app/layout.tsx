import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { SocialImpactStrip } from '@/components/shared/SocialImpactStrip'

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: '--font-sans',
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700', '800'],
})

const playfairDisplay = Playfair_Display({
  variable: '--font-heading',
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://titippilih.id'),
  title: {
    template: '%s | TitipPilih',
    default: 'TitipPilih — Review Skincare Jujur, Berbagi Tulus',
  },
  description:
    'Review skincare terpercaya dari kurator Indonesia. Serum, moisturizer, sunscreen terlaris — rekomendasi jujur, sebagian komisi untuk donasi.',
  keywords: [
    'review skincare Indonesia',
    'rekomendasi skincare terbaik',
    'serum niacinamide Indonesia',
    'sunscreen terbaik Indonesia',
    'skincare lokal Indonesia',
    'TitipPilih skincare',
    'donasi sosial skincare',
  ],
  openGraph: {
    siteName: 'TitipPilih',
    locale: 'id_ID',
    type: 'website',
    title: 'TitipPilih — Review Skincare Jujur, Berbagi Tulus',
    description:
      'Review skincare terpercaya dari kurator Indonesia. Serum, moisturizer, sunscreen terlaris — rekomendasi jujur, sebagian komisi untuk donasi.',
    url: 'https://titippilih.id',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TitipPilih — Review Skincare Jujur, Berbagi Tulus',
    description:
      'Review skincare terpercaya dari kurator Indonesia. Rekomendasi jujur, sebagian komisi untuk donasi.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className={`${plusJakartaSans.variable} ${playfairDisplay.variable}`}>
      <body className="min-h-screen flex flex-col bg-background text-foreground antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <SocialImpactStrip />
        <Footer />
      </body>
    </html>
  )
}
