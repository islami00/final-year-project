import { flex } from '@tma/design-system';
import { submitBtn as sBtn } from '../../../../Onboard/Onboard.styles';

export const formContainer = flex({
  flexDirection: 'column',
});

export const submitBtn = sBtn;
export const operators = flex({
  flexWrap: 'wrap',
  gap: '2xs',
});
