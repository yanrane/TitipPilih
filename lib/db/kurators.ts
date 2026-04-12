import { prisma } from '@/lib/prisma'
import type { CuratorData } from '@/types'

const KURATORS_FALLBACK: CuratorData[] = [
  {
    name: 'Andi Kurniawan',
    role: 'Kurator Teknologi',
    bio: 'Lima tahun pengalaman di industri teknologi konsumen. Mantan editor di media teknologi nasional, kini fokus menghadirkan review gadget yang deep dan jujur untuk pembaca TitipPilih.',
    initials: 'AK',
    accentColor: 'text-blue-400 bg-blue-500/20 border-blue-500/30',
    categories: ['Gadget', 'Laptop', 'Audio'],
  },
  {
    name: 'Sinta Dewi',
    role: 'Kurator Fashion & Olahraga',
    bio: 'Fitness enthusiast dan fashion blogger berpengalaman 7 tahun. Ahli dalam menemukan produk berkualitas di setiap kisaran harga — dari produk lokal premium hingga brand internasional.',
    initials: 'SD',
    accentColor: 'text-pink-400 bg-pink-500/20 border-pink-500/30',
    categories: ['Fashion', 'Olahraga', 'Travel'],
  },
  {
    name: 'Maya Putri',
    role: 'Kurator Kecantikan & Kesehatan',
    bio: 'Certified skincare formulator dengan latar belakang farmasi. Mengupas kandungan bahan aktif dengan bahasa sederhana — karena setiap kulit Indonesia berhak mendapat produk yang tepat.',
    initials: 'MP',
    accentColor: 'text-purple-400 bg-purple-500/20 border-purple-500/30',
    categories: ['Kecantikan', 'Kesehatan', 'Rumah'],
  },
]

export async function getKurators(): Promise<CuratorData[]> {
  try {
    const kurators = await prisma.kurator.findMany({ orderBy: { createdAt: 'asc' } })
    return kurators.length > 0
      ? kurators.map((k) => ({
          id: k.id,
          name: k.name,
          role: k.role,
          bio: k.bio,
          initials: k.initials,
          accentColor: k.accentColor,
          categories: k.categories,
        }))
      : KURATORS_FALLBACK
  } catch {
    return KURATORS_FALLBACK
  }
}

export async function getKuratorCount(): Promise<number> {
  try {
    return await prisma.kurator.count()
  } catch {
    return KURATORS_FALLBACK.length
  }
}
