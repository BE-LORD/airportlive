import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'v3-cream': '#F8F7F3',
        'v3-main': '#F8F7F3',
        'v3-soft': '#EFEEE8',
        'v3-surface': '#FFFFFF',
        'v3-ink': '#101010',
        'v3-navy': '#171717',
        'v3-charcoal': '#171717',
        'v3-ink-soft': '#343434',
        'v3-muted': '#6F6B63',
        'v3-line': '#DEDBD2',
        'v3-gold': '#B88A44',
        'v3-blue': '#233A5E',
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'serif'],
        sans: ['var(--font-dm-sans)', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      }
    },
  },
  plugins: [],
};
export default config;
