/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBlue: "#32288A",
        grey: "#F6F6F7",
        pink: "#9C16A8",
      },
      height: {
        "93vh": "93.5vh",
        "45vh": "45vh",
      },
    },
  },
  plugins: [],
};
