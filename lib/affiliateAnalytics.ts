const WITA_OFFSET_MS = 8 * 60 * 60 * 1000

/** Returns the UTC instant at 00:00 for the calendar day in WITA (UTC+08:00). */
export function witaStartOfDay(now = new Date()): Date {
  const wita = new Date(now.getTime() + WITA_OFFSET_MS)
  return new Date(Date.UTC(wita.getUTCFullYear(), wita.getUTCMonth(), wita.getUTCDate()) - WITA_OFFSET_MS)
}

/** Returns the WITA calendar-day boundary for today minus `daysAgo` days. */
export function witaDayStartDaysAgo(now: Date, daysAgo: number): Date {
  const start = witaStartOfDay(now)
  return new Date(start.getTime() - daysAgo * 24 * 60 * 60 * 1000)
}
