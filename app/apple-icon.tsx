import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          background: '#E8657A',
          borderRadius: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* T horizontal bar */}
        <div
          style={{
            position: 'absolute',
            left: 34,
            top: 44,
            width: 112,
            height: 22,
            background: 'white',
            borderRadius: 6,
          }}
        />
        {/* T vertical bar */}
        <div
          style={{
            position: 'absolute',
            left: 79,
            top: 66,
            width: 22,
            height: 72,
            background: 'white',
            borderRadius: 6,
          }}
        />
        {/* Teal accent dot — represents "Pilih" */}
        <div
          style={{
            position: 'absolute',
            right: 22,
            bottom: 22,
            width: 34,
            height: 34,
            background: '#8EB5A2',
            borderRadius: '50%',
          }}
        />
      </div>
    ),
    { width: 180, height: 180 }
  )
}
