/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}"], // Adjust paths as needed
    theme: {
      extend: {
        fontFamily: {
          sans: ['Roboto', 'sans-serif'], // Sets Roboto as default sans font
          // Optional: Add other font families
          body: ['Roboto', 'sans-serif'], // Example for body text
        },
      },
    },
    plugins: [],
  }