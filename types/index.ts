export type CategorySlug =
  | 'serum'
  | 'moisturizer'
  | 'sunscreen'
  | 'cleanser'
  | 'toner'
  | 'eyecare'
  | 'bodycare'

export interface ProductCardProps {
  image: string
  title: string
  category: CategorySlug
  rating: number // 0-10
  priceMin: number
  priceMax?: number
  slug: string
  affiliateUrl: string
}

export interface RecipientCardProps {
  foto: string
  inisial: string
  wilayah: string
  nominal: number
  tanggal: string
}

export interface ProductSidebarProps {
  title: string
  image: string
  rating: number
  priceMin: number
  priceMax?: number
  affiliateUrl: string
}

export interface LaporanDonasi {
  periode: string
  totalKomisi: number
  totalDisisihkan: number
  persentase: number
  penerima: RecipientCardProps[]
}

export interface ArticlePreview {
  slug: string
  title: string
  category: CategorySlug
  image?: string
  kurator: string
  estimasiBaca: number
}

export interface DonationStats {
  totalDonasi: number
  totalPenerima: number
  persentase: number
  terkumpulBulan: number
  targetBulan: number
}

export interface CuratorData {
  id?: string
  name: string
  role: string
  bio: string
  initials: string
  accentColor: string
  categories: string[]
}
