import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { ZodOf } from '../../../models/types';
import {
  FilterDataType,
  OperatorChip,
  OperatorOptions,
  Operators,
  UIOperators,
  type Filter,
  type FilterBase,
} from '../../../utils/Filter';

export interface FilterValueForm {
  data: FilterBase;
  id: string;
}
interface DefaultDataArgs {
  firstOp: OperatorChip;
  id: string;
}
export function defaultData(args: DefaultDataArgs): FilterValueForm {
  const { firstOp, id } = args;
  return {
    id,
    data: {
      operatorChip: firstOp,

      value: null,
      values: null,
    },
  };
}

export function operatorsByType(
  dataType: FilterDataType,
  isListType: boolean | undefined
) {
  const ops = resolveOperatorsByType(dataType);
  return standardiseChips(ops, isListType);
}
/**
 * @description Gives a list of operators based on the data type
 */
function resolveOperatorsByType(dataType: FilterDataType): OperatorChip[] {
  switch (dataType) {
    case FilterDataType.DATE:
      return [
        { operator: Operators.EQ, label: 'is' },
        { operator: Operators.GT, label: 'after' },
        { operator: Operators.LT, label: 'before' },
      ];
    case FilterDataType.TEXT:
      return [
        { operator: Operators.EQ, label: 'is' },
        { operator: Operators.CONTAINS, label: 'contains' },
        { operator: Operators.NCONTAINS, label: 'does not contain' },
      ];
    case FilterDataType.NUMBER:
      return [
        { operator: Operators.EQ, label: 'is' },
        { operator: Operators.GT, label: 'greater than' },
        { operator: Operators.LT, label: 'less than' },
      ];
    case FilterDataType.SELECT:
      return [
        { operator: Operators.EQ, label: 'is' },
        { operator: UIOperators.ONE_OF, label: 'one of' },
        { operator: UIOperators.NOT_ONE_OF, label: 'not one of' },
      ];
    default:
      return dataType;
  }
}
function standardiseChips(operators: OperatorChip[], isListType?: boolean) {
  if (!isListType) return operators;
  return operators.map((chip) => ({
    ...chip,
    operator: mapListOps(chip.operator),
  }));
}

/**
 * @description Maps operators to their list variants
 */
function mapListOps(operator: OperatorOptions): OperatorOptions {
  switch (operator) {
    case Operators.EQ:
      return Operators.EQ_LS;
    case Operators.NEQ:
      return Operators.NEQ_LS;
    case Operators.CONTAINS:
      return Operators.CONTAINS_LS;
    case Operators.NCONTAINS:
      return Operators.NCONTAINS_LS;
    case Operators.GT:
      return Operators.GT_LS;
    case Operators.LT:
      return Operators.LT_LS;
    case Operators.GT_OR_EQ:
      return Operators.GT_OR_EQ_LS;
    case Operators.LT_OR_EQ:
      return Operators.LT_OR_EQ_LS;
    case UIOperators.ONE_OF:
      return UIOperators.ONE_OF_LS;
    case UIOperators.NOT_ONE_OF:
      return UIOperators.NOT_ONE_OF_LS;
    default:
      return operator;
  }
}
const errMap: z.ZodErrorMap = (issue, ctx) => {
  switch (issue.code) {
    case z.ZodIssueCode.invalid_type:
      return { message: 'Value cannot be empty' };
    default:
      break;
  }

  return { message: ctx.defaultError };
};

const operator = z.union([z.nativeEnum(Operators), z.nativeEnum(UIOperators)]);
const operatorChip = z.object({ operator, label: z.string() });
export const filterBaseSchema = z
  .union([
    z.object({
      operatorChip,
      // FIXME: Capture conditional logic for allowing some fields.
      value: z.null(),
      values: z
        .array(z.string(), {
          errorMap: errMap,
        })
        .min(1),
    }),
    z.object({
      operatorChip,
      value: z.string({ errorMap: errMap }),
      values: z.null().or(z.tuple([])),
    }),
  ])
  .transform((value): FilterValueForm['data'] => {
    switch (value.operatorChip.operator) {
      case UIOperators.NOT_ONE_OF:
      case UIOperators.ONE_OF:
      case UIOperators.ONE_OF_LS:
      case UIOperators.NOT_ONE_OF_LS:
        return { ...value, value: null };
      default:
        return { ...value, values: [] };
    }
  }) satisfies ZodOf<FilterBase>;

export const filterValueFormSchema = z.object({
  data: filterBaseSchema,
  id: z.string(),
}) satisfies ZodOf<FilterValueForm>;

export type FilterValueFormReturn = UseFormReturn<FilterValueForm>;

export function fmtFilter(filter: Filter) {
  return {
    label: filter.meta.label,
    operator: filter.operatorChip.label,
    // FIXME: Format by dataType and field
    value: filter.value || filter.values?.join() || 'unset',
  };
}
