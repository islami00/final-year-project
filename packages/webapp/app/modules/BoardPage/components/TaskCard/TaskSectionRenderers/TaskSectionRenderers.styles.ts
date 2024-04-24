import { css, flex } from '@tma/design-system';

const singleRoot = flex.raw({
  height: 'inputSizeMd',
  columnGap: '3xs',
  alignItems: 'center',
  justifyContent: 'center',
});

export const sprintPointsRoot = css(singleRoot, {
  minWidth: 'inputSizeMd',
});

export const priorityRoot = css(singleRoot, { width: 'inputSizeMd' });

export const assigneeRoot = flex({
  gap: '2xs',
  flexWrap: 'wrap',
  width: '100%',
});
