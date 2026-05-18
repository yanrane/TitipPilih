import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { buildAffiliateSubId, cleanParam } from '@/lib/tracking'

function unauthorized() {
  return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const token = request.headers.get('authorization')?.replace('Bearer ', '').trim()
  const adminToken = process.env.TITIPPILIH_ADMIN_TOKEN
  const queryToken = url.searchParams.get('token')

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
    const requestedSubIds = parseRequestedSubIds(url.searchParams)

    const [
      today,
      sevenDays,
      topProducts,
      topSources,
      topContentIds,
      rawLatest,
      rawReconciliationClicks,
      totalAllTime,
    ] = await Promise.all([
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
      prisma.affiliateClick.groupBy({
        by: ['contentId'],
        where: { createdAt: { gte: start7Days }, contentId: { not: null } },
        _count: { id: true },
        orderBy: { _count: { id: 'desc' } },
        take: 20,
      }),
      prisma.affiliateClick.findMany({
        orderBy: { createdAt: 'desc' },
        take: 100,
        select: { productSlug: true, source: true, campaign: true, contentId: true, createdAt: true },
      }),
      prisma.affiliateClick.findMany({
        where: { createdAt: { gte: start7Days } },
        orderBy: { createdAt: 'desc' },
        take: 5000,
        select: { productSlug: true, source: true, campaign: true, contentId: true, createdAt: true },
      }),
      prisma.affiliateClick.count(),
    ])

    const latest = rawLatest.map((click) => ({
      ...click,
      subId: buildAffiliateSubId({
        source: click.source,
        campaign: click.campaign,
        contentId: click.contentId,
        productSlug: click.productSlug,
      }),
    }))

    const reconciliationSubIdClicks = new Map<string, number>()
    for (const click of rawReconciliationClicks) {
      const subId = buildAffiliateSubId({
        source: click.source,
        campaign: click.campaign,
        contentId: click.contentId,
        productSlug: click.productSlug,
      })
      reconciliationSubIdClicks.set(subId, (reconciliationSubIdClicks.get(subId) ?? 0) + 1)
    }

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
      topContentIds: topContentIds.map((content) => ({
        contentId: content.contentId,
        clicks: content._count.id,
      })),
      latest,
      reconciliation: {
        note: 'Cocokkan kolom sub_id dari laporan marketplace affiliate dengan field subId di response ini. sub_id dibentuk dari src + campaign + cid + productSlug.',
        requestedSubIds,
        matches: requestedSubIds.map((subId) => ({
          subId,
          clicksIn7Days: reconciliationSubIdClicks.get(subId) ?? 0,
          matched: reconciliationSubIdClicks.has(subId),
        })),
      },
    })
  } catch (error) {
    console.error('[affiliate-admin] Fetch error:', error)
    return NextResponse.json({ ok: false, error: 'Internal server error' }, { status: 500 })
  }
}

function parseRequestedSubIds(searchParams: URLSearchParams): string[] {
  const rawValues = [
    searchParams.get('sub_ids'),
    searchParams.get('subIds'),
    searchParams.get('report_sub_ids'),
  ].filter(Boolean) as string[]

  return rawValues
    .flatMap((value) => value.split(','))
    .map((value) => cleanParam(value.trim(), 128))
    .filter((value): value is string => Boolean(value))
    .slice(0, 100)
}
