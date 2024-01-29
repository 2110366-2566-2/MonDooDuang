/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "example-color": "#ff0000"
      },
      fontFamily: {
        "example-font": ["Inter var", "sans-serif"]
      }
    }
  },
  plugins: []
}
