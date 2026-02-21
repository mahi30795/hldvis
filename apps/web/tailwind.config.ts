import type { Config } from 'tailwindcss'

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: 'rgb(var(--c-surface) / <alpha-value>)',
          alt: 'rgb(var(--c-surface-alt) / <alpha-value>)',
          input: 'rgb(var(--c-surface-input) / <alpha-value>)',
          hover: 'rgb(var(--c-surface-hover) / <alpha-value>)',
        },
        content: {
          DEFAULT: 'rgb(var(--c-content) / <alpha-value>)',
          secondary: 'rgb(var(--c-content-sec) / <alpha-value>)',
          muted: 'rgb(var(--c-content-muted) / <alpha-value>)',
          faint: 'rgb(var(--c-content-faint) / <alpha-value>)',
        },
        divider: {
          DEFAULT: 'rgb(var(--c-divider) / <alpha-value>)',
          subtle: 'rgb(var(--c-divider-subtle) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'rgb(var(--c-accent) / <alpha-value>)',
          hover: 'rgb(var(--c-accent-hover) / <alpha-value>)',
        },
      },
    },
  },
  plugins: [],
} satisfies Config
