/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontSize: {
        lg: 'calc(1rem + ((2vw - 0.48rem) * 1.3889))',
        title: 'calc(1.5rem + ((2vw - 0.48rem) * 1.3889))',
      },
      colors: {
        primary: 'var(--primary-color)',
        secondaryLight: 'var(--secondary-light-color)',
        secondary: 'var(--secondary-color)',
        white: '#ffffff',
        whiteOpacity: 'rgba(255, 255, 255, 0.5)',
      },
    },
  },
  plugins: [],
};
