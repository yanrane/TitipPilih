import { Suspense } from 'react'
import type { Metadata } from 'next'
import { DonationNoticeBanner } from '@/components/shared/DonationNoticeBanner'
import { ArticleHeader } from '@/components/review/ArticleHeader'
import { ArticleBody } from '@/components/review/ArticleBody'
import { ProsConsCard } from '@/components/review/ProsConsCard'
import { ProductSidebar } from '@/components/review/ProductSidebar'
import { RelatedReviews } from '@/components/review/RelatedReviews'
import { getReviewBySlug } from '@/lib/db/reviews'

const BASE_URL = 'https://titippilih.id'

const categoryLabels: Record<string, string> = {
  gadget: 'Gadget',
  fashion: 'Fashion',
  kesehatan: 'Kesehatan',
  travel: 'Travel',
  rumah: 'Rumah',
  kecantikan: 'Kecantikan',
  olahraga: 'Olahraga',
}

function RelatedReviewsSkeleton() {
  return (
    <section className="animate-pulse">
      <div className="h-6 w-40 rounded bg-white/10 mb-5" />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-xl bg-card border border-white/10 overflow-hidden">
            <div className="aspect-video bg-white/10" />
            <div className="p-4 flex flex-col gap-3">
              <div className="h-4 w-16 rounded-full bg-white/10" />
              <div className="h-4 w-3/4 rounded bg-white/10" />
              <div className="h-3 w-1/2 rounded bg-white/10" />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const review = await getReviewBySlug(slug)
  const description = `Review jujur dan mendalam ${review.title} oleh kurator TitipPilih. Kelebihan, kekurangan, dan rekomendasi pembelian.`
  const pageTitle = review.title.toLowerCase().startsWith('review ')
    ? review.title
    : `Review ${review.title}`
  return {
    title: pageTitle,
    description,
    keywords: [
      `review ${review.title}`,
      `${review.title} terbaik`,
      `beli ${review.title}`,
      `${review.category} terbaik Indonesia`,
      'review jujur TitipPilih',
    ],
    openGraph: {
      title: `${pageTitle} | TitipPilih`,
      description,
      url: `https://titippilih.id/review/${slug}`,
      type: 'article',
    },
  }
}

export default async function ReviewPage({ params }: Props) {
  const { slug } = await params
  const review = await getReviewBySlug(slug)

  const categoryLabel = categoryLabels[review.category] ?? review.category

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${BASE_URL}/review/${slug}#article`,
        headline: `Review ${review.title}`,
        author: { '@type': 'Person', name: review.kurator },
        publisher: { '@type': 'Organization', name: 'TitipPilih', url: BASE_URL },
        datePublished: review.tanggal,
        url: `${BASE_URL}/review/${slug}`,
        mainEntityOfPage: `${BASE_URL}/review/${slug}`,
      },
      {
        '@type': 'Product',
        name: review.title,
        review: {
          '@type': 'Review',
          reviewRating: {
            '@type': 'Rating',
            ratingValue: review.rating.toString(),
            bestRating: '10',
            worstRating: '0',
          },
          author: { '@type': 'Person', name: review.kurator },
          publisher: { '@type': 'Organization', name: 'TitipPilih' },
          datePublished: review.tanggal,
        },
        offers: {
          '@type': 'Offer',
          price: review.priceMin.toString(),
          priceCurrency: 'IDR',
          availability: 'https://schema.org/InStock',
          url: review.affiliateUrl,
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Beranda', item: BASE_URL },
          { '@type': 'ListItem', position: 2, name: categoryLabel, item: `${BASE_URL}/kategori/${review.category}` },
          { '@type': 'ListItem', position: 3, name: `Review ${review.title}`, item: `${BASE_URL}/review/${slug}` },
        ],
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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

            <Suspense fallback={<RelatedReviewsSkeleton />}>
              <RelatedReviews currentSlug={slug} category={review.category} />
            </Suspense>
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
