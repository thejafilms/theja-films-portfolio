import type { Metadata } from 'next'
import { Playfair_Display, Open_Sans } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-opensans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Theja Mitta — Cinematic Filmmaker',
  description: 'Cinematic stories of people, places, and moments.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${openSans.variable}`}>
      <body>{children}</body>
    </html>
  )
}
