import { NextResponse } from 'next/server'
import { news } from '@/data/news'



export function GET() {
    return NextResponse.json(news)
}