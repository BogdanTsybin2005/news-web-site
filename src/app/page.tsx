'use client'

import dynamic from 'next/dynamic'
import { NewsList } from '@/components/NewsList'
import { fetchNews } from '@/lib/news'
import { useEffect, useState } from 'react'
import { NewsItem } from '@/lib/news'



const HeaderWrapper = dynamic(() => import('@/components/HeaderWrapper'), { ssr: false })

export default function Home() {
  const [items, setItems] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchNews().then((data) => {
      setItems(data)
      setLoading(false)
    })
  }, [])

  const categories = ['all', ...Array.from(new Set(items.map(item => item.category.toLowerCase())))]

  if (loading) return <div className="text-center mt-10 text-xl">Загрузка новостей...</div>

  return (
    <>
      <HeaderWrapper categories={categories} />

      <main className="mx-auto max-w-6xl space-y-10 px-4 py-8 pt-20">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">Latest News</h1>
        <NewsList items={items} />
      </main>
    </>
  )
}
