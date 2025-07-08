export type NewsItem = {
    id: string;
    title: string;
    slug: string;
    description: string;
    content: string;
    image: string;
    category: string;
};

let cachedLocal: NewsItem[] | null = null;
async function getLocalNews(): Promise<NewsItem[]> {
    if (!cachedLocal) {
        const mod = await import('../data/news');
        cachedLocal = mod.news as unknown as NewsItem[];
    }
    return cachedLocal;
}

function slugify(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
}

export async function fetchNews(): Promise<NewsItem[]> {
    const key = process.env.NEWSDATA_API_KEY
    if (!key) return getLocalNews()

    const params = new URLSearchParams({ apikey: key, country: process.env.NEWSDATA_COUNTRY || 'us' })
    const url = `https://newsdata.io/api/1/latest?${params}`
    try {
        const res = await fetch(url)
        if (!res.ok) throw new Error('Failed')
        const data = (await res.json()) as { results?: unknown[] }
        if (!Array.isArray(data.results)) return getLocalNews()

        return data.results.map((item, idx) => {
            const article = item as Record<string, unknown>
            const cat = article.category as string[] | string | undefined;
            return {
                id: (article.article_id as string) ?? idx.toString(),
                title: (article.title as string) ?? 'No title',
                slug: slugify((article.title as string) ?? idx.toString()),
                description: (article.description as string) ?? '',
                content: (article.content as string) ?? '',
                image: (article.image_url as string) ?? '/vercel.svg',
                category: Array.isArray(cat) ? (cat[0] ?? 'general') : (cat ?? 'general'),
            }
        })
    } catch {
        return getLocalNews();
    }
}

export async function fetchNewsBySlug(slug: string): Promise<NewsItem | undefined> {
    const items = await fetchNews();
    return items.find((n) => n.slug === slug);
}
