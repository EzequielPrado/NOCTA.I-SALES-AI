/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Sora', 'system-ui', 'sans-serif'],
      },
      colors: {
        'nocta-purple': '#6831f3',
        'nocta-dark-purple': '#140037',
        'nocta-dark-bg': '#04020a',
        'nocta-dark-card': '#1d1d1d',
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'grid-glow': 'grid-glow 4s ease-in-out infinite alternate',
        'in': 'slideIn 0.3s ease-out',
        'slide-in-from-top-2': 'slideInFromTop 0.3s ease-out',
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
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'grid-glow': {
          '0%': { opacity: '0.1' },
          '100%': { opacity: '0.3' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInFromTop: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backdropBlur: {
        'xs': '2px',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(104, 49, 243, 0.3)',
        'glow-lg': '0 0 40px rgba(104, 49, 243, 0.4)',
        'neon': '0 0 5px rgba(104, 49, 243, 0.5), 0 0 20px rgba(104, 49, 243, 0.5), 0 0 35px rgba(104, 49, 243, 0.5), 0 0 50px rgba(104, 49, 243, 0.5)',
      },
      backgroundImage: {
        'grid-pattern': `
          linear-gradient(rgba(104, 49, 243, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(104, 49, 243, 0.1) 1px, transparent 1px)
        `,
      },
      backgroundSize: {
        'grid': '50px 50px',
      },
    },
  },
  plugins: [],
};