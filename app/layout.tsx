import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Analytics } from '@vercel/analytics/next'
import { Footer } from '@/components/layout/Footer'
import { SocialImpactStrip } from '@/components/shared/SocialImpactStrip'
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics'

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
    'serum terbaik 2026',
    'skincare murah berkualitas',
    'review jujur produk kecantikan',
  ],
  alternates: {
    canonical: 'https://titippilih.id',
  },
  verification: {
    google: 'wBmTfRUwEZ8nlvscIFXyLV9DlrDMCkTGoRcUj4jeb5I',
  },
  openGraph: {
    siteName: 'TitipPilih',
    locale: 'id_ID',
    type: 'website',
    title: 'TitipPilih — Review Skincare Jujur, Berbagi Tulus',
    description:
      'Review skincare terpercaya dari kurator Indonesia. Serum, moisturizer, sunscreen terlaris — rekomendasi jujur, sebagian komisi untuk donasi.',
    url: 'https://titippilih.id',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'TitipPilih — Rekomendasi Jujur, Berbagi Tulus' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@titippilih',
    title: 'TitipPilih — Review Skincare Jujur, Berbagi Tulus',
    description:
      'Review skincare terpercaya dari kurator Indonesia. Rekomendasi jujur, sebagian komisi untuk donasi.',
    images: ['/opengraph-image.png'],
  },
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://titippilih.id/#organization',
      name: 'TitipPilih',
      url: 'https://titippilih.id',
      logo: {
        '@type': 'ImageObject',
        url: 'https://titippilih.id/icon.svg',
        width: 512,
        height: 512,
      },
      description: 'Website review skincare Indonesia — rekomendasi jujur, sebagian komisi untuk donasi warga kurang mampu.',
      sameAs: ['https://titippilih.id'],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://titippilih.id/#website',
      url: 'https://titippilih.id',
      name: 'TitipPilih',
      publisher: { '@id': 'https://titippilih.id/#organization' },
      inLanguage: 'id-ID',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://titippilih.id/kategori/{search_term_string}',
        },
        'query-input': 'required name=search_term_string',
      },
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className={`${plusJakartaSans.variable} ${playfairDisplay.variable}`}>
      <body className="min-h-screen flex flex-col bg-background text-foreground antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <SocialImpactStrip />
        <Footer />
        <Analytics />
        <GoogleAnalytics />
      </body>
    </html>
  )
}
