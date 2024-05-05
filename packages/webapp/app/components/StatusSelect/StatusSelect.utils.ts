import { token, type ColorToken } from '@tma/design-system';
import { Status } from '../../models/Status.model';
import type { CSSProperties } from 'react';

export interface StatusItemData {
  label: string;
  value: string;
  color: ColorToken;
}
export function mapToStatusData(value: Status): StatusItemData {
  return {
    color: value.color,
    label: value.name,
    value: value.id,
  };
}
export type StatusSelectVars = '--select-button-bg';
interface DefineStatusSelectVarsArgs {
  bg: ColorToken;
}
export function defineStatusSelectVars(
  args: DefineStatusSelectVarsArgs
): CSSProperties {
  const { bg } = args;
  const select: Record<StatusSelectVars, string> = {
    '--select-button-bg': token(`colors.${bg}`),
  };

  return select as CSSProperties;
}
