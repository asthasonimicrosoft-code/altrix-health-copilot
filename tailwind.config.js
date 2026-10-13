/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#04060a',
          900: '#070b14',
          850: '#0b1120',
          800: '#111827',
          700: '#1f2937',
        },
        brand: {
          cyan: '#00f2fe',
          blue: '#1c63ec',
          xrBlue: '#2f80ed',
          ultramarine: '#7000ff',
          neonGreen: '#00e699',
          bioGreen: '#1dec86',
          coral: '#ff3b69',
          amber: '#ffb800',
        }
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        display: ['"Outfit"', '"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -5px rgba(0, 242, 254, 0.35)',
        'glow-blue': '0 0 25px -5px rgba(28, 99, 236, 0.4)',
        'glow-green': '0 0 25px -5px rgba(0, 230, 153, 0.35)',
        'glow-coral': '0 0 25px -5px rgba(255, 59, 105, 0.35)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan': 'scan 4s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
