import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sell It Buy It — Teaser',
  description: 'Australia’s smartest marketplace for pre‑owned & handmade goods.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
