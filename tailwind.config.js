/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        search: "#EAEDEF",
        searchHover: "#E2E7E9",
        brandBg: "#D93A00",
        brandBgHover: "#962900",
        darkBg: "#1a1a1b",
        darkBorder: "#343536",
        darkBgHover: "#29292b",
        inputDark: "#272729",
        iconsDark: "#818384",
        darkBtn: "#d7dadc",
      },
    },
  },
  plugins: [],
};


