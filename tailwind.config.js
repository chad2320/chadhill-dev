/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern": "url('/src/assets/wallpaper.jpg')",
      },
      fontFamily: {
        chicago: ["Chicago"],
      },
    },
  },
  plugins: [],
};
