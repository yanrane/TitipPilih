# TitipPilih — Skincare Pivot Design Spec
Date: 2026-05-09

## Overview

Full pivot dari 7-niche website ke **pure Skincare & Kecantikan** affiliate website.
Target: niche #1 di Shopee Indonesia, komisi 5–15%, konten TikTok/Reels-first.

---

## 1. Perubahan Kategori

### Sebelum
```
gadget | fashion | kesehatan | travel | rumah | kecantikan | olahraga
```

### Sesudah
```
serum | moisturizer | sunscreen | cleanser | toner | eyecare | bodycare
```

### Mapping File
- `types/index.ts` — update `CategorySlug` type
- `components/home/KategoriGrid.tsx` — label, icon, warna baru per sub-kategori
- `app/kategori/[slug]/page.tsx` — update `kategoriMeta` map
- `components/kategori/KategoriContent.tsx` — update `subKategoriMap`

---

## 2. Produk (20 Skincare Terlaris Shopee Indonesia)

### Serum (4 produk)
| Slug | Produk | Harga | Rating |
|---|---|---|---|
| `somethinc-niacinamide-serum` | Somethinc Niacinamide + Moisture Beet Serum 20ml | 89.000 – 159.000 | 9.1 |
| `scarlett-brightening-serum` | Scarlett Whitening Brightening Serum Vit C 40ml | 55.000 – 85.000 | 8.9 |
| `avoskin-miraculous-retinol` | Avoskin Miraculous Retinol Serum 0.1% 20ml | 179.000 – 220.000 | 8.7 |
| `garnier-bright-vit-c-serum` | Garnier Bright Complete Vitamin C Serum 30ml | 59.000 – 89.000 | 8.5 |

### Moisturizer (4 produk)
| Slug | Produk | Harga | Rating |
|---|---|---|---|
| `skintific-barrier-cream` | Skintific 5% Niacinamide Barrier Moisture Gel Cream 30g | 119.000 – 149.000 | 9.3 |
| `emina-bright-stuff-cream` | Emina Bright Stuff Moisturizing Cream 20ml | 25.000 – 35.000 | 8.4 |
| `wardah-aloe-vera-gel` | Wardah Aloe Vera Gel 100ml | 29.000 – 45.000 | 8.6 |
| `bio-beauty-lab-collagen` | Bio Beauty Lab Collagen Series Moisturizer 30g | 89.000 – 115.000 | 8.8 |

### Sunscreen (3 produk)
| Slug | Produk | Harga | Rating |
|---|---|---|---|
| `azarine-hydrasoothe-spf45` | Azarine Hydrasoothe Sunscreen Gel SPF45 PA++++ 50ml | 49.000 – 69.000 | 9.4 |
| `skintific-mineral-spf50` | Skintific Aqua Light Mineral Sunscreen SPF50+ PA++++ 30g | 89.000 – 119.000 | 9.0 |
| `wardah-uv-shield-spf30` | Wardah UV Shield Essential Sunscreen SPF30 PA+++ 40ml | 35.000 – 55.000 | 8.5 |

### Cleanser (3 produk)
| Slug | Produk | Harga | Rating |
|---|---|---|---|
| `cetaphil-gentle-cleanser` | Cetaphil Gentle Skin Cleanser 250ml | 89.000 – 119.000 | 9.2 |
| `hada-labo-hydrating-cleanser` | Hada Labo Gokujyun Hyaluronic Acid Face Wash 100g | 79.000 – 109.000 | 9.0 |
| `emina-bright-stuff-facewash` | Emina Bright Stuff Face Wash 100ml | 22.000 – 32.000 | 8.3 |

### Toner (3 produk)
| Slug | Produk | Harga | Rating |
|---|---|---|---|
| `somethinc-aha-bha-toner` | Somethinc AHA BHA PHA Toner 2% 100ml | 115.000 – 145.000 | 8.8 |
| `skintific-mugwort-toner` | Skintific Mugwort Pore Toner 100ml | 89.000 – 119.000 | 8.9 |
| `dear-me-barrier-toner` | Dear Me Beauty Barrier Booster Toner 100ml | 99.000 – 129.000 | 8.6 |

