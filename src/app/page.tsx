'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { NewsItem } from '@/data/news'
import { Header } from '@/components/Header'
import { useSearchParams } from 'next/navigation'



export default function Home() {
  const [items, setItems] = useState<NewsItem[]>([])
  const [search, setSearch] = useState('')
  const params = useSearchParams()
  const category = params.get('category') || 'all'

  useEffect(() => {
    fetch('/api/news')
      .then((r) => r.json())
      .then((d: NewsItem[]) => setItems(d))
  }, [])

  const filtered = items.filter(
    (n) =>
      (category === 'all' || n.category === category) &&
      n.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <Header />
      <main className="container mx-auto p-4">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-6 w-full p-2 border rounded dark:bg-gray-800"
        />
        <div className="grid gap-6 md:grid-cols-2">
          {filtered.map((item) => (
            <div key={item.id} className="border rounded-lg overflow-hidden bg-white dark:bg-gray-900">
              <Image src={item.image} alt="" width={800} height={600} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">
                  <Link href={`/news/${item.slug}`}>{item.title}</Link>
                </h2>
                <p className="text-gray-700 dark:text-gray-300">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
       </main>
    </>
  )
}
