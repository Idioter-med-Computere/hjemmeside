import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'
import { Bungee, Inter } from 'next/font/google'

const bungee = Bungee({ weight: '400', subsets: ['latin'], variable: '--font-bungee', display: 'swap' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })

export const metadata: Metadata = {
  title: 'Idioter med computere',
  description: 'En tech-podcast om alt det dumme, folk laver med computere.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <html lang="da" className={`${bungee.variable} ${inter.variable}`}>
      <body className={`min-h-screen font-sans text-white bg-[#121212]`}>
        <div className="sticky top-0 z-50 backdrop-blur bg-black/80 border-b border-[#1e1e1e]">
          <div className="mx-auto max-w-6xl px-4">
            <nav className="flex items-center justify-between py-4">
              <div className="flex items-center gap-6">
                <Link href="/" className="font-display text-xl tracking-wide link">Idioter med computere</Link>
                <div className="hidden sm:flex items-center gap-4 text-sm">
                  <Link href="/" className="link">Forside</Link>
                  <Link href="/episodes" className="link">Episoder</Link>
                  <Link href="/brevkasse" className="link">Brevkasse</Link>
                </div>
              </div>
              <Link href="/subscribe" className="btn btn-dark">
                Abonnér
              </Link>
            </nav>
          </div>
        </div>
        <main className="page py-8 page-enter page-enter-active">
          {children}
        </main>
        <footer className="mt-16 border-t border-[#1e1e1e] py-8 text-center text-sm text-[#bbbbbb] bg-black/60">
          © 2025 Idioter med computere
        </footer>
      </body>
    </html>
  )
}
