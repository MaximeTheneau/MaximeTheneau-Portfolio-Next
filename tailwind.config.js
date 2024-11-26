/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
        mono: ['var(--font-roboto-mono)'],
      },
      fontSize: {
        lg: 'calc(1rem + ((1vw - 0.48rem) * 1.3889))',
        title: 'calc(1.5rem + ((2vw - 0.48rem) * 1.3889))',
        nav: 'calc(1.5rem + ((2vw - 0.48rem) * 1.3889))',
      },
      colors: {
        primary: 'var(--primary-color)',
        secondaryLight: 'var(--secondary-light-color)',
        secondary: 'var(--secondary-color)',
        white: 'var(--white-color)',
        whiteOpacity: 'rgba(255, 255, 255, 0.5)',
        black: 'var(--black-color)',
        blackOpacity: 'var(--black-opacity-color)',
        red: '#be0202',
        green: '#4bbe02',
        form: 'var(--form-color)',
      },
      width: {
        595: '595px',
      },
      animation: {
        'infinite-scroll': 'infinite-scroll 10s linear infinite',
      },
      boxShadow: {
        custom: '0px -20px 20px 100vh rgba(151, 151, 151, 0.8)',
      },
      keyframes: {
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
      },
    },
  },
  plugins: [],
};
