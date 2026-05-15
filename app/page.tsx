import type { Metadata } from 'next'
import { HeroSection } from '@/components/home/HeroSection'
import { KategoriGrid } from '@/components/home/KategoriGrid'
import { TrendingSection } from '@/components/home/TrendingSection'
import { SocialImpactBanner } from '@/components/home/SocialImpactBanner'
import { ArtikelTerbaru } from '@/components/home/ArtikelTerbaru'
import { getTrendingProducts } from '@/lib/db/products'
import { getLatestReviews } from '@/lib/db/reviews'
import { getDonationStats } from '@/lib/db/donations'

export const metadata: Metadata = {
  title: 'Review Skincare Jujur Indonesia',
  description:
    'Temukan review skincare jujur Indonesia: serum, moisturizer, sunscreen, cleanser, toner, dan eye care pilihan kurator. Sebagian komisi untuk donasi sosial.',
  keywords: [
    'review skincare Indonesia',
    'rekomendasi skincare terbaik',
    'skincare lokal Indonesia',
    'serum terbaik Indonesia',
    'sunscreen terbaik Indonesia',
    'moisturizer terbaik Indonesia',
    'review jujur produk kecantikan',
    'donasi sosial skincare',
  ],
  alternates: {
    canonical: 'https://titippilih.id',
  },
  openGraph: {
    title: 'TitipPilih — Rekomendasi Jujur, Berbagi Tulus',
    description:
      'Temukan review skincare jujur Indonesia: serum, moisturizer, sunscreen, cleanser, toner, dan eye care pilihan kurator. Sebagian komisi untuk donasi sosial.',
    url: 'https://titippilih.id',
    type: 'website',
    images: [{ url: 'https://titippilih.id/opengraph-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TitipPilih — Rekomendasi Jujur, Berbagi Tulus',
    description: 'Temukan review skincare jujur Indonesia: serum, moisturizer, sunscreen, cleanser, toner, dan eye care pilihan kurator. Sebagian komisi untuk donasi sosial.',
    images: ['https://titippilih.id/opengraph-image.png'],
  },
}

export default async function BerandaPage() {
  const [trendingProducts, latestArticles, donationStats] = await Promise.all([
    getTrendingProducts(),
    getLatestReviews(3),
    getDonationStats(),
  ])

  return (
    <>
      <HeroSection />
      <KategoriGrid />
      <TrendingSection products={trendingProducts} />
      <SocialImpactBanner stats={donationStats} />
      <ArtikelTerbaru articles={latestArticles} />
    </>
  )
}
