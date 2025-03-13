/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-darkBlue": "#012030",
        "custom-blue": "#13678A",
        "custom-lightBlue": "#45C4B0",
        "custom-lightGreen": "#9AEBA3",
        "custom-sandals": "#DAFDBA",
      },
    },
  },
  plugins: [],
};
