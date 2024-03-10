import { defineConfig } from '@pandacss/dev';
import { preset } from './src/preset';

export default defineConfig({
  // Whether to use css reset
  preflight: true,
  outExtension: 'js',
  forceConsistentTypeExtension: true,
  presets: ['@pandacss/dev/presets', preset],

  // Where to look for your css declarations
  include: ['./src/**/*.{js,jsx,ts,tsx}'],

  // The output directory for your css system
  outdir: './src/__generated__',

  // The JSX framework to use
  jsxFramework: 'react',
  // The CSS Syntax to use to use
  syntax: 'object-literal',
  clean: true,
});
