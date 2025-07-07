import { NextResponse } from 'next/server'
import { news } from '@/data/news'



export function GET(req: Request, { params }: { params: { slug: string } }) {
    const item = news.find((n) => n.slug === params.slug)
    if (!item) {
        return NextResponse.json({ message: 'Not found' }, { status: 404 })
    }
    return NextResponse.json(item)
}