import { defineConfig } from '@pandacss/dev';
import { preset } from '@tma/design-system';

export default defineConfig({
  outExtension: 'js',

  presets: ['@pandacss/dev/presets', preset],

  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: [
    './app/routes/**/*.{ts,tsx,js,jsx}',
    './app/components/**/*.{ts,tsx,js,jsx}',
    './app/modules/**/*.{ts,tsx,js,jsx}',
    "./app/**.{ts,tsx}"
  ],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {},
  },

  // The output directory for your css system
  outdir: 'styled-system',

  // The JSX framework to use
  jsxFramework: 'react',
  // The CSS Syntax to use to use
  syntax: 'object-literal',
});
