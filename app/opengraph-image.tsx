import { ImageResponse } from 'next/og'

export const alt = 'TitipPilih — Rekomendasi Jujur, Berbagi Tulus'

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0F172A',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
        }}
      >
        {/* Logo badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '32px',
          }}
        >
          <div
            style={{
              background: '#F97316',
              borderRadius: '12px',
              width: '56px',
              height: '56px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#FFFFFF',
            }}
          >
            TP
          </div>
          <span
            style={{
              fontSize: '36px',
              fontWeight: 'bold',
              color: '#F8FAFC',
            }}
          >
            TitipPilih
          </span>
        </div>

        {/* Main tagline */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <span
            style={{
              fontSize: '56px',
              fontWeight: 'bold',
              color: '#F8FAFC',
              textAlign: 'center',
              lineHeight: 1.2,
            }}
          >
            Rekomendasi Jujur,
          </span>
          <span
            style={{
              fontSize: '56px',
              fontWeight: 'bold',
              color: '#F97316',
              fontStyle: 'italic',
              textAlign: 'center',
              lineHeight: 1.2,
            }}
          >
            Berbagi Tulus
          </span>
        </div>

        {/* Subtext */}
        <div
          style={{
            display: 'flex',
            fontSize: '22px',
            color: '#94A3B8',
            textAlign: 'center',
            maxWidth: '700px',
            lineHeight: 1.5,
            marginBottom: '36px',
          }}
        >
          Review produk terpercaya dari kurator Indonesia. Sebagian komisi
          disumbangkan setiap minggu.
        </div>

        {/* Teal social badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: 'rgba(20, 184, 166, 0.15)',
            border: '1px solid rgba(20, 184, 166, 0.4)',
            borderRadius: '999px',
            padding: '10px 24px',
          }}
        >
          <span style={{ color: '#14B8A6', fontSize: '18px', fontWeight: 600 }}>
            💚 Sudah Rp 12.450.000 disalurkan kepada 83 penerima manfaat
          </span>
        </div>
      </div>
    ),
    { ...size }
  )
}
