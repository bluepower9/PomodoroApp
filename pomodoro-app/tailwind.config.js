/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'heading': ['Julius Sans One', 'sans-serif']
      }
    },
  },
  plugins: ['tailwind-scrollbar'],
}

