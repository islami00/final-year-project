import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Todo: Use a static import for presets.
  presets: ['@pandacss/dev/presets', '@tma/design-system/preset'],

  // Where to look for your css declarations
  include: ['./app/**/*.{ts,tsx,js,jsx}'],

  // The JSX framework to use
  jsxFramework: 'react',
  // The CSS Syntax to use to use
  syntax: 'object-literal',
  // The expanded format is Required for imports to be extracted well.
  importMap: {
    css: '@tma/design-system',
    patterns: '@tma/design-system',
    recipes: '@tma/design-system',
    jsx: '@tma/design-system',
  },
});
