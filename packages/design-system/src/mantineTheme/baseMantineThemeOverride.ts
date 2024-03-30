import {
  DEFAULT_THEME,
  type MantineThemeOverride,
  createTheme,
} from '@mantine/core';

export const baseMantineThemeOverride: MantineThemeOverride = createTheme({
  fontFamily: `Open Sans Variable, ${DEFAULT_THEME.fontFamily}`,
});
