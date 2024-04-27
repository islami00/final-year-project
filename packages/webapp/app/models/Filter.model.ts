import { z } from 'zod';
import { Operators, type Filter } from '../utils/Filter';
import type { ZodOf } from './types';

export const filterSchema = z.object({
  field: z.string(),
  operator: z.nativeEnum(Operators),
  value: z.string().nullable(),
  values: z.array(z.string()).nullable(),
  placeholder: z.string(),
}) satisfies ZodOf<Filter>;
