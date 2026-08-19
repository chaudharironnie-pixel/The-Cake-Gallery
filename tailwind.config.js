/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FFF8F0',
        blush: '#F4C2C2',
        'blush-dark': '#E8A0A0',
        chocolate: '#5C3D2E',
        'chocolate-light': '#7B5B4C',
        cocoa: '#3E2723',
        gold: '#D4A76A',
        'warm-white': '#FFFBF5',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
