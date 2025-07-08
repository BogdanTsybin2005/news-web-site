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
    const url = process.env.NEWS_API_URL;
    if (!url) return getLocalNews();
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error('Failed');
        const data = (await res.json()) as { articles?: unknown[] };
        if (!Array.isArray(data.articles)) return getLocalNews();
        return data.articles.map((a, idx) => {
            const article = a as Record<string, unknown>;
            return {
                id: (article.url as string) ?? idx.toString(),
                title: (article.title as string) ?? 'No title',
                slug: slugify((article.title as string) ?? idx.toString()),
                description: (article.description as string) ?? '',
                content: (article.content as string) ?? '',
                image: (article.urlToImage as string) ?? '/vercel.svg',
                category: (article.source as { name?: string })?.name ?? 'general',
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
