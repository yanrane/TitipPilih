import { prisma } from '@/lib/prisma'
import type { Recipient } from '@prisma/client'
import type { DonationStats, RecipientCardProps } from '@/types'
import type { WeeklyReport } from '@/components/donasi/DonationTimeline'

// ── Fallback data ──────────────────────────────────────────────────────────

const STATS_FALLBACK: DonationStats = {
  totalDonasi: 12_450_000,
  totalPenerima: 83,
  persentase: 15,
  terkumpulBulan: 3_526_000,
  targetBulan: 5_000_000,
}

const CURRENT_WEEK_RECIPIENTS_FALLBACK: RecipientCardProps[] = [
  { foto: '', inisial: 'Bpk. S.', wilayah: 'Margahayu, Bandung', nominal: 75_000, tanggal: '9 Apr 2026' },
  { foto: '', inisial: 'Ibu. R.', wilayah: 'Kebayoran, Jakarta Sel.', nominal: 100_000, tanggal: '9 Apr 2026' },
  { foto: '', inisial: 'Bpk. H.', wilayah: 'Tembalang, Semarang', nominal: 50_000, tanggal: '10 Apr 2026' },
  { foto: '', inisial: 'Ibu. W.', wilayah: 'Lowokwaru, Malang', nominal: 75_000, tanggal: '10 Apr 2026' },
  { foto: '', inisial: 'Bpk. T.', wilayah: 'Rappocini, Makassar', nominal: 75_000, tanggal: '11 Apr 2026' },
  { foto: '', inisial: 'Ibu. M.', wilayah: 'Denpasar Selatan, Bali', nominal: 51_000, tanggal: '11 Apr 2026' },
]

const CURRENT_WEEK_FALLBACK = {
  periode: '8 April – 14 April 2026',
  totalKomisi: 2_840_000,
  totalDisisihkan: 426_000,
  jumlahPenerima: CURRENT_WEEK_RECIPIENTS_FALLBACK.length,
  penerima: CURRENT_WEEK_RECIPIENTS_FALLBACK,
}

const TIMELINE_FALLBACK: WeeklyReport[] = [
  {
    id: 'w-apr-8-14',
    periode: '8 April – 14 April 2026',
    totalKomisi: 2_840_000,
    totalDisisihkan: 426_000,
    penerima: CURRENT_WEEK_RECIPIENTS_FALLBACK,
  },
  {
    id: 'w-apr-1-7',
    periode: '1 April – 7 April 2026',
    totalKomisi: 3_120_000,
    totalDisisihkan: 468_000,
    penerima: [
      { foto: '', inisial: 'Bpk. A.', wilayah: 'Cibeunying, Bandung', nominal: 100_000, tanggal: '3 Apr 2026' },
      { foto: '', inisial: 'Ibu. S.', wilayah: 'Pasar Minggu, Jakarta Sel.', nominal: 75_000, tanggal: '3 Apr 2026' },
      { foto: '', inisial: 'Bpk. J.', wilayah: 'Pedurungan, Semarang', nominal: 75_000, tanggal: '4 Apr 2026' },
      { foto: '', inisial: 'Ibu. N.', wilayah: 'Klojen, Malang', nominal: 100_000, tanggal: '4 Apr 2026' },
      { foto: '', inisial: 'Bpk. Y.', wilayah: 'Manggala, Makassar', nominal: 68_000, tanggal: '5 Apr 2026' },
      { foto: '', inisial: 'Ibu. K.', wilayah: 'Gianyar, Bali', nominal: 50_000, tanggal: '5 Apr 2026' },
    ],
  },
  {
    id: 'w-mar-25-31',
    periode: '25 Maret – 31 Maret 2026',
    totalKomisi: 2_680_000,
    totalDisisihkan: 402_000,
    penerima: [
      { foto: '', inisial: 'Ibu. D.', wilayah: 'Coblong, Bandung', nominal: 75_000, tanggal: '27 Mar 2026' },
      { foto: '', inisial: 'Bpk. R.', wilayah: 'Tebet, Jakarta Sel.', nominal: 100_000, tanggal: '27 Mar 2026' },
      { foto: '', inisial: 'Ibu. L.', wilayah: 'Banyumanik, Semarang', nominal: 50_000, tanggal: '28 Mar 2026' },
      { foto: '', inisial: 'Bpk. F.', wilayah: 'Sukun, Malang', nominal: 75_000, tanggal: '28 Mar 2026' },
      { foto: '', inisial: 'Ibu. E.', wilayah: 'Tamalanrea, Makassar', nominal: 52_000, tanggal: '29 Mar 2026' },
    ],
  },
]

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
      totalDonasi: totalDisisihkan._sum.totalDisisihkan ?? STATS_FALLBACK.totalDonasi,
      totalPenerima: totalPenerima || STATS_FALLBACK.totalPenerima,
      persentase: latestWeek?.persentase ?? STATS_FALLBACK.persentase,
      terkumpulBulan: terkumpulBulan._sum.totalDisisihkan ?? STATS_FALLBACK.terkumpulBulan,
      targetBulan: STATS_FALLBACK.targetBulan,
    }
  } catch {
    return STATS_FALLBACK
  }
}

export async function getCurrentWeekReport(): Promise<typeof CURRENT_WEEK_FALLBACK> {
  try {
    const week = await prisma.donationWeek.findFirst({
      orderBy: { periodeEnd: 'desc' },
      include: { recipients: { orderBy: { tanggal: 'asc' } } },
    })
    if (!week) return CURRENT_WEEK_FALLBACK
    return {
      periode: week.periode,
      totalKomisi: week.totalKomisi,
      totalDisisihkan: week.totalDisisihkan,
      jumlahPenerima: week.recipients.length,
      penerima: week.recipients.map((r: Recipient) => ({
        foto: r.foto,
        inisial: r.inisial,
        wilayah: r.wilayah,
        nominal: r.nominal,
        tanggal: formatTanggal(r.tanggal),
      })),
    }
  } catch {
    return CURRENT_WEEK_FALLBACK
  }
}

export async function getDonationTimeline(): Promise<WeeklyReport[]> {
  try {
    const weeks = await prisma.donationWeek.findMany({
      orderBy: { periodeEnd: 'desc' },
      include: { recipients: { orderBy: { tanggal: 'asc' } } },
    })
    if (weeks.length === 0) return TIMELINE_FALLBACK
    return weeks.map((w) => ({
      id: w.id,
      periode: w.periode,
      totalKomisi: w.totalKomisi,
      totalDisisihkan: w.totalDisisihkan,
      penerima: w.recipients.map((r: Recipient) => ({
        foto: r.foto,
        inisial: r.inisial,
        wilayah: r.wilayah,
        nominal: r.nominal,
        tanggal: formatTanggal(r.tanggal),
      })),
    }))
  } catch {
    return TIMELINE_FALLBACK
  }
}
