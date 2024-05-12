import { type ComboboxItem } from '@mantine/core';
import { SavedFilter } from '../../../../../models/SavedFilter.model';

export interface SavedFilterComboboxItem extends ComboboxItem {
  original: SavedFilter;
}
