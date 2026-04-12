import type { CuratorData } from '@/types'

interface CuratorTeamProps {
  curators: CuratorData[]
}

export function CuratorTeam({ curators }: CuratorTeamProps) {
  return (
    <section className="py-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Kenalan dengan{' '}
          <span className="text-primary">Kurator Anda</span>
        </h2>
        <p className="text-muted-foreground text-sm max-w-md mx-auto">
          Bukan influencer yang dibayar per posting — kurator kami adalah orang
          yang benar-benar paham dan peduli.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {curators.map((curator) => (
          <div
            key={curator.name}
            className="bg-card border border-white/10 rounded-xl p-6 flex flex-col gap-4 hover:border-primary/30 transition-colors"
          >
            {/* Avatar */}
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-full border flex items-center justify-center shrink-0 ${curator.accentColor}`}
              >
                <span className="text-sm font-bold">{curator.initials}</span>
              </div>
              <div>
                <p className="font-bold text-foreground text-sm">{curator.name}</p>
                <p className={`text-xs font-medium ${curator.accentColor.split(' ')[0]}`}>
                  {curator.role}
                </p>
              </div>
            </div>

            {/* Bio */}
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
              {curator.bio}
            </p>

            {/* Category tags */}
            <div className="flex flex-wrap gap-1.5 mt-auto">
              {curator.categories.map((cat) => (
                <span
                  key={cat}
                  className="text-xs px-2 py-0.5 bg-white/5 border border-white/10 rounded-full text-muted-foreground"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
