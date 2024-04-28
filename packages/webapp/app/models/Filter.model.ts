import { z } from 'zod';
import {
  Operators,
  type Filter,
  FilterDataType,
  type FilterMeta,
} from '../utils/Filter';
import type { ZodOf } from './types';

const filterMetaSchema = z.object({
  id: z.string().min(1),
  field: z.string(),
  label: z.string(),
  dataType: z.nativeEnum(FilterDataType),
}) satisfies ZodOf<FilterMeta>;
export const filterSchema = z.object({
  operator: z.nativeEnum(Operators),
  value: z.string().nullable(),
  values: z.array(z.string()).nullable(),
  meta: filterMetaSchema,
}) satisfies ZodOf<Filter>;
