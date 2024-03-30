import {
  DEFAULT_THEME,
  type MantineThemeOverride,
  mergeMantineTheme,
  createTheme,
  type MantinePrimaryShade,
  type MantineTheme,
} from '@mantine/core';
import { type Tokens } from '@pandacss/dev';
import { mantineComponents } from './mantineComponents';

export const mantineThemeOverride: MantineThemeOverride = createTheme({
  fontFamily: `Open Sans Variable, ${DEFAULT_THEME.fontFamily}`,
  components: mantineComponents,
});

const mergedTheme = mergeMantineTheme(DEFAULT_THEME, mantineThemeOverride);

const DEFAULT_KEYWORD = 'DEFAULT';
type RequiredTokens = Required<Tokens>;
type ColorTokens = RequiredTokens['colors'];
type SpacingTokens = RequiredTokens['spacing'];
type RadiiTokens = RequiredTokens['radii'];

function parsePrimaryShade(theme: MantineTheme): MantinePrimaryShade {
  if (typeof theme.primaryShade === 'object') {
    return theme.primaryShade;
  }
  return {
    light: theme.primaryShade,
    dark: theme.primaryShade,
  };
}
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

const primaryShade = parsePrimaryShade(mergedTheme);

// Map each color to a nested token
// See also https://panda-css.com/docs/theming/tokens#colors
export const mantineColorsAsTokens: ColorTokens = Object.entries(
  mergedTheme.colors
).reduce((acc, curr) => {
  const [key, values] = curr;
  const valueResult = values.map((each, idx) => {
    return [idx, { value: each, description: "From mantine's theme" }] as const;
  });
  const merged: ColorTokens = Object.fromEntries(valueResult);
  const defaultToken = {
    // Tokens throw errors with conditions, so I opt for the app's only color scheme for now.
    value: mergedTheme.colors[key][primaryShade.dark],
  };

  merged[DEFAULT_KEYWORD] = defaultToken;
  acc[key] = merged;
  return acc;
}, {} as ColorTokens);

export const mantineSpacingAsTokens: SpacingTokens = mapObjectToTokens(
  mergedTheme.spacing
);
export const mantineRadiiAsTokens: RadiiTokens = mapObjectToTokens(
  mergedTheme.radius
);
