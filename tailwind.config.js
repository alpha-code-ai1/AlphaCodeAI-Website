/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Deep-space canvas
        canvas: {
          DEFAULT: "#050014",
          soft: "#0A0420",
          muted: "#0F0A2A",
          deep: "#020009"
        },
        // Brand neon stops
        brand: {
          violet: "#A78BFA",
          indigo: "#818CF8",
          blue: "#60A5FA",
          cyan: "#22D3EE",
          fuchsia: "#E879F9",
          ink: "#C4B5FD",
          deep: "#67E8F9"
        },
        // Backward-compat aliases
        primary: { DEFAULT: "#050014", light: "#0A0420", dark: "#020009" },
        secondary: { DEFAULT: "#0A0420", light: "#0F0A2A", dark: "#020009" },
        accent: { DEFAULT: "#818CF8", light: "#A5B4FC", dark: "#6366F1" },
        highlight: { DEFAULT: "#22D3EE", light: "#67E8F9", dark: "#0891B2" }
      },
      fontFamily: {
        display: ['"Space Grotesk"', "system-ui", "sans-serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"]
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(110deg, #8B5CF6 0%, #6366F1 40%, #22D3EE 100%)",
        "brand-gradient-soft":
          "linear-gradient(135deg, rgba(139,92,246,0.22), rgba(34,211,238,0.16))",
        "grid-faint":
          "linear-gradient(to right, rgba(139,92,246,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(139,92,246,0.10) 1px, transparent 1px)",
        "radial-glow":
          "radial-gradient(circle at center, rgba(139,92,246,0.30), transparent 70%)"
      },
      backgroundSize: {
        grid: "46px 46px"
      },
      boxShadow: {
        soft: "0 10px 30px -12px rgba(0,0,0,0.6)",
        glow: "0 0 40px -8px rgba(139,92,246,0.55)",
        "glow-cyan": "0 0 40px -8px rgba(34,211,238,0.55)",
        "glow-fuchsia": "0 0 40px -8px rgba(232,121,249,0.55)",
        card: "0 20px 60px -20px rgba(0,0,0,0.8)",
        "neon-ring": "0 0 0 1px rgba(139,92,246,0.35), 0 0 30px -6px rgba(139,92,246,0.6)"
      },
      animation: {
        "gradient-x": "gradient-x 6s ease infinite",
        float: "float 7s ease-in-out infinite",
        "float-slow": "float 11s ease-in-out infinite",
        "pulse-slow": "pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        shimmer: "shimmer 2.5s linear infinite",
        marquee: "marquee 28s linear infinite",
        "marquee-reverse": "marquee-reverse 32s linear infinite",
        aurora: "aurora 16s ease-in-out infinite",
        "spin-slow": "spin 26s linear infinite",
        "spin-slower": "spin 45s linear infinite",
        "bounce-x": "bounce-x 1.4s ease-in-out infinite",
        "grid-pan": "grid-pan 22s linear infinite",
        twinkle: "twinkle 4s ease-in-out infinite",
        "border-flow": "border-flow 5s linear infinite",
        "neon-pulse": "neon-pulse 2.6s ease-in-out infinite",
        glitch: "glitch 2.8s steps(2, end) infinite",
        "glitch-2": "glitch-2 3.4s steps(2, end) infinite",
        scanline: "scanline 7s linear infinite",
        orbit: "orbit 12s linear infinite",
        "orbit-reverse": "orbit-reverse 18s linear infinite",
        levitate: "levitate 5s ease-in-out infinite",
        "hue-spin": "hue-spin 12s linear infinite",
        wobble: "wobble 9s ease-in-out infinite",
        "scroll-hint": "scroll-hint 1.8s ease-in-out infinite"
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
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" }
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
        },
        "border-flow": {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" }
        },
        "neon-pulse": {
          "0%, 100%": { opacity: "1", filter: "brightness(1)" },
          "50%": { opacity: "0.75", filter: "brightness(1.4)" }
        },
        glitch: {
          "0%, 92%, 100%": { transform: "translate(0)", clipPath: "inset(0 0 0 0)" },
          "93%": { transform: "translate(-3px, 2px)", clipPath: "inset(10% 0 60% 0)" },
          "95%": { transform: "translate(3px, -2px)", clipPath: "inset(60% 0 10% 0)" },
          "97%": { transform: "translate(-2px, -1px)", clipPath: "inset(30% 0 40% 0)" }
        },
        "glitch-2": {
          "0%, 94%, 100%": { transform: "translate(0)", opacity: "0" },
          "95%": { transform: "translate(4px, 0)", opacity: "0.8" },
          "97%": { transform: "translate(-4px, 0)", opacity: "0.6" }
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" }
        },
        orbit: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" }
        },
        "orbit-reverse": {
          "0%": { transform: "rotate(360deg)" },
          "100%": { transform: "rotate(0deg)" }
        },
        levitate: {
          "0%, 100%": { transform: "translateY(0) rotate(-1deg)" },
          "50%": { transform: "translateY(-12px) rotate(1deg)" }
        },
        "hue-spin": {
          "0%": { filter: "hue-rotate(0deg)" },
          "100%": { filter: "hue-rotate(360deg)" }
        },
        wobble: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "25%": { transform: "translate(3%, -4%) scale(1.06)" },
          "50%": { transform: "translate(-4%, 3%) scale(0.96)" },
          "75%": { transform: "translate(2%, 4%) scale(1.03)" }
        },
        "scroll-hint": {
          "0%": { transform: "translateY(0)", opacity: "0.9" },
          "70%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "0" }
        }
      }
    }
  },
  plugins: [require("@tailwindcss/typography")]
};
