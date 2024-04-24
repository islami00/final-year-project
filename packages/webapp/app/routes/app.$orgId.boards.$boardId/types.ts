import type { InfiniteData } from '@tanstack/react-query';
import { Task } from '../../models/Task.model';
import type { ListResult } from 'pocketbase';
import { Board } from '../../models/Board.model';
import type { StatusListWithDefault } from '../../models/Status.model';
import type { ClientLoaderFunctionArgs } from '@remix-run/react';
import type { TypedDeferredData } from '@remix-run/node';

export interface BoardIdLoaderData extends Record<string, unknown> {
  statuses: StatusListWithDefault;
  board: Board;
  /** Promise of all queries being refetched. Only to throw a global error boundary */
  statusQueries: Promise<InfiniteData<ListResult<Task>, number>[]>;
}

export type BoardIdLoader = (
  args: ClientLoaderFunctionArgs
) => TypedDeferredData<BoardIdLoaderData>;
