import { NextResponse } from 'next/server'
import { fetchNewsBySlug } from '@/lib/news'



export async function GET(
    _req: Request,
    { params }: { params: { slug: string } }
) {
    const item = await fetchNewsBySlug(params.slug)
    if (!item) {
        return NextResponse.json({ message: 'Not found' }, { status: 404 })
    }
    return NextResponse.json(item)
}
