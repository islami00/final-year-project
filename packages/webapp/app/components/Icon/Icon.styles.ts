import { cva, type RecipeVariant } from '@tma/design-system';

export const sizeRecipe = cva({
  base: { display: 'inline', alignSelf: 'center', flexShrink: 0 },
  variants: {
    strokeWidth: {
      font: { strokeWidth: 1 },
      s16: { strokeWidth: 1 },
      s24: { strokeWidth: 1.5 },
    },
    size: {
      font: { width: 16, height: 16 },
      s16: { width: 16, height: 16 },
      s24: { width: 24, height: 24 },
    },
  },
});
export const gapRecipe = cva({
  base: { gap: '3xs', display: 'inline-flex', alignItems: 'center' },
});
export type IconSize = RecipeVariant<typeof sizeRecipe>['size'] | null;
