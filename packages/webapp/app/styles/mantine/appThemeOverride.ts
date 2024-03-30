import {
  mergeThemeOverrides,
  type MantineThemeOverride,
  createTheme,
} from '@mantine/core';
import { baseMantineThemeOverride } from '@tma/design-system';
import { mantineComponents } from './mantineComponents';

// App-specific theme overrides, references __generated__
// These could be extracted to a component lib later. Or, a "mantine" lib.
const override = createTheme({
  components: mantineComponents,
});
export const appThemeOverride: MantineThemeOverride = mergeThemeOverrides(
  baseMantineThemeOverride,
  override
);
