/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
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
        accent: {
          purple: '#B461A8',
          indigo: '#605ba7',
        },
        glass: {
          white: 'rgba(255, 255, 255, 0.1)',
          dark: 'rgba(33, 34, 41, 0.8)',
        },
        surface: {
          elevated: '#FAFBFC',
          sunken: '#F3F4F6',
        },
      },
      width: {
        595: '595px',
      },
      zIndex: {
        30: '30',
        40: '40',
        50: '50',
        60: '60',
      },
      boxShadow: {
        custom: '0px -20px 20px 100vh rgba(151, 151, 151, 0.8)',
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'reveal-up': {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'reveal-down': {
          '0%': { opacity: '0', transform: 'translateY(-40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'reveal-left': {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'reveal-right': {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'reveal-scale': {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'scale-bounce': {
          '0%': { transform: 'scale(0)' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '75%': { transform: 'translateX(5px)' },
        },
        confetti: {
          '0%': { transform: 'translateY(-100%) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(100vh) rotate(720deg)', opacity: '0' },
        },
        'progress-fill': {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.4s ease-out',
        'reveal-up': 'reveal-up 0.6s ease-out forwards',
        'reveal-down': 'reveal-down 0.6s ease-out forwards',
        'reveal-left': 'reveal-left 0.6s ease-out forwards',
        'reveal-right': 'reveal-right 0.6s ease-out forwards',
        'reveal-scale': 'reveal-scale 0.6s ease-out forwards',
        'slide-up': 'slide-up 0.3s ease-out',
        'scale-in': 'scale-in 0.3s ease-out',
        'scale-bounce': 'scale-bounce 0.5s ease-out',
        shake: 'shake 0.4s ease-in-out',
        confetti: 'confetti 3s ease-in-out forwards',
        'progress-fill': 'progress-fill 0.5s ease-out forwards',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
