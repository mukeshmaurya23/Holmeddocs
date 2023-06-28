/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.js"],
  theme: {
    screens: {
      xsm: "300px",
      xs: "475px",
      // => @media (min-width: 320px) { ... }

      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      fontFamily: {
        sansBold: ["sansBold", "sans-serif"],
        sansRegular: ["sansRegular", "sans-serif"],
        sansSemibold: ["sansSemibold", "sans-serif"],
        bahnschrift: ["bahnschrift", "sans-serif"],
        sansLight: ["sansLight", "sans-serif"],
        poppinRegular: ["poppinRegular", "sans-serif"],
        poppinItalic: ["poppinItalic", "sans-serif"],
        Henriette: ["Henriette", "sans-serif"],
      },
      colors: {
        greenMain: "#e2f6f3",
        navColor: "#252525",
        unnamedColor: "#000000",
        verifiCation: "#008282",
        formLabel: "#757993",
        otpText: " #545871",
        forgotPassword: "#292F33",
        navText: "#252525",
        yellowText: "#CF8B15",
        appointmentColor: "#F0F0F0",

        healthConcern: " #E2F6F3",
      },
    },
  },
  plugins: [],
};
