import { defineConfig } from '@pandacss/dev';
import { preset } from '@tma/design-system/preset';

export default defineConfig({
  // Whether to use css reset
  preflight: true,
  outExtension: 'js',

  // Todo: Use a static import for presets.
  presets: ['@pandacss/dev/presets', preset],

  // Where to look for your css declarations
  include: ['./app/**/*.{ts,tsx}'],
  // The output directory for your css system
  outdir: './src/__generated__',

  // The JSX framework to use
  jsxFramework: 'react',
  // The CSS Syntax to use to use
  syntax: 'object-literal',
  clean: true,
  importMap: '@tma/design-system',
});
