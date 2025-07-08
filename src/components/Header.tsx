'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/context/ThemeContext'


export function Header({ categories }: { categories: string[] }) {
    const { theme, toggle } = useTheme();
    const pathname = usePathname();
    const params = useSearchParams();
    const currentCategory = params.get('category') || 'all';

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [moreOpen, setMoreOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
    }, [mobileMenuOpen])

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
            setMoreOpen(false)
        }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const createLink = (c: string) =>
        `${pathname}?${new URLSearchParams({
        ...Object.fromEntries(params),
        category: c === 'all' ? '' : c,
        }).toString()}`.replace(/\?$/, '')

    const maxVisible = 5
    const visibleCats = categories.slice(0, maxVisible)
    const hiddenCats = categories.slice(maxVisible)

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 border-b border-black/10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm">
                <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
                    <Link
                    href="/"
                    className="text-xl font-bold tracking-tight text-indigo-600 dark:text-indigo-400"
                    >
                    NewsSite
                    </Link>

                    <nav className="hidden md:flex items-center gap-4 ml-auto relative">
                    {visibleCats.map((cat) => (
                        <Link
                        key={cat}
                        href={createLink(cat)}
                        className={`flex flex-col justify-center items-center capitalize text-sm font-medium hover:text-indigo-600 dark:hover:text-indigo-400 ${
                            currentCategory === cat
                            ? 'text-indigo-600 dark:text-indigo-400 underline'
                            : 'text-gray-700 dark:text-gray-300'
                        }`}
                        >
                        {cat}
                        </Link>
                    ))}

                    {hiddenCats.length > 0 && (
                        <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setMoreOpen((v) => !v)}
                            className="text-sm font-medium px-3 py-1 rounded-md hover:text-indigo-600 dark:hover:text-indigo-400 text-gray-700 dark:text-gray-300 flex items-center gap-1"
                        >
                            More <span>{moreOpen ? '▲' : '▼'}</span>
                        </button>

                        <AnimatePresence>
                            {moreOpen && (
                            <motion.div
                                key="dropdown"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="absolute right-0 mt-2 w-52 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50"
                            >
                                <ul className="max-h-64 overflow-y-auto overflow-x-hidden py-2 scrollbar-thin">
                                {hiddenCats.map((cat) => (
                                    <li key={cat}>
                                    <Link
                                        href={createLink(cat)}
                                        className={`block px-4 py-2 text-sm capitalize hover:bg-gray-100 dark:hover:bg-gray-800 transition ${
                                        currentCategory === cat
                                            ? 'font-semibold text-indigo-600 dark:text-indigo-400'
                                            : 'text-gray-700 dark:text-gray-300'
                                        }`}
                                        onClick={() => setMoreOpen(false)}
                                    >
                                        {cat}
                                    </Link>
                                    </li>
                                ))}
                                </ul>
                            </motion.div>
                            )}
                        </AnimatePresence>
                        </div>
                    )}
                    </nav>

                    <div className="flex items-center gap-4 ml-4">
                    <button
                        className="md:hidden text-2xl"
                        onClick={() => setMobileMenuOpen((v) => !v)}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? '✖️' : '☰'}
                    </button>
                    <button
                        onClick={toggle}
                        aria-label="Toggle Theme"
                        className="text-xl transition hover:rotate-12"
                    >
                        {theme === 'dark' ? '🌙' : '☀️'}
                    </button>
                    </div>
                </div>
            </header>

            <AnimatePresence>
            {mobileMenuOpen && (
                <motion.nav
                key="mobile-nav"
                initial={{ y: '-100%' }}
                animate={{ y: 0 }}
                exit={{ y: '-100%' }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-40 md:hidden bg-white dark:bg-gray-950 px-4 py-4 flex flex-wrap gap-2 overflow-y-auto pt-24"
                >
                {categories.map((cat) => (
                    <Link
                    key={cat}
                    href={createLink(cat)}
                    className={`capitalize text-sm font-medium rounded px-3 py-1 transition ${
                        currentCategory === cat
                        ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-600 dark:text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                    >
                    {cat}
                    </Link>
                ))}
                </motion.nav>
            )}
            </AnimatePresence>
        </>
    );

}
