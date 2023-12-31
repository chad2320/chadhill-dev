/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern": "url('/src/assets/wallpaper.jpg')",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "circuit-pattern": "url('/src/assets/images/circuitBoard.svg')",
      },
      fontFamily: {
        chicago: ["Chicago"],
      },
    },
  },
  plugins: [],
};
