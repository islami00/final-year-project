import { z } from 'zod';
import { type Filter } from '../utils/Filter';
import Converter from './Converter.model';
import { filterSchema } from './Filter.model';
import type { ZodOf } from './types';

export enum SavedFilterKind {
  /** Used for filter-as-you-go, is replaced each time. */
  TEMPORARY = 'temporary',
  /** A regular saved filter */
  NORMAL = 'normal',
}
export interface CreateSavedFilter {
  /**
   * This should be the same as the slug, only used to create.
   * */
  id: string;
  name: string;
  kind: SavedFilterKind;
  content: SavedFilter['content'];
  createdBy: string;
  slug: string;
  organisationId: string;
}
export interface SavedFilterApi {
  id: string;
  name: string;
  kind: SavedFilterKind;
  content: Filter[] | null;
  createdBy: string;
  slug: string;
}

/**
 * SavedFilters. Follows same concept of being globally available like clickup
 * */
export interface SavedFilter {
  id: SavedFilterApi['id'];
  name: SavedFilterApi['name'];
  kind: SavedFilterApi['kind'];
  content: Filter[];
  createdBy: string | null;
  slug: string;
  organisationId: string;
}

const savedFilterSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  kind: z.nativeEnum(SavedFilterKind),
  content: z
    .array(filterSchema)
    .nullable()
    .transform((value) => value || []),
  createdBy: z.string().pipe(
    z
      .string()
      .nullable()
      .transform((v) => v || null)
  ),
  slug: z.string().min(1),
  organisationId: z.string().min(1),
}) satisfies ZodOf<SavedFilter, SavedFilterApi>;

class SaveFilterConverter extends Converter<SavedFilterApi, SavedFilter> {
  fromApi(from: SavedFilterApi): Promise<SavedFilter> {
    return savedFilterSchema.parseAsync(from);
  }
}

export default new SaveFilterConverter();
