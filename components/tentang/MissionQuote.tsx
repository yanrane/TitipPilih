export function MissionQuote() {
  return (
    <section className="py-8">
      <h2 className="text-xl font-bold text-foreground mb-6 text-center">
        Mengapa Kami{' '}
        <span className="text-primary">Melakukannya?</span>
      </h2>

      <div className="relative max-w-3xl mx-auto">
        {/* Decorative large quote mark */}
        <span
          className="absolute -top-6 -left-4 text-8xl font-serif text-primary/10 leading-none select-none pointer-events-none"
          aria-hidden
        >
          &ldquo;
        </span>

        <blockquote className="relative bg-card border border-white/10 rounded-2xl px-8 py-8 md:px-12 md:py-10">
          <p className="text-lg md:text-xl text-foreground font-medium leading-relaxed italic mb-6">
            Kami percaya bahwa memberi rekomendasi yang jujur adalah bentuk kasih
            sayang kepada sesama konsumen. Dan dengan menyisihkan sebagian komisi,
            kami mengubah setiap pembelian menjadi aksi nyata — kecil, tapi bermakna
            bagi seseorang yang benar-benar membutuhkan.
          </p>
          <footer className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0">
              <span className="text-sm font-bold text-primary">TP</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                Pendiri TitipPilih
              </p>
              <p className="text-xs text-muted-foreground">Jakarta, 2024</p>
            </div>
          </footer>
        </blockquote>

        {/* Closing quote mark */}
        <span
          className="absolute -bottom-4 -right-4 text-8xl font-serif text-primary/10 leading-none select-none pointer-events-none rotate-180"
          aria-hidden
        >
          &ldquo;
        </span>
      </div>
    </section>
  )
}
