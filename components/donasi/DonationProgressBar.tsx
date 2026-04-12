'use client'

import { useEffect, useRef, useState } from 'react'
import { formatRupiah } from '@/lib/utils'

interface DonationProgressBarProps {
  terkumpul: number
  target: number
}

export function DonationProgressBar({ terkumpul, target }: DonationProgressBarProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  const progress = Math.min(Math.round((terkumpul / target) * 100), 100)

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
      { threshold: 0.3 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="bg-card border border-white/10 rounded-xl p-6 flex flex-col gap-4">
      <div>
        <h2 className="text-lg font-bold text-foreground mb-0.5">
          Progress Target Donasi{' '}
          <span className="text-secondary">Bulan Ini</span>
        </h2>
        <p className="text-xs text-muted-foreground">
          Periode April 2026 — diperbarui setiap minggu
        </p>
      </div>

      {/* Labels */}
      <div className="flex justify-between text-sm">
        <div>
          <p className="text-xs text-muted-foreground mb-0.5">Terkumpul</p>
          <p className="font-bold text-secondary tabular-nums">
            {formatRupiah(terkumpul)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground mb-0.5">Target</p>
          <p className="font-bold text-foreground tabular-nums">
            {formatRupiah(target)}
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-3 bg-secondary/20 rounded-full overflow-hidden">
        <div
          className="h-full bg-secondary rounded-full transition-all duration-1000 ease-out"
          style={{ width: visible ? `${progress}%` : '0%' }}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>

      <p className="text-sm font-semibold text-secondary text-center">
        {progress}% tercapai
      </p>
    </div>
  )
}
