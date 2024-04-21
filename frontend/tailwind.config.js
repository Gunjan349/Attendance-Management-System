/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}",
    "./node_modules/raect-tailwindcss-datepicker/dist/index.esm.js",],
  theme: {
    extend : {
      colors : {
        'pink' : '#f7c9c9',
        'blue' : '#91a8d1',
      }
    }
  },
  plugins: [require("daisyui")],
}

