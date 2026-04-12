'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { formatRupiah } from '@/lib/utils'
import type { DonationStats } from '@/types'

// Counts from 0 to `target` over `duration` ms, starting when `active` becomes true
function useCountUp(target: number, duration: number, active: boolean): number {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active) return
    let current = 0
    const step = target / (duration / 16)
    const id = setInterval(() => {
      current += step
      if (current >= target) {
        setCount(target)
        clearInterval(id)
      } else {
        setCount(Math.floor(current))
      }
    }, 16)
    return () => clearInterval(id)
  }, [target, duration, active])

  return count
}

export function SocialImpactBanner({ stats }: { stats: DonationStats }) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const totalDonasi = useCountUp(stats.totalDonasi, 2000, visible)
  const totalPenerima = useCountUp(stats.totalPenerima, 1500, visible)
  const persentase = useCountUp(stats.persentase, 1000, visible)

  const progress = Math.round((stats.terkumpulBulan / stats.targetBulan) * 100)

  return (
    <section
      ref={ref}
      className="bg-secondary/5 border-y border-secondary/20 py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Membeli Untuk Diri Sendiri,{' '}
            <span className="text-secondary italic">Memberi Untuk Sesama</span>
          </h2>
          <p className="text-muted-foreground text-sm max-w-md mx-auto leading-relaxed">
            Setiap klik affiliate link di TitipPilih berkontribusi langsung
            pada kehidupan nyata — dilaporkan terbuka setiap minggu.
          </p>
        </div>

        {/* Animated stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
          <div className="text-center">
            <p className="text-3xl font-bold text-secondary tabular-nums">
              {formatRupiah(totalDonasi)}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Total donasi tersalurkan
            </p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-secondary tabular-nums">
              {totalPenerima}+
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Penerima terbantu
            </p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-secondary tabular-nums">
              {persentase}%
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Komisi yang disisihkan
            </p>
          </div>
        </div>

        {/* Progress bar — monthly donation target */}
        <div className="max-w-xl mx-auto mb-8">
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span>Terkumpul {formatRupiah(stats.terkumpulBulan)}</span>
            <span>Target {formatRupiah(stats.targetBulan)}</span>
          </div>
          <div className="h-2.5 bg-secondary/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-secondary rounded-full transition-all duration-1000 ease-out"
              style={{ width: visible ? `${progress}%` : '0%' }}
            />
          </div>
          <p className="text-xs text-center text-muted-foreground mt-1.5">
            {progress}% dari target bulan ini
          </p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/donasi"
            className="inline-block px-6 py-3 bg-secondary text-secondary-foreground font-semibold rounded-lg hover:bg-secondary/90 transition-colors"
          >
            Lihat Laporan Donasi
          </Link>
        </div>
      </div>
    </section>
  )
}
