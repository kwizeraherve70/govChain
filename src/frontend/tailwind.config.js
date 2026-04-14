/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
        'web3-dark':    '#090a18',
        'web3-darker':  '#060610',
        'web3-card':    'rgba(255, 255, 255, 0.04)',
        'web3-accent':  '#7c3aed', // Vivid violet (Krypt style)
        'web3-glow':    '#06b6d4', // Cyan (kept for internal use)
        'web3-purple':  '#9333ea', // Purple
        'web3-green':   '#10b981', // Emerald
        'web3-pink':    '#f72585', // Hot pink — Krypt signature
      },
      backgroundImage: {
        'mesh-gradient': `
          radial-gradient(at 0%   0%,   rgba(124,58,237,0.15) 0, transparent 50%),
          radial-gradient(at 50%  0%,   rgba(147,51,234,0.12) 0, transparent 50%),
          radial-gradient(at 85%  5%,   rgba(247,37,133,0.20) 0, transparent 55%),
          radial-gradient(at 100% 45%,  rgba(247,37,133,0.12) 0, transparent 45%)
        `,
        'gradient-accent':  'linear-gradient(135deg, #7c3aed 0%, #9333ea 50%, #f72585 100%)',
        'gradient-card':    'linear-gradient(135deg, rgba(124,58,237,0.1) 0%, rgba(147,51,234,0.05) 100%)',
      },
      boxShadow: {
        'glow-cyan':    '0 0 20px rgba(6, 182, 212, 0.5)',
        'glow-purple':  '0 0 20px rgba(147, 51, 234, 0.5)',
        'glow-indigo':  '0 0 20px rgba(124, 58, 237, 0.5)',
        'glow-pink':    '0 0 20px rgba(247, 37, 133, 0.5)',
        'glow-sm':      '0 0 10px rgba(124, 58, 237, 0.3)',
        'card':         '0 4px 24px rgba(0,0,0,0.5)',
        'glass':        '0 8px 32px rgba(0,0,0,0.45)',
      },
      animation: {
        'gradient-shift': 'gradient-shift 4s ease infinite',
        'float':          'float 6s ease-in-out infinite',
        'pulse-glow':     'pulse-glow 3s ease-in-out infinite',
        'fade-in-up':     'fade-in-up 0.6s ease-out forwards',
        'spin-slow':      'spin-slow 20s linear infinite',
        'pulse-slow':     'pulse 4s cubic-bezier(0.4,0,0.6,1) infinite',
      },
      keyframes: {
        'gradient-shift': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%':       { 'background-position': '100% 50%' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        'pulse-glow': {
          '0%, 100%': { 'box-shadow': '0 0 20px rgba(124,58,237,0.4)' },
          '50%':      { 'box-shadow': '0 0 40px rgba(124,58,237,0.7), 0 0 80px rgba(247,37,133,0.2)' },
        },
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to:   { transform: 'rotate(360deg)' },
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
  	}
  },
  plugins: [require("tailwindcss-animate")],
}
