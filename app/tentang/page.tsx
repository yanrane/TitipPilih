import type { Metadata } from 'next'
import { MissionHero } from '@/components/tentang/MissionHero'
import { SocialImpactStats } from '@/components/tentang/SocialImpactStats'
import { MissionQuote } from '@/components/tentang/MissionQuote'
import { CuratorTeam } from '@/components/tentang/CuratorTeam'
import { TransparencyPledge } from '@/components/tentang/TransparencyPledge'
import { getDonationStats } from '@/lib/db/donations'
import { getKurators } from '@/lib/db/kurators'
import { getReviewCount } from '@/lib/db/reviews'

export const metadata: Metadata = {
  title: 'Tentang Kami',
  description:
    'Kenali lebih dekat TitipPilih — misi kami, cara kerja kurator, dan komitmen transparansi donasi.',
  keywords: [
    'tentang TitipPilih',
    'kurator produk Indonesia',
    'misi sosial affiliate',
    'review independen Indonesia',
    'transparansi donasi',
  ],
  openGraph: {
    title: 'Tentang Kami | TitipPilih',
    description:
      'Kenali lebih dekat TitipPilih — misi kami, cara kerja kurator, dan komitmen transparansi donasi.',
    url: 'https://titippilih.id/tentang',
    type: 'website',
  },
}

export default async function TentangPage() {
  const [donationStats, curators, reviewCount] = await Promise.all([
    getDonationStats(),
    getKurators(),
    getReviewCount(),
  ])

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-16">
      <MissionHero />
      <SocialImpactStats
        totalDonasi={donationStats.totalDonasi}
        totalPenerima={donationStats.totalPenerima}
        totalArtikel={reviewCount}
      />
      <MissionQuote />
      <CuratorTeam curators={curators} />
      <TransparencyPledge />
    </div>
  )
}
