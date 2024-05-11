import { sva } from '@tma/design-system';

export const filterChip = sva({
  slots: ['root', 'btn'],
  className: 'filterChip',

  base: {
    root: {
      display: 'flex',
      minW: 0,
      '--fc-border-width': 'rem(1)',
      '& .filterChip__btn:not(:only-child):first-child': {
        borderEndEndRadius: 0,
        borderStartEndRadius: 0,
        borderInlineEndWidth: 'calc(var(--fc-border-width) / 2)',
      },
      '& .filterChip__btn:not(:only-child):last-child': {
        borderEndStartRadius: 0,
        borderStartStartRadius: 0,
        borderInlineStartWidth: 'calc(var(--fc-border-width) / 2)',
      },
      '& .filterChip__btn:not(:only-child):not(:first-child):not(:last-child)':
        {
          borderEndStartRadius: 0,
          borderStartStartRadius: 0,
          borderInlineWidth: 'calc(var(--fc-border-width) / 2)',
        },
    },
    btn: {},
  },
});
