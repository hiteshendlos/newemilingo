/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontSize: {
        "hfsize-1": "48px",
        "hfsize-2": "32px",
        "hfsize-3": "24px",
        "hfsize-4": "18px",
        "hfsize-5": "16px",

        "pfsize-1": "18px",
        "pfsize-2": "16px",
        "pfsize-3": "14px",
        "pfsize-4": "12px",

        "btfsize-1": "18px",
        "btfsize-2": "16px",
        "btfsize-3": "14px",
        "btfsize-3": "12px",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
