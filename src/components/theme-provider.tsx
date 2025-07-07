'use client'
import {createContext, useContext, useEffect, useState, ReactNode} from 'react'



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
        const initial = stored || (prefersDark ? 'dark' : 'light')
        setTheme(initial)
        document.documentElement.classList.toggle('dark', initial === 'dark')
    }, [])

    const toggle = () => {
        const next = theme === 'dark' ? 'light' : 'dark'
        setTheme(next)
        localStorage.setItem('theme', next)
        document.documentElement.classList.toggle('dark', next === 'dark')
    }

    return (
        <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>
    )
}

export function useTheme() {
    const ctx = useContext(ThemeContext)
    if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
    return ctx
}