'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useTheme } from './theme-provider'

export function Header({ categories }: { categories: string[] }) {
    const { theme, toggle } = useTheme()
    const pathname = usePathname()
    const params = useSearchParams()
    const currentCategory = params.get('category') || 'all'

    const createLink = (c: string) =>
        `${pathname}?${new URLSearchParams({
        ...Object.fromEntries(params),
        category: c === 'all' ? '' : c,
        }).toString()}`.replace(/\?$/, '')

    return (
        <header className="sticky top-0 z-50 border-b border-black/10 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
                <Link href="/" className="text-xl font-bold tracking-tight text-indigo-600 dark:text-indigo-400">
                    NewsSite
                </Link>
                <nav className="hidden gap-4 sm:flex">
                    {categories.map((cat) => (
                        <Link
                        key={cat}
                        href={createLink(cat)}
                        className={`capitalize text-sm font-medium hover:text-indigo-600 dark:hover:text-indigo-400 ${
                            currentCategory === cat ? 'text-indigo-600 dark:text-indigo-400 underline' : 'text-gray-700 dark:text-gray-300'
                        }`}
                        >
                        {cat}
                        </Link>
                    ))}
                </nav>
                <button
                    onClick={toggle}
                    aria-label="Toggle Theme"
                    className="text-xl transition hover:rotate-12"
                >
                    {theme === 'dark' ? '🌙' : '☀️'}
                </button>
            </div>
        </header>
    )
}
