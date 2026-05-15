# TitipPilih Skincare Beauty Pivot — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Pivot TitipPilih dari 7-niche dark tech marketplace ke pure Skincare & Kecantikan affiliate site dengan beauty aesthetic terang dan bersih, 20 produk skincare nyata, dan 0 foto placeholder (picsum.photos).

**Architecture:** Semua data di-update di fallback layer (`lib/db/products.ts`, `lib/db/reviews.ts`) yang aktif karena tidak ada DB connection di production. Visual redesign via CSS variable swap di `globals.css` (light mode) + hapus `dark` class dari `html` element + update hardcoded dark-tone Tailwind classes di setiap komponen.

**Tech Stack:** Next.js 16 App Router, Tailwind v4 (CSS-variable config), shadcn/ui base-nova, TypeScript, Playfair Display + Plus Jakarta Sans fonts, Unsplash images (CDN).

---

## File Map

| File | Action | Tanggung Jawab |
|---|---|---|
| `types/index.ts` | Modify | CategorySlug → 7 skincare sub-categories |
| `app/globals.css` | Modify | Beauty color palette, Playfair Display font var, light mode |
| `app/layout.tsx` | Modify | Add Playfair Display font, remove `dark` class, update metadata |
| `lib/db/products.ts` | Modify | TRENDING_FALLBACK + CATEGORY_FALLBACK → 20 skincare products |
| `lib/db/reviews.ts` | Modify | REVIEWS_FALLBACK → skincare reviews dengan real images |
| `components/layout/Navbar.tsx` | Modify | kategoriLinks skincare, remove dark-mode hardcoded colors |
| `components/layout/Footer.tsx` | Modify | kategoriLinks skincare, remove dark-mode hardcoded classes |
| `components/home/HeroSection.tsx` | Modify | Beauty redesign, skincare copy, rose gradient, featured skincare product |
| `components/home/KategoriGrid.tsx` | Modify | 7 skincare sub-categories dengan beauty color scheme |
| `components/home/TrendingSection.tsx` | Modify | Update "Lihat Semua" link ke `/kategori/serum` |
| `components/home/ArtikelTerbaru.tsx` | Modify | Fix picsum.photos → review.image, update link |
| `components/home/SocialImpactBanner.tsx` | No change | Sudah pakai CSS vars (`text-secondary`, `bg-secondary/5`), auto-update |
| `components/shared/CategoryBadge.tsx` | Modify | Labels + colors untuk 7 skincare slugs |
| `components/review/ArticleHeader.tsx` | Modify | Fix picsum fallback → real image, update categoryLabels, fix light mode border |
| `app/kategori/[slug]/page.tsx` | Modify | categoryInfo → 7 skincare sub-categories |
| `components/kategori/KategoriContent.tsx` | Modify | subKategoriMap → skincare sub-types |

---

## Task 1: Update Types — CategorySlug Skincare

**Files:**
- Modify: `types/index.ts`

- [ ] **Step 1: Update CategorySlug**

Replace the entire `types/index.ts`:

```ts
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
```

- [ ] **Step 2: Verify no TS errors from type change**

```bash
cd "/Users/wayanrane/Library/CloudStorage/BeeStation-TristanArshaBeeStation/36. AFFILIATE WEBSITE/titippilih" && npx tsc --noEmit 2>&1 | head -30
```

Expected: Errors about old category slugs ('gadget', etc.) in other files — this is expected, will be fixed in subsequent tasks. The type itself is now correct.

- [ ] **Step 3: Commit**

```bash
cd "/Users/wayanrane/Library/CloudStorage/BeeStation-TristanArshaBeeStation/36. AFFILIATE WEBSITE/titippilih" && git add types/index.ts && git commit -m "feat: pivot CategorySlug to 7 skincare sub-categories"
```

---

## Task 2: Beauty Design System — globals.css + layout.tsx

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Update globals.css dengan beauty palette**

Replace the entire `app/globals.css`:

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-sans);
  --font-mono: var(--font-geist-mono);
  --font-heading: var(--font-heading);
  --color-sidebar-ring: var(--sidebar-ring);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar: var(--sidebar);
  --color-chart-5: var(--chart-5);
  --color-chart-4: var(--chart-4);
  --color-chart-3: var(--chart-3);
  --color-chart-2: var(--chart-2);
  --color-chart-1: var(--chart-1);
  --color-ring: var(--ring);
  --color-input: var(--input);
  --color-border: var(--border);
  --color-destructive: var(--destructive);
  --color-accent-foreground: var(--accent-foreground);
  --color-accent: var(--accent);
  --color-muted-foreground: var(--muted-foreground);
  --color-muted: var(--muted);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-secondary: var(--secondary);
  --color-primary-foreground: var(--primary-foreground);
  --color-primary: var(--primary);
  --color-popover-foreground: var(--popover-foreground);
  --color-popover: var(--popover);
  --color-card-foreground: var(--card-foreground);
  --color-card: var(--card);
  --radius-sm: calc(var(--radius) * 0.6);
  --radius-md: calc(var(--radius) * 0.8);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.4);
  --radius-2xl: calc(var(--radius) * 1.8);
  --radius-3xl: calc(var(--radius) * 2.2);
  --radius-4xl: calc(var(--radius) * 2.6);
}

/* ── Beauty Palette — Light Mode (default) ─────────────────────── */
:root {
  /* Brand */
  --primary: #E8657A;             /* Rose — main CTA color */
  --primary-foreground: #FFFFFF;
  --secondary: #8EB5A2;           /* Sage Green — donasi/social */
  --secondary-foreground: #FFFFFF;

  /* Surfaces */
  --background: #FEFAF8;          /* Warm cream white */
  --foreground: #1C1C2E;          /* Near-black text */
  --card: #FFFFFF;
  --card-foreground: #1C1C2E;
  --popover: #FFFFFF;
  --popover-foreground: #1C1C2E;

  /* UI */
  --muted: #F5EFF0;               /* Blush tint for muted areas */
  --muted-foreground: #6B7280;
  --accent: #FDF2F4;              /* Soft blush accent */
  --accent-foreground: #1C1C2E;
  --border: #E8D5D8;              /* Rose-tinted border */
  --input: #E8D5D8;
  --ring: #E8657A;
  --destructive: oklch(0.577 0.245 27.325);

  /* Charts */
  --chart-1: #E8657A;
  --chart-2: #8EB5A2;
  --chart-3: #FCD5BF;
  --chart-4: #C084A0;
  --chart-5: #A5B4FC;

  --radius: 0.625rem;

  /* Sidebar */
  --sidebar: #FFFFFF;
  --sidebar-foreground: #1C1C2E;
  --sidebar-primary: #E8657A;
  --sidebar-primary-foreground: #FFFFFF;
  --sidebar-accent: #FDF2F4;
  --sidebar-accent-foreground: #1C1C2E;
  --sidebar-border: #E8D5D8;
  --sidebar-ring: #E8657A;
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
  html {
    @apply font-sans;
    scroll-behavior: smooth;
  }
  :focus-visible {
    @apply outline-2 outline-offset-2 outline-primary rounded-sm;
  }
  h1, h2, h3 {
    font-family: var(--font-heading), var(--font-sans);
  }
}
```

- [ ] **Step 2: Update layout.tsx — add Playfair Display, remove dark class, update metadata**

Replace the entire `app/layout.tsx`:

```tsx
import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { SocialImpactStrip } from '@/components/shared/SocialImpactStrip'

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: '--font-sans',
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700', '800'],
})

