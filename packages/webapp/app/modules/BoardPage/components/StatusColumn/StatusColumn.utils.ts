import { token, type ColorToken } from '@tma/design-system';

export function defineStatusColVars(color: ColorToken) {
  return {
    '--status-column-border-color': token(`colors.${color}`),
  };
}

export type StatusColVars = keyof ReturnType<typeof defineStatusColVars>;
