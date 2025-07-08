import { Header } from '@/components/Header'
import { NewsList } from '@/components/NewsList'
import { fetchNews } from '@/lib/news'


type PageProps = {
  searchParams: Record<string, string | string[] | undefined>
}

export default async function Home({ searchParams }: PageProps) {
  const items = await fetchNews()
  const categoryParam = searchParams?.category
  const category = typeof categoryParam === 'string' ? categoryParam : 'all'
  const categories = ['all', ...Array.from(new Set(items.map((item) => item.category.toLowerCase())))]

  return (
    <>
      <Header categories={categories} />
      <main className="mx-auto max-w-6xl space-y-10 px-4 py-8">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">Последние новости</h1>
        <NewsList items={items} category={category} />
      </main>
    </>
  )
}