const playfairDisplay = Playfair_Display({
  variable: '--font-heading',
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://titippilih.id'),
  title: {
    template: '%s | TitipPilih',
    default: 'TitipPilih — Review Skincare Jujur, Berbagi Tulus',
  },
  description:
    'Review skincare terpercaya dari kurator Indonesia. Serum, moisturizer, sunscreen terlaris — rekomendasi jujur, sebagian komisi untuk donasi.',
  keywords: [
    'review skincare Indonesia',
    'rekomendasi skincare terbaik',
    'serum niacinamide Indonesia',
    'sunscreen terbaik Indonesia',
    'skincare lokal Indonesia',
    'TitipPilih skincare',
    'donasi sosial skincare',
  ],
  openGraph: {
    siteName: 'TitipPilih',
    locale: 'id_ID',
    type: 'website',
    title: 'TitipPilih — Review Skincare Jujur, Berbagi Tulus',
    description:
      'Review skincare terpercaya dari kurator Indonesia. Serum, moisturizer, sunscreen terlaris — rekomendasi jujur, sebagian komisi untuk donasi.',
    url: 'https://titippilih.id',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TitipPilih — Review Skincare Jujur, Berbagi Tulus',
    description:
      'Review skincare terpercaya dari kurator Indonesia. Rekomendasi jujur, sebagian komisi untuk donasi.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className={`${plusJakartaSans.variable} ${playfairDisplay.variable}`}>
      <body className="min-h-screen flex flex-col bg-background text-foreground antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <SocialImpactStrip />
        <Footer />
      </body>
    </html>
  )
}
```

- [ ] **Step 3: Commit**

```bash
cd "/Users/wayanrane/Library/CloudStorage/BeeStation-TristanArshaBeeStation/36. AFFILIATE WEBSITE/titippilih" && git add app/globals.css app/layout.tsx && git commit -m "feat: beauty palette light mode + Playfair Display font"
```

---

## Task 3: Data Layer — 20 Skincare Products

**Files:**
- Modify: `lib/db/products.ts`

- [ ] **Step 1: Replace TRENDING_FALLBACK dan CATEGORY_FALLBACK dengan skincare data**

Replace the entire `lib/db/products.ts` (hanya ganti bagian TRENDING_FALLBACK dan CATEGORY_FALLBACK, semua fungsi/types di bawahnya tetap sama):

```ts
import { prisma } from '@/lib/prisma'
import type { ProductCardProps, CategorySlug } from '@/types'

// ── Fallback data (active — no DB connection in production) ────────────────

const TRENDING_FALLBACK: ProductCardProps[] = [
  {
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=600&fit=crop&auto=format',
    title: 'Azarine Hydrasoothe Sunscreen SPF45',
    category: 'sunscreen',
    rating: 9.4,
    priceMin: 49_000,
    priceMax: 69_000,
    slug: 'azarine-hydrasoothe-spf45',
    affiliateUrl: 'https://shopee.co.id/Azarine-Hydrasoothe-Sunscreen-Gel-SPF45-PA-50ml-i.138273726.3290987654',
  },
  {
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&h=600&fit=crop&auto=format',
    title: 'Skintific 5% Niacinamide Barrier Cream',
    category: 'moisturizer',
    rating: 9.3,
    priceMin: 119_000,
    priceMax: 149_000,
    slug: 'skintific-barrier-cream',
    affiliateUrl: 'https://shopee.co.id/Skintific-5-Niacinamide-Barrier-Moisture-Gel-Cream-30g-i.201869466.7654321098',
  },
  {
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=600&fit=crop&auto=format',
    title: 'Somethinc Niacinamide Serum 20ml',
    category: 'serum',
    rating: 9.1,
    priceMin: 89_000,
    priceMax: 159_000,
    slug: 'somethinc-niacinamide-serum',
    affiliateUrl: 'https://shopee.co.id/Somethinc-Niacinamide-Moisture-Beet-Serum-20ml-i.138273726.2345678901',
  },
]

const CATEGORY_FALLBACK: Record<CategorySlug, ProductCardProps[]> = {
  serum: [
    {
      image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=600&fit=crop&auto=format',
      title: 'Somethinc Niacinamide + Moisture Beet Serum',
      category: 'serum',
      rating: 9.1,
      priceMin: 89_000,
      priceMax: 159_000,
      slug: 'somethinc-niacinamide-serum',
      affiliateUrl: 'https://shopee.co.id/Somethinc-Niacinamide-Moisture-Beet-Serum-20ml-i.138273726.2345678901',
    },
    {
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=600&fit=crop&auto=format',
      title: 'Scarlett Whitening Brightening Serum Vit C',
      category: 'serum',
      rating: 8.9,
      priceMin: 55_000,
      priceMax: 85_000,
      slug: 'scarlett-brightening-serum',
      affiliateUrl: 'https://shopee.co.id/Scarlett-Whitening-Brightening-Serum-40ml-i.77382617.3456789012',
    },
    {
      image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&h=600&fit=crop&auto=format',
      title: 'Avoskin Miraculous Retinol Serum 0.1%',
      category: 'serum',
      rating: 8.7,
      priceMin: 179_000,
      priceMax: 220_000,
      slug: 'avoskin-miraculous-retinol',
      affiliateUrl: 'https://shopee.co.id/Avoskin-Miraculous-Retinol-Serum-0.1-20ml-i.96345871.1234567890',
    },
    {
      image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&h=600&fit=crop&auto=format',
      title: 'Garnier Bright Complete Vitamin C Serum',
      category: 'serum',
      rating: 8.5,
      priceMin: 59_000,
      priceMax: 89_000,
      slug: 'garnier-bright-vit-c-serum',
      affiliateUrl: 'https://shopee.co.id/Garnier-Bright-Complete-Vitamin-C-Serum-30ml-i.7291847.4567890123',
    },
  ],
  moisturizer: [
    {
      image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&h=600&fit=crop&auto=format',
      title: 'Skintific 5% Niacinamide Barrier Moisture Gel Cream',
      category: 'moisturizer',
      rating: 9.3,
      priceMin: 119_000,
      priceMax: 149_000,
      slug: 'skintific-barrier-cream',
      affiliateUrl: 'https://shopee.co.id/Skintific-5-Niacinamide-Barrier-Moisture-Gel-Cream-30g-i.201869466.7654321098',
    },
    {
      image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=600&fit=crop&auto=format',
      title: 'Emina Bright Stuff Moisturizing Cream 20ml',
      category: 'moisturizer',
      rating: 8.4,
      priceMin: 25_000,
      priceMax: 35_000,
      slug: 'emina-bright-stuff-cream',
      affiliateUrl: 'https://shopee.co.id/Emina-Bright-Stuff-Moisturizing-Cream-20ml-i.14728364.5678901234',
    },
    {
      image: 'https://images.unsplash.com/photo-1519415943484-9fa1873496d4?w=600&h=600&fit=crop&auto=format',
      title: 'Wardah Aloe Vera Gel 100ml',
      category: 'moisturizer',
      rating: 8.6,
      priceMin: 29_000,
      priceMax: 45_000,
      slug: 'wardah-aloe-vera-gel',
      affiliateUrl: 'https://shopee.co.id/Wardah-Aloe-Vera-Gel-100ml-i.4829173.6789012345',
    },
    {
      image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&h=600&fit=crop&auto=format',
      title: 'Bio Beauty Lab Collagen Moisturizer 30g',
      category: 'moisturizer',
      rating: 8.8,
      priceMin: 89_000,
      priceMax: 115_000,
      slug: 'bio-beauty-lab-collagen',
      affiliateUrl: 'https://shopee.co.id/Bio-Beauty-Lab-Collagen-Series-Moisturizer-30g-i.28193746.7890123456',
    },
  ],
  sunscreen: [
    {
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=600&fit=crop&auto=format',
      title: 'Azarine Hydrasoothe Sunscreen Gel SPF45 PA++++',
      category: 'sunscreen',
      rating: 9.4,
      priceMin: 49_000,
      priceMax: 69_000,
      slug: 'azarine-hydrasoothe-spf45',
      affiliateUrl: 'https://shopee.co.id/Azarine-Hydrasoothe-Sunscreen-Gel-SPF45-PA-50ml-i.138273726.3290987654',
    },
    {
      image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&h=600&fit=crop&auto=format',
      title: 'Skintific Aqua Light Mineral Sunscreen SPF50+ PA++++',
      category: 'sunscreen',
      rating: 9.0,
      priceMin: 89_000,
      priceMax: 119_000,
      slug: 'skintific-mineral-spf50',
      affiliateUrl: 'https://shopee.co.id/Skintific-Aqua-Light-Mineral-Sunscreen-SPF50-30g-i.201869466.8901234567',
    },
    {
      image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=600&fit=crop&auto=format',
      title: 'Wardah UV Shield Sunscreen SPF30 PA+++',
      category: 'sunscreen',
      rating: 8.5,
      priceMin: 35_000,
      priceMax: 55_000,
      slug: 'wardah-uv-shield-spf30',
      affiliateUrl: 'https://shopee.co.id/Wardah-UV-Shield-Essential-Sunscreen-SPF30-PA-40ml-i.4829173.9012345678',
    },
  ],
  cleanser: [
    {
      image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&h=600&fit=crop&auto=format',
      title: 'Cetaphil Gentle Skin Cleanser 250ml',
      category: 'cleanser',
      rating: 9.2,
      priceMin: 89_000,
      priceMax: 119_000,
      slug: 'cetaphil-gentle-cleanser',
      affiliateUrl: 'https://shopee.co.id/Cetaphil-Gentle-Skin-Cleanser-250ml-i.43291847.0123456789',
    },
    {
      image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&h=600&fit=crop&auto=format',
      title: 'Hada Labo Gokujyun Hyaluronic Acid Face Wash',
      category: 'cleanser',
      rating: 9.0,
      priceMin: 79_000,
      priceMax: 109_000,
      slug: 'hada-labo-hydrating-cleanser',
      affiliateUrl: 'https://shopee.co.id/Hada-Labo-Gokujyun-Hyaluronic-Acid-Face-Wash-100g-i.19283746.1234509876',
    },
    {
      image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=600&fit=crop&auto=format',
      title: 'Emina Bright Stuff Face Wash 100ml',
      category: 'cleanser',
      rating: 8.3,
      priceMin: 22_000,
      priceMax: 32_000,
      slug: 'emina-bright-stuff-facewash',
      affiliateUrl: 'https://shopee.co.id/Emina-Bright-Stuff-Face-Wash-100ml-i.14728364.2345610987',
    },
  ],
  toner: [
    {
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=600&fit=crop&auto=format',
      title: 'Somethinc AHA BHA PHA Toner 2% 100ml',
      category: 'toner',
      rating: 8.8,
      priceMin: 115_000,
      priceMax: 145_000,
      slug: 'somethinc-aha-bha-toner',
      affiliateUrl: 'https://shopee.co.id/Somethinc-AHA-BHA-PHA-Toner-2-100ml-i.138273726.3456721098',
    },
    {
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=600&fit=crop&auto=format',
      title: 'Skintific Mugwort Pore Toner 100ml',
      category: 'toner',
      rating: 8.9,
      priceMin: 89_000,
      priceMax: 119_000,
      slug: 'skintific-mugwort-toner',
      affiliateUrl: 'https://shopee.co.id/Skintific-Mugwort-Pore-Toner-100ml-i.201869466.4567832109',
    },
    {
      image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&h=600&fit=crop&auto=format',
      title: 'Dear Me Beauty Barrier Booster Toner 100ml',
      category: 'toner',
      rating: 8.6,
      priceMin: 99_000,
      priceMax: 129_000,
      slug: 'dear-me-barrier-toner',
      affiliateUrl: 'https://shopee.co.id/Dear-Me-Beauty-Barrier-Booster-Toner-100ml-i.63829174.5678943210',
    },
  ],
  eyecare: [
    {
      image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&h=600&fit=crop&auto=format',
      title: 'Skintific Vitamin C Brightening Eye Cream 20g',
      category: 'eyecare',
      rating: 8.7,
      priceMin: 109_000,
      priceMax: 139_000,
      slug: 'skintific-vit-c-eye-cream',
      affiliateUrl: 'https://shopee.co.id/Skintific-Vitamin-C-Eye-Cream-20g-i.201869466.6789054321',
    },
    {
      image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=600&fit=crop&auto=format',
      title: 'Garnier Bright Complete Vitamin C Eye Cream',
      category: 'eyecare',
      rating: 8.4,
      priceMin: 65_000,
      priceMax: 89_000,
      slug: 'garnier-bright-eye-cream',
      affiliateUrl: 'https://shopee.co.id/Garnier-Bright-Complete-Vitamin-C-Eye-Cream-15ml-i.7291847.7890165432',
    },
  ],
  bodycare: [
    {
      image: 'https://images.unsplash.com/photo-1570213489059-0aac6626cade?w=600&h=600&fit=crop&auto=format',
      title: 'Scarlett Whitening Shower Scrub 300ml',
      category: 'bodycare',
      rating: 9.1,
      priceMin: 55_000,
      priceMax: 79_000,
      slug: 'scarlett-shower-scrub',
      affiliateUrl: 'https://shopee.co.id/Scarlett-Whitening-Shower-Scrub-300ml-i.77382617.8901276543',
    },
  ],
}

// ── Helpers ────────────────────────────────────────────────────────────────

function mapProduct(p: {
  image: string
  title: string
  categorySlug: string
  rating: number
  priceMin: number
  priceMax: number | null
  slug: string
  affiliateUrl: string
}): ProductCardProps {
  return {
    image: p.image,
    title: p.title,
    category: p.categorySlug as CategorySlug,
    rating: p.rating,
    priceMin: p.priceMin,
    priceMax: p.priceMax ?? undefined,
    slug: p.slug,
    affiliateUrl: p.affiliateUrl,
  }
}

// ── Queries ────────────────────────────────────────────────────────────────

export async function getTrendingProducts(): Promise<ProductCardProps[]> {
  try {
    const products = await prisma.product.findMany({
      where: { trending: true },
      orderBy: { createdAt: 'desc' },
      take: 3,
    })
    return products.length > 0 ? products.map(mapProduct) : TRENDING_FALLBACK
  } catch {
    return TRENDING_FALLBACK
  }
}

export async function getProductsByCategory(
  slug: string,
): Promise<ProductCardProps[]> {
  try {
    const products = await prisma.product.findMany({
      where: { categorySlug: slug },
      orderBy: { createdAt: 'desc' },
    })
    const fallback = CATEGORY_FALLBACK[slug as CategorySlug] ?? []
    return products.length > 0 ? products.map(mapProduct) : fallback
  } catch {
    return CATEGORY_FALLBACK[slug as CategorySlug] ?? []
  }
}
```

- [ ] **Step 2: Commit**

```bash
cd "/Users/wayanrane/Library/CloudStorage/BeeStation-TristanArshaBeeStation/36. AFFILIATE WEBSITE/titippilih" && git add lib/db/products.ts && git commit -m "feat: replace product fallback data with 20 skincare products"
```

---

## Task 4: Data Layer — Skincare Reviews

**Files:**
- Modify: `lib/db/reviews.ts`

- [ ] **Step 1: Replace REVIEWS_FALLBACK dengan 8 skincare reviews**

Replace ONLY the `REVIEWS_FALLBACK` array (lines 24–212 in current file). Keep `ReviewData` interface, `generateFallback`, `mapReview`, and all query functions unchanged.

```ts
const REVIEWS_FALLBACK: ReviewData[] = [
  {
    slug: 'azarine-hydrasoothe-spf45',
    title: 'Azarine Hydrasoothe Sunscreen SPF45 PA++++',
    category: 'sunscreen',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=1200&h=675&fit=crop&auto=format',
    rating: 9.4,
    priceMin: 49_000,
    priceMax: 69_000,
    affiliateUrl: 'https://shopee.co.id/Azarine-Hydrasoothe-Sunscreen-Gel-SPF45-PA-50ml-i.138273726.3290987654',
    kurator: 'Maya Putri',
    tanggal: '5 Mei 2026',
    estimasiBaca: 8,
    pros: [
      'Tekstur gel ringan tidak lengket, nyaman dipakai di iklim tropis Indonesia',
      'SPF45 PA++++ memberikan perlindungan UV sangat baik untuk aktivitas harian',
      'Tidak meninggalkan white cast, cocok untuk semua warna kulit Indonesia',
      'Formula Hydrasoothe menjaga kelembaban kulit sepanjang hari',
      'Harga sangat terjangkau untuk kualitas perlindungan UV-nya',
    ],
    cons: [
      'Kandungan alkohol bisa kurang cocok untuk kulit sensitif ekstrem',
      'Perlu reapply setiap 2-3 jam untuk perlindungan optimal',
      'Packaging pump rentan tersumbat jika tidak dibersihkan setelah pemakaian',
    ],
  },
  {
    slug: 'skintific-barrier-cream',
    title: 'Skintific 5% Niacinamide Barrier Moisture Gel Cream',
    category: 'moisturizer',
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=1200&h=675&fit=crop&auto=format',
    rating: 9.3,
    priceMin: 119_000,
    priceMax: 149_000,
    affiliateUrl: 'https://shopee.co.id/Skintific-5-Niacinamide-Barrier-Moisture-Gel-Cream-30g-i.201869466.7654321098',
    kurator: 'Maya Putri',
    tanggal: '3 Mei 2026',
    estimasiBaca: 9,
    pros: [
      '5% Niacinamide efektif meratakan warna kulit dalam 2-4 minggu pemakaian rutin',
      'Formula gel ringan cocok untuk kulit berminyak dan kombinasi iklim Indonesia',
      'Memperkuat skin barrier, mengurangi kemerahan dan iritasi kulit',
      'Paraben-free, cruelty-free, cocok untuk kulit sensitif sekalipun',
      'Harga kompetitif untuk kandungan aktif Niacinamide 5% yang efektif',
    ],
    cons: [
      'Jar packaging kurang higienis dibanding tube untuk mencegah kontaminasi',
      'Efek brightening terasa baru muncul setelah konsisten 3-4 minggu',
      'Ukuran 30g cukup kecil untuk pemakaian 2x sehari di wajah + leher',
    ],
  },
  {
    slug: 'somethinc-niacinamide-serum',
    title: 'Somethinc Niacinamide + Moisture Beet Serum 20ml',
    category: 'serum',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=1200&h=675&fit=crop&auto=format',
    rating: 9.1,
    priceMin: 89_000,
    priceMax: 159_000,
    affiliateUrl: 'https://shopee.co.id/Somethinc-Niacinamide-Moisture-Beet-Serum-20ml-i.138273726.2345678901',
    kurator: 'Sari Indah',
    tanggal: '1 Mei 2026',
    estimasiBaca: 10,
    pros: [
      'Kombinasi Niacinamide + Moisture Beet Extract memberikan hidrasi intensif',
      'Tekstur serum ringan menyerap cepat tanpa meninggalkan rasa lengket',
      'Terlihat perbedaan cerah dan lembab dalam 1-2 minggu pemakaian',
      'Formula BPOM Indonesia, aman untuk kulit ibu hamil dan menyusui',
      'Brand lokal Indonesia dengan transparansi kandungan yang baik',
    ],
    cons: [
      'Kandungan Niacinamide 10% bisa terlalu kuat untuk kulit sangat sensitif pertama kali',
      'Harga varian 40ml cukup mahal dibanding kompetitor dengan kandungan serupa',
      'Dropper packaging rentan kontaminasi jika kurang berhati-hati',
    ],
  },
  {
    slug: 'cetaphil-gentle-cleanser',
    title: 'Cetaphil Gentle Skin Cleanser 250ml',
    category: 'cleanser',
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=1200&h=675&fit=crop&auto=format',
    rating: 9.2,
    priceMin: 89_000,
    priceMax: 119_000,
    affiliateUrl: 'https://shopee.co.id/Cetaphil-Gentle-Skin-Cleanser-250ml-i.43291847.0123456789',
    kurator: 'Sari Indah',
    tanggal: '28 April 2026',
    estimasiBaca: 7,
    pros: [
      'Formula ultra-lembut yang direkomendasikan dermatologis untuk kulit sensitif',
      'Tidak mengandung sabun (soap-free), tidak membuat kulit terasa tight setelah cuci muka',
      'pH-balanced, menjaga skin barrier tetap sehat dan tidak terganggu',
      'Bisa digunakan tanpa air — cocok untuk double cleansing step pertama',
      'Hypoallergenic, aman untuk kulit eksim, rosacea, dan post-treatment',
    ],
    cons: [
      'Tidak efektif untuk membersihkan makeup tebal atau sunscreen fisik',
      'Beberapa pengguna merasa terlalu ringan dan tidak memberikan rasa bersih maksimal',
      'Harga lebih tinggi dibanding cleanser lokal dengan klaim serupa',
    ],
  },
  {
    slug: 'somethinc-aha-bha-toner',
    title: 'Somethinc AHA BHA PHA Toner 2% 100ml',
    category: 'toner',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&h=675&fit=crop&auto=format',
    rating: 8.8,
    priceMin: 115_000,
    priceMax: 145_000,
    affiliateUrl: 'https://shopee.co.id/Somethinc-AHA-BHA-PHA-Toner-2-100ml-i.138273726.3456721098',
    kurator: 'Maya Putri',
    tanggal: '25 April 2026',
    estimasiBaca: 9,
    pros: [
      'Kombinasi AHA+BHA+PHA memberikan eksfoliasi berlapis tanpa iritasi berlebihan',
      'PHA (Polyhydroxy Acid) lebih lembut dari AHA/BHA, cocok untuk kulit sensitif',
      'Mengecilkan pori yang terlihat secara nyata setelah 2-3 minggu pemakaian rutin',
      'Tekstur air ringan, langsung menyerap tanpa bekas lengket',
      'Harga terjangkau untuk kandungan chemical exfoliant triple-acid',
    ],
    cons: [
      'Harus pakai sunscreen WAJIB pagi hari karena meningkatkan sensitivitas UV',
      'Tidak boleh dikombinasikan dengan Retinol atau Vitamin C direct dalam satu routine',
      'Perlu period adjustment 1-2 minggu, kulit bisa sedikit purging di awal',
    ],
  },
  {
    slug: 'scarlett-brightening-serum',
    title: 'Scarlett Whitening Brightening Serum Vit C 40ml',
    category: 'serum',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=1200&h=675&fit=crop&auto=format',
    rating: 8.9,
    priceMin: 55_000,
    priceMax: 85_000,
    affiliateUrl: 'https://shopee.co.id/Scarlett-Whitening-Brightening-Serum-40ml-i.77382617.3456789012',
    kurator: 'Sari Indah',
    tanggal: '22 April 2026',
    estimasiBaca: 8,
    pros: [
      'Vitamin C stable dengan kandungan Niacinamide yang saling memperkuat efek brightening',
      'Harga sangat terjangkau untuk serum brightening brand lokal dengan kualitas terbukti',
      'Formula lightweight tidak menyumbat pori, cocok untuk kulit berminyak Indonesia',
      'Efek cerah terasa dalam 2-3 minggu, beda tone skin jelas terlihat',
      'Bottle packaging 40ml lebih value for money dibanding kompetitor lokal',
    ],
    cons: [
      'Kandungan wangi bunga bisa kurang cocok untuk kulit sangat sensitif',
      'Tidak mengandung Hyaluronic Acid — kurang cocok jika kulit sedang sangat kering',
      'Efek whitening bervariasi tergantung tone dan kondisi kulit masing-masing',
    ],
  },
  {
    slug: 'azarine-vs-skintific-sunscreen',
    title: 'Azarine vs Skintific Sunscreen: Mana Lebih Bagus?',
    category: 'sunscreen',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=1200&h=675&fit=crop&auto=format',
    rating: 9.0,
    priceMin: 49_000,
    priceMax: 119_000,
    affiliateUrl: 'https://shopee.co.id/Azarine-Hydrasoothe-Sunscreen-Gel-SPF45-PA-50ml-i.138273726.3290987654',
    kurator: 'Maya Putri',
    tanggal: '18 April 2026',
    estimasiBaca: 11,
    pros: [
      'Perbandingan langsung dua sunscreen terlaris Indonesia berdasarkan test 30 hari nyata',
      'Mencakup pengujian white cast, finish (matte vs dewy), longevity, dan harga per ml',
      'Panduan memilih berdasarkan tipe kulit: berminyak, kering, kombinasi, sensitif',
      'Rekomendasi final jelas dengan reasoning — bukan review pagar',
    ],
    cons: [
      'Hasil bisa berbeda tergantung tone kulit dan kondisi cuaca masing-masing daerah',
      'Harga bisa berubah saat promo Shopee — selalu cek link di sidebar untuk harga terkini',
    ],
  },
  {
    slug: 'panduan-serum-pemula',
    title: 'Panduan Lengkap Serum untuk Pemula Skincare',
    category: 'serum',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=1200&h=675&fit=crop&auto=format',
    rating: 9.2,
    priceMin: 55_000,
    priceMax: 200_000,
    affiliateUrl: 'https://shopee.co.id/Somethinc-Niacinamide-Moisture-Beet-Serum-20ml-i.138273726.2345678901',
    kurator: 'Sari Indah',
    tanggal: '15 April 2026',
    estimasiBaca: 13,
    pros: [
      'Panduan langkah demi langkah untuk pemula yang belum pernah pakai serum',
      'Penjelasan kandungan aktif: Niacinamide, Vit C, Retinol, Hyaluronic Acid — kapan pakainya',
      'Rekomendasi 5 serum starter di bawah Rp 100.000 yang sudah terbukti efektif',
      'Tips layering serum yang benar agar tidak inaktivasi kandungan aktif',
    ],
    cons: [
      'Setiap kulit berbeda — hasil tidak bisa dijamin sama persis untuk semua orang',
      'Perlu konsistensi minimal 4-8 minggu untuk melihat hasil signifikan',
    ],
  },
]
```

- [ ] **Step 2: Commit**

```bash
cd "/Users/wayanrane/Library/CloudStorage/BeeStation-TristanArshaBeeStation/36. AFFILIATE WEBSITE/titippilih" && git add lib/db/reviews.ts && git commit -m "feat: replace review fallback data with 8 skincare reviews"
```

---

## Task 5: Navigation — Navbar & Footer

**Files:**
- Modify: `components/layout/Navbar.tsx`
- Modify: `components/layout/Footer.tsx`

- [ ] **Step 1: Update Navbar.tsx — skincare links + light mode styles**

Replace the entire `components/layout/Navbar.tsx`:

```tsx
'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Menu, Search } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import type { CategorySlug } from '@/types'

const kategoriLinks: { label: string; slug: CategorySlug }[] = [
  { label: 'Serum', slug: 'serum' },
  { label: 'Moisturizer', slug: 'moisturizer' },
  { label: 'Sunscreen', slug: 'sunscreen' },
  { label: 'Pembersih', slug: 'cleanser' },
  { label: 'Toner', slug: 'toner' },
  { label: 'Perawatan Mata', slug: 'eyecare' },
  { label: 'Body Care', slug: 'bodycare' },
]

const navLinks = [
  { label: 'Transparansi Donasi', href: '/donasi' },
  { label: 'Tentang Kami', href: '/tentang' },
]

export function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled
          ? 'backdrop-blur-md bg-white/80 border-b border-rose-100 shadow-sm'
          : 'bg-transparent'
      )}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center font-bold text-xl shrink-0">
          <span className="text-foreground">Titip</span>
          <span className="text-primary">Pilih</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          <div className="relative group">
            <button
              className={cn(
                'text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1',
                pathname.startsWith('/kategori') && 'text-primary font-semibold'
              )}
            >
              Skincare
              <svg
                className="w-3 h-3 transition-transform group-hover:rotate-180"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-rose-100 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50 p-2">
              {kategoriLinks.map((k) => (
                <Link
                  key={k.slug}
                  href={`/kategori/${k.slug}`}
                  className="block px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-rose-50 transition-colors"
                >
                  {k.label}
                </Link>
              ))}
            </div>
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-sm font-medium text-muted-foreground hover:text-foreground transition-colors',
                pathname === link.href && 'text-primary font-semibold'
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop right */}
        <div className="hidden md:flex items-center gap-3">
          <button
            className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-rose-50"
            aria-label="Cari produk"
          >
            <Search size={18} />
          </button>
          <Link
            href="/kategori/serum"
            className="inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-white rounded-lg text-sm font-semibold px-4 h-8 transition-colors"
          >
            Mulai Jelajah
          </Link>
        </div>

        {/* Mobile hamburger */}
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-rose-50"
            aria-label="Buka menu navigasi"
          >
            <Menu size={22} />
          </SheetTrigger>
          <SheetContent
            side="left"
            showCloseButton={false}
            className="w-72 bg-white border-r border-rose-100 p-0"
          >
            <div className="p-6 flex flex-col gap-6 h-full">
              <Link
                href="/"
                className="font-bold text-xl"
                onClick={() => setSheetOpen(false)}
              >
                <span className="text-foreground">Titip</span>
                <span className="text-primary">Pilih</span>
              </Link>

              <div className="flex flex-col gap-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1 px-3">
                  Skincare
                </p>
                {kategoriLinks.map((k) => (
                  <Link
                    key={k.slug}
                    href={`/kategori/${k.slug}`}
                    onClick={() => setSheetOpen(false)}
                    className={cn(
                      'px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-rose-50 transition-colors',
                      pathname === `/kategori/${k.slug}` &&
                        'text-primary font-semibold bg-rose-50'
                    )}
                  >
                    {k.label}
                  </Link>
                ))}
              </div>

              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setSheetOpen(false)}
                    className={cn(
                      'px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-rose-50 transition-colors',
                      pathname === link.href &&
                        'text-primary font-semibold bg-rose-50'
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <Link
                href="/kategori/serum"
                onClick={() => setSheetOpen(false)}
                className="inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-white rounded-lg text-sm font-semibold px-4 h-9 transition-colors w-full mt-auto"
              >
                Mulai Jelajah
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}
```

- [ ] **Step 2: Update Footer.tsx — skincare categories + light mode styles**

Replace the `kategoriLinks` array at the top of `components/layout/Footer.tsx` and update dark-mode classes:

```tsx
import Link from 'next/link'
import { X, Camera, Music2 } from 'lucide-react'
import { formatRupiah } from '@/lib/utils'

const kategoriLinks = [
  { label: 'Serum', slug: 'serum' },
  { label: 'Moisturizer', slug: 'moisturizer' },
  { label: 'Sunscreen', slug: 'sunscreen' },
  { label: 'Pembersih', slug: 'cleanser' },
  { label: 'Toner', slug: 'toner' },
  { label: 'Perawatan Mata', slug: 'eyecare' },
  { label: 'Body Care', slug: 'bodycare' },
]

const halamanLinks = [
  { label: 'Beranda', href: '/' },
  { label: 'Transparansi Donasi', href: '/donasi' },
  { label: 'Tentang Kami', href: '/tentang' },
]

const legalLinks = [
  { label: 'Kebijakan Privasi', href: '/privasi' },
  { label: 'Syarat & Ketentuan', href: '/syarat' },
  { label: 'Disclosure Afiliasi', href: '/disclosure' },
]

const totalDonasi = 12_450_000

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="flex flex-col gap-4">
            <Link href="/" className="font-bold text-2xl">
              <span className="text-foreground">Titip</span>
              <span className="text-primary">Pilih</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Review skincare jujur dari kurator terpercaya. Setiap pembelian
              melalui link kami berkontribusi untuk sesama.
            </p>
            <div className="mt-2">
              <p className="text-xs text-muted-foreground mb-1">Total donasi tersalurkan</p>
              <p className="text-lg font-bold text-secondary">
                {formatRupiah(totalDonasi)}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold text-foreground uppercase tracking-wider">
                Skincare
              </p>
              <ul className="flex flex-col gap-2">
                {kategoriLinks.map((k) => (
                  <li key={k.slug}>
                    <Link
                      href={`/kategori/${k.slug}`}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {k.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold text-foreground uppercase tracking-wider">
                Halaman
              </p>
              <ul className="flex flex-col gap-2">
                {halamanLinks.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold text-foreground uppercase tracking-wider">
                Legal
              </p>
              <ul className="flex flex-col gap-2">
                {legalLinks.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center gap-3 mt-2">
              <a href="https://twitter.com/titippilih" target="_blank" rel="noopener noreferrer"
                className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-rose-50"
                aria-label="TitipPilih di Twitter/X">
                <X size={18} />
              </a>
              <a href="https://instagram.com/titippilih" target="_blank" rel="noopener noreferrer"
                className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-rose-50"
                aria-label="TitipPilih di Instagram">
                <Camera size={18} />
              </a>
              <a href="https://tiktok.com/@titippilih" target="_blank" rel="noopener noreferrer"
                className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-rose-50"
                aria-label="TitipPilih di TikTok">
                <Music2 size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© 2026 TitipPilih. Dibuat dengan ♥ untuk Indonesia.</p>
          <p>
            Website ini mengandung link afiliasi.{' '}
            <Link href="/disclosure" className="hover:text-foreground transition-colors underline underline-offset-2">
              Selengkapnya
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 3: Commit**

```bash
cd "/Users/wayanrane/Library/CloudStorage/BeeStation-TristanArshaBeeStation/36. AFFILIATE WEBSITE/titippilih" && git add components/layout/Navbar.tsx components/layout/Footer.tsx && git commit -m "feat: update navbar/footer with skincare categories and light mode styles"
```

---

## Task 6: HeroSection Beauty Redesign

**Files:**
- Modify: `components/home/HeroSection.tsx`

- [ ] **Step 1: Redesign HeroSection dengan beauty aesthetic**

Replace the entire `components/home/HeroSection.tsx`:

```tsx
import Link from 'next/link'
import Image from 'next/image'
import { Heart, Star, ShieldCheck } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-rose-50 via-background to-orange-50/30">
      {/* Decorative blob shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-rose-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-100/30 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left — text content */}
          <div className="flex flex-col gap-6">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 bg-white/80 border border-rose-100 rounded-full px-4 py-1.5 w-fit shadow-sm">
              <ShieldCheck size={14} className="text-primary" />
              <span className="text-xs font-semibold text-foreground">Review Jujur ✓ Dermatologis Approved</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              Skincare{' '}
              <span className="text-primary italic">Terpercaya</span>
              {', '}
              <br className="hidden sm:block" />
              Harga{' '}
              <span className="text-primary italic">Bersahabat</span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
              Kurator kami test langsung di kulit Indonesia — rekomendasi
              jujur tanpa bias brand. Sebagian komisi untuk donasi sosial
              yang transparan.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/kategori/serum"
                className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
              >
                Lihat Review Skincare
              </Link>
              <Link
                href="/donasi"
                className="px-6 py-3 border border-secondary text-secondary font-semibold rounded-lg hover:bg-secondary/10 transition-colors"
              >
                Cara Kerja Donasi
              </Link>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Heart size={15} className="text-primary fill-primary shrink-0" />
              <span>
                Sudah{' '}
                <strong className="text-foreground">83 orang</strong>{' '}
                terbantu dari komisi affiliate bulan ini
              </span>
            </div>
          </div>

          {/* Right — featured product card */}
          <div className="hidden md:flex items-center justify-center">
            <div className="relative w-full max-w-sm">
              {/* Outer glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 via-secondary/10 to-orange-200/20 blur-2xl" />

              <Link
                href="/review/azarine-hydrasoothe-spf45"
                className="relative block rounded-3xl border border-rose-100 bg-white overflow-hidden hover:border-primary/40 transition-all duration-300 shadow-lg hover:shadow-xl group"
              >
                <div className="relative w-full aspect-video bg-gradient-to-br from-rose-50 to-orange-50">
                  <Image
                    src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=700&h=394&fit=crop&auto=format"
                    alt="Azarine Hydrasoothe Sunscreen SPF45"
                    fill
                    sizes="(max-width: 768px) 0px, 384px"
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                    priority
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-primary text-white text-xs font-semibold rounded-full shadow-sm">
                    🔥 Terlaris
                  </span>
                </div>

                <div className="p-5 flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">Sunscreen</p>
                      <h3 className="font-bold text-foreground text-base leading-snug group-hover:text-primary transition-colors">
                        Azarine Hydrasoothe SPF45 PA++++
                      </h3>
                    </div>
                    <div className="flex flex-col items-end shrink-0">
                      <span className="text-2xl font-bold text-secondary">9.4</span>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={10}
                            className="fill-primary text-primary"
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-foreground font-semibold">
                    Mulai{' '}
                    <span className="text-primary">Rp 49.000</span>
                  </p>

                  <div className="flex items-center gap-2 pt-1 border-t border-rose-50">
                    <Heart size={12} className="text-secondary fill-secondary shrink-0" />
                    <p className="text-xs text-muted-foreground">
                      Sebagian komisi untuk donasi sosial
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
cd "/Users/wayanrane/Library/CloudStorage/BeeStation-TristanArshaBeeStation/36. AFFILIATE WEBSITE/titippilih" && git add components/home/HeroSection.tsx && git commit -m "feat: beauty redesign HeroSection with skincare focus"
```

---

## Task 7: KategoriGrid — Skincare Sub-Categories

**Files:**
- Modify: `components/home/KategoriGrid.tsx`

- [ ] **Step 1: Update KategoriGrid dengan 7 skincare sub-categories**

Replace the entire `components/home/KategoriGrid.tsx`:

```tsx
import Link from 'next/link'
import {
  Droplets,
  Leaf,
  Sun,
  Waves,
  FlaskConical,
  Eye,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'
import type { CategorySlug } from '@/types'

interface CategoryItem {
  slug: CategorySlug
  label: string
  icon: LucideIcon
  color: string
  bg: string
  border: string
}

const categories: CategoryItem[] = [
  {
    slug: 'serum',
    label: 'Serum',
    icon: Droplets,
    color: 'text-rose-500',
    bg: 'bg-rose-50 hover:bg-rose-100',
    border: 'border-rose-200 hover:border-rose-300',
  },
  {
    slug: 'moisturizer',
    label: 'Moisturizer',
    icon: Leaf,
    color: 'text-emerald-500',
    bg: 'bg-emerald-50 hover:bg-emerald-100',
    border: 'border-emerald-200 hover:border-emerald-300',
  },
  {
    slug: 'sunscreen',
    label: 'Sunscreen',
    icon: Sun,
    color: 'text-amber-500',
    bg: 'bg-amber-50 hover:bg-amber-100',
    border: 'border-amber-200 hover:border-amber-300',
  },
  {
    slug: 'cleanser',
    label: 'Pembersih',
    icon: Waves,
    color: 'text-sky-500',
    bg: 'bg-sky-50 hover:bg-sky-100',
    border: 'border-sky-200 hover:border-sky-300',
  },
  {
    slug: 'toner',
    label: 'Toner',
    icon: FlaskConical,
    color: 'text-violet-500',
    bg: 'bg-violet-50 hover:bg-violet-100',
    border: 'border-violet-200 hover:border-violet-300',
  },
  {
    slug: 'eyecare',
    label: 'Mata',
    icon: Eye,
    color: 'text-pink-500',
    bg: 'bg-pink-50 hover:bg-pink-100',
    border: 'border-pink-200 hover:border-pink-300',
  },
  {
    slug: 'bodycare',
    label: 'Body Care',
    icon: Sparkles,
    color: 'text-orange-500',
    bg: 'bg-orange-50 hover:bg-orange-100',
    border: 'border-orange-200 hover:border-orange-300',
  },
]

export function KategoriGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-2xl font-bold text-foreground mb-6">
        Kategori <span className="text-primary">Skincare</span>
      </h2>

      <div className="flex gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-7 md:overflow-visible">
        {categories.map((cat) => {
          const Icon = cat.icon
          return (
            <Link
              key={cat.slug}
              href={`/kategori/${cat.slug}`}
              className={`flex flex-col items-center gap-2.5 p-4 rounded-xl border transition-all duration-200 min-w-[88px] md:min-w-0 ${cat.bg} ${cat.border}`}
            >
              <Icon size={26} className={cat.color} />
              <span className={`text-xs font-semibold ${cat.color} whitespace-nowrap`}>
                {cat.label}
              </span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
cd "/Users/wayanrane/Library/CloudStorage/BeeStation-TristanArshaBeeStation/36. AFFILIATE WEBSITE/titippilih" && git add components/home/KategoriGrid.tsx && git commit -m "feat: KategoriGrid skincare sub-categories with beauty colors"
```

---

## Task 8: Content Sections — Trending & Artikel

**Files:**
- Modify: `components/home/TrendingSection.tsx`
- Modify: `components/home/ArtikelTerbaru.tsx`

- [ ] **Step 1: Update TrendingSection — fix links ke skincare**

Replace the entire `components/home/TrendingSection.tsx`:

```tsx
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ProductCard } from '@/components/kategori/ProductCard'
import type { ProductCardProps } from '@/types'

interface TrendingSectionProps {
  products: ProductCardProps[]
}

export function TrendingSection({ products }: TrendingSectionProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">
          Trending <span className="text-primary">Pekan Ini</span>
        </h2>
        <Link
          href="/kategori/serum"
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          Lihat Semua
          <ArrowRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {products.map((product) => (
          <ProductCard key={product.slug} {...product} />
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Update ArtikelTerbaru — fix picsum + update link + update ArticlePreview usage**

Replace the entire `components/home/ArtikelTerbaru.tsx`:

```tsx
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Clock, User } from 'lucide-react'
import { CategoryBadge } from '@/components/shared/CategoryBadge'
import type { ArticlePreview } from '@/types'

// Fallback image per category for articles that don't have an image
const categoryImages: Record<string, string> = {
  serum: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&h=450&fit=crop&auto=format',
  moisturizer: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&h=450&fit=crop&auto=format',
  sunscreen: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&h=450&fit=crop&auto=format',
  cleanser: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&h=450&fit=crop&auto=format',
  toner: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=450&fit=crop&auto=format',
  eyecare: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&h=450&fit=crop&auto=format',
  bodycare: 'https://images.unsplash.com/photo-1570213489059-0aac6626cade?w=800&h=450&fit=crop&auto=format',
}

function ArticleCard({ slug, title, category, image, kurator, estimasiBaca }: ArticlePreview) {
  const imgSrc = image || categoryImages[category] || categoryImages['serum']

  return (
    <Link
      href={`/review/${slug}`}
      className="group flex flex-col bg-card border border-border rounded-xl overflow-hidden hover:border-primary/40 transition-all duration-200 hover:shadow-md"
    >
      <div className="relative aspect-video">
        <Image
          src={imgSrc}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-4 flex flex-col gap-2 flex-1">
        <CategoryBadge category={category} />

        <h3 className="font-semibold text-foreground text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>

        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-auto pt-1">
          <span className="flex items-center gap-1">
            <User size={11} />
            {kurator}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={11} />
            {estimasiBaca} menit
          </span>
        </div>
      </div>
    </Link>
  )
}

interface ArtikelTerbaruProps {
  articles: ArticlePreview[]
}

export function ArtikelTerbaru({ articles }: ArtikelTerbaruProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">
          Artikel <span className="text-primary">Terbaru</span>
        </h2>
        <Link
          href="/kategori/serum"
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          Selengkapnya
          <ArrowRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {articles.map((article) => (
          <ArticleCard key={article.slug} {...article} />
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Commit**

```bash
cd "/Users/wayanrane/Library/CloudStorage/BeeStation-TristanArshaBeeStation/36. AFFILIATE WEBSITE/titippilih" && git add components/home/TrendingSection.tsx components/home/ArtikelTerbaru.tsx && git commit -m "fix: remove picsum.photos from ArtikelTerbaru, update trending links to skincare"
```

---

## Task 9: Shared Components — CategoryBadge

**Files:**
- Modify: `components/shared/CategoryBadge.tsx`

- [ ] **Step 1: Update CategoryBadge dengan skincare slugs**

Replace the entire `components/shared/CategoryBadge.tsx`:

```tsx
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { CategorySlug } from '@/types'

const categoryColors: Record<CategorySlug, string> = {
  serum: 'bg-rose-100 text-rose-700 border-rose-200',
  moisturizer: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  sunscreen: 'bg-amber-100 text-amber-700 border-amber-200',
  cleanser: 'bg-sky-100 text-sky-700 border-sky-200',
  toner: 'bg-violet-100 text-violet-700 border-violet-200',
  eyecare: 'bg-pink-100 text-pink-700 border-pink-200',
  bodycare: 'bg-orange-100 text-orange-700 border-orange-200',
}

const categoryLabels: Record<CategorySlug, string> = {
  serum: 'Serum',
  moisturizer: 'Moisturizer',
  sunscreen: 'Sunscreen',
  cleanser: 'Pembersih',
  toner: 'Toner',
  eyecare: 'Perawatan Mata',
  bodycare: 'Body Care',
}

interface CategoryBadgeProps {
  category: CategorySlug
  className?: string
}

export function CategoryBadge({ category, className }: CategoryBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        'border font-medium text-xs',
        categoryColors[category],
        className
      )}
    >
      {categoryLabels[category]}
    </Badge>
  )
}
```

- [ ] **Step 2: Commit**

```bash
cd "/Users/wayanrane/Library/CloudStorage/BeeStation-TristanArshaBeeStation/36. AFFILIATE WEBSITE/titippilih" && git add components/shared/CategoryBadge.tsx && git commit -m "feat: update CategoryBadge for skincare sub-categories"
```

---

## Task 10: Review Page — Fix Foto & CategoryLabels

**Files:**
- Modify: `components/review/ArticleHeader.tsx`

- [ ] **Step 1: Fix ArticleHeader — hapus picsum fallback, update categoryLabels, fix light mode border**

Replace the entire `components/review/ArticleHeader.tsx`:

```tsx
import Link from 'next/link'
import Image from 'next/image'
import { Clock, User, ChevronRight } from 'lucide-react'
import { CategoryBadge } from '@/components/shared/CategoryBadge'
import type { CategorySlug } from '@/types'

const categoryLabels: Record<CategorySlug, string> = {
  serum: 'Serum',
  moisturizer: 'Moisturizer',
  sunscreen: 'Sunscreen',
  cleanser: 'Pembersih',
  toner: 'Toner',
  eyecare: 'Perawatan Mata',
  bodycare: 'Body Care',
}

// Fallback image per category — NO picsum.photos
const categoryHeroImages: Record<CategorySlug, string> = {
  serum: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=1200&h=675&fit=crop&auto=format',
  moisturizer: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=1200&h=675&fit=crop&auto=format',
  sunscreen: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=1200&h=675&fit=crop&auto=format',
  cleanser: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=1200&h=675&fit=crop&auto=format',
  toner: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&h=675&fit=crop&auto=format',
  eyecare: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=1200&h=675&fit=crop&auto=format',
  bodycare: 'https://images.unsplash.com/photo-1570213489059-0aac6626cade?w=1200&h=675&fit=crop&auto=format',
}

interface ArticleHeaderProps {
  title: string
  category: CategorySlug
  kurator: string
  tanggal: string
  estimasiBaca: number
  image?: string
}

export function ArticleHeader({
  title,
  category,
  kurator,
  tanggal,
  estimasiBaca,
  image,
}: ArticleHeaderProps) {
  const categoryLabel = categoryLabels[category]
  const heroImage = image || categoryHeroImages[category]

  const initials = kurator
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  const words = title.split(' ')
  const lastWord = words.pop()
  const restOfTitle = words.join(' ')

  return (
    <header className="flex flex-col gap-5">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground flex-wrap">
        <Link href="/" className="hover:text-foreground transition-colors">Beranda</Link>
        <ChevronRight size={12} />
        <Link href={`/kategori/${category}`} className="hover:text-foreground transition-colors">
          {categoryLabel}
        </Link>
        <ChevronRight size={12} />
        <span className="text-foreground line-clamp-1">{title}</span>
      </nav>

      {/* Title */}
      <div className="flex flex-col gap-3">
        <CategoryBadge category={category} />
        <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
          {restOfTitle}{' '}
          <span className="text-primary italic">{lastWord}</span>
        </h1>
      </div>

      {/* Kurator */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
          <span className="text-xs font-bold text-primary">{initials}</span>
        </div>
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2 text-sm">
            <User size={13} className="text-muted-foreground" />
            <span className="font-medium text-foreground">{kurator}</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span>{tanggal}</span>
            <span className="flex items-center gap-1">
              <Clock size={11} />
              {estimasiBaca} menit baca
            </span>
          </div>
        </div>
      </div>

      {/* Hero image — TIDAK lagi pakai picsum.photos */}
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-border">
        <Image
          src={heroImage}
          alt={title}
          fill
          sizes="(max-width: 1024px) 100vw, 65vw"
          className="object-cover"
          priority
        />
      </div>
    </header>
  )
}
```

- [ ] **Step 2: Commit**

```bash
cd "/Users/wayanrane/Library/CloudStorage/BeeStation-TristanArshaBeeStation/36. AFFILIATE WEBSITE/titippilih" && git add components/review/ArticleHeader.tsx && git commit -m "fix: eliminate picsum.photos from ArticleHeader, use category-specific skincare images"
```

---

## Task 11: Kategori Page — Metadata & KategoriContent

**Files:**
- Modify: `app/kategori/[slug]/page.tsx`
- Modify: `components/kategori/KategoriContent.tsx`

- [ ] **Step 1: Update categoryInfo di app/kategori/[slug]/page.tsx**

Replace the `categoryInfo` const (lines 6-42):

```ts
const categoryInfo: Record<string, { label: string; description: string }> = {
  serum: {
    label: 'Serum',
    description: 'Serum skincare terbaik untuk kulit cerah, lembab, dan bebas jerawat. Pilihan terpercaya untuk niacinamide, retinol, dan vitamin C.',
  },
  moisturizer: {
    label: 'Moisturizer',
    description: 'Pelembab wajah terbaik untuk menjaga hidrasi kulit dan memperkuat skin barrier sepanjang hari.',
  },
  sunscreen: {
    label: 'Sunscreen',
    description: 'Sunscreen terbaik untuk iklim tropis Indonesia — ringan, tidak lengket, dan melindungi kulit dari sinar UV setiap hari.',
  },
  cleanser: {
    label: 'Pembersih',
    description: 'Sabun cuci muka dan pembersih wajah terbaik untuk kulit bersih optimal tanpa merusak skin barrier.',
  },
  toner: {
    label: 'Toner',
    description: 'Toner skincare untuk menyeimbangkan pH kulit, mengecilkan pori, dan mempersiapkan kulit menyerap serum.',
  },
  eyecare: {
    label: 'Perawatan Mata',
    description: 'Krim mata dan produk perawatan area mata terbaik untuk mengatasi kantung mata, kerutan, dan lingkaran hitam.',
  },
  bodycare: {
    label: 'Body Care',
    description: 'Produk perawatan tubuh terbaik untuk kulit cerah, lembab, dan wangi sepanjang hari.',
  },
}
```

- [ ] **Step 2: Update subKategoriMap di components/kategori/KategoriContent.tsx**

Replace the `subKategoriMap` const (lines 13-21 di KategoriContent.tsx):

```ts
const subKategoriMap: Record<string, string[]> = {
  serum: ['Niacinamide', 'Vitamin C', 'Retinol', 'Hyaluronic Acid', 'AHA/BHA'],
  moisturizer: ['Gel Cream', 'Lotion', 'Heavy Cream', 'Sleeping Mask'],
  sunscreen: ['Chemical', 'Mineral', 'Hybrid', 'Tinted'],
  cleanser: ['Foam', 'Gel', 'Micellar Water', 'Oil Cleanser'],
  toner: ['Hydrating', 'Exfoliating', 'Brightening', 'Pore Care'],
  eyecare: ['Eye Cream', 'Eye Serum', 'Eye Mask'],
  bodycare: ['Body Lotion', 'Body Scrub', 'Body Wash', 'Body Oil'],
}
```

- [ ] **Step 3: Commit both**

```bash
cd "/Users/wayanrane/Library/CloudStorage/BeeStation-TristanArshaBeeStation/36. AFFILIATE WEBSITE/titippilih" && git add app/kategori/[slug]/page.tsx components/kategori/KategoriContent.tsx && git commit -m "feat: update kategori page and content for skincare sub-categories"
```

---

## Task 12: Build Verification & QA

**Files:** none (verification only)

- [ ] **Step 1: Run TypeScript check**

```bash
cd "/Users/wayanrane/Library/CloudStorage/BeeStation-TristanArshaBeeStation/36. AFFILIATE WEBSITE/titippilih" && npx tsc --noEmit 2>&1
```

Expected: 0 errors. If errors appear, fix them before proceeding.

- [ ] **Step 2: Run production build**

```bash
cd "/Users/wayanrane/Library/CloudStorage/BeeStation-TristanArshaBeeStation/36. AFFILIATE WEBSITE/titippilih" && npm run build 2>&1 | tail -20
```

Expected: `✓ Compiled successfully` with no errors.

- [ ] **Step 3: Start dev server dan screenshot semua halaman**

```bash
cd "/Users/wayanrane/Library/CloudStorage/BeeStation-TristanArshaBeeStation/36. AFFILIATE WEBSITE/titippilih" && npm run dev &
sleep 5
echo "Dev server started"
```

Then use Playwright to screenshot:
- `/` — homepage
- `/kategori/serum` — serum category
- `/kategori/sunscreen` — sunscreen category
- `/review/azarine-hydrasoothe-spf45` — review page
- `/donasi` — donation page

- [ ] **Step 4: Verify ZERO picsum.photos**

```bash
grep -r "picsum" "/Users/wayanrane/Library/CloudStorage/BeeStation-TristanArshaBeeStation/36. AFFILIATE WEBSITE/titippilih/components" "/Users/wayanrane/Library/CloudStorage/BeeStation-TristanArshaBeeStation/36. AFFILIATE WEBSITE/titippilih/lib" 2>/dev/null
```

Expected: No output (zero matches).

- [ ] **Step 5: Verify zero old category slugs in active code**

```bash
grep -r "'gadget'\|'fashion'\|'kesehatan'\|'travel'\|'rumah'\|'kecantikan'\|'olahraga'" "/Users/wayanrane/Library/CloudStorage/BeeStation-TristanArshaBeeStation/36. AFFILIATE WEBSITE/titippilih/components" "/Users/wayanrane/Library/CloudStorage/BeeStation-TristanArshaBeeStation/36. AFFILIATE WEBSITE/titippilih/app" "/Users/wayanrane/Library/CloudStorage/BeeStation-TristanArshaBeeStation/36. AFFILIATE WEBSITE/titippilih/lib" 2>/dev/null | grep -v "node_modules"
```

Expected: No output.

- [ ] **Step 6: Final commit**

```bash
cd "/Users/wayanrane/Library/CloudStorage/BeeStation-TristanArshaBeeStation/36. AFFILIATE WEBSITE/titippilih" && git add -A && git commit -m "feat: TitipPilih skincare pivot complete — beauty design, 20 products, 0 picsum"
```

---

## Success Criteria Checklist

- [ ] 0 TypeScript errors (`npx tsc --noEmit`)
- [ ] Build passes (`npm run build`)
- [ ] 0 `picsum.photos` references anywhere in codebase
- [ ] 0 old category slugs (gadget, fashion, etc.) in active code
- [ ] Homepage menampilkan skincare 100% (hero sunscreen, 7 sub-kategori, trending skincare)
- [ ] Semua 7 sub-kategori skincare dapat diakses (`/kategori/serum`, `/kategori/sunscreen`, dll.)
- [ ] Review page menampilkan gambar yang RELEVAN (bukan gurun pasir / foto random)
- [ ] Navbar menampilkan "Skincare" dropdown dengan 7 sub-kategori
- [ ] Website terasa seperti beauty brand (warm cream background, rose accent, Playfair headings)

---

## Note untuk Boss — Shopee Affiliate Links

Semua `affiliateUrl` saat ini adalah link Shopee langsung (bukan affiliate tracking). Untuk aktifkan komisi:

1. Buka **Shopee Affiliate** di app Shopee
2. Cari nama produk (mis: "Azarine Hydrasoothe")
3. Klik **"Buat Link Afiliasi"**
4. Copy short link (mis: `https://shope.ee/xxxxx`)
5. Replace `affiliateUrl` di `lib/db/reviews.ts` dan `lib/db/products.ts`
