module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          50: '#ecfdf5', // emerald-50
          100: '#d1fae5', // emerald-100
          200: '#a7f3d0', // emerald-200
          300: '#6ee7b7', // emerald-300
          400: '#34d399', // emerald-400
          500: '#10b981', // emerald-500
          600: '#059669', // emerald-600
          700: '#047857', // emerald-700
          800: '#065f46', // emerald-800
          900: '#064e3b', // emerald-900
          950: '#022c22', // emerald-950
          DEFAULT: '#10b981', // emerald-500
        },
        'primary-hover': '#059669', // Primary Hover - emerald-600
        'primary-light': '#d1fae5', // Primary Light - emerald-100
        'background': '#f9fafb', // Background - gray-50
        'surface': '#ffffff', // Surface - white
        'border': '#e5e7eb', // Border - gray-200
        'text-primary': '#111827', // Text Primary - gray-900
        'text-secondary': '#4b5563', // Text Secondary - gray-600
        'text-tertiary': '#9ca3af', // Text Tertiary - gray-400
        'success': '#22c55e', // Success - green-500
        'warning': '#f59e0b', // Warning - amber-500
        'danger': '#ef4444', // Danger - red-500
        'info': '#3b82f6', // Info - blue-500
        'energy': {
          50: '#fff7ed', // orange-50
          100: '#ffedd5', // orange-100
          200: '#fed7aa', // orange-200
          300: '#fdba74', // orange-300
          400: '#fb923c', // orange-400
          500: '#f97316', // orange-500
          600: '#ea580c', // orange-600
          700: '#c2410c', // orange-700
          800: '#9a3412', // orange-800
          900: '#7c2d12', // orange-900
          950: '#431407', // orange-950
          DEFAULT: '#f97316', // orange-500
        }
      },
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'mono': ['DM Mono', 'ui-monospace', 'SFMono-Regular', 'monospace']
      },
      fontSize: {
        'display-lg': ['36px', { lineHeight: '1.2', fontWeight: '700' }],
        'display-md': ['30px', { lineHeight: '1.2', fontWeight: '700' }],
        'display-sm': ['24px', { lineHeight: '1.3', fontWeight: '700' }],
        'heading': ['20px', { lineHeight: '1.4', fontWeight: '600' }],
        'subheading': ['18px', { lineHeight: '1.4', fontWeight: '500' }],
        'numeric-lg': ['36px', { lineHeight: '1.2', fontWeight: '500' }],
        'numeric-md': ['24px', { lineHeight: '1.3', fontWeight: '500' }],
        'numeric-sm': ['16px', { lineHeight: '1.4', fontWeight: '400' }]
      }
    },
  },
  plugins: [],
}