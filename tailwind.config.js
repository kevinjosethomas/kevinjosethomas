/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      screens: {
        "3xl": "1920px",
        "4xl": "2560px",
      },
    },
  },
  plugins: [],
};
