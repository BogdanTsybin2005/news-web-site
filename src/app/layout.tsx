import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/context/ThemeContext'


import './globals.css'



export const metadata: Metadata = {
  title: 'NewsSite',
  description: 'Demo news web site built with Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-white text-gray-900 antialiased dark:bg-gray-950 dark:text-gray-100 font-sans overflow-y-auto">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
