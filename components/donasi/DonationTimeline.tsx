'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, Users } from 'lucide-react'
import { RecipientCard } from './RecipientCard'
import { formatRupiah } from '@/lib/utils'
import type { RecipientCardProps } from '@/types'

export interface WeeklyReport {
  id: string
  periode: string
  totalKomisi: number
  totalDisisihkan: number
  penerima: RecipientCardProps[]
}

interface DonationTimelineProps {
  reports: WeeklyReport[]
}

export function DonationTimeline({ reports }: DonationTimelineProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const toggle = (id: string) =>
    setExpandedId((prev) => (prev === id ? null : id))

  return (
    <section>
      <h2 className="text-xl font-bold text-foreground mb-6">
        Riwayat <span className="text-primary">Penyaluran</span>
      </h2>

      <div className="relative flex flex-col gap-0">
        {/* Vertical line */}
        <div className="absolute left-4 top-4 bottom-4 w-px bg-white/10" aria-hidden />

        {reports.map((report, idx) => {
          const isExpanded = expandedId === report.id
          const isLatest = idx === 0

          return (
            <div key={report.id} className="relative pl-12 pb-8 last:pb-0">
              {/* Timeline dot */}
              <div
                className={`absolute left-2.5 top-1 w-3 h-3 rounded-full border-2 ${
                  isLatest
                    ? 'bg-secondary border-secondary'
                    : 'bg-background border-white/30'
                }`}
              />

              {/* Card */}
              <div className="bg-card border border-white/10 rounded-xl overflow-hidden">
                <div className="p-4 flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex flex-col gap-1 min-w-0">
                    <div className="flex items-center gap-2">
                      {isLatest && (
                        <span className="text-xs font-semibold bg-secondary/20 text-secondary px-2 py-0.5 rounded-full">
                          Terbaru
                        </span>
                      )}
                      <span className="text-sm font-semibold text-foreground">
                        {report.periode}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
                      <span>
                        Komisi:{' '}
                        <strong className="text-foreground">
                          {formatRupiah(report.totalKomisi)}
                        </strong>
                      </span>
                      <span>
                        Disalurkan:{' '}
                        <strong className="text-secondary">
                          {formatRupiah(report.totalDisisihkan)}
                        </strong>
                      </span>
                      <span className="flex items-center gap-1">
                        <Users size={11} />
                        {report.penerima.length} penerima
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => toggle(report.id)}
                    className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors shrink-0"
                    aria-expanded={isExpanded}
                  >
                    {isExpanded ? (
                      <>
                        Sembunyikan <ChevronUp size={14} />
                      </>
                    ) : (
                      <>
                        Lihat Detail <ChevronDown size={14} />
                      </>
                    )}
                  </button>
                </div>

                {/* Expandable recipients */}
                {isExpanded && (
                  <div className="border-t border-white/10 p-4">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {report.penerima.map((p, i) => (
                        <RecipientCard key={i} {...p} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
