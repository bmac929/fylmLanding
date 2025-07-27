/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#3E1B3E',
        secondary: '#FDA400',
        tertiary: '#B5004E',
        dark: '#160016',
        light: '#EBEAEA',
      },
      fontFamily: {
        figtree: ['Figtree', 'sans-serif'],
      },
      fontSize: {
        'header-1': '36px',
        'header-2': '32px',
        'header-3': '28px',
        'body-large': '19px',
        'body': '15px',
        'small': '13px',
        'tiny': '11px',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};