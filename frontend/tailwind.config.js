/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
                customBlue: '#0B093B', // Your custom color
                customGreen: '#38c172', // Another custom color
            },
    },
  },
  variants: {},
  plugins: [],
}
