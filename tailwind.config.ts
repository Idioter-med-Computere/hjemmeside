import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        theme: {
          bg: '#121212',
          card: '#1e1e1e',
          black: '#000000',
          white: '#ffffff',
          muted: '#bbbbbb',
          purple: '#9b5de5',
        },
      },
      fontFamily: {
        display: ['var(--font-bungee)'],
        sans: ['var(--font-inter)'],
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(.2,.8,.2,1)',
      },
      scale: {
        '101': '1.01',
        '102': '1.02',
      },
    },
  },
  plugins: [],
}
export default config 