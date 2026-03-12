/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Map Tailwind's `white` and `black` color tokens to CSS RGB variables
        // so utilities like `text-white` and `bg-black` become theme-aware.
        white: "rgb(var(--color-text-rgb) / <alpha-value>)",
        black: "rgb(var(--color-bg-rgb) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};
