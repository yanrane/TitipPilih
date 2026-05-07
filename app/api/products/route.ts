import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// ─── helpers ────────────────────────────────────────────────────────────────

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

function isAuthorized(req: NextRequest): boolean {
  const token = process.env.TITIPILIH_API_TOKEN
  if (!token) return false
  const header = req.headers.get('authorization') ?? ''
  return header === `Bearer ${token}`
}

// ─── POST /api/products ──────────────────────────────────────────────────────

interface ProductBody {
  nama: string
  harga: number
  rating: number        // 0–5 scale from caller → stored as 0–10
  url: string
  img?: string
  categorySlug?: string
  terjual?: number      // accepted but not persisted (schema doesn't have field)
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  if (!isAuthorized(req)) {
    return NextResponse.json({ ok: false, message: 'Unauthorized' }, { status: 401 })
  }

  let body: ProductBody
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, message: 'Body tidak valid (JSON required)' }, { status: 400 })
  }

  const { nama, harga, rating, url, img, categorySlug } = body

  if (!nama || typeof harga !== 'number' || typeof rating !== 'number' || !url) {
    return NextResponse.json(
      { ok: false, message: 'Field wajib: nama (string), harga (number), rating (number), url (string)' },
      { status: 400 },
    )
  }

  const normalizedRating = Math.min(10, Math.max(0, rating * 2))

  try {
    // Upsert by affiliateUrl
    const existing = await prisma.product.findFirst({ where: { affiliateUrl: url } })

    if (existing) {
      const updated = await prisma.product.update({
        where: { id: existing.id },
        data: { priceMin: harga, rating: normalizedRating },
      })
      return NextResponse.json({
        ok: true,
        action: 'updated' as const,
        id: updated.id,
        message: `Produk "${updated.title}" berhasil diperbarui`,
      })
    }

    // Resolve categorySlug — fallback to first available if omitted
    const catSlug = categorySlug ?? 'gadget'
    const categoryExists = await prisma.category.findUnique({ where: { slug: catSlug } })
    if (!categoryExists) {
      return NextResponse.json(
        { ok: false, message: `Category "${catSlug}" tidak ditemukan` },
        { status: 422 },
      )
    }

    // Generate unique slug
    const baseSlug = slugify(nama)
    let slug = baseSlug
    let attempt = 1
    while (await prisma.product.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${attempt++}`
    }

    const created = await prisma.product.create({
      data: {
        slug,
        title: nama,
        image: img ?? '',
        categorySlug: catSlug,
        rating: normalizedRating,
        priceMin: harga,
        affiliateUrl: url,
      },
    })

    return NextResponse.json(
      {
        ok: true,
        action: 'created' as const,
        id: created.id,
        message: `Produk "${created.title}" berhasil ditambahkan`,
      },
      { status: 201 },
    )
  } catch (err) {
    console.error('[POST /api/products]', err)
    return NextResponse.json({ ok: false, message: 'Internal server error' }, { status: 500 })
  }
}

// ─── GET /api/products ───────────────────────────────────────────────────────

export async function GET(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url)
  const category = searchParams.get('category')
  const trending = searchParams.get('trending')
  const rawLimit = searchParams.get('limit')
  const limit = Math.min(Math.max(1, parseInt(rawLimit ?? '20', 10) || 20), 100)

  try {
    const products = await prisma.product.findMany({
      where: {
        ...(category ? { categorySlug: category } : {}),
        ...(trending === 'true' ? { trending: true } : {}),
      },
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: { category: { select: { slug: true, label: true } } },
    })

    return NextResponse.json({ ok: true, products })
  } catch (err) {
    console.error('[GET /api/products]', err)
    return NextResponse.json({ ok: false, message: 'Internal server error' }, { status: 500 })
  }
}
