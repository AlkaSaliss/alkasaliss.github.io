/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["night", "sunset"],
  },
  plugins: [
    require('daisyui'),
  ],
}