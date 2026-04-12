import type { CategorySlug } from '@/types'

// Category-specific context snippets for the article
const categoryContext: Record<CategorySlug, string> = {
  gadget:
    'pasar teknologi konsumen Indonesia yang terus berkembang pesat',
  fashion:
    'industri fashion Indonesia yang semakin sadar akan kualitas dan keberlanjutan',
  kesehatan:
    'meningkatnya kesadaran masyarakat Indonesia akan pentingnya gaya hidup sehat',
  travel:
    'gairah masyarakat Indonesia dalam menjelajahi destinasi dalam negeri dan mancanegara',
  rumah:
    'tren hunian Indonesia yang semakin mengutamakan estetika dan fungsionalitas',
  kecantikan:
    'perkembangan pesat industri kecantikan Indonesia dengan menyeimbangkan produk lokal dan impor',
  olahraga:
    'meningkatnya komunitas olahraga aktif di Indonesia, terutama generasi muda',
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
        Desain & Kualitas Build
      </h2>
      <p>
        Kesan pertama sangat penting, dan{' '}
        <strong className="text-foreground">{productTitle}</strong> berhasil memberikan
        impresi positif sejak diunboxing. Material yang digunakan terasa premium di
        tangan, dengan perhatian pada detail yang mencerminkan bahwa produsen
        benar-benar mempertimbangkan kenyamanan pengguna dalam jangka panjang.
      </p>
      <p>
        Ergonomi menjadi salah satu kekuatan utama. Setelah digunakan selama beberapa
        jam berturut-turut, tidak ada keluhan kelelahan yang berarti — sesuatu yang
        justru sering luput dari perhatian pada produk di kelas harga yang sama.
        Finishing-nya konsisten dan rapi dari setiap sudut pandang.
      </p>

      {/* Section 2 */}
      <h2 className="text-xl font-bold text-foreground mt-2">
        Performa & Penggunaan Sehari-hari
      </h2>
      <p>
        Inilah yang paling kamu cari. Dalam penggunaan harian selama dua minggu, kami
        menjalankan berbagai skenario mulai dari pemakaian ringan hingga pengujian batas
        kemampuan. Hasilnya? Produk ini tampil konsisten tanpa kejutan negatif yang
        berarti.
      </p>
      <p>
        Momen-momen paling intens — ketika semua bergantung pada performa maksimal —
        produk ini bertahan dengan stabil. Tidak ada overheating signifikan, tidak ada
        penurunan performa tiba-tiba. Hal ini menunjukkan bahwa engineering di balik
        produk ini dilakukan dengan sungguh-sungguh, bukan sekadar memenuhi angka
        spesifikasi di atas kertas.
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
        Kesimpulan: Untuk Siapa Produk Ini?
      </h2>
      <p>
        <strong className="text-foreground">{productTitle}</strong> adalah pilihan
        solid untuk kamu yang menginginkan keseimbangan antara performa, kualitas,
        dan nilai investasi jangka panjang. Produk ini tidak ditujukan untuk semua
        orang — namun untuk target penggunanya, ia memberikan pengalaman yang sulit
        dikomplain.
      </p>
      <p>
        Jika anggaran dan kebutuhan kamu sesuai dengan profil produk ini, kami dengan
        percaya diri merekomendasikannya. Dan ingat — setiap pembelian melalui link
        TitipPilih turut berkontribusi untuk sesama. Pembelian yang bermakna ganda.
      </p>
    </article>
  )
}
