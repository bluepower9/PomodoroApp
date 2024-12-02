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
      },
      keyframes: {
        'note-expand': {
          '0%': {width: '40%', height: '10%'},
          '100%': {width: '100%', height: '100%'}
        },
        'note-shrink': {
          '0%': {width:'100%'},
          '100%': {width: '0'}
          // '0%': {transform: 'scaleY(1)'},
          // '100%': {transform: 'scaleY(2)'}
        }
      },
      animation: {
        'note-expand': 'note-expand .6s ease-in-out', 
        'note-shrink': 'note-shrink 1s ease-in-out'
      }
    },
    plugins: ['tailwind-scrollbar'],
  }
}

