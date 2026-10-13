import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Spotify – Web Player',
  description: 'Música para todos os momentos. Clone moderno do Spotify.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="dark h-full">
      <body className={`${inter.className} bg-black text-zinc-100 antialiased selection:bg-[#1ed760] selection:text-black h-full overflow-hidden`}>
        {children}
      </body>
    </html>
  )
}
