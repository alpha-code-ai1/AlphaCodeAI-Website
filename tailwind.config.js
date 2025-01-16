module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0A1930",
          light: "#142642",
          dark: "#060F1D"
        },
        secondary: {
          DEFAULT: "#112B4A",
          light: "#1D3B5F",
          dark: "#0A1C32"
        },
        accent: {
          DEFAULT: "#2563EB",
          light: "#3B82F6",
          dark: "#1D4ED8"
        },
        highlight: {
          DEFAULT: "#06B6D4",
          light: "#22D3EE",
          dark: "#0891B2"
        },
        neon: {
          blue: "#22D3EE",
          purple: "#A855F7",
          pink: "#EC4899",
          teal: "#14B8A6"
        }
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2s linear infinite'
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0)'
          },
          '50%': {
            transform: 'translateY(-20px)'
          }
        },
        glow: {
          '0%': {
            boxShadow: '0 0 5px rgb(44 116 179 / 0.5), 0 0 20px rgb(44 116 179 / 0.3)'
          },
          '100%': {
            boxShadow: '0 0 10px rgb(44 116 179 / 0.8), 0 0 30px rgb(44 116 179 / 0.5)'
          }
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
} 