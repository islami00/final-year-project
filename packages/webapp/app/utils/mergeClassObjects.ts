import { cx, Argument } from '@tma/design-system';
import mergeWith from 'lodash/fp/mergeWith';

export const mergeClassObjects = mergeWith(
  (value: Argument, srcValue: Argument) => cx(value, srcValue)
);
