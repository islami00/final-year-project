import { FilterMeta } from '../../../../../utils/Filter';

/** Default, nothing */
interface BoardStage0 {
  stage: 0;
}
/** Add filter selected */
interface BoardStage1 {
  stage: 1;
  filter: FilterMeta;
}

/**
 * null => nothing selected, select one.
 * stage1 => add filter selected, edit or add a new filter
 */
export type AddFilterFilterState = BoardStage0 | BoardStage1;

export type AddFilterActions =
  | {
      type: 'close';
    }
  | {
      type: 'select';
      filter: FilterMeta;
    };
