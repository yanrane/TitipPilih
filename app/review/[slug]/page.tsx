import type { Metadata } from 'next'
import { DonationNoticeBanner } from '@/components/shared/DonationNoticeBanner'
import { ArticleHeader } from '@/components/review/ArticleHeader'
import { ArticleBody } from '@/components/review/ArticleBody'
import { ProsConsCard } from '@/components/review/ProsConsCard'
import { ProductSidebar } from '@/components/review/ProductSidebar'
import { RelatedReviews } from '@/components/review/RelatedReviews'
import { getReviewBySlug } from '@/lib/db/reviews'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const review = await getReviewBySlug(slug)
  const description = `Review jujur dan mendalam ${review.title} oleh kurator TitipPilih. Kelebihan, kekurangan, dan rekomendasi pembelian.`
  return {
    title: `Review ${review.title}`,
    description,
    keywords: [
      `review ${review.title}`,
      `${review.title} terbaik`,
      `beli ${review.title}`,
      `${review.category} terbaik Indonesia`,
      'review jujur TitipPilih',
    ],
    openGraph: {
      title: `Review ${review.title} | TitipPilih`,
      description,
      url: `https://titippilih.id/review/${slug}`,
      type: 'article',
    },
  }
}

export default async function ReviewPage({ params }: Props) {
  const { slug } = await params
  const review = await getReviewBySlug(slug)

  return (
    <>
      <DonationNoticeBanner />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Article header — breadcrumb, title, kurator, hero image */}
        <ArticleHeader
          title={review.title}
          category={review.category}
          kurator={review.kurator}
          tanggal={review.tanggal}
          estimasiBaca={review.estimasiBaca}
          image={review.image}
        />

        {/* 2-column layout: article content (left) + sticky sidebar (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 mt-10">
          {/* Left — main article */}
          <div className="flex flex-col gap-8 min-w-0">
            <ArticleBody
              productTitle={review.title}
              category={review.category}
            />

            <ProsConsCard pros={review.pros} cons={review.cons} />

            <RelatedReviews currentSlug={slug} category={review.category} />
          </div>

          {/* Right — sticky product sidebar */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <ProductSidebar
                title={review.title}
                image={review.image ?? ''}
                rating={review.rating}
                priceMin={review.priceMin}
                priceMax={review.priceMax}
                affiliateUrl={review.affiliateUrl}
              />
            </div>
          </div>
        </div>

        {/* Mobile — product sidebar at bottom (non-sticky) */}
        <div className="lg:hidden mt-8">
          <ProductSidebar
            title={review.title}
            image={review.image ?? ''}
            rating={review.rating}
            priceMin={review.priceMin}
            priceMax={review.priceMax}
            affiliateUrl={review.affiliateUrl}
          />
        </div>
      </div>
    </>
  )
}
