import { defineConfig } from '@pandacss/dev';
import { preset } from './src/preset';

export default defineConfig({
  // Whether to use css reset
  preflight: true,
  outExtension: 'js',
  presets: ['@pandacss/dev/presets', preset],

  // Where to look for your css declarations
  include: [
    './src/**/*.{js,jsx,ts,tsx}',
    // Isn't this the same as importing the preset?
    './app/**/*.{ts,tsx}',
  ],

  // The output directory for your css system
  outdir: './src/__generated__',

  // The JSX framework to use
  jsxFramework: 'react',
  // The CSS Syntax to use to use
  syntax: 'object-literal',
  clean: true,
  importMap: {
    css: "@tma/design-system/css",
    patterns: "@tma/design-system/patterns",
    recipes: "@tma/design-system/recipes",
    jsx: "@tma/design-system/jsx",
  }
});
