import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Metadata } from 'next'
import { news } from '@/data/news'
import { Header } from '@/components/Header'



interface Params {
    slug: string
}


export function generateMetadata({ params }: { params: Params }): Metadata {
    const item = news.find((n) => n.slug === params.slug)
    if (!item) return {}
    return {
            title: item.title,
            description: item.description,
            openGraph: {
            images: [item.image],
        },
    }
}

export default function NewsPage({ params }: { params: Params }) {
    const item = news.find((n) => n.slug === params.slug)
    if (!item) notFound()
    return (
        <>
            <Header />
            <main className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">{item.title}</h1>
                <Image src={item.image} alt="" width={800} height={600} className="w-full h-80 object-cover mb-4" />
                <p>{item.content}</p>
            </main>
        </>
    )
}