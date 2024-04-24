import { type InfiniteData } from '@tanstack/react-query';
import type { ListResult } from 'pocketbase';

export function combinePages<T>(data: InfiniteData<ListResult<T>, unknown>) {
  return data.pages.reduce<T[]>((each, curr) => each.concat(curr.items), []);
}
