/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#aefcaf",

          secondary: "#64b509",

          accent: "#4f8cc1",

          neutral: "#253441",

          "base-100": "#FDFCFD",

          info: "#5B7AC8",

          success: "#187251",

          warning: "#CD6F04",

          error: "#EF3B1F",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
