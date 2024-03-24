# design-system

Design System for TMA, using pandacss and mantine as a base theme. Generated with [Nx](https://nx.dev).

## Building

Run `nx build design-system` to build the library.

## Local development

The package.json export fields are pointed to the source files in local (replaced on build), hence you can modify this without needing to rebuild the library.

However, you still need to run the panda generate command in watch mode if you're changing the panda preset.

### Errors

#### `Module level directives cause errors when bundled, 'use client' was ignored.` 
See: https://github.com/TanStack/query/pull/5161#issuecomment-1475871864

