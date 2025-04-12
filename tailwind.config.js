/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',   // if you're using the app directory
    './pages/**/*.{js,ts,jsx,tsx}', // if you're using the pages directory
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#77c15c',       // Blue
        secondary: '#f7fff7',     // Gray
        background: '#343434'
      },
    },
  },
  plugins: [],
}