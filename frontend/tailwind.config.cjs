/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'aussie-green': '#009B3A',
        'aussie-gold': '#FFCD00',
        'aussie-blue': '#0072B2',
        'aussie-red': '#FF385C',
        'aussie-purple': '#8A2BE2',
      },
    },
  },
  plugins: [],
}
