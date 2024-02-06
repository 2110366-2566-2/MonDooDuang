/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "example-color": "#ff0000",
        "muted-green" : "#76AA7B",
        "muted-green-hover" : "#5E8762",
        "muted-yellow" : "#DEAA6B",
        "muted-yellow-hover" : "#C89456",
        "mango-yellow" : "#E9AC12",
        "mango-yellow-hover" : "#CC9403"

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
