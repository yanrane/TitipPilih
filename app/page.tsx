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
  title: 'Beranda',
  description:
    'Temukan rekomendasi produk terpercaya dari kurator Indonesia. Belanja dengan niat baik — sebagian komisi kami disumbangkan untuk sesama.',
  keywords: [
    'rekomendasi produk terbaik',
    'review jujur Indonesia',
    'produk kurator',
    'belanja affiliate Indonesia',
    'donasi sosial belanja',
  ],
  alternates: {
    canonical: 'https://titippilih.id',
  },
  openGraph: {
    title: 'TitipPilih — Rekomendasi Jujur, Berbagi Tulus',
    description:
      'Temukan rekomendasi produk terpercaya dari kurator Indonesia. Belanja dengan niat baik — sebagian komisi kami disumbangkan untuk sesama.',
    url: 'https://titippilih.id',
    type: 'website',
    images: [{ url: 'https://titippilih.id/opengraph-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TitipPilih — Rekomendasi Jujur, Berbagi Tulus',
    description: 'Temukan rekomendasi produk terpercaya dari kurator Indonesia. Belanja dengan niat baik — sebagian komisi kami disumbangkan untuk sesama.',
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
