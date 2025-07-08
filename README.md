# NewsSite
 
Demo news website built with Next.js, TypeScript and Tailwind CSS.
The UI uses modern Tailwind components with a gradient header, responsive cards and dark mode support.
Articles are fetched from a configurable API at build time with a fallback to local mock data.
 
## Features
 
- News feed loaded from a remote API via `/api/news`.
- Dynamic pages for each article with SEO friendly slugs.
- Search by title and category filter.
- Server-side rendering for better SEO.
- Light and dark themes with selection stored in `localStorage`.
- Responsive layout using Tailwind CSS.
- Rich typography styles via the Tailwind Typography plugin.
 

## Development
 

Install dependencies and start the development server:
 
```bash
npm install
npm run dev
```
 
Open <http://localhost:3000> in your browser.

