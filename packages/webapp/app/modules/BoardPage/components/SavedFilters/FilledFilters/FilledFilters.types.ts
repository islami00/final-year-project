import { SavedFilter } from '../../../../../models/SavedFilter.model';

/** Modal opened */
export type FilledFiltersAction =
  | {
      /** equivalent to apply-saved */
      type: 'change-saved';
    }
  | {
      type: 'save-new';
    }
  | {
      type: 'rename';
      /** The current temporary filter. */
      filter: SavedFilter;
      /** The current saved filter. */
      savedFilter: SavedFilter;
    }
  | {
      type: 'update';
      /** The current temporary filter. */
      filter: SavedFilter;
      /** The current saved filter. */
      savedFilter: SavedFilter;
    }
  | {
      type: 'delete';
      /** The current saved filter. */
      savedFilter: SavedFilter;
    };
