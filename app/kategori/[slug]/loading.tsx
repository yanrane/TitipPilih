export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 animate-pulse">
      {/* Page header */}
      <div className="mb-8 flex flex-col gap-2">
        <div className="h-8 w-48 rounded-lg bg-white/10" />
        <div className="h-4 w-96 max-w-full rounded bg-white/10" />
      </div>

      <div className="flex gap-8">
        {/* Sidebar skeleton — desktop only */}
        <div className="hidden lg:flex flex-col gap-4 w-64 shrink-0">
          <div className="h-5 w-24 rounded bg-white/10" />
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-4 w-full rounded bg-white/10" />
          ))}
          <div className="h-px bg-white/10 my-2" />
          <div className="h-5 w-20 rounded bg-white/10" />
          <div className="h-4 w-full rounded bg-white/10" />
          <div className="h-4 w-full rounded bg-white/10" />
          <div className="h-9 w-full rounded-lg bg-white/10 mt-2" />
        </div>

        {/* Product grid skeleton */}
        <div className="flex-1 min-w-0">
          <div className="h-9 w-40 rounded-lg bg-white/10 mb-5" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-xl bg-card border border-white/10 overflow-hidden">
                <div className="aspect-square bg-white/10" />
                <div className="p-4 flex flex-col gap-3">
                  <div className="h-4 w-16 rounded-full bg-white/10" />
                  <div className="h-5 w-3/4 rounded bg-white/10" />
                  <div className="h-4 w-1/2 rounded bg-white/10" />
                  <div className="h-9 w-full rounded-lg bg-white/10" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
