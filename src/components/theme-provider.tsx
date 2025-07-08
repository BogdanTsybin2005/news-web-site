'use client'
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
export type Theme = 'light' | 'dark'
 
 
 
interface ThemeCtx {
    theme: Theme
    toggle: () => void
}
 
const ThemeContext = createContext<ThemeCtx | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>('light')

    useEffect(() => {
        const stored = (localStorage.getItem('theme') as Theme | null) || undefined
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        setTheme(stored || (prefersDark ? 'dark' : 'light'))
    }, [])

    useEffect(() => {
        localStorage.setItem('theme', theme)
         const root = document.documentElement
         root.classList.remove('light', 'dark')
        root.classList.add(theme)
    }, [theme])
 
    const toggle = () => {
        setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
    }
 
    return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>
 }
 
 export function useTheme() {
    const ctx = useContext(ThemeContext)
    if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
    return ctx;
 }
