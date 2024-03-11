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
        primary: '#0d6efd',
        secondaryLight: '#f6f9fe',
        secondary: '#605ba7',
        white: '#ffffff',
        whiteOpacity: 'rgba(255, 255, 255, 0.5)',
      },
    },
  },
  plugins: [],
};
