import Link from 'next/link'

export function DonationNoticeBanner() {
  return (
    <div className="w-full bg-secondary/10 border-b border-secondary/20 py-2 px-4">
      <p className="mx-auto max-w-7xl text-sm text-secondary text-center flex items-center justify-center gap-1.5 flex-wrap">
        <span aria-hidden="true">💚</span>
        <span>
          Link pada artikel ini dapat memberi TitipPilih komisi afiliasi tanpa menambah harga kamu.
        </span>
        <Link
          href="/disclosure"
          className="underline underline-offset-2 hover:no-underline font-medium"
        >
          Pelajari lebih lanjut
        </Link>
      </p>
    </div>
  )
}
