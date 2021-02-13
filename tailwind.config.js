module.exports = {
  purge: ["./src/**/*.js"],
  theme: {
    extend: {
      colors: {
        dark: {
          100: "#161820",
          200: "#1C1D28",
          300: "#202230",
          400: "#282C3B"
        }
      },
      fontFamily: {
        inter: "Inter",
        proxima: "proxima-soft"
      },
      spacing: {
        100: "25rem",
        112: "28rem"
      },
      screens: {
        "2xl": "1537px"
      }
    }
  },
  variants: {},
  plugins: [],
}
