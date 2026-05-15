import crypto from 'crypto'
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

export function trackingHref(slug: string, source: string, campaign = 'site-cta', contentId?: string): string {
  let href = `/go/${slug}?src=${source}&utm_campaign=${campaign}`
  if (contentId) href += `&cid=${contentId}`
  return href
}
