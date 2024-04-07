import {
  defaultVariantColorsResolver,
  parseThemeColor,
  type VariantColorsResolver,
} from '@mantine/core';

export const themeVariantColorResolver: VariantColorsResolver = (input) => {
  const defaultRes = defaultVariantColorsResolver(input);

  const parsedColor = parseThemeColor({
    color: input.color || input.theme.primaryColor,
    theme: input.theme,
  });
  // Override some properties for variant
  switch (input.variant) {
    case 'filled':
      switch (parsedColor.color) {
        case 'dark':
          return {
            ...defaultRes,
            background: 'var(--mantine-color-dark-6)',
            hover: 'var(--mantine-color-dark-5)',
          };

        default:
          break;
      }
      break;

    default:
      break;
  }

  return defaultRes;
};
