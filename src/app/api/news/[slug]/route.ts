import { NextResponse } from 'next/server'
import { fetchNewsBySlug } from '@/lib/news'
type RouteCtx = { params: Promise<Record<string, string | string[] | undefined>> }
 
 
 
export async function GET(_req: Request, { params }: RouteCtx) {
    const resolved = await params
    const slug = typeof resolved?.slug === 'string' ? resolved.slug : undefined
    const item = slug ? await fetchNewsBySlug(slug) : undefined
    if (!item) {
        return NextResponse.json({ message: 'Not found' }, { status: 404 })
    }
    return NextResponse.json(item);
}
