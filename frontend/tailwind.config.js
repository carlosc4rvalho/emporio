/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        brown: '#803821',
        green: '#184D40',
        sand: '#C4AC75',
        white: '#FFFFFF',
      },
      fontFamily: {
        juana: ['juana', 'sans-serif'],
      },
      animation: {
        'slide-in': 'slide-in 1s ease-in-out 2s forwards',
      },
      keyframes: {
        'slide-in': {
          '0%': { opacity: '0', transform: 'translateX(-100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};