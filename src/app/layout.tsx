import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Schnappfang — Deine Fangkarte',
  description: 'Fangkarten-Generator für bayerische Angler',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  )
}
