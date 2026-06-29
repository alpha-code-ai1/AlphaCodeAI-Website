/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Light, airy canvas
        canvas: {
          DEFAULT: "#F7F8FC",
          soft: "#FFFFFF",
          muted: "#EEF1F8",
          deep: "#E7ECF7"
        },
        // Brand gradient stops (vivid)
        brand: {
          violet: "#8B5CF6",
          indigo: "#6366F1",
          blue: "#3B82F6",
          cyan: "#22D3EE",
          fuchsia: "#E879F9",
          // Darker variants that stay legible on light backgrounds
          ink: "#4F46E5",
          deep: "#0891B2"
        },
        // Backward-compat aliases
        primary: { DEFAULT: "#F7F8FC", light: "#FFFFFF", dark: "#EEF1F8" },
        secondary: { DEFAULT: "#FFFFFF", light: "#FFFFFF", dark: "#EEF1F8" },
        accent: { DEFAULT: "#6366F1", light: "#818CF8", dark: "#4F46E5" },
        highlight: { DEFAULT: "#0891B2", light: "#22D3EE", dark: "#0E7490" }
      },
      fontFamily: {
        display: ['"Space Grotesk"', "system-ui", "sans-serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"]
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(110deg, #8B5CF6 0%, #6366F1 45%, #22D3EE 100%)",
        "brand-gradient-soft":
          "linear-gradient(135deg, rgba(139,92,246,0.14), rgba(34,211,238,0.10))",
        "grid-faint":
          "linear-gradient(to right, rgba(99,102,241,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(99,102,241,0.07) 1px, transparent 1px)",
        "radial-glow":
          "radial-gradient(circle at center, rgba(139,92,246,0.22), transparent 70%)"
      },
      backgroundSize: {
        grid: "46px 46px"
      },
      boxShadow: {
        soft: "0 10px 30px -12px rgba(15,23,42,0.12)",
        glow: "0 22px 55px -18px rgba(99,102,241,0.45)",
        "glow-cyan": "0 22px 55px -18px rgba(34,211,238,0.45)",
        card: "0 12px 40px -18px rgba(15,23,42,0.18)"
      },
      animation: {
        "gradient-x": "gradient-x 6s ease infinite",
        float: "float 7s ease-in-out infinite",
        "float-slow": "float 11s ease-in-out infinite",
        "pulse-slow": "pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        shimmer: "shimmer 2.5s linear infinite",
        marquee: "marquee 32s linear infinite",
        aurora: "aurora 16s ease-in-out infinite",
        "spin-slow": "spin 26s linear infinite",
        "bounce-x": "bounce-x 1.4s ease-in-out infinite",
        "grid-pan": "grid-pan 22s linear infinite",
        twinkle: "twinkle 4s ease-in-out infinite"
      },
      keyframes: {
        "gradient-x": {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-22px)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" }
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        },
        aurora: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(5%, -7%) scale(1.12)" },
          "66%": { transform: "translate(-6%, 5%) scale(0.94)" }
        },
        "bounce-x": {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(4px)" }
        },
        "grid-pan": {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "46px 46px" }
        },
        twinkle: {
          "0%, 100%": { opacity: "0.15", transform: "scale(0.8)" },
          "50%": { opacity: "0.7", transform: "scale(1.15)" }
        }
      }
    }
  },
  plugins: [require("@tailwindcss/typography")]
};
