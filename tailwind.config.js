import { color } from '@mui/system';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        // Simple 16 column grid

        16: 'repeat(16, minmax(0, 1fr))',

        // Complex site-specific column configuration

        column: '20rem, 1fr',
      },
      borderRadius: {
        7: '7rem',
      },
      backgroundColor: {
        main: '#1a1a1a',
        sub: '#232323',
        primary: '#07c514',
        sup: '#263328', // 263328
      },
      colors: {
        primary: '#07c514',
        iconFill: {
          primary: '#FF0000', // Example primary color
          secondary: '#00FF00', // Example secondary color
        },
      },
      // c
      fill: ['#07c514'],
      borderColor: {
        primary: '#07c514',
      },
      fontFamily: {
        judson: ['Judson', 'sans-serif'],
      },
      spacing: {
        '40rem': '43rem',
      },
    },
  },
  plugins: [],
};

// primary-color: #07C51A;
// page-background: ##1A1A1A;
