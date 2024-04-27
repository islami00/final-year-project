import { z } from 'zod';
import { type Filter } from '../utils/Filter';
import type { ZodOf } from './types';
import { filterSchema } from './Filter.model';
import Converter from './Converter.model';

export enum SavedFilterKind {
  /** Used for filter-as-you-go, is replaced each time. */
  TEMPORARY = 'temporary',
  /** A regular saved filter */
  NORMAL = 'normal',
}
export interface CreateSavedFilter {
  name: string;
  content: SavedFilter['content'];
}
export interface SavedFilterApi {
  id: string;
  name: string;
  kind: SavedFilterKind;
  content: Filter[] | null;
}
/**
 * SavedFilters. Follows same concept of being globally available like clickup
 * For now, we limit statuses to be the same name across board so we can filter by them.
 *  - In the future, we'll filter by statusId and use some level of inheritance
 *  - When inherited, statuses can be aliased based on their location as well.
 * */
export interface SavedFilter {
  id: SavedFilterApi['id'];
  name: SavedFilterApi['name'];
  kind: SavedFilterApi['kind'];
  content: Filter[];
}

const savedFilterSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  kind: z.nativeEnum(SavedFilterKind),
  content: z
    .array(filterSchema)
    .nullable()
    .transform((value) => value || []),
}) satisfies ZodOf<SavedFilter, SavedFilterApi>;

class SaveFilterConverter extends Converter<SavedFilterApi, SavedFilter> {
  fromApi(from: SavedFilterApi): Promise<SavedFilter> {
    return savedFilterSchema.parseAsync(from);
  }
}

export default new SaveFilterConverter();
