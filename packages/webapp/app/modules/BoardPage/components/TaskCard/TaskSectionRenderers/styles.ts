import { css, flex } from '@tma/design-system';

const singleRoot = flex.raw({
  height: 'inputSizeMd',
  columnGap: '3xs',
  alignItems: 'center',
});

export const sprintPointsRoot = css(singleRoot, {
  minWidth: 'inputSizeMd',
});
