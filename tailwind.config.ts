/** @type {import('tailwindcss').Config} */
export default {
  // 1. Updated content paths for Next.js App Router
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      gridTemplateColumns: {
        16: "repeat(16, minmax(0, 1fr))",
        column: "20rem, 1fr",
        columnMd: "14rem, 1fr",
      },
      borderRadius: {
        7: "7rem",
        10: "10.5rem",
      },
      backgroundColor: {
        main: "#1a1a1a",
        sub: "#263328",
        primary: "#07c514",
        sup: "#263328",
        error: "rgb(236, 166, 166)",
        success: "rgb(83, 96, 83)",
        mainOpacity: "rgba(50, 49, 49, 0.855)",
      },
      colors: {
        primary: "#07c514",
        iconFill: {
          primary: "#FF0000",
          secondary: "#00FF00",
        },
      },
      fill: {
        primary: "#07c514",
      },
      borderColor: {
        primary: "#07c514",
        sub: "#232323",
      },
      fontFamily: {
        judson: ["var(--font-judson)", "serif"], // Best practice for Next.js Fonts
      },
      spacing: {
        "40rem": "43rem",
      },
    },
  },
  plugins: [],
};