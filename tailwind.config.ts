import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        background: "#070B14",
        foreground: "#F2F5FA",
        surface: {
          DEFAULT: "#0F1626",
          2: "#141C30",
        },
        border: "rgba(255,255,255,0.08)",
        text: {
          DEFAULT: "#F2F5FA",
          muted: "#8B93A7",
        },
        accent: {
          DEFAULT: "#FFB020", // Amber
          2: "#2E7DFF", // Blue
        },
        primary: {
          DEFAULT: "#FFB020",
          foreground: "#070B14",
        },
        secondary: {
          DEFAULT: "#2E7DFF",
          foreground: "#F2F5FA",
        },
        muted: {
          DEFAULT: "#8B93A7",
          foreground: "#8B93A7",
        },
        popover: {
          DEFAULT: "#0F1626",
          foreground: "#F2F5FA",
        },
        card: {
          DEFAULT: "#0F1626",
          foreground: "#F2F5FA",
        },
        ring: "#FFB020",
      },
      borderRadius: {
        xl: "20px", // xl = 20px as requested
        lg: "20px",
        md: "12px",
        sm: "8px",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      boxShadow: {
        "glow-amber": "0 0 20px rgba(255, 176, 32, 0.35)",
        "glow-amber-hover": "0 0 30px rgba(255, 176, 32, 0.5)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
