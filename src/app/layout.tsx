import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/context/ThemeContext'



export const metadata: Metadata = {
  title: 'NewsSite',
  description: 'Demo news web site built with Next.js',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="relative z-0 min-h-screen bg-white text-gray-900 antialiased dark:bg-gray-950 dark:text-gray-100 font-sans overflow-y-auto">
        <ThemeProvider>
          <div className="relative z-0">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  )
}
