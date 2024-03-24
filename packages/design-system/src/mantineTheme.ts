import {
  DEFAULT_THEME,
  createTheme,
  type MantineThemeOverride,
  mergeMantineTheme,
} from '@mantine/core';
import { type Tokens } from '@pandacss/dev';

const mantineThemeOverride: MantineThemeOverride = createTheme({
  spacing: {},
});
export const mantineTheme = mergeMantineTheme(
  DEFAULT_THEME,
  mantineThemeOverride
);

type RequiredTokens = Required<Tokens>;
type ColorTokens = RequiredTokens['colors'];
type SpacingTokens = RequiredTokens['spacing'];
type RadiiTokens = RequiredTokens['radii'];
// Map each color to a nested token
// See also https://panda-css.com/docs/theming/tokens#colors
export const mantineColorsAsTokens: ColorTokens = Object.entries(
  mantineTheme.colors
).reduce((acc, curr) => {
  const [key, values] = curr;
  const valueResult = values.map((each, idx) => {
    return [idx, { value: each, description: "From mantine's theme" }] as const;
  });
  const merged = Object.fromEntries(valueResult);

  acc[key] = merged;
  return acc;
}, {} as ColorTokens);

function mapObjectToTokens<T extends RequiredTokens[keyof RequiredTokens]>(
  record: Record<string, string | number>
): T {
  const recordWithTokens = Object.entries(record).reduce((acc, curr) => {
    const [key, value] = curr;
    acc[key] = {
      value: value,
      description: "From mantine's theme",
    };
    return acc;
  }, {} as T);

  return recordWithTokens;
}

export const mantineSpacingAsTokens: SpacingTokens = mapObjectToTokens(
  mantineTheme.spacing
);
export const mantineRadiiAsTokens: RadiiTokens = mapObjectToTokens(
  mantineTheme.radius
);
