import { z } from 'zod';
import { filterSchema } from '../../../models/Filter.model';
import {
  SavedFilterKind,
  type CreateSavedFilter,
} from '../../../models/SavedFilter.model';
import { ZodOf } from '../../../models/types';

export enum SaveNewFilterFormIntent {
  SAVE_NEW_FILTER = 'boardIdForm/saveNewFilter',
}
export interface SaveNewFilterUIForm {
  name: string;
}

export interface SaveNewFilterFormRequestOutput {
  /** Index signature for submit to be happy */
  [key: string]: unknown;
  data: CreateSavedFilter;
  intent: SaveNewFilterFormIntent.SAVE_NEW_FILTER;
}

export function defaultData(): SaveNewFilterUIForm {
  return {
    name: '',
  };
}

const createSavedFilterSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  kind: z.nativeEnum(SavedFilterKind),
  content: z.array(filterSchema),
  createdBy: z.string(),
  slug: z.string().min(1),
  organisationId: z.string().min(1),
}) satisfies ZodOf<CreateSavedFilter>;
export const uiSchema = z.object({
  name: z.string(),
}) satisfies ZodOf<SaveNewFilterUIForm>;
export const actionSchema = z.object({
  data: createSavedFilterSchema,
  intent: z.nativeEnum(SaveNewFilterFormIntent),
}) satisfies ZodOf<SaveNewFilterFormRequestOutput>;
