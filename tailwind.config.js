/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      keyframes: {
        "move-background": {
          "0%": { "background-position": "-100% 0%" },
          "100%": { "background-position": "0% 0%" },
        },
        bounce: {
          "0%, 20%, 100%": {
            transform: "translate(0%, 0%)",
          },
          "10%": {
            transform: "translate(0%, -12%)",
          },
          motion: "bounce 1s infinite",
        },
      },
      animation: {
        "move-background": "move-background 100s linear infinite",
      },
    },
  },
  plugins: [],
};
