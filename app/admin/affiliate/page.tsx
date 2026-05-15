import type { Metadata } from 'next'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Affiliate Analytics | TitipPilih',
  robots: { index: false, follow: false },
}

interface Props {
  searchParams: Promise<{ token?: string }>
}

export default async function AffiliateDashboardPage({ searchParams }: Props) {
  const { token } = await searchParams
  const adminToken = process.env.TITIPPILIH_ADMIN_TOKEN

  if (!adminToken || token !== adminToken) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-4">
        <div className="bg-[#1E293B] border border-white/10 rounded-2xl p-8 max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-white mb-2">🔒 Admin Area</h1>
          <p className="text-slate-400 mb-6">
            Halaman ini hanya untuk admin TitipPilih. Tambahkan <code className="text-teal-400 bg-[#0F172A] px-2 py-0.5 rounded text-sm">?token=...</code> di URL.
          </p>
          <p className="text-xs text-slate-500">
            Token ditentukan di environment variable <code className="text-teal-400 bg-[#0F172A] px-1 rounded">TITIPPILIH_ADMIN_TOKEN</code>.
          </p>
        </div>
      </div>
    )
  }

  const now = new Date()
  const startToday = new Date(now)
  startToday.setHours(0, 0, 0, 0)
  const start7Days = new Date(now)
  start7Days.setDate(now.getDate() - 7)

  const [today, sevenDays, totalAllTime, topProducts, topSources, latest] = await Promise.all([
    prisma.affiliateClick.count({ where: { createdAt: { gte: startToday } } }),
    prisma.affiliateClick.count({ where: { createdAt: { gte: start7Days } } }),
    prisma.affiliateClick.count(),
    prisma.affiliateClick.groupBy({
      by: ['productId', 'productSlug'],
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
      take: 10,
    }),
    prisma.affiliateClick.groupBy({
      by: ['source'],
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
      take: 10,
    }),
    prisma.affiliateClick.findMany({
      orderBy: { createdAt: 'desc' },
      take: 15,
      select: { productSlug: true, source: true, campaign: true, contentId: true, createdAt: true },
    }),
  ])

  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">📊 Affiliate Analytics</h1>
            <p className="text-sm text-slate-400 mt-1">Tracked clicks from /go/[slug] links</p>
          </div>
          <Link href="/" className="text-sm text-teal-400 hover:underline">
            ← Kembali ke TitipPilih
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <StatCard label="Hari Ini" value={today} color="text-green-400" />
          <StatCard label="7 Hari" value={sevenDays} color="text-blue-400" />
          <StatCard label="Total" value={totalAllTime} color="text-teal-400" />
        </div>

        {/* Top Products */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-3">🔥 Top Produk (7 hari)</h2>
          {topProducts.length === 0 ? (
            <p className="text-sm text-slate-500">Belum ada data klik.</p>
          ) : (
            <div className="bg-[#1E293B] border border-white/10 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-left text-slate-400">
                    <th className="px-4 py-3 font-medium">Produk</th>
                    <th className="px-4 py-3 font-medium text-right">Klik</th>
                  </tr>
                </thead>
                <tbody>
                  {topProducts.map((p, i) => (
                    <tr key={p.productSlug} className={i % 2 === 0 ? 'bg-white/5' : ''}>
                      <td className="px-4 py-2.5">
                        <a
                          href={`/go/${p.productSlug}?src=admin-test`}
                          target="_blank"
                          className="text-teal-400 hover:underline"
                        >
                          {p.productSlug.replace(/-/g, ' ')}
                        </a>
                      </td>
                      <td className="px-4 py-2.5 text-right font-semibold">{p._count.id}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Top Sources */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-3">📱 Sumber Trafik (7 hari)</h2>
          {topSources.length === 0 ? (
            <p className="text-sm text-slate-500">Belum ada data sumber trafik.</p>
          ) : (
            <div className="bg-[#1E293B] border border-white/10 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-left text-slate-400">
                    <th className="px-4 py-3 font-medium">Source</th>
                    <th className="px-4 py-3 font-medium text-right">Klik</th>
                  </tr>
                </thead>
                <tbody>
                  {topSources.map((s, i) => (
                    <tr key={s.source} className={i % 2 === 0 ? 'bg-white/5' : ''}>
                      <td className="px-4 py-2.5">
                        <span className="inline-flex items-center gap-1.5">
                          <SourceBadge source={s.source} />
                          {s.source || '(direct)'}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-right font-semibold">{s._count.id}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Latest Clicks */}
        <section>
          <h2 className="text-lg font-semibold mb-3">🕐 Klik Terbaru</h2>
          {latest.length === 0 ? (
            <p className="text-sm text-slate-500">Belum ada klik yang tercatat.</p>
          ) : (
            <div className="bg-[#1E293B] border border-white/10 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-left text-slate-400">
                    <th className="px-4 py-3 font-medium">Waktu</th>
                    <th className="px-4 py-3 font-medium">Produk</th>
                    <th className="px-4 py-3 font-medium">Source</th>
                    <th className="px-4 py-3 font-medium">Campaign</th>
                    <th className="px-4 py-3 font-medium">Content ID</th>
                  </tr>
                </thead>
                <tbody>
                  {latest.map((click, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white/5' : ''}>
                      <td className="px-4 py-2.5 text-slate-400 text-xs whitespace-nowrap">
                        {click.createdAt.toLocaleString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                      <td className="px-4 py-2.5">
                        <a
                          href={`/go/${click.productSlug}?src=admin-test`}
                          target="_blank"
                          className="text-teal-400 hover:underline"
                        >
                          {click.productSlug.replace(/-/g, ' ')}
                        </a>
                      </td>
                      <td className="px-4 py-2.5">
                        <SourceBadge source={click.source} />
                        {click.source || '-'}
                      </td>
                      <td className="px-4 py-2.5 text-slate-400">{click.campaign || '-'}</td>
                      <td className="px-4 py-2.5 text-slate-400 text-xs">{click.contentId || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Link Convention */}
        <section className="mt-8 p-4 bg-[#1E293B] border border-white/10 rounded-xl">
          <h3 className="text-sm font-semibold text-slate-300 mb-2">📝 Konvensi Link Postiz</h3>
          <div className="space-y-1.5 text-xs text-slate-400">
            <p>Gunakan parameter berikut saat posting ke sosial media via Postiz:</p>
            <code className="block bg-[#0F172A] px-3 py-2 rounded text-teal-400 mt-1">
              /go/[slug]?src=[channel]&amp;utm_campaign=[campaign]&amp;cid=[content-id]
            </code>
            <div className="mt-2 space-y-1">
              <p>Channel <code className="text-teal-400">src</code>: <code>ig</code> <code>fb</code> <code>threads</code> <code>web</code></p>
              <p>Campaign <code className="text-teal-400">utm_campaign</code>: <code>skincare-week-1</code> <code>ramadan-sale</code></p>
              <p>Content ID <code className="text-teal-400">cid</code>: kode unik tiap konten</p>
            </div>
            <p className="mt-2 text-slate-500">Contoh:</p>
            <code className="block bg-[#0F172A] px-3 py-2 rounded text-teal-400 text-xs">
              /go/azarine-hydrasoothe-spf45?src=ig&amp;utm_campaign=skincare-week-1&amp;cid=ig-20260515-001
            </code>
          </div>
        </section>
      </div>
    </div>
  )
}

// ── Sub-components ──────────────────────────────────────────────────────────

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="bg-[#1E293B] border border-white/10 rounded-xl p-5">
      <p className="text-sm text-slate-400 mb-1">{label}</p>
      <p className={`text-3xl font-bold ${color}`}>{value.toLocaleString('id-ID')}</p>
    </div>
  )
}

function SourceBadge({ source }: { source: string | null }) {
  if (!source) return null
  const colors: Record<string, string> = {
    ig: 'bg-pink-500/20 text-pink-400',
    fb: 'bg-blue-500/20 text-blue-400',
    threads: 'bg-purple-500/20 text-purple-400',
    web: 'bg-teal-500/20 text-teal-400',
    test: 'bg-yellow-500/20 text-yellow-400',
  }
  return (
    <span className={`inline-block w-6 h-4 rounded text-[10px] font-bold text-center leading-4 ${colors[source] || 'bg-slate-500/20 text-slate-400'}`}>
      {source.slice(0, 2).toUpperCase()}
    </span>
  )
}
