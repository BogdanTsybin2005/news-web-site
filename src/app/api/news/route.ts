import { NextResponse } from 'next/server'
import { fetchNews } from '@/lib/news'



export async function GET() {
    const items = await fetchNews()
    return NextResponse.json(items)
}