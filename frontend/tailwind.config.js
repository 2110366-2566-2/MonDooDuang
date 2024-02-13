/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "example-color": "#ff0000",
        "mdd-muted-green" : "#76AA7B",
        "mdd-muted-green-hover" : "#5E8762",
        "mdd-muted-yellow" : "#DEAA6B",
        "mdd-muted-yellow-hover" : "#C89456",
        "mdd-mango-yellow" : "#E9AC12",
        "mdd-mango-yellow-hover" : "#CC9403",
        "mdd-nav-yellow" : "#FFD233",
        "mdd-grey": "#757575",
        "mdd-overlay-grey": "#424242",
        "mdd-silver-grey": "#E8E8E8",
        "mdd-dark-grey": "#A1A1A1",
        "mdd-almost-black": "#3B3B3B",
        "mdd-sand-yellow": "#E9AC12",
        "mdd-dark-sand": "#CC9403",
        "mdd-cancel-red": "#FF5656",
        "mdd-gray-boxbg": "#D9D9D9",
        "mdd-focus-yellow": "#FFD233",
        "mdd-gray-success-text": "#838383",
        "mdd-red-success-text": "#FF5656"
      },
      fontFamily: {
        sans: ["Prompt", "sans-serif"],
        "noto-sans": ["Noto Sans Thai", "sans-serif"],
        "example-font": ["Inter var", "sans-serif"],
        "libre-bodoni": ["Libre Bodoni", "serif"],
        "noto-sans-eng": ["Noto Sans", "sans-serif"],
      }
    }
  },
  plugins: []
}
