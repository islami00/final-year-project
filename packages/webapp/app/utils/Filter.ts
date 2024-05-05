import type { Dictionary } from 'lodash';
import { mapDefined } from './mapDefined';

export enum Operators {
  // Normal variants
  EQ = '=',
  NEQ = '!=',
  CONTAINS = '~',
  NCONTAINS = '!~',
  GT = '>',
  LT = '<',
  GT_OR_EQ = '>=',
  LT_OR_EQ = '<=',

  // List variants
  EQ_LS = '?=',
  NEQ_LS = '?!=',
  CONTAINS_LS = '?~',
  NCONTAINS_LS = '?!~',
  GT_LS = '?>',
  LT_LS = '?<',
  GT_OR_EQ_LS = '?>=',
  LT_OR_EQ_LS = '?<=',
}

/** Custom operators created to represent stuff pb doesn't support */
export enum UIOperators {
  // Normal variants
  ONE_OF = 'one_of',
  NOT_ONE_OF = 'not_one_of',
  // List variants
  ONE_OF_LS = 'one_of_ls',
  NOT_ONE_OF_LS = 'not_one_of_ls',
}
export enum Connectives {
  OR = '||',
  AND = '&&',
}

export type OperatorOptions = Operators | UIOperators;

export interface FilterBase {
  operator: OperatorOptions;
  value: string | null;
  values: string[] | null;
}

export enum FilterDataType {
  TEXT = 'text',
  SELECT = 'select',
  NUMBER = 'number',
  DATE = 'date',
}
export interface FilterMetaBase {
  field: string;
  label: string;
  dataType: FilterDataType;
  /** Should include `?` in operators */
  isListType?: boolean;
}
export interface FilterMeta extends FilterMetaBase {
  id: string;
}

export interface Filter extends FilterBase {
  meta: FilterMeta;
}
interface FlatFilter {
  template: string;
  params: Dictionary<unknown>;
}
interface ParserConfig {
  /** Don't filter out falsey */
  allowFalsey?: boolean;
}
/**
 * @description Convert a bunch of filters into a single arg for pb.filter()
 */
export function parseFilters(
  filters: Filter[],
  conf: ParserConfig = {}
): FlatFilter {
  const joinable = mapDefined(filters, (v, idx) => flattenFilter(v, conf, idx));

  const joined = joinFilters(joinable);

  return joined;
}

/**
 * @description Convert a filter to something that can be placed in pb.filter()
 * */
function flattenFilter(
  filter: Filter,
  conf: ParserConfig,
  place: number
): FlatFilter | undefined {
  if (!conf?.allowFalsey && !filter.value && !filter.values) return undefined;

  if (filter.values) {
    // Todo: Determine what happens with empty arrays here.
    const base: FlatFilter = {
      template: '',
      params: {},
    };
    const joined = filter.values.reduce((acc, each, idx) => {
      const placeholder = getPlaceholder(filter, [place, idx]);
      if (acc.template) {
        const currentTemplate = filterTemplate(filter, placeholder);
        acc.template = `${acc.template} || ${currentTemplate}`;
      } else {
        acc.template = filterTemplate(filter, placeholder);
      }

      Object.assign(acc.params, { [placeholder]: each });
      return acc;
    }, base);
    joined.template = `(${joined.template})`;
    return joined;
  }

  const value = String(filter.value || '');

  const placeholder = getPlaceholder(filter, [place]);
  return {
    template: filterTemplate(filter, placeholder),
    params: { [placeholder]: value },
  };
}
type PlaceholderPrefixes = (string | number)[];
/**
 * @description Gets placeholder with given path prefixes
 */

function getPlaceholder(filter: Filter, prefixes: PlaceholderPrefixes = []) {
  const placeholder = filter.meta.label;
  return `${placeholder}${prefixes.join('')}`;
}
/**
 * @description Create a filter template from a filter, with optional overrides
 * */
function filterTemplate(filter: Filter, placeholder: string) {
  const field = filter.meta.field;
  const operator = mapUIOperators(filter.operator);
  return `(${field} ${operator} {:${placeholder}})`;
}
function mapUIOperators(operator: Operators | UIOperators): Operators {
  switch (operator) {
    case UIOperators.NOT_ONE_OF:
      return Operators.NEQ;
    case UIOperators.NOT_ONE_OF_LS:
      return Operators.NEQ_LS;

    case UIOperators.ONE_OF:
      return Operators.EQ;
    case UIOperators.ONE_OF_LS:
      return Operators.EQ_LS;

    default:
      return operator;
  }
}

/**
 * @description Combine a ton of filters with &&
 * */
function joinFilters(parts: FlatFilter[], connective = Connectives.AND) {
  const result = parts.reduce((acc, curr) => {
    acc.template = `${acc.template} ${connective} ${curr.template}`;
    Object.assign(acc.params, curr.params);
    return acc;
  });

  return result;
}
