/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: { 
        "primary": "#181818", 
        "accent": "#4452FE",
      },
      fontFamily: {
        sans: 'Poppins',
      },
      screens: {
        'lg': '992px',
      },
      listStyleType: {
        disc: 'disc',
        decimal: 'decimal',
      },
    },
  },
  plugins: [],
}