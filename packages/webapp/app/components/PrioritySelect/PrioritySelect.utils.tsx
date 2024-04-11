import type { Dictionary } from 'lodash';
import { Priority } from '../../models/Task.model';
import { token } from '@tma/design-system';

export function mapPriorityToColor(priority: Priority | null) {
  switch (priority) {
    case Priority.P0:
      return token('colors.red.6');
    case Priority.P1:
      return token('colors.yellow.6');
    case Priority.P2:
      return token('colors.blue.6');
    case Priority.P3:
      return token('colors.gray.6');
    default:
      return '';
  }
}
function mapPriorityName(priority: Priority | null) {
  switch (priority) {
    case Priority.P0:
      return 'P0';
    case Priority.P1:
      return 'P1';
    case Priority.P2:
      return 'P2';
    case Priority.P3:
      return 'P3';
    default:
      return '';
  }
}

interface PrioritySelect {
  label: string;
  color: string;
}

export const PriorityDictionary = Object.values(Priority).reduce<
  Dictionary<PrioritySelect>
>((acc, each) => {
  acc[each] = {
    color: mapPriorityToColor(each),
    label: mapPriorityName(each),
  };
  return acc;
}, {});
export const priorityList = Object.values(Priority);
