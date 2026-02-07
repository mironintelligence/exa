import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "#09090b", // Zinc-950
        foreground: "#fafafa", // Zinc-50
        primary: {
          DEFAULT: "#2563eb", // Electric Blue
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#27272a", // Zinc-800
          foreground: "#fafafa",
        },
      },
    },
  },
  plugins: [],
};
export default config;