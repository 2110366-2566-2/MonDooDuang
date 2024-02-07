/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "example-color": "#ff0000"
      },
      fontFamily: {
        "sans": ["Prompt", "sans-serif"],
        "noto-sans": ["Noto Sans Thai", "sans-serif"],
        "example-font": ["Inter var", "sans-serif"],
        "libre-bodoni": ["Libre Bodoni", "serif"],
      }
    }
  },
  plugins: []
}
