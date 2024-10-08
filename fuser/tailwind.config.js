/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        slide: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      backgroundImage: {
        'custom-radial-gradient': ' ',
        'custom-2':" radial-gradient(circle, rgba(232,235,236,1) 8%, rgba(255,255,255,1) 100%)"
      },
      animation: {
        slide: "slide 20s linear infinite",
      },
    },
  },

  plugins: [],
};