### Eye Care (2 produk)
| Slug | Produk | Harga | Rating |
|---|---|---|---|
| `skintific-vit-c-eye-cream` | Skintific Vitamin C Eye Cream 20g | 109.000 – 139.000 | 8.7 |
| `garnier-bright-eye-cream` | Garnier Bright Complete Vitamin C Eye Cream 15ml | 65.000 – 89.000 | 8.4 |

### Body Care (1 produk)
| Slug | Produk | Harga | Rating |
|---|---|---|---|
| `scarlett-shower-scrub` | Scarlett Whitening Shower Scrub 300ml | 55.000 – 79.000 | 9.1 |

---

## 3. Strategi Foto (Fix Foto Salah)

### Problem
Semua gambar produk saat ini menggunakan `picsum.photos` (random stock photo) — tidak relevan sama sekali.

### Solution
- **next.config.ts**: Tambah allowed image domains:
  - `cf.shopee.co.id`
  - `down-id.img.susercontent.com`
  - `images.unsplash.com` (backup)
- Setiap produk dalam `reviewData.ts` dan `productData` mendapat field `image` berupa URL CDN Shopee resmi produk tersebut
- Hero image di halaman review menggunakan gambar produk yang sama (bukan random landscape)
- `ArticleHeader.tsx` menggunakan `next/image` dengan `src={review.image}` — tidak lagi hardcode `picsum.photos`

### Image URL per Produk
Setiap entry produk akan menyertakan `image` URL langsung dari listing Shopee yang sesuai (CF CDN public URL).

---

## 4. Affiliate Links

- Semua `affiliateUrl` diarahkan ke listing Shopee produk yang spesifik
- Format: `https://shopee.co.id/[nama-produk]-i.[shopId].[itemId]`
- Boss bisa replace URL ini dengan Shopee Affiliate short link dari dashboard Shopee Affiliate
- Template untuk Boss: buka Shopee Affiliate → cari produk → klik "Buat Link" → paste ke field `affiliateUrl` di `reviewData.ts`
- Semua link tetap pakai `rel="noopener noreferrer nofollow" target="_blank"`

---

## 5. Konten Homepage Update

### Hero Section
- Tagline: "Skincare Terpercaya, *Harga Bersahabat*"
- Sub-tagline: "Kurator kami tes langsung di kulit Indonesia — rekomendasi jujur, sebagian untuk donasi"
- CTA: "Lihat Review" + "Cara Kerja Donasi"

### Trending Section
- 3 produk trending: Azarine Sunscreen, Skintific Barrier Cream, Somethinc Niacinamide Serum

### Artikel Terbaru
- 3 artikel review: Azarine vs Skintific Sunscreen, Panduan Serum Pemula, Top 5 Moisturizer Under 50K

---

## 6. Perubahan `types/index.ts`

```ts
export type CategorySlug =
  | 'serum'
  | 'moisturizer'
  | 'sunscreen'
  | 'cleanser'
  | 'toner'
  | 'eyecare'
  | 'bodycare'
```

---

## 7. Strategi Promosi TikTok/Instagram

### Content Pillars
1. **Honest Review** (3x/minggu) — 30-60 detik, test produk nyata, link bio ke titippilih.id
2. **Comparison** (1x/minggu) — "Serum Rp50K vs Rp200K, mana lebih bagus?"
3. **Routine Share** (1x/2 minggu) — morning/night routine pakai produk dari website
4. **Donasi Update** (1x/bulan) — show transparansi donasi, emotional hook kuat

### Bio Link
```
🌿 Review skincare jujur | Sebagian untuk donasi
🔗 titippilih.id
```

### Hashtag Set
```
#skincareIndonesia #rekomendasikulit #kulitsehat
#skintific #somethinc #azarine #scarlett
#skincarejujur #beautybloggerindonesia #skincaretips
```

### Unique Selling Angle untuk Caption
> "Kamu beli lewat link kami, kami sumbangkan sebagian komisi untuk warga yang butuh.
> Belanja cantik, berbagi nyata. 🧡"

---

## 8. File yang TIDAK Berubah

- `app/donasi/page.tsx` dan semua komponen donasi — tetap sama
- `app/tentang/page.tsx` — tetap sama
- `components/layout/Navbar.tsx` — minor update: ganti link kategori ke sub-kategori skincare
- `components/layout/Footer.tsx` — minor update: update list kategori di footer
- `components/review/*` — semua komponen review tidak berubah, hanya data
- Semua shared components

---

## 9. Visual Redesign — Beauty Aesthetic

