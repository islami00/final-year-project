import { token, type ColorToken } from '@tma/design-system';
import { Status } from '../../models/Status.model';

export type StatusItemData = Pick<Status, 'id' | 'name' | 'color'>;

interface DefineStatusSelectVarsArgs {
  bg: ColorToken;
}
export function defineStatusSelectVars(args: DefineStatusSelectVarsArgs) {
  const { bg } = args;
  return {
    '--select-button-bg': token(`colors.${bg}`),
  };
}

export type StatusSelectVars = keyof ReturnType<typeof defineStatusSelectVars>;
