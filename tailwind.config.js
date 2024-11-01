/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-red": "var(--primary-red)",
        "primary-blue": "var(--primary-blue)",
        "secendary-blue": "var(--secendary-blue)",
        "third-blue": "var(--third-blue)",
        "fourth-blue": "var(--fourth-blue)",
        "primary-gray": "var(--primary-gray)",
        "secendary-gray": "var(--secendary-gray)",
        "third-gray": "var(--third-gray)",
        "fourth-gray": "var(--fourth-gray)",
        "primary-green": "var(--primary-green)",
        "primary-orange": "var(--primary-orange)",
      },
      transitionProperty: {
        "max-height": "max-height",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      backdropBlur: {
        "4xl": "4px",
      },
      animation: {
        spin988: "spin988 2s linear infinite",
      },
      keyframes: {
        spin988: {
          "0%": { transform: "scale(1) rotate(0)" },
          "20%": { transform: "scale(1.3) rotate(90deg)" },
          "25%": { transform: "scale(1.3) rotate(90deg)" },
          "45%": { transform: "scale(1) rotate(180deg)" },
          "50%": { transform: "scale(1) rotate(180deg)" },
          "70%": { transform: "scale(1.3) rotate(270deg)" },
          "75%": { transform: "scale(1.3) rotate(270deg)" },
          "95%": { transform: "scale(1) rotate(360deg)" },
          "100%": { transform: "scale(1) rotate(360deg)" },
        },
      },
    },
  },
  plugins: [],
};