### Filosofi Desain
Dari: **Tech marketplace gelap** → Ke: **Beauty brand terang, bersih, premium**
Referensi: Sociolla.com, Somethinc brand site, Female Daily — bukan Tokopedia.

### Design System Baru

#### Warna
```
Primary     : #E8657A  (Rose — ganti orange)
Secondary   : #8EB5A2  (Sage Green — ganti teal keras)
Background  : #FEFAF8  (Warm cream white — ganti dark #0F172A)
Surface     : #FFFFFF  (Card background)
Surface2    : #FDF2F4  (Blush card hover/alt)
Text        : #1C1C2E  (Near-black — tetap readable)
Muted       : #9CA3AF
Accent warm : #FCD5BF  (Peach — untuk highlight/badge)
```

#### Typography
```
Heading     : Playfair Display — elegan, feminine, premium feel
Body        : Plus Jakarta Sans — tetap (clean, readable)
Heading accent italic → tetap ada tapi pakai rose bukan orange
```

#### Komponen yang Berubah Tampilannya
- `globals.css` — seluruh CSS variable color di-reset ke palette baru (light mode default)
- `Navbar` — background putih/cream, border bottom tipis rose/gray
- `HeroSection` — gradient rose-to-peach background, bukan dark slate
- `KategoriGrid` — warna icon disesuaikan beauty tones (rose, sage, peach, lavender)
- `ProductCard` — card putih dengan shadow halus, badge rose
- `SocialImpactBanner` — background sage green lembut, bukan dark card
- `Footer` — background rose sangat gelap (#2D1B20) atau cream gelap
- `Button` primary → rose, secondary → outline rose
- Rating stars → rose/pink bukan kuning

#### Komponen yang TIDAK Berubah Strukturnya
Layout, routing, data fetching, semua logic — hanya CSS variables dan warna yang berubah.

### Elemen Visual Baru (Beauty-Specific)
- **Blob shapes** — dekorasi background organik di HeroSection (SVG circles dengan opacity rendah)
- **"Clean Beauty" trust badge** — badge kecil "Review Jujur ✓" di product cards
- **Gradient ribbon** — strip tipis rose-to-peach di top hero
- **Foto hero** — Higgsfield AI generate hero banner: "skincare flatlay products on marble surface, rose gold accents, clean beauty aesthetic, Indonesian market"

---

## 10. Urutan Implementasi

1. Generate hero banner via Higgsfield AI (beauty flatlay)
2. Update `app/globals.css` — seluruh CSS variable ke beauty palette (light mode)
3. Update `types/index.ts` — CategorySlug baru (skincare sub-cats)
4. Update `next.config.ts` — allow Shopee + brand image domains
5. Buat `lib/productData.ts` — 20 produk skincare lengkap dengan Shopee image URLs
6. Update `lib/reviewData.ts` — 20 review skincare dengan gambar nyata
7. Update `components/layout/Navbar.tsx` — light mode, rose accent
8. Update `components/home/HeroSection.tsx` — beauty redesign + copy skincare
9. Update `components/home/KategoriGrid.tsx` — sub-kategori skincare + beauty colors
10. Update `components/home/TrendingSection.tsx` — 3 produk trending skincare
11. Update `components/home/SocialImpactBanner.tsx` — sage green palette
12. Update `components/home/ArtikelTerbaru.tsx` — artikel skincare
13. Update `app/kategori/[slug]/page.tsx` — metadata skincare
14. Update `components/kategori/KategoriContent.tsx` — produk per sub-kategori
15. Update `components/review/ArticleHeader.tsx` — pakai gambar produk nyata
16. Update `components/layout/Footer.tsx` — beauty footer redesign
17. Update `app/layout.tsx` — font Playfair Display + brand meta
18. QA browser: screenshot semua halaman, 0 foto random, 0 TS errors, build pass

---

## Success Criteria

- [ ] Tidak ada lagi foto `picsum.photos` di seluruh website
- [ ] Semua 20 produk punya gambar nyata dan relevan
- [ ] Semua affiliate link menuju listing Shopee yang tepat
- [ ] Semua 7 sub-kategori skincare berfungsi (halaman kategori, filter, pagination)
- [ ] Homepage menampilkan konten skincare 100%
- [ ] 0 TypeScript errors
- [ ] Build berhasil (`npm run build`)
