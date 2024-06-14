import { SavedFilter } from '../../../../../models/SavedFilter.model';
import { SavedFilterComboboxItem } from './ApplySavedFilter.types';

export function selectSavedFilters(
  data: SavedFilter[]
): SavedFilterComboboxItem[] {
  return data.map((each) => ({
    label: each.name,
    value: each.id,
    original: each,
  }));
}
