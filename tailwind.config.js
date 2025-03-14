// tailwind.config.js
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "425px",
        sm: "576px",
        "2xl": "1440px",
        "3xl": "1536px",
      },
      // colors: {
      //   text: {
      //     50: "#040316",
      //     100: "#08062d",
      //     200: "#100c5a",
      //     300: "#181287",
      //     400: "#2018b4",
      //     500: "#281fe0",
      //     600: "#534be7",
      //     700: "#7e78ed",
      //     800: "#a9a5f3",
      //     900: "#d4d2f9",
      //     950: "#eae9fc",
      //   },
      //   background: {
      //     50: "#050514",
      //     100: "#0a0a29",
      //     200: "#141452",
      //     300: "#1f1f7a",
      //     400: "#2929a3",
      //     500: "#3333cc",
      //     600: "#5c5cd6",
      //     700: "#8585e0",
      //     800: "#adadeb",
      //     900: "#d6d6f5",
      //     950: "#ebebfa",
      //   },
      //   primary: {
      //     50: "#050415",
      //     100: "#0a082b",
      //     200: "#141056",
      //     300: "#1e1881",
      //     400: "#2821ab",
      //     500: "#3129d6",
      //     600: "#5b54de",
      //     700: "#847ee7",
      //     800: "#ada9ef",
      //     900: "#d6d4f7",
      //     950: "#eaeafb",
      //   },
      //   secondary: {
      //     50: "#01001a",
      //     100: "#030033",
      //     200: "#050066",
      //     300: "#080099",
      //     400: "#0a00cc",
      //     500: "#0d00ff",
      //     600: "#3d33ff",
      //     700: "#6e66ff",
      //     800: "#9e99ff",
      //     900: "#cfccff",
      //     950: "#e7e5ff",
      //   },
      //   accent: {
      //     50: "#01001a",
      //     100: "#020033",
      //     200: "#030066",
      //     300: "#050099",
      //     400: "#0700cc",
      //     500: "#0800ff",
      //     600: "#3a33ff",
      //     700: "#6b66ff",
      //     800: "#9c99ff",
      //     900: "#ceccff",
      //     950: "#e6e5ff",
      //   },
      // },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
