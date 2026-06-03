/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        black: '#080808',
        'black-soft': '#11100e',
        'off-white': '#f0ede6',
        cream: '#e8e4db',
        gold: '#c9a96e',
        'gold-light': '#e4c99a',
        muted: '#9a9890',
        line: 'rgba(240, 237, 230, 0.14)',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        serif: ['Instrument Serif', 'serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      transitionTimingFunction: {
        expo: 'cubic-bezier(0.16, 1, 0.3, 1)',
        smooth: 'cubic-bezier(0.76, 0, 0.24, 1)',
      },
      keyframes: {
        draw: {
          from: { transform: 'scaleY(0)', transformOrigin: 'top' },
          to: { transform: 'scaleY(1)', transformOrigin: 'top' },
        },
      },
      animation: {
        draw: 'draw 1.7s infinite',
      },
    },
  },
  plugins: [],
}
