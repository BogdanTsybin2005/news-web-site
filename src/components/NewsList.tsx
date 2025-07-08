'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { NewsItem } from '@/lib/news'
import { useSearchParams } from 'next/navigation'

export function NewsList({ items }: { items: NewsItem[] }) {
    const [search, setSearch] = useState('')
    const [visibleCount, setVisibleCount] = useState(6)

    const params = useSearchParams()
    const category = params.get('category')?.toLowerCase() || 'all'

    const filtered = useMemo(() => {
        return items.filter(
        (item) =>
            (category === 'all' || item.category.toLowerCase() === category) &&
            item.title.toLowerCase().includes(search.toLowerCase())
        )
    }, [items, category, search])

    const visibleItems = filtered.slice(0, visibleCount)
    const hasMore = filtered.length > visibleItems.length

    return (
        <div className="space-y-6">
        <input
                type="text"
                placeholder="Search for news..."
                value={search}
                onChange={(e) => {
                setSearch(e.target.value)
                setVisibleCount(6)
            }}
            className="w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:border-gray-700 dark:bg-gray-800 dark:placeholder-gray-400"
        />

        {filtered.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400">No results found 😢</p>
        ) : (
            <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {visibleItems.map((item) => (
                    <article
                        key={item.id}
                        className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-lg dark:border-gray-700 dark:bg-gray-900"
                    >
                        <div className="overflow-hidden">
                        <Image
                            src={item.image}
                            alt=""
                            width={800}
                            height={600}
                            className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        </div>
                        <div className="flex flex-1 flex-col p-4">
                        <h2 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
                            <Link href={`/news/${item.slug}`} className="hover:underline">
                            {item.title}
                            </Link>
                        </h2>
                        <p className="mb-4 flex-1 text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                            {item.description}
                        </p>
                        <Link
                            href={`/news/${item.slug}`}
                            className="mt-auto text-sm font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
                        >
                            Read more →
                        </Link>
                        </div>
                    </article>
                ))}
            </div>

            {hasMore && (
                <div className="text-center">
                <button
                    onClick={() => setVisibleCount((prev) => prev + 6)}
                    className="mt-6 rounded bg-indigo-600 px-6 py-2 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                >
                    Show more
                </button>
                </div>
            )}
            </>
        )}
        </div>
    )
}
