import { z } from 'zod';
import { ZodOf } from '../../../../../models/types';
import {
  FilterDataType,
  OperatorOptions,
  Operators,
  UIOperators,
  type FilterBase,
} from '../../../../../utils/Filter';

export type FilterValueForm = FilterBase;
export interface OperatorChip {
  operator: OperatorOptions;
  label: string;
}

interface DefaultDataArgs {
  firstOp: OperatorOptions;
}
export function defaultData(args: DefaultDataArgs): FilterValueForm {
  const { firstOp } = args;
  return {
    operator: firstOp,
    value: null,
    values: null,
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
    default:
      return operator;
  }
}
export const filterValueFormSchema = z.object({
  operator: z.union([z.nativeEnum(Operators), z.nativeEnum(UIOperators)]),
  value: z.string().nullable(),
  values: z.string().array().nullable(),
}) satisfies ZodOf<FilterValueForm>;
