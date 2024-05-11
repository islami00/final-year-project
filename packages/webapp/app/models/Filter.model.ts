import { z } from 'zod';
import {
  Operators,
  type Filter,
  FilterDataType,
  type FilterMeta,
  type OperatorOptions,
  UIOperators,
  type OperatorChip,
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
const operatorChipSchema = z.object({
  operator: operatorSchema,
  label: z.string(),
}) satisfies ZodOf<OperatorChip>;
export const filterSchema = z.object({
  operatorChip: operatorChipSchema,
  value: z.string().nullable(),
  values: z.array(z.string()).nullable(),
  meta: filterMetaSchema,
  id: z.string(),
}) satisfies ZodOf<Filter>;
