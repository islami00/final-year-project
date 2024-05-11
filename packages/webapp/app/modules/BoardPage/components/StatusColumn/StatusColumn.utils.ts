import { token, type ColorToken } from '@tma/design-system';
import type { CSSProperties } from 'react';

export type StatusColVars = '--status-column-border-color';

export function defineStatusColVars(color: ColorToken): CSSProperties {
  const vars: Record<StatusColVars, string> = {
    '--status-column-border-color': token(`colors.${color}`),
  };
  return vars as CSSProperties;
}
