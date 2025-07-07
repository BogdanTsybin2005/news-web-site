'use client'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useTheme } from './theme-provider'



const categories = ['all', 'technology', 'politics', 'sports']

export function Header() {
    const { theme, toggle } = useTheme()
    const params = useSearchParams()
    const pathname = usePathname()
    const category = params.get('category') || 'all'

    const createLink = (c: string) =>
        `${pathname}?${new URLSearchParams({ ...Object.fromEntries(params), category: c === 'all' ? '' : c }).toString()}`.replace(/\?$/, '')

    return (
        <header className="bg-gray-100 dark:bg-gray-800 border-b dark:border-gray-700">
            <div className="container mx-auto flex items-center justify-between p-4">
                <Link href="/" className="font-bold text-xl">
                    NewsSite
                </Link>
                <nav className="flex gap-4">
                    {categories.map((c) => (
                        <Link
                        key={c}
                        href={createLink(c)}
                        className={`capitalize hover:underline ${category === c ? 'font-semibold' : ''}`}
                        >
                        {c}
                        </Link>
                    ))}
                </nav>
                <button onClick={toggle} aria-label="Toggle theme" className="p-2 text-xl">
                    {theme === 'dark' ? '🌙' : '☀️'}
                </button>
            </div>
        </header>
    )
}
