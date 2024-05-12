import { SavedFilter } from '../../../../../models/SavedFilter.model';

/** Modal opened */
export type EmptyFiltersAction =
  | {
      type: 'apply-saved';
    }
  | {
      type: 'save-new';
      /** The current temporary filter. */
      filter: SavedFilter;
    };
