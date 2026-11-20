import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        body: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      colors: {
        paper: '#f7f8fa',
        surface: '#ffffff',
        sunken: '#e6e9ee',
        ink: '#0b0e13',
        muted: '#525d6b',
        subtle: '#647080',
        line: '#d5dae2',
        accent: {
          DEFAULT: '#0080ff',
          soft: '#e5f2ff',
        },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-25%)' },
        },
      },
      boxShadow: {
        card: '0 1px 2px rgba(40,40,40,0.04), 0 8px 24px -12px rgba(40,40,40,0.08)',
        lift: '0 2px 4px rgba(40,40,40,0.04), 0 24px 48px -20px rgba(40,40,40,0.18)',
      },
    },
  },
  plugins: [],
}

export default config
