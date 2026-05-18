import * as crypto from 'crypto'
import type { NextRequest } from 'next/server'

export function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0]?.trim() || 'unknown'
  return request.headers.get('x-real-ip') || 'unknown'
}

export function hashIp(ip: string): string {
  const salt = process.env.TITIPPILIH_TRACKING_SALT || 'titippilih-default-salt'
  return crypto.createHash('sha256').update(`${salt}:${ip}`).digest('hex')
}

export function cleanParam(value: string | null, max = 128): string | null {
  if (!value) return null
  return value.replace(/[^a-zA-Z0-9._-]/g, '').slice(0, max) || null
}

export function buildAffiliateSubId({
  source,
  campaign,
  contentId,
  productSlug,
}: {
  source: string | null
  campaign: string | null
  contentId: string | null
  productSlug: string
}): string {
  const parts = [source, campaign, contentId, productSlug].filter(Boolean)
  const value = parts.join('__') || productSlug
  return cleanParam(value, 128) ?? productSlug.slice(0, 128)
}

export function appendAffiliateTrackingParams(
  affiliateUrl: string,
  tracking: {
    source: string | null
    campaign: string | null
    contentId: string | null
    productSlug: string
  },
): string {
  try {
    const destination = new URL(affiliateUrl)
    const subId = buildAffiliateSubId(tracking)

    // `sub_id` is the marketplace-side reconciliation key. `cid` remains
    // stored in AffiliateClick.contentId, while Shopee/Tokopedia reports can
    // be matched back via this generated sub_id value.
    destination.searchParams.set('sub_id', subId)

    if (tracking.source) destination.searchParams.set('utm_source', tracking.source)
    if (tracking.campaign) destination.searchParams.set('utm_campaign', tracking.campaign)
    if (tracking.contentId && !destination.searchParams.has('utm_content')) {
      destination.searchParams.set('utm_content', tracking.contentId)
    }

    return destination.toString()
  } catch {
    return affiliateUrl
  }
}

export function trackingHref(slug: string, source: string, campaign = 'site-cta', contentId?: string): string {
  let href = `/go/${slug}?src=${source}&utm_campaign=${campaign}`
  if (contentId) href += `&cid=${contentId}`
  return href
}
