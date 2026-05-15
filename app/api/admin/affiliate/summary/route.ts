import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

function unauthorized() {
  return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
}

export async function GET(request: NextRequest) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '').trim()
  const adminToken = process.env.TITIPPILIH_ADMIN_TOKEN
  const queryToken = new URL(request.url).searchParams.get('token')

  if (!adminToken) {
    return NextResponse.json({ ok: false, error: 'Admin token not configured on server' }, { status: 500 })
  }

  const authenticated = token === adminToken || queryToken === adminToken
  if (!authenticated) {
    return unauthorized()
  }

  const now = new Date()
  const startToday = new Date(now)
  startToday.setHours(0, 0, 0, 0)
  const start7Days = new Date(now)
  start7Days.setDate(now.getDate() - 7)

  try {
    const [today, sevenDays, topProducts, topSources, latest, totalAllTime] = await Promise.all([
      prisma.affiliateClick.count({ where: { createdAt: { gte: startToday } } }),
      prisma.affiliateClick.count({ where: { createdAt: { gte: start7Days } } }),
      prisma.affiliateClick.groupBy({
        by: ['productId', 'productSlug'],
        where: { createdAt: { gte: start7Days } },
        _count: { id: true },
        orderBy: { _count: { id: 'desc' } },
        take: 10,
      }),
      prisma.affiliateClick.groupBy({
        by: ['source'],
        where: { createdAt: { gte: start7Days } },
        _count: { id: true },
        orderBy: { _count: { id: 'desc' } },
        take: 10,
      }),
      prisma.affiliateClick.findMany({
        orderBy: { createdAt: 'desc' },
        take: 20,
        select: { productSlug: true, source: true, campaign: true, contentId: true, createdAt: true },
      }),
      prisma.affiliateClick.count(),
    ])

    return NextResponse.json({
      ok: true,
      today,
      sevenDays,
      totalAllTime,
      topProducts: topProducts.map((p) => ({
        productSlug: p.productSlug,
        clicks: p._count.id,
      })),
      topSources: topSources.map((s) => ({
        source: s.source || '(direct)',
        clicks: s._count.id,
      })),
      latest,
    })
  } catch (error) {
    console.error('[affiliate-admin] Fetch error:', error)
    return NextResponse.json({ ok: false, error: 'Internal server error' }, { status: 500 })
  }
}
