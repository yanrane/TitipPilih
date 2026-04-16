import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatRupiah = (angka: number): string => {
  const abs = Math.floor(Math.abs(angka))
  const formatted = abs.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  return `Rp\u00A0${formatted}`
}
