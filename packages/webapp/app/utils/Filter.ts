import type { Dictionary } from 'lodash';
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
  operator: Operators;
  value: string | null;
  values: string[] | null;
  placeholder: string;
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

export interface UIFilter extends Filter {
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
  const basePlaceholder = `${filter.placeholder}${place}`;
  if (!conf?.allowFalsey && !filter.value && !filter.values) return undefined;

  if (filter.values) {
    // Todo: Determine what happens with empty arrays here.
    const base: FlatFilter = {
      template: '',
      params: {},
    };
    const joined = filter.values.reduce((acc, each, idx) => {
      const suffixPlaceholder = `${basePlaceholder}${idx}`;
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
    template: filterTemplate(filter, {
      placeholder: basePlaceholder,
    }),
    params: { [basePlaceholder]: value },
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
