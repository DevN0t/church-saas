/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      animation: {
        'bounce-x': 'bounceX 1s infinite',
      },
      keyframes: {
        bounceX: {
          '0%, 100%': { transform: 'translateX(0%)', animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)' },
          '50%': { transform: 'translateX(-25%)', animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)' },
        }
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}
