
const colors = {
  dark: {
    100: "#161820"
  }
};

module.exports = {
  purge: false,
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: colors
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
