import type { InfiniteData } from '@tanstack/react-query';
import { Task } from '../../models/Task.model';
import type { ListResult } from 'pocketbase';
import { Board } from '../../models/Board.model';
import type { StatusListWithDefault } from '../../models/Status.model';
import type { ClientLoaderFunctionArgs } from '@remix-run/react';
import type { TypedDeferredData } from '@remix-run/node';
import { SavedFilter } from '../../models/SavedFilter.model';

export interface BoardIdFilterData {
  /** Saved Filter diffed at the filter with the current filter to see if there are changes to save  */
  savedFilter: SavedFilter | null;
  currentFilter: SavedFilter | null;
}
export interface BoardIdLoaderData extends Record<string, unknown> {
  statuses: StatusListWithDefault;
  board: Board;
  /** Promise of all queries being refetched. Only to throw a global error boundary */
  statusQueries: Promise<InfiniteData<ListResult<Task>, number>[]>;
  filter: Promise<BoardIdFilterData>;
}

export type BoardIdLoader = (
  args: ClientLoaderFunctionArgs
) => TypedDeferredData<BoardIdLoaderData>;
