/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        cream: '#FAF7F2',
        ink: '#0A0A0A',
        accent: '#174C35',
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'var(--font-noto-kr)', 'Georgia', 'serif'],
        sans: ['var(--font-lato)', 'var(--font-noto-kr)', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'pulse-slow': {
          '0%, 100%': { opacity: 0.5 },
          '50%': { opacity: 0.9 },
        },
        'fade-up': {
          from: { opacity: 0, transform: 'translateY(24px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        'pulse-slow': 'pulse-slow 6s ease-in-out infinite',
        'fade-up': 'fade-up 0.7s ease-out forwards',
      },
    },
  },
  plugins: [],
};
