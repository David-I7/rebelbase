import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ["var(--font-body)", ...fontFamily.sans],
        headings: ["var(--font-headings)", ...fontFamily.sans],
        display: ["var(--font-display)", ...fontFamily.mono],
      },
    },
  },
  plugins: [],
} satisfies Config;
