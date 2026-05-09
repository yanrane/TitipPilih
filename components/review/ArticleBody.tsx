import type { CategorySlug } from '@/types'

// Category-specific context snippets for the article
const categoryContext: Record<CategorySlug, string> = {
  serum:
    'perkembangan pesat industri skincare Indonesia dengan fokus pada bahan aktif efektif',
  moisturizer:
    'meningkatnya kesadaran masyarakat Indonesia tentang pentingnya menjaga hidrasi kulit sehari-hari',
  sunscreen:
    'tren pemakaian sunscreen harian yang kian populer di kalangan masyarakat Indonesia',
  cleanser:
    'rutinitas double cleansing yang semakin diadopsi oleh pecinta skincare Indonesia',
  toner:
    'berkembangnya pemahaman tentang rangkaian skincare yang tepat di kalangan konsumen Indonesia',
  eyecare:
    'meningkatnya perhatian terhadap perawatan area mata sebagai bagian dari rutinitas skincare Indonesia',
  bodycare:
    'tren perawatan tubuh yang menyeluruh di kalangan masyarakat Indonesia yang sadar kecantikan',
}

interface ArticleBodyProps {
  productTitle: string
  category: CategorySlug
}

export function ArticleBody({ productTitle, category }: ArticleBodyProps) {
  const context = categoryContext[category]

  return (
    <article className="flex flex-col gap-6 text-[15px] leading-relaxed text-muted-foreground">
      {/* Introduction */}
      <p>
        Di tengah {context}, <strong className="text-foreground">{productTitle}</strong>{' '}
        hadir sebagai salah satu pilihan yang patut mendapatkan perhatian serius. Tim
        kurator TitipPilih telah menggunakan produk ini selama lebih dari dua minggu
        penuh dalam kondisi penggunaan nyata sehari-hari — bukan sekadar unboxing
        singkat atau pengujian lab semata.
      </p>
      <p>
        Dalam review mendalam ini, kami tidak hanya membahas spesifikasi teknis yang
        bisa kamu baca di mana saja, tapi pengalaman riil, nuansa kecil yang terasa
        setelah penggunaan berkepanjangan, serta perbandingan jujur dengan alternatif
        di rentang harga yang sama. Karena itulah TitipPilih ada — rekomendasi yang
        benar-benar bisa kamu percaya.
      </p>

      {/* Section 1 */}
      <h2 className="text-xl font-bold text-foreground mt-2">
        Tekstur & Cara Pemakaian
      </h2>
      <p>
        Kesan pertama sangat penting, dan{' '}
        <strong className="text-foreground">{productTitle}</strong> berhasil memberikan
        impresi positif sejak pertama diaplikasikan. Teksturnya terasa menyenangkan di
        kulit, dengan formula yang mencerminkan bahwa produsen benar-benar
        mempertimbangkan iklim tropis Indonesia.
      </p>
      <p>
        Kemudahan penggunaan menjadi salah satu kekuatan utama. Produk ini cepat
        meresap tanpa meninggalkan rasa lengket atau berminyak — sesuatu yang justru
        sering menjadi keluhan pada produk di kelas harga yang sama. Finishing-nya
        bersih dan nyaman sepanjang hari.
      </p>

      {/* Section 2 */}
      <h2 className="text-xl font-bold text-foreground mt-2">
        Efektivitas & Hasil di Kulit
      </h2>
      <p>
        Inilah yang paling kamu cari. Dalam penggunaan harian selama dua minggu, kami
        menjalankan pengujian pada berbagai kondisi kulit — pagi hari sebelum aktivitas
        hingga malam hari setelah paparan polusi. Hasilnya? Produk ini tampil konsisten
        tanpa kejutan negatif yang berarti.
      </p>
      <p>
        Perubahan yang paling terasa setelah pemakaian rutin adalah kulit yang lebih
        lembab, cerah, dan ternutrisi. Tidak ada iritasi, tidak ada breakout. Ini
        menunjukkan bahwa formulasi di balik produk ini dilakukan dengan serius, bukan
        sekadar memenuhi klaim di kemasan.
      </p>

      {/* Blockquote highlight */}
      <blockquote className="border-l-4 border-primary bg-primary/5 rounded-r-xl px-5 py-4">
        <p className="text-foreground font-medium italic leading-relaxed">
          &ldquo;Setelah dua minggu bersama {productTitle}, saya bisa bilang ini adalah
          salah satu produk yang benar-benar memenuhi janjinya. Tidak sempurna, tapi
          konsisten — dan itu justru yang paling sulit dicapai.&rdquo;
        </p>
        <p className="text-xs text-muted-foreground mt-2 not-italic">
          — Tim Kurator TitipPilih
        </p>
      </blockquote>

      {/* Section 3 */}
      <h2 className="text-xl font-bold text-foreground mt-2">
        Nilai untuk Uang
      </h2>
      <p>
        Pertanyaan krusialnya selalu sama: apakah harga yang kamu bayar sepadan
        dengan apa yang kamu dapatkan? Untuk{' '}
        <strong className="text-foreground">{productTitle}</strong>, jawabannya
        condong ke <strong className="text-foreground">ya</strong> — dengan beberapa
        catatan penting yang perlu kamu pertimbangkan sesuai kebutuhan spesifik kamu.
      </p>
      <p>
        Dibandingkan alternatif di rentang harga yang sama, produk ini unggul di
        beberapa aspek kunci namun tertinggal di area tertentu. Kamu tidak selalu
        mendapat segalanya dalam satu paket — dan di sinilah peran kurator TitipPilih
        menjadi penting: membantu kamu membuat keputusan berdasarkan prioritas nyata,
        bukan hype semata.
      </p>

      {/* Section 4 — verdict */}
      <h2 className="text-xl font-bold text-foreground mt-2">
        Kesimpulan: Untuk Jenis Kulit Apa?
      </h2>
      <p>
        <strong className="text-foreground">{productTitle}</strong> adalah pilihan
        solid untuk kamu yang menginginkan keseimbangan antara efektivitas, keamanan,
        dan nilai investasi jangka panjang untuk kulitmu. Produk ini tidak ditujukan
        untuk semua jenis kulit — namun untuk target penggunanya, ia memberikan
        pengalaman yang sulit dikomplain.
      </p>
      <p>
        Jika anggaran dan kebutuhan kamu sesuai dengan profil produk ini, kami dengan
        percaya diri merekomendasikannya. Dan ingat — setiap pembelian melalui link
        TitipPilih turut berkontribusi untuk sesama. Pembelian yang bermakna ganda.
      </p>
    </article>
  )
}
