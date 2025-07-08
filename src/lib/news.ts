import { v4 as uuidv4 } from 'uuid';



export type NewsItem = {
    id: string;
    title: string;
    slug: string;
    description: string;
    content: string;
    image: string;
    category: string;
};

type ApiArticle = {
    source: { name: string };
    title: string;
    description: string;
    content: string;
    url: string;
    urlToImage: string;
};

let cachedNews: NewsItem[] | null = null;

function slugify(title: string): string {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

export async function fetchNews(): Promise<NewsItem[]> {
    if (cachedNews) return cachedNews;

    const key = process.env.NEWS_API_KEY;
    const country = process.env.NEWS_API_COUNTRY || 'us';

    if (!key) {
        console.error('❌ NEWS_API_KEY отсутствует в .env');
        return [];
    }

    const urls = [
        new URL('https://newsapi.org/v2/everything?q=apple&from=2025-07-07&sortBy=popularity'),
        new URL('https://newsapi.org/v2/everything?q=tesla&from=2025-06-08&sortBy=publishedAt'),
        new URL(`https://newsapi.org/v2/top-headlines?country=${country}&category=business`),
        new URL('https://newsapi.org/v2/top-headlines?sources=techcrunch'),
        new URL('https://newsapi.org/v2/everything?domains=wsj.com'),
    ];

    urls.forEach((url) => url.searchParams.set('apiKey', key));

    try {
        const responses = await Promise.all(urls.map((url) => fetch(url.toString()).catch(() => undefined)));
        const articles: NewsItem[] = [];

        for (const res of responses) {
            if (!res?.ok) continue;
            const data = await res.json();
            if (Array.isArray(data.articles)) {
            const validArticles = data.articles.filter(
                (item: Partial<ApiArticle>): item is ApiArticle => !!item.title && !!item.url
            );

            const mapped = validArticles.map((item: ApiArticle): NewsItem => ({
                id: `${item.url}-${uuidv4()}`,
                title: item.title,
                slug: slugify(item.title),
                description: item.description || '',
                content: item.content || '',
                image: item.urlToImage || '/vercel.svg',
                category: item.source?.name || 'general',
            }));

            articles.push(...mapped);
            }

        }

        console.log('✅ Загружено статей:', articles.length);
        cachedNews = articles;
        return articles;
    } catch (err) {
        console.error('💥 Ошибка при получении новостей:', err);
        return [];
    }
}

export async function fetchNewsBySlug(slug: string): Promise<NewsItem | undefined> {
    const items = await fetchNews();
    return items.find((n) => n.slug === slug);
}
