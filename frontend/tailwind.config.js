/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "example-color": "#ff0000",
        "mdd-text-field": "rgba(255, 255, 255, 0.54)",
        "mdd-yellow-radio-button": "#FFD233",
        "muted-green" : "#76AA7B",
        "muted-green-hover" : "#5E8762",
        "muted-yellow" : "#DEAA6B",
        "muted-yellow-hover" : "#C89456",
        "mango-yellow" : "#E9AC12",
        "mango-yellow-hover" : "#CC9403",
        "nav-yellow" : "#FFD233",
        "mdd-grey": "#757575",
        "mdd-overlay-grey": "#424242",
        "mdd-silver-grey": "#E8E8E8",
        "mdd-dark-grey": "#A1A1A1",
        "mdd-almost-black": "#3B3B3B",
        "mdd-sand-yellow": "#E9AC12",
        "mdd-dark-sand": "#CC9403",
        "mdd-invalid-field": "#FF5656",
        "mdd-invalid-label": "#FF7070",
        "mdd-dialog-orange": "#DEAA6B",
        "mdd-dialog-green": "#76AA7B",
        "mdd-dialog-gray": "#AEAEAE",
        "mdd-focus-yellow": "#FFD233",
        "cancel-red": "#FF5656",
        "gray-boxbg": "#D9D9D9",
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
