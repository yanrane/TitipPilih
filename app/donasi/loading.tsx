export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 animate-pulse flex flex-col gap-12">
      {/* Hero stat cards */}
      <div className="flex flex-col gap-4">
        <div className="h-8 w-64 rounded-lg bg-white/10" />
        <div className="h-4 w-48 rounded bg-white/10" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-28 rounded-xl bg-card border border-white/10" />
          ))}
        </div>
      </div>

      {/* Recipient grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-32 rounded-xl bg-white/10" />
        ))}
      </div>

      {/* Progress bar */}
      <div className="flex flex-col gap-3">
        <div className="h-5 w-56 rounded bg-white/10" />
        <div className="h-4 w-full rounded-full bg-white/10" />
        <div className="h-4 w-40 rounded bg-white/10" />
      </div>

      {/* Timeline */}
      <div className="flex flex-col gap-4">
        <div className="h-6 w-40 rounded bg-white/10" />
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-20 w-full rounded-xl bg-white/10" />
        ))}
      </div>
    </div>
  )
}
