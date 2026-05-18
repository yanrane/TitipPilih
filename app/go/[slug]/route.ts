import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSpecificAffiliateLink } from '@/lib/specificAffiliateLinks'
import { appendAffiliateTrackingParams, cleanParam, getClientIp, hashIp } from '@/lib/tracking'

type Params = Promise<{ slug: string }>

export async function GET(request: NextRequest, segmentData: { params: Params }) {
  const { slug } = await segmentData.params

  const product = await prisma.product.findUnique({
    where: { slug },
    select: { id: true, slug: true, affiliateUrl: true },
  })

  // If product not found, redirect to homepage
  if (!product?.affiliateUrl) {
    return NextResponse.redirect(new URL('/', request.url), 302)
  }

  const url = new URL(request.url)
  const source = cleanParam(url.searchParams.get('src'), 64)
  const campaign = cleanParam(url.searchParams.get('utm_campaign'), 128)
  const contentId = cleanParam(url.searchParams.get('cid'), 128)

  // Log click asynchronously — fire & forget, never block redirect
  const ip = getClientIp(request)
  prisma.affiliateClick
    .create({
      data: {
        productId: product.id,
        productSlug: product.slug,
        source,
        campaign,
        contentId,
        referrer: request.headers.get('referer'),
        userAgent: request.headers.get('user-agent'),
        ipHash: hashIp(ip),
      },
    })
    .catch((error: Error) => {
      console.error('[affiliate-tracking] Failed to log click:', error.message)
    })

  // Prefer specific product affiliate links. Older DB rows may contain search-result
  // affiliate URLs, which can confuse buyers and break commission attribution.
  const destinationUrl = appendAffiliateTrackingParams(getSpecificAffiliateLink(product.slug) ?? product.affiliateUrl, {
    source,
    campaign,
    contentId,
    productSlug: product.slug,
  })

  // Redirect user to Shopee affiliate URL with marketplace-side sub_id tracking
  return NextResponse.redirect(destinationUrl, 302)
}
