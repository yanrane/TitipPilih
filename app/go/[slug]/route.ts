import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { cleanParam, getClientIp, hashIp } from '@/lib/tracking'

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

  // Redirect user to Shopee affiliate URL
  return NextResponse.redirect(product.affiliateUrl, 302)
}
