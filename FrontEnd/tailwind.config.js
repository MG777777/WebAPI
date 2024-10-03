/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",'./public/index.html'
  ],
  theme: {
    extend: {
      backgroundImage: theme => ({
        'bg-pattern': "url('../public/bg.jpg')",
                })
    },
  },
  plugins: [],
}

