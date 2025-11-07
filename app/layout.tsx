import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'
import { Bungee, Inter } from 'next/font/google'
import Header from '@/components/Header'

const bungee = Bungee({ weight: '400', subsets: ['latin'], variable: '--font-bungee', display: 'swap' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })

export const metadata: Metadata = {
  title: 'Idioter med computere',
  description: 'En tech-podcast om alt det dumme, folk laver med computere.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <html lang="da" className={`${bungee.variable} ${inter.variable}`}>
      <body className="min-h-screen font-sans text-white bg-[#121212]">
      <Header />
      <main className="page py-12 md:py-20 page-enter page-enter-active">{children}</main>
      <footer className="mt-16 border-t border-[#1e1e1e] py-8 text-center text-sm text-[#bbbbbb] bg-black/60">
        © 2025 Idioter med computere
      </footer>
      </body>
      </html>
  )
}