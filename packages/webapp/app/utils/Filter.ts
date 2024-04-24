import type { Dictionary, Falsey } from 'lodash';
import { mapDefined } from './mapDefined';

export enum Operators {
  EQ = '=',
  NEQ = '!=',
  CONTAINS = '~',
}
export enum Connectives {
  OR = '||',
  AND = '&&',
}
export interface Filter {
  field: string;
  operator: string;
  value: string | string[] | Falsey;
  placeholder: string;
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
  const joinable = mapDefined(filters, (v) => flattenFilter(v, conf));
  const joined = joinFilters(joinable);

  return joined;
}

/**
 * @description Convert a filter to something that can be placed in pb.filter()
 * */
function flattenFilter(
  filter: Filter,
  conf: ParserConfig
): FlatFilter | undefined {
  const { placeholder } = filter;
  if (!conf?.allowFalsey && !filter.value) return undefined;

  if (Array.isArray(filter.value)) {
    // Todo: Determine what happens with empty arrays here.
    const base: FlatFilter = {
      template: '',
      params: {},
    };
    const joined = filter.value.reduce((acc, each, idx) => {
      const suffixPlaceholder = `${[placeholder]}${idx}`;
      if (acc.template) {
        acc.template = `${acc.template} || ${filterTemplate(filter, {
          placeholder: suffixPlaceholder,
        })}`;
      } else {
        acc.template = filterTemplate(filter, {
          placeholder: suffixPlaceholder,
        });
      }

      Object.assign(acc.params, { [suffixPlaceholder]: each });
      return acc;
    }, base);
    joined.template = `(${joined.template})`;
    return joined;
  }
  const value = String(filter.value || '');
  return {
    template: filterTemplate(filter),
    params: { [placeholder]: value },
  };
}

/**
 * @description Create a filter template from a filter, with optional overrides
 * */
function filterTemplate(filter: Filter, overrides?: Partial<Filter>) {
  const field = overrides?.field || filter.field;
  const operator = overrides?.operator || filter.operator;
  const placeholder = overrides?.placeholder || filter.placeholder;
  return `(${field} ${operator} {:${placeholder}})`;
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
