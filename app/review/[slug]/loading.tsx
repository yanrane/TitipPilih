export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 animate-pulse">
      {/* Donation notice banner skeleton */}
      <div className="h-9 w-full rounded bg-white/10 mb-6" />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
        {/* Article column */}
        <div className="flex flex-col gap-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2">
            <div className="h-3 w-16 rounded bg-white/10" />
            <div className="h-3 w-2 rounded bg-white/10" />
            <div className="h-3 w-20 rounded bg-white/10" />
            <div className="h-3 w-2 rounded bg-white/10" />
            <div className="h-3 w-32 rounded bg-white/10" />
          </div>

          {/* Title */}
          <div className="flex flex-col gap-3">
            <div className="h-4 w-16 rounded-full bg-white/10" />
            <div className="h-9 w-full rounded-lg bg-white/10" />
            <div className="h-9 w-3/4 rounded-lg bg-white/10" />
          </div>

          {/* Author */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/10 shrink-0" />
            <div className="flex flex-col gap-1.5">
              <div className="h-4 w-32 rounded bg-white/10" />
              <div className="h-3 w-48 rounded bg-white/10" />
            </div>
          </div>

          {/* Hero image */}
          <div className="w-full aspect-video rounded-2xl bg-white/10" />

          {/* Article body */}
          <div className="flex flex-col gap-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className={`h-4 rounded bg-white/10 ${i % 4 === 3 ? 'w-3/4' : 'w-full'}`}
              />
            ))}
          </div>

          {/* Pros/Cons skeleton */}
          <div className="grid grid-cols-2 gap-4">
            <div className="h-32 rounded-xl bg-white/10" />
            <div className="h-32 rounded-xl bg-white/10" />
          </div>
        </div>

        {/* Sidebar skeleton */}
        <div className="hidden lg:block">
          <div className="rounded-2xl bg-card border border-white/10 overflow-hidden">
            <div className="aspect-square bg-white/10" />
            <div className="p-5 flex flex-col gap-4">
              <div className="h-5 w-3/4 rounded bg-white/10" />
              <div className="h-12 w-28 rounded bg-white/10" />
              <div className="h-4 w-1/2 rounded bg-white/10" />
              <div className="h-12 w-full rounded-xl bg-white/10" />
              <div className="h-16 w-full rounded-lg bg-white/10" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
