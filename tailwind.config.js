/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0a0a0a',
        surface1: '#111111',
        surface2: '#161616',
        primary: '#F2EDE4',
        muted: '#6B6560',
        gold: '#C9A84C',
        line: 'rgba(242,237,228,0.07)',
      },
      fontFamily: {
        // Display: all headings use Inter
        display: ['"Inter"', 'ui-sans-serif', 'sans-serif'],
        // Body EN
        sans: ['"Inter"', 'ui-sans-serif', 'sans-serif'],
        // Body AR
        ar: ['"Inter"', 'ui-sans-serif', 'sans-serif'],
      },
      letterSpacing: {
        eyebrow: '0.2em',
        wide2: '0.25em',
        logo: '0.3em',
      },
      transitionTimingFunction: {
        // Mirror of the Lenis easing for visual cohesion
        smooth: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translate3d(0,0,0)' },
          to: { transform: 'translate3d(-50%,0,0)' },
        },
        'marquee-reverse': {
          from: { transform: 'translate3d(-50%,0,0)' },
          to: { transform: 'translate3d(0,0,0)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        'scroll-dot': {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '20%': { opacity: '1' },
          '80%': { opacity: '1' },
          '100%': { transform: 'translateY(180%)', opacity: '0' },
        },
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
        'marquee-reverse': 'marquee-reverse 38s linear infinite',
        shimmer: 'shimmer 1.6s infinite',
        'scroll-dot': 'scroll-dot 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
