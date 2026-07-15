import type { Config } from "tailwindcss";

/**
 * Tailwind CSS v4 config.
 *
 * The design tokens (colors, fonts) live in `src/app/globals.css` under the
 * `@theme` block, which is authoritative in v4. This file only declares the
 * content sources Tailwind scans for class names.
 */
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
};

export default config;
