import { prisma } from '@/lib/prisma'
import type { DonationStats, RecipientCardProps } from '@/types'
import type { WeeklyReport } from '@/components/donasi/DonationTimeline'

type RecipientRow = { foto: string; inisial: string; wilayah: string; nominal: number; tanggal: Date }

// ── Empty-state defaults (shown when DB has no donation data yet) ──────────

const STATS_EMPTY: DonationStats = {
  totalDonasi: 0,
  totalPenerima: 0,
  persentase: 15,
  terkumpulBulan: 0,
  targetBulan: 5_000_000,
}

// ── Helpers ────────────────────────────────────────────────────────────────

function formatTanggal(date: Date): string {
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
}

// ── Queries ────────────────────────────────────────────────────────────────

export async function getDonationStats(): Promise<DonationStats> {
  try {
    const [totalDisisihkan, totalPenerima, latestWeek] = await Promise.all([
      prisma.donationWeek.aggregate({ _sum: { totalDisisihkan: true } }),
      prisma.recipient.count(),
      prisma.donationWeek.findFirst({ orderBy: { periodeEnd: 'desc' } }),
    ])
    const currentMonthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
    const terkumpulBulan = await prisma.donationWeek.aggregate({
      where: { periodeStart: { gte: currentMonthStart } },
      _sum: { totalDisisihkan: true },
    })
    return {
      totalDonasi: totalDisisihkan._sum.totalDisisihkan ?? 0,
      totalPenerima: totalPenerima,
      persentase: latestWeek?.persentase ?? STATS_EMPTY.persentase,
      terkumpulBulan: terkumpulBulan._sum.totalDisisihkan ?? 0,
      targetBulan: STATS_EMPTY.targetBulan,
    }
  } catch {
    return STATS_EMPTY
  }
}

export type CurrentWeekReport = {
  periode: string
  totalKomisi: number
  totalDisisihkan: number
  jumlahPenerima: number
  penerima: RecipientCardProps[]
} | null

export async function getCurrentWeekReport(): Promise<CurrentWeekReport> {
  try {
    const week = await prisma.donationWeek.findFirst({
      orderBy: { periodeEnd: 'desc' },
      include: { recipients: { orderBy: { tanggal: 'asc' } } },
    })
    if (!week) return null
    return {
      periode: week.periode,
      totalKomisi: week.totalKomisi,
      totalDisisihkan: week.totalDisisihkan,
      jumlahPenerima: week.recipients.length,
      penerima: week.recipients.map((r: RecipientRow) => ({
        foto: r.foto,
        inisial: r.inisial,
        wilayah: r.wilayah,
        nominal: r.nominal,
        tanggal: formatTanggal(r.tanggal),
      })),
    }
  } catch {
    return null
  }
}

export async function getDonationTimeline(): Promise<WeeklyReport[]> {
  try {
    const weeks = await prisma.donationWeek.findMany({
      orderBy: { periodeEnd: 'desc' },
      include: { recipients: { orderBy: { tanggal: 'asc' } } },
    })
    return weeks.map((w) => ({
      id: w.id,
      periode: w.periode,
      totalKomisi: w.totalKomisi,
      totalDisisihkan: w.totalDisisihkan,
      penerima: w.recipients.map((r: RecipientRow) => ({
        foto: r.foto,
        inisial: r.inisial,
        wilayah: r.wilayah,
        nominal: r.nominal,
        tanggal: formatTanggal(r.tanggal),
      })),
    }))
  } catch {
    return []
  }
}
