import { Header } from '@/components/Header'
import { NewsList } from '@/components/NewsList'
import { fetchNews } from '@/lib/news'



export default async function Home() {
  const items = await fetchNews()
  const categories = ['all', ...Array.from(new Set(items.map(item => item.category.toLowerCase())))]


  return (
    <>
      <Header categories={categories} />
      <main className="mx-auto max-w-6xl space-y-10 px-4 py-8 pt-20">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">Latest News</h1>
        <NewsList items={items} />
      </main>
    </>
  )
}
