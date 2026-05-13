import type { Config } from 'tailwindcss';

/**
 * Tailwind v4 reads most theme data from CSS via the `@theme` directive
 * in src/styles/globals.css. This file is kept minimal and only declares
 * content paths plus a couple of utility-level toggles.
 *
 * RTL behavior: We rely exclusively on Tailwind's logical-property utilities
 * (ps-/pe-, ms-/me-, start-/end-, text-start/text-end, rounded-s-/rounded-e-).
 * No pl/pr or ml/mr utilities are permitted in component code — ESLint can
 * forbid them via the rule below (see eslint config / README).
 */
const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/hooks/**/*.{ts,tsx}',
    './src/lib/**/*.{ts,tsx}'
  ],
  // Tailwind v4 doesn't require darkMode here when set via @custom-variant in CSS,
  // but we leave the explicit declaration for editor tooling.
  darkMode: 'class',
  future: {
    hoverOnlyWhenSupported: true
  }
};

export default config;
