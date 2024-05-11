import type { ScrollAreaStylesNames } from '@mantine/core';
import { css, flex, grid } from '@tma/design-system';
import { ClassNamesRecord } from '../../../../../styles/mantine/types';

export const btns = flex({ justifyContent: 'space-between', columnGap: '4xs' });
export const body = grid({ gridTemplateRows: '1fr max-content' });
export const chips = flex({ gap: '2xs', flexWrap: 'wrap' });
export const scrollVertical = css({
  '& > div': {
    tableLayout: 'fixed',
    width: '100%',
  },
});

export const scrollareaClasses: ClassNamesRecord<ScrollAreaStylesNames> = {
  viewport: scrollVertical,
};
