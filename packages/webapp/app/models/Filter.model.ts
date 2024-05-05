import { z } from 'zod';
import {
  Operators,
  type Filter,
  FilterDataType,
  type FilterMeta,
  type OperatorOptions,
  UIOperators,
} from '../utils/Filter';
import type { ZodOf } from './types';

const filterMetaSchema = z.object({
  id: z.string().min(1),
  field: z.string(),
  label: z.string(),
  dataType: z.nativeEnum(FilterDataType),
}) satisfies ZodOf<FilterMeta>;
const operatorSchema = z.union([
  z.nativeEnum(Operators),
  z.nativeEnum(UIOperators),
]) satisfies ZodOf<OperatorOptions>;
export const filterSchema = z.object({
  operator: operatorSchema,
  value: z.string().nullable(),
  values: z.array(z.string()).nullable(),
  meta: filterMetaSchema,
}) satisfies ZodOf<Filter>;
