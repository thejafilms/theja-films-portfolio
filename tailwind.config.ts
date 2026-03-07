import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B0B0B',
        'text-primary': '#F2F2F2',
        'text-secondary': '#9A9A9A',
      },
      fontFamily: {
        heading: ['var(--font-playfair)', 'Georgia', 'serif'],
        body: ['var(--font-satoshi)', 'system-ui', 'sans-serif'],
        neue: ['NeueMontreal', '-apple-system', 'BlinkMacSystemFont', 'Helvetica Neue', 'sans-serif'],
        dm: ['var(--font-dm)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
