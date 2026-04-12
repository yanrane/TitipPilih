export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 animate-pulse">
      {/* Hero skeleton */}
      <div className="flex flex-col lg:flex-row gap-10 mb-16">
        <div className="flex-1 flex flex-col gap-4">
          <div className="h-4 w-24 rounded-full bg-white/10" />
          <div className="h-10 w-3/4 rounded-lg bg-white/10" />
          <div className="h-10 w-1/2 rounded-lg bg-white/10" />
          <div className="h-5 w-full rounded bg-white/10" />
          <div className="h-5 w-5/6 rounded bg-white/10" />
          <div className="flex gap-3 mt-2">
            <div className="h-11 w-36 rounded-lg bg-white/10" />
            <div className="h-11 w-36 rounded-lg bg-white/10" />
          </div>
        </div>
        <div className="w-full lg:w-80 h-64 rounded-2xl bg-white/10" />
      </div>

      {/* Category grid skeleton */}
      <div className="flex gap-3 overflow-hidden mb-16">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="h-20 w-28 shrink-0 rounded-xl bg-white/10" />
        ))}
      </div>

      {/* Product cards skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-xl bg-card border border-white/10 overflow-hidden">
            <div className="aspect-video bg-white/10" />
            <div className="p-4 flex flex-col gap-3">
              <div className="h-4 w-16 rounded-full bg-white/10" />
              <div className="h-5 w-3/4 rounded bg-white/10" />
              <div className="h-4 w-1/2 rounded bg-white/10" />
              <div className="h-9 w-full rounded-lg bg-white/10 mt-1" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
