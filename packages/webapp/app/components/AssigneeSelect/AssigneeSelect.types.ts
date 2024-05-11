import type { ComboboxItem } from '@mantine/core';

export interface AssigneeData extends ComboboxItem {
  value: string;
  label: string;
  avatar: string | null;
}
