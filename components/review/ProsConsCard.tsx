import { CheckCircle, XCircle } from 'lucide-react'

interface ProsConsCardProps {
  pros: string[]
  cons: string[]
}

export function ProsConsCard({ pros, cons }: ProsConsCardProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Kelebihan (Pros) */}
      <div className="rounded-xl border border-secondary/30 bg-secondary/5 p-5">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle size={18} className="text-secondary shrink-0" />
          <h3 className="font-bold text-foreground text-sm uppercase tracking-wide">
            Kelebihan
          </h3>
        </div>
        <ul className="flex flex-col gap-3">
          {pros.map((pro, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="mt-0.5 shrink-0">
                <CheckCircle size={14} className="text-secondary" />
              </span>
              <span className="text-sm text-muted-foreground leading-snug">{pro}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Kekurangan (Cons) */}
      <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-5">
        <div className="flex items-center gap-2 mb-4">
          <XCircle size={18} className="text-red-400 shrink-0" />
          <h3 className="font-bold text-foreground text-sm uppercase tracking-wide">
            Kekurangan
          </h3>
        </div>
        <ul className="flex flex-col gap-3">
          {cons.map((con, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="mt-0.5 shrink-0">
                <XCircle size={14} className="text-red-400" />
              </span>
              <span className="text-sm text-muted-foreground leading-snug">{con}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
