'use client'

import { useEffect, useRef, useState } from 'react'
import { formatRupiah } from '@/lib/utils'

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

interface SocialImpactStatsProps {
  totalDonasi: number
  totalPenerima: number
  totalArtikel: number
}

export function SocialImpactStats({ totalDonasi, totalPenerima, totalArtikel }: SocialImpactStatsProps) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.disconnect() }
      },
      { threshold: 0.2 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const animatedDonasi = useCountUp(totalDonasi, 2000, visible)
  const animatedPenerima = useCountUp(totalPenerima, 1500, visible)
  const animatedArtikel = useCountUp(totalArtikel, 1200, visible)

  const stats = [
    {
      value: formatRupiah(animatedDonasi),
      label: 'Total donasi tersalurkan',
      description: 'Sejak TitipPilih berdiri — setiap minggu bertambah',
    },
    {
      value: `${animatedPenerima}+`,
      label: 'Penerima terbantu',
      description: 'Tersebar di seluruh Indonesia, diverifikasi langsung',
    },
    {
      value: `${animatedArtikel}+`,
      label: 'Artikel terpercaya',
      description: 'Review jujur dari kurator berpengalaman',
    },
  ]

  return (
    <section ref={ref} className="py-12">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Dampak <span className="text-secondary">Sosial Kita</span>
        </h2>
        <p className="text-muted-foreground text-sm max-w-md mx-auto">
          Angka-angka ini bukan sekadar statistik — di balik setiap rupiah ada
          cerita nyata yang mengubah hidup seseorang.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center text-center gap-2 p-6 bg-card border border-white/10 rounded-xl"
          >
            <p className="text-3xl font-bold text-secondary tabular-nums">
              {stat.value}
            </p>
            <p className="text-sm font-semibold text-foreground">{stat.label}</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {stat.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
