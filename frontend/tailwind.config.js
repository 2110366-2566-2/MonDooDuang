/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "example-color": "#ff0000",
        "text-field": "rgba(255, 255, 255, 0.54)",
        "yellow-radio-button": "#FFD233"
      },
      fontFamily: {
        "sans": ["Prompt", "sans-serif"],
        "noto-sans": ["Noto Sans Thai", "sans-serif"],
        "example-font": ["Inter var", "sans-serif"]
      }
    }
  },
  plugins: []
}
