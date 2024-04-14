import { styled } from '@tma/design-system';
import type { StatusSelectVars } from './StatusSelect.utils';

export const SelectButton = styled('button', {
  base: {
    px: 14,
    height: 28,
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    backgroundColor:
      `var(--select-button-bg)` satisfies `var(${StatusSelectVars})`,
    color: 'white',
    textStyle: 'xsSemiBold',
  },
});
