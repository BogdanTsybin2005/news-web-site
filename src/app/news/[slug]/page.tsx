import { notFound } from 'next/navigation'
import Image from 'next/image'
import { fetchNewsBySlug, fetchNews } from '@/lib/news'
import { Header } from '@/components/Header'
 
 
 
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const item = await fetchNewsBySlug(slug)
    if (!item) return {}
    return {
        title: item.title,
        description: item.description,
        openGraph: { images: [item.image] },
    }
}
 
export default async function NewsPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const item = await fetchNewsBySlug(slug)
    if (!item) notFound()
    const all = await fetchNews()
    const categories = ['all', ...Array.from(new Set(all.map(i => i.category.toLowerCase())))]
 
    return (
        <>
            <Header categories={categories} />
            <main className="container mx-auto max-w-3xl p-4 space-y-6">
                <h1 className="text-3xl font-bold">{item.title}</h1>
                <Image
                    src={item.image}
                    alt=""
                    width={800}
                    height={600}
                    className="rounded shadow-md object-cover w-full max-h-[400px]"
                />
                <article className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: item.content }} />
            </main>
        </>
    )
 }
