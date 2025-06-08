export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // A romantic, warm, and soft color palette for your app
      colors: {
        'background': '#FFF8F0', // A soft, creamy background
        'primary': '#E57373',    // A gentle red, for highlights and love notes
        'secondary': '#A1887F',  // A warm, earthy brown for text and secondary elements
        'accent': '#FFD54F',     // A soft gold for accents, like stars or highlights
        'text-main': '#5D4037',  // A darker brown for primary text, easy to read
        'text-light': '#8D6E63', // A lighter brown for subtitles or less important text
      },
      // Using beautiful, elegant fonts from Google Fonts
      fontFamily: {
        'sans': ['"Merriweather"', 'serif'],
        'display': ['"Dancing Script"', 'cursive'], // A beautiful script font for headings
      },
      // Defining custom animations for a delightful UX
      animation: {
        'fade-in': 'fadeIn 1s ease-in-out',
        'slide-in-bottom': 'slideInBottom 0.7s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInBottom: {
          '0%': { transform: 'translateY(50px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}