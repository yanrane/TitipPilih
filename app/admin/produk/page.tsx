'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'

const CATEGORIES = ['gadget', 'fashion', 'kesehatan', 'travel', 'rumah', 'kecantikan', 'olahraga']

interface Product {
  id: string
  slug: string
  title: string
  image: string
  categorySlug: string
  rating: number
  priceMin: number
  priceMax: number | null
  affiliateUrl: string
  trending: boolean
  createdAt: string
}

const empty = {
  nama: '',
  harga: '',
  hargaMax: '',
  rating: '',
  url: '',
  img: '',
  categorySlug: 'gadget',
  trending: false,
}

export default function AdminProdukPage() {
  const [token, setToken] = useState('')
  const [savedToken, setSavedToken] = useState('')
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null)
  const [form, setForm] = useState(empty)
  const [editId, setEditId] = useState<string | null>(null)
  const [filterCat, setFilterCat] = useState('semua')

  const fetchProducts = useCallback(async (tk: string) => {
    setLoading(true)
    try {
      const res = await fetch('/api/products?limit=100')
      const data = await res.json()
      if (data.ok) setProducts(data.products)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const saved = sessionStorage.getItem('tp_admin_token') ?? ''
    if (saved) { setSavedToken(saved); fetchProducts(saved) }
  }, [fetchProducts])

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (!token.trim()) return
    sessionStorage.setItem('tp_admin_token', token.trim())
    setSavedToken(token.trim())
    fetchProducts(token.trim())
  }

  function flash(type: 'ok' | 'err', text: string) {
    setMsg({ type, text })
    setTimeout(() => setMsg(null), 4000)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!savedToken) return flash('err', 'Masukkan token dulu')

    const ratingNum = parseFloat(form.rating)
    const hargaNum = parseInt(form.harga.replace(/\D/g, ''), 10)
    const hargaMaxNum = form.hargaMax ? parseInt(form.hargaMax.replace(/\D/g, ''), 10) : null

    if (!form.nama || isNaN(hargaNum) || isNaN(ratingNum) || !form.url) {
      return flash('err', 'Nama, harga, rating (0–5), dan URL wajib diisi')
    }

    const body = {
      nama: form.nama,
      harga: hargaNum,
      hargaMax: hargaMaxNum,
      rating: ratingNum,
      url: form.url,
      img: form.img || undefined,
      categorySlug: form.categorySlug,
      trending: form.trending,
    }

    try {
      if (editId) {
        const res = await fetch(`/api/products?id=${editId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${savedToken}` },
          body: JSON.stringify(body),
        })
        const data = await res.json()
        flash(data.ok ? 'ok' : 'err', data.message)
        if (data.ok) { setEditId(null); setForm(empty); fetchProducts(savedToken) }
      } else {
        const res = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${savedToken}` },
          body: JSON.stringify(body),
        })
        const data = await res.json()
        flash(data.ok ? 'ok' : 'err', data.message)
        if (data.ok) { setForm(empty); fetchProducts(savedToken) }
      }
    } catch {
      flash('err', 'Gagal kirim ke server')
    }
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Hapus produk "${title}"?`)) return
    try {
      const res = await fetch(`/api/products?id=${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${savedToken}` },
      })
      const data = await res.json()
      flash(data.ok ? 'ok' : 'err', data.message)
      if (data.ok) fetchProducts(savedToken)
    } catch {
      flash('err', 'Gagal hapus')
    }
  }

  function handleEdit(p: Product) {
    setEditId(p.id)
    setForm({
      nama: p.title,
      harga: String(p.priceMin),
      hargaMax: p.priceMax ? String(p.priceMax) : '',
      rating: String(p.rating / 2),
      url: p.affiliateUrl,
      img: p.image,
      categorySlug: p.categorySlug,
      trending: p.trending,
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const displayed = filterCat === 'semua' ? products : products.filter(p => p.categorySlug === filterCat)

  if (!savedToken) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-[#1E293B] border border-white/10 rounded-xl p-8 w-full max-w-sm flex flex-col gap-4">
          <h1 className="text-xl font-bold text-white">Admin TitipPilih</h1>
          <p className="text-sm text-slate-400">Masukkan API token untuk akses</p>
          <input
            type="password"
            value={token}
            onChange={e => setToken(e.target.value)}
            placeholder="Bearer token..."
            className="bg-[#0F172A] border border-white/20 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button type="submit" className="bg-orange-500 text-white font-semibold rounded-lg py-2.5 hover:bg-orange-600 transition-colors">
            Masuk
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0F172A] text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">

        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-bold">Admin Produk</h1>
            <p className="text-slate-400 text-sm mt-0.5">{products.length} produk di database</p>
          </div>
          <button
            onClick={() => { sessionStorage.removeItem('tp_admin_token'); setSavedToken(''); setProducts([]) }}
            className="text-xs text-slate-500 hover:text-white transition-colors"
          >
            Keluar
          </button>
        </div>

        {/* Flash message */}
        {msg && (
          <div className={`rounded-lg px-4 py-3 text-sm font-medium ${msg.type === 'ok' ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30' : 'bg-red-500/20 text-red-300 border border-red-500/30'}`}>
            {msg.text}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-[#1E293B] border border-white/10 rounded-xl p-6 flex flex-col gap-5">
          <h2 className="font-bold text-lg">
            {editId ? '✏️ Edit Produk' : '➕ Tambah Produk Baru'}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2 flex flex-col gap-1.5">
              <label className="text-xs text-slate-400 uppercase tracking-wide">Nama Produk *</label>
              <input value={form.nama} onChange={e => setForm(f => ({ ...f, nama: e.target.value }))}
                placeholder="Apple iPhone 17 Pro Max 256GB"
                className="bg-[#0F172A] border border-white/20 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-500" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-slate-400 uppercase tracking-wide">Harga Min (IDR) *</label>
              <input value={form.harga} onChange={e => setForm(f => ({ ...f, harga: e.target.value }))}
                placeholder="24000000"
                className="bg-[#0F172A] border border-white/20 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-500" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-slate-400 uppercase tracking-wide">Harga Max (IDR, opsional)</label>
              <input value={form.hargaMax} onChange={e => setForm(f => ({ ...f, hargaMax: e.target.value }))}
                placeholder="30000000"
                className="bg-[#0F172A] border border-white/20 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-500" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-slate-400 uppercase tracking-wide">Rating (0–5) *</label>
              <input value={form.rating} onChange={e => setForm(f => ({ ...f, rating: e.target.value }))}
                placeholder="4.8" type="number" min="0" max="5" step="0.1"
                className="bg-[#0F172A] border border-white/20 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-500" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-slate-400 uppercase tracking-wide">Kategori</label>
              <select value={form.categorySlug} onChange={e => setForm(f => ({ ...f, categorySlug: e.target.value }))}
                className="bg-[#0F172A] border border-white/20 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-500">
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="sm:col-span-2 flex flex-col gap-1.5">
              <label className="text-xs text-slate-400 uppercase tracking-wide">URL Affiliate (Shopee/Tokopedia) *</label>
              <input value={form.url} onChange={e => setForm(f => ({ ...f, url: e.target.value }))}
                placeholder="https://shopee.co.id/produk-i.123.456"
                className="bg-[#0F172A] border border-white/20 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-500" />
            </div>

            <div className="sm:col-span-2 flex flex-col gap-1.5">
              <label className="text-xs text-slate-400 uppercase tracking-wide">URL Gambar (paste link gambar dari web)</label>
              <input value={form.img} onChange={e => setForm(f => ({ ...f, img: e.target.value }))}
                placeholder="https://www.apple.com/newsroom/images/.../foto.jpg"
                className="bg-[#0F172A] border border-white/20 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-500" />
              {form.img && (
                <div className="mt-2 w-24 h-24 relative rounded-lg overflow-hidden border border-white/10">
                  <img src={form.img} alt="preview" className="w-full h-full object-cover" onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              <input type="checkbox" id="trending" checked={form.trending}
                onChange={e => setForm(f => ({ ...f, trending: e.target.checked }))}
                className="w-4 h-4 accent-orange-500" />
              <label htmlFor="trending" className="text-sm text-slate-300">Tampilkan di Trending</label>
            </div>
          </div>

          <div className="flex gap-3">
            <button type="submit" className="bg-orange-500 text-white font-semibold rounded-lg px-6 py-2.5 hover:bg-orange-600 transition-colors text-sm">
              {editId ? 'Simpan Perubahan' : 'Tambah Produk'}
            </button>
            {editId && (
              <button type="button" onClick={() => { setEditId(null); setForm(empty) }}
                className="bg-white/10 text-white rounded-lg px-5 py-2.5 hover:bg-white/20 transition-colors text-sm">
                Batal
              </button>
            )}
          </div>
        </form>

        {/* Filter */}
        <div className="flex gap-2 flex-wrap">
          {['semua', ...CATEGORIES].map(c => (
            <button key={c} onClick={() => setFilterCat(c)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${filterCat === c ? 'bg-orange-500 text-white' : 'bg-white/10 text-slate-300 hover:bg-white/20'}`}>
              {c}
            </button>
          ))}
        </div>

        {/* Product list */}
        {loading ? (
          <div className="text-slate-400 text-sm text-center py-8">Memuat produk...</div>
        ) : (
          <div className="flex flex-col gap-3">
            {displayed.map(p => (
              <div key={p.id} className={`bg-[#1E293B] border rounded-xl p-4 flex gap-4 items-start ${editId === p.id ? 'border-orange-500/50' : 'border-white/10'}`}>
                {/* Thumbnail */}
                <div className="w-14 h-14 shrink-0 rounded-lg bg-[#0F172A] border border-white/10 overflow-hidden flex items-center justify-center">
                  {p.image ? (
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover" onError={e => { (e.target as HTMLImageElement).src = '' }} />
                  ) : (
                    <span className="text-xl">📦</span>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <div>
                      <p className="font-semibold text-sm text-white leading-tight">{p.title}</p>
                      <p className="text-xs text-slate-400 mt-0.5 capitalize">{p.categorySlug} · Rating {p.rating}/10 {p.trending && '· 🔥 Trending'}</p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button onClick={() => handleEdit(p)}
                        className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg transition-colors">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(p.id, p.title)}
                        className="text-xs bg-red-500/20 hover:bg-red-500/30 text-red-300 px-3 py-1.5 rounded-lg transition-colors">
                        Hapus
                      </button>
                    </div>
                  </div>
                  <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-slate-400">
                    <span>Rp {p.priceMin.toLocaleString('id-ID')}{p.priceMax ? ` – ${p.priceMax.toLocaleString('id-ID')}` : ''}</span>
                    <a href={p.affiliateUrl} target="_blank" rel="noopener noreferrer nofollow"
                      className="text-teal-400 hover:underline truncate max-w-xs">
                      {p.affiliateUrl}
                    </a>
                  </div>
                  {!p.image && (
                    <p className="mt-1 text-xs text-orange-400">⚠ Belum ada gambar</p>
                  )}
                  {p.affiliateUrl === 'https://shopee.co.id' || p.affiliateUrl === 'https://tokopedia.com' ? (
                    <p className="mt-0.5 text-xs text-red-400">⚠ Affiliate URL belum spesifik</p>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
