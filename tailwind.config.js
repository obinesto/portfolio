/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./components/**/*.{js,jsx}", "./app/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)", foreground: "var(--foreground)",
        accent: "var(--accent)", muted: "var(--muted)", surface: "var(--surface)",
        paper: "var(--paper)", line: "var(--line)",
      },
      fontFamily: { sans: ["var(--font-inter)"], mono: ["var(--font-roboto-mono)"] },
    },
  },
  plugins: [],
};
