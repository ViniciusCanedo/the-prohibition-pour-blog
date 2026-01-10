import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        speakeasy: {
          white: "#FDFDFD",
          champagne: "#EACEAA",
          copper: "#85431E",
          gold: "#C69A48",
          amber: "#D39858",
          brown: "#34150F",
          darkBrown: "#150C0C",
          nearBlack: "#060606",
        },
          semantic: {
            background: "#060606",
            surface: "#150C0C",
            primaryText: "#FDFDFD",
            secondaryText: "#EACEAA",
            highlight: "#C69A48",
            accent: "#D39858",
            border: "rgba(198,154,72,0.25)",
            card: "#34150F",
            assistantBubble: "#34150F",
            userBubble: "rgba(198,154,72,0.08)",
          }
      },
      fontFamily: {
        display: ["Sacred Bridge", "serif"],
        body: ["Poppins", "sans-serif"],
      },
      borderRadius: {
        '2xl': '1rem',
      },
      letterSpacing: {
        display: "0.05em",
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config;
