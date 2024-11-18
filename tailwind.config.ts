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
      transitionProperty: {
        brightness: "brightness",
      },
      fontFamily: {
        body: ["var(--font-body)", ...fontFamily.sans],
        headings: ["var(--font-headings)", ...fontFamily.sans],
        display: ["var(--font-display)", ...fontFamily.mono],
      },
      brightness: {
        "115": "115%",
      },
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        "on-primary": "var(--color-on-primary)",
        "on-secondary": "var(--color-on-secondary)",
        link: "var(--color-link)",

        "primary-container": "var(--color-primary-container)",
        "secondary-container": "var(--color-secondary-container)",
        "on-primary-container": "var(--color-on-primary-container)",
        "on-secondary-container": "var(--color-on-secondary-container)",
        surface: "var(--color-surface)",
        "surface-container-lowest": "var(--color-surface-container-lowest)",
        "surface-container-low": "var(--color-surface-container-low)",
        "surface-container-normal": "var(--color-surface-container-normal)",
        "surface-container-high": "var(--color-surface-container-high)",
        "on-surface-body": "var(--color-on-surface-body)",
        "on-surface-body-varient-low":
          "var(--color-on-surface-body-varient-low)",
        "on-surface-body-varient-lowest":
          "var(--color-on-surface-body-varient-lowest)",
        "on-surface-heading": "var(--color-on-surface-heading)",
        "on-surface-heading-varient": "var(--color-on-surface-heading-varient)",

        outline: "var(--color-outline)",
        "outline-varient": "var(--color-outline-varient-low)",
        "outline-varient-lowest": "var(--color-outline-varient-lowest)",

        "inverse-surface": "var(--color-inverse-surface)",
        "inverse-on-surface": "var(--color-inverse-on-surface)",
        "inverse-on-surface-varient": "var(--color-inverse-on-surface-varient)",
        "inverse-primary": "var(--color-primary)",
      },
    },
  },
  plugins: [],
} satisfies Config;
