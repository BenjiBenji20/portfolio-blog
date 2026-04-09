/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Shared Colors
        cyan: {
          500: '#06b6d4',
          600: '#0891b2',
        },
        red: {
          500: '#ef4444',
        },
        yellow: {
          500: '#eab308',
        },
        // Semantic Theme Map
        background: 'var(--background)',
        card: 'var(--card-bg)',
        'card-hover': 'var(--card-hover)',
        border: 'var(--border-color)',
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
        tertiary: 'var(--text-tertiary)',
        accent: 'var(--accent)',
        'accent-hover': 'var(--accent-hover)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
