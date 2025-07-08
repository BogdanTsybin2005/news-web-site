import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'
import lineClamp from '@tailwindcss/line-clamp'
 

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}', './app/**/*.{ts,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [
    typography,
    lineClamp,
  ],
}
export default config
