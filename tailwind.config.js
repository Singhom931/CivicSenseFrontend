/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "index.html",
  ],
  theme: {
    extend: {
      colors:{
        softmint: '#e6f9f3'
      },
    },
  },
  plugins: [],
}

