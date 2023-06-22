/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        sansBold: ["sansBold", "sans-serif"],
        sansRegular: ["sansRegular", "sans-serif"],
        sansSemibold: ["sansSemibold", "sans-serif"],
        bahnschrift: ["bahnschrift", "sans-serif"],
        sansLight: ["sansLight", "sans-serif"],
        poppinRegular: ["poppinRegular", "sans-serif"],
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
      },
    },
  },
  plugins: [],
};
