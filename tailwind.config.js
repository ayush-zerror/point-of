/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3A4C92",
        secondary: "#8FA2FF",
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};