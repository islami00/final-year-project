import { defineConfig } from '@pandacss/dev';
import { preset } from '@tma/design-system/preset';

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Todo: Use a static import for presets.
  presets: ['@pandacss/dev/presets', preset],

  // Where to look for your css declarations
  include: ['./app/**/*.{ts,tsx}'],

  // The JSX framework to use
  jsxFramework: 'react',
  // The CSS Syntax to use to use
  syntax: 'object-literal',
  importMap: '@tma/design-system',
});
