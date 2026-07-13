import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        ink: {
          950: "#070b14",
          900: "#0c1220",
          800: "#111827",
        },
        panel: "rgba(17, 24, 39, 0.8)",
        risk: {
          green: "#7fd99a",
          yellow: "#e6c07b",
          red: "#f07178",
        },
      },
      fontFamily: {
        sans: ["var(--font-plex)", "system-ui", "sans-serif"],
        mono: ["var(--font-plex-mono)", "ui-monospace", "monospace"],
        display: ["var(--font-display)", "var(--font-plex)", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px rgba(245, 158, 11, 0.12)",
      },
    },
  },
  plugins: [],
};
export default config;
