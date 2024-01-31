/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "example-color": "#ff0000",
        "mdd-grey": "#757575",
        "mdd-overlay-grey": "#424242",
        "mdd-silver-grey": "#E8E8E8",
        "mdd-dark-grey": "#A1A1A1",
        "mdd-sand-yellow": "#E9AC12"
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
