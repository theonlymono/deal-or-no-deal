import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'paper-bg': '#EAE5D9', // Main background
        'paper-dark': '#D4CDC0', // Scrollbars/Secondary
        'ink-black': '#1A1A1A', // Text & Borders
        'bloomberg-orange': '#FF5500', // Highlights/Actions
        'grid-line': '#A8A295', // Grid pattern
      },
      fontFamily: {
        'myanmar': ['MyanmarText', 'Noto Sans Myanmar', 'sans-serif'], // Body
        'myanmar-num': ['MyanmarNumbers', 'Noto Sans Myanmar', 'sans-serif'], // Numbers
        'header': ['MasterpieceUniType', 'sans-serif'], // Titles
        'mono': ['var(--font-jetbrains-mono)', 'monospace'], // Tech data
      },
      animation: {
        'marquee': 'marquee 20s linear infinite',
        'flicker': 'flicker 0.15s infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        flicker: {
          '0%': { opacity: '0.98' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0.98' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
