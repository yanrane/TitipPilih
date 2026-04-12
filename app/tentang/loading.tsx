export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 animate-pulse flex flex-col gap-16">
      {/* Mission hero */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="flex flex-col gap-4">
          <div className="h-6 w-32 rounded-full bg-white/10" />
          <div className="h-10 w-full rounded-lg bg-white/10" />
          <div className="h-10 w-3/4 rounded-lg bg-white/10" />
          <div className="h-4 w-full rounded bg-white/10" />
          <div className="h-4 w-5/6 rounded bg-white/10" />
          <div className="flex gap-3 mt-2">
            <div className="h-11 w-36 rounded-lg bg-white/10" />
            <div className="h-11 w-44 rounded-lg bg-white/10" />
          </div>
        </div>
        <div className="h-64 rounded-2xl bg-white/10" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-3 p-6">
            <div className="h-12 w-40 rounded-lg bg-white/10" />
            <div className="h-4 w-28 rounded bg-white/10" />
          </div>
        ))}
      </div>

      {/* Quote */}
      <div className="h-40 max-w-3xl mx-auto w-full rounded-2xl bg-white/10" />

      {/* Curator team */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-56 rounded-xl bg-card border border-white/10" />
        ))}
      </div>

      {/* Pledge */}
      <div className="h-48 rounded-2xl bg-white/10" />
    </div>
  )
}
