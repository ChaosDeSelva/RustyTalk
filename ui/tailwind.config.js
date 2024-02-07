/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        EastBlack: '#121719',
        ChocolateBlack: '#13181B',
        QuickSilver: '#A3A3A3',
        Gunmetal: '#263036',
        FarEastBlack: '#151515',
        Platinum: '#E6E6DF',
        PearlAqua: '#7ACAC5'
      }
    },
  },
  plugins: [],
}