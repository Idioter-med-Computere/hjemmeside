// components/NavLink.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { Route } from 'next'

export default function NavLink({ href, children, onClick }: { href: Route; children: React.ReactNode; onClick?: () => void }) {
    const pathname = usePathname()
    const active = pathname === href

    return (
        <Link
            href={href}
            className={`relative transition-colors duration-200 ${
                active
                    ? 'after:absolute after:left-0 after:bottom-[-2px] after:h-[2px] after:w-full after:bg-[--accent]'
                    : 'text-white hover:text-white/80'
            }`}
            onClick={onClick}
        >
            {children}
        </Link>
    )
}