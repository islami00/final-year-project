import type { TypedDeferredData } from '@remix-run/node';
import type { ClientLoaderFunctionArgs } from '@remix-run/react';
import { Board } from '../../models/Board.model';
import { SavedFilter } from '../../models/SavedFilter.model';
import type { StatusListWithDefault } from '../../models/Status.model';
import { EmptyFilterQuery } from '../../services/queries/savedFilters/savedFilterQueries';

export interface BoardIdFilterData {
  /**
   * Saved Filter diffed at the filter with the current filter to see if there are changes to save
   * false => no filter parameter
   * null => error fetching filter
   *  */
  savedFilter: SavedFilter | null | EmptyFilterQuery;
  currentFilter: SavedFilter | null | EmptyFilterQuery;
}
export interface BoardIdLoaderData extends Record<string, unknown> {
  statuses: StatusListWithDefault;
  board: Board;
}

export type BoardIdLoader = (
  args: ClientLoaderFunctionArgs
) => TypedDeferredData<BoardIdLoaderData>;
