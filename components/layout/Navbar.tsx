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
  { label: 'Gadget', slug: 'gadget' },
  { label: 'Fashion', slug: 'fashion' },
  { label: 'Kesehatan', slug: 'kesehatan' },
  { label: 'Travel', slug: 'travel' },
  { label: 'Rumah', slug: 'rumah' },
  { label: 'Kecantikan', slug: 'kecantikan' },
  { label: 'Olahraga', slug: 'olahraga' },
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
          ? 'backdrop-blur-md bg-[#0F172A]/80 border-b border-white/10 shadow-sm'
          : 'bg-transparent'
      )}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center font-bold text-xl shrink-0">
          <span className="text-foreground">Titip</span>
          <span className="text-primary">Pilih</span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-6">
          {/* Kategori dropdown */}
          <div className="relative group">
            <button
              className={cn(
                'text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1',
                pathname.startsWith('/kategori') && 'text-primary font-semibold'
              )}
            >
              Kategori
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
            <div className="absolute top-full left-0 mt-2 w-48 bg-card rounded-xl shadow-xl border border-white/10 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50 p-2">
              {kategoriLinks.map((k) => (
                <Link
                  key={k.slug}
                  href={`/kategori/${k.slug}`}
                  className="block px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors"
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
            className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-white/10"
            aria-label="Cari produk"
          >
            <Search size={18} />
          </button>
          <Link
            href="/kategori/gadget"
            className="inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-white rounded-lg text-sm font-semibold px-4 h-8 transition-colors"
          >
            Mulai Jelajah
          </Link>
        </div>

        {/* Mobile hamburger */}
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-white/10"
            aria-label="Buka menu navigasi"
          >
            <Menu size={22} />
          </SheetTrigger>
          <SheetContent
            side="left"
            showCloseButton={false}
            className="w-72 bg-card border-r border-white/10 p-0"
          >
            <div className="p-6 flex flex-col gap-6 h-full">
              {/* Mobile logo */}
              <Link
                href="/"
                className="font-bold text-xl"
                onClick={() => setSheetOpen(false)}
              >
                <span className="text-foreground">Titip</span>
                <span className="text-primary">Pilih</span>
              </Link>

              {/* Kategori */}
              <div className="flex flex-col gap-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1 px-3">
                  Kategori
                </p>
                {kategoriLinks.map((k) => (
                  <Link
                    key={k.slug}
                    href={`/kategori/${k.slug}`}
                    onClick={() => setSheetOpen(false)}
                    className={cn(
                      'px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors',
                      pathname === `/kategori/${k.slug}` &&
                        'text-primary font-semibold bg-white/5'
                    )}
                  >
                    {k.label}
                  </Link>
                ))}
              </div>

              {/* Main nav */}
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setSheetOpen(false)}
                    className={cn(
                      'px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors',
                      pathname === link.href &&
                        'text-primary font-semibold bg-white/5'
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Mobile CTA */}
              <Link
                href="/kategori/gadget"
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
