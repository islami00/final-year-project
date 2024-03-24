import {
  DEFAULT_THEME,
  createTheme,
  type MantineThemeOverride,
  mergeMantineTheme,
  type MantinePrimaryShade,
} from '@mantine/core';
import { type Tokens } from '@pandacss/dev';

const mantineThemeOverride: MantineThemeOverride = createTheme({
  spacing: {},
});
export const mantineTheme = mergeMantineTheme(
  DEFAULT_THEME,
  mantineThemeOverride
);

const DEFAULT_KEYWORD = 'DEFAULT';
type RequiredTokens = Required<Tokens>;
type ColorTokens = RequiredTokens['colors'];
type SpacingTokens = RequiredTokens['spacing'];
type RadiiTokens = RequiredTokens['radii'];

function parsePrimaryShade(): MantinePrimaryShade {
  if (typeof mantineTheme.primaryShade === 'object') {
    return mantineTheme.primaryShade;
  }
  return {
    light: mantineTheme.primaryShade,
    dark: mantineTheme.primaryShade,
  };
}
const primaryShade = parsePrimaryShade();
// Map each color to a nested token
// See also https://panda-css.com/docs/theming/tokens#colors
export const mantineColorsAsTokens: ColorTokens = Object.entries(
  mantineTheme.colors
).reduce((acc, curr) => {
  const [key, values] = curr;
  const valueResult = values.map((each, idx) => {
    return [idx, { value: each, description: "From mantine's theme" }] as const;
  });
  const merged: ColorTokens = Object.fromEntries(valueResult);
  const defaultToken = {
    // Tokens throw errors with conditions, so I opt for the app's only color scheme for now.
    value: mantineTheme.colors[key][primaryShade.dark],
  };

  merged[DEFAULT_KEYWORD] = defaultToken;
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
