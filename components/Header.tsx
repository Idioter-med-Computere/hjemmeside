'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { createPortal } from 'react-dom'
import NavLink from '@/components/NavLink'

export default function Header() {
    const [open, setOpen] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => setMounted(true), [])

    const closeMenu = () => setOpen(false)

    return (
        <header className="sticky top-0 z-50 backdrop-blur bg-black/80 border-b border-[#1e1e1e]">
            {/* Header bar */}
            <div className="w-full px-3 sm:px-4">
                <nav className="flex items-center justify-between py-4">
                    {/* Left side: title + links */}
                    <div className="flex items-center gap-6">
                        <Link href="/" className="font-display text-xl tracking-wide link">
                            Idioter med computere
                        </Link>
                        <div className="hidden md:flex items-center gap-4 text-sm">
                            <NavLink href="/">Forside</NavLink>
                            <NavLink href="/episodes">Episoder</NavLink>
                            <NavLink href="/brevkasse">Brevkasse</NavLink>
                        </div>
                    </div>

                    {/* Right side: Abonnér */}
                    <div className="hidden md:block pr-3">
                        <Link href="/subscribe" className="btn btn-dark">Abonnér</Link>
                    </div>

                    {/* Mobile toggle */}
                    <button
                        onClick={() => setOpen(true)}
                        className="md:hidden text-white p-2.5 ml-1 mr-2 rounded-md active:bg-white/10"
                        aria-label="Åbn menu"
                    >
                        <Menu size={22} />
                    </button>
                </nav>
            </div>

            {/* Portal for overlay & drawer */}
            {mounted && createPortal(
                <>
                    {/* Fullscreen blurred backdrop */}
                    <div
                        className={`fixed inset-0 z-[9998] bg-black/70 backdrop-blur-md transition-opacity duration-300
              ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                        onClick={() => setOpen(false)}
                    />

                    {/* Sliding black drawer */}
                    <aside
                        className={`fixed top-0 right-0 h-full w-56 max-w-[85vw] z-[9999]
              bg-black border-l border-[#222] shadow-[0_0_40px_rgba(0,0,0,0.8)]
              transform transition-transform duration-300 ease-in-out
              ${open ? 'translate-x-0' : 'translate-x-full'}`}
                        aria-hidden={!open}
                    >
                        <div className="flex justify-end p-4">
                            <button onClick={() => setOpen(false)} aria-label="Luk menu">
                                <X size={24}/>
                            </button>
                        </div>

                        <nav className="flex flex-col items-center gap-6 pt-4 text-center">
                            <NavLink href="/" onClick={closeMenu}>Forside</NavLink>
                            <NavLink href="/episodes" onClick={closeMenu}>Episoder</NavLink>
                            <NavLink href="/brevkasse" onClick={closeMenu}>Brevkasse</NavLink>
                            <Link href="/subscribe" className="btn btn-dark w-40" onClick={closeMenu}>
                                Abonnér
                            </Link>
                        </nav>
                    </aside>
                </>,
                document.body
            )}
        </header>
    )
}