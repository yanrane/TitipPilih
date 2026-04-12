export type CategorySlug =
  | 'gadget'
  | 'fashion'
  | 'kesehatan'
  | 'travel'
  | 'rumah'
  | 'kecantikan'
  | 'olahraga'

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
  inisial: string // "Bpk. S."
  wilayah: string // "Margahayu, Bandung"
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

// Article preview for homepage and listing
export interface ArticlePreview {
  slug: string
  title: string
  category: CategorySlug
  kurator: string
  estimasiBaca: number
}

// Donation stats for SocialImpactBanner and SocialImpactStrip
export interface DonationStats {
  totalDonasi: number
  totalPenerima: number
  persentase: number
  terkumpulBulan: number
  targetBulan: number
}

// Kurator profile for CuratorTeam
export interface CuratorData {
  id?: string
  name: string
  role: string
  bio: string
  initials: string
  accentColor: string // Tailwind class string
  categories: string[]
}
