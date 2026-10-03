/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "var(--color-ink)",
        paper: "var(--color-paper)",
        amber: "var(--color-amber)",
        coral: "var(--color-coral)",
        violet: "var(--color-violet)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Sora", "system-ui", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(20,18,26,0.04), 0 4px 16px rgba(20,18,26,0.06)",
        "card-hover": "0 2px 4px rgba(20,18,26,0.06), 0 8px 24px rgba(20,18,26,0.10)",
      },
    },
  },
  plugins: [],
};