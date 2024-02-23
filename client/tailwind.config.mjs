/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#1c2d3b', 
        secondary: '#0b141c', 
        terciary: '#30535e', 
        forty: '#497a8a',
        lighter: '#67afbc',
      },
    },
  },
  plugins: [],
}
