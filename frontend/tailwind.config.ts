import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        olive: {
          50: "#f4f7f4",
          100: "#e6ede6",
          200: "#cddccd",
          300: "#a8c3a8",
          400: "#8baf8b",
          500: "#5e8f5e",
          600: "#4a7c4a",
          700: "#3d643d",
          800: "#2d4a2d",
          900: "#1f331f",
          950: "#0f1a0f",
        },
        gold: {
          50: "#fdf9ef",
          100: "#faf0d4",
          200: "#f4dfa8",
          300: "#e8d5a3",
          400: "#d4b56a",
          500: "#c4963c",
          600: "#b07d2e",
          700: "#936328",
          800: "#784f26",
          900: "#634123",
          950: "#372110",
        },
        terracotta: {
          50: "#fdf5f2",
          100: "#fce8e1",
          200: "#facec2",
          300: "#f5a991",
          400: "#ed7d5c",
          500: "#c4603c",
          600: "#b04a2e",
          700: "#933c25",
          800: "#7a3422",
          900: "#662f21",
          950: "#37150e",
        },
        cream: "#FDF8F0",
        "warm-white": "#FEFCF9",
        charcoal: "#2D2D2D",
        stone: "#6B6B6B",
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["5rem", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        display: ["3.5rem", { lineHeight: "1.1", letterSpacing: "-0.015em" }],
        "heading-lg": ["2.5rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        heading: ["2rem", { lineHeight: "1.25" }],
        "heading-sm": ["1.5rem", { lineHeight: "1.3" }],
      },
      spacing: {
        section: "8rem",
        "section-sm": "5rem",
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out",
        "slide-up": "slideUp 0.8s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
