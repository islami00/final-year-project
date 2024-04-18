import type { Dictionary, Falsey } from 'lodash';
import { mapDefined } from '../../../utils/mapDefined';

export enum Operators {
  EQ = '=',
  NEQ = '!=',
  CONTAINS = '~',
}
export interface Filter {
  field: string;
  operator: string;
  value: string | string[] | Falsey;
  placeholder: string;
}
export function parseFilters(filters: Filter[]) {
  const joinable = mapDefined(filters, (v) => addFilterBy(v));
  const joined = joinFilters(joinable);
  return joined;
}
interface FilterByPart {
  template: string;
  params: Dictionary<unknown>;
}
function addFilterBy(filter: Filter): FilterByPart | undefined {
  const { value, placeholder } = filter;
  if (!value) return undefined;

  if (typeof value === 'string') {
    return {
      template: filterTemplate(filter),
      params: { [placeholder]: value },
    };
  }

  const base: FilterByPart = {
    template: '',
    params: {},
  };
  const joined = value.reduce((acc, each, idx) => {
    const suffixPlaceholder = `${[placeholder]}${idx}`;
    if (acc.template) {
      acc.template = `${acc.template} || ${filterTemplate(filter, idx)}`;
    } else {
      acc.template = filterTemplate(filter, idx);
    }

    Object.assign(acc.params, { [suffixPlaceholder]: each });
    return acc;
  }, base);
  joined.template = `(${joined.template})`;
  return joined;
}
function filterTemplate(filter: Filter, suffix?: string | number) {
  const { field, operator, placeholder } = filter;

  return `(${field} ${operator} {:${placeholder}${suffix || ''}})`;
}
function joinFilters(part: FilterByPart[]) {
  const result = part.reduce((acc, curr) => {
    acc.template = `${acc.template} && ${curr.template}`;
    Object.assign(acc.params, curr.params);
    return acc;
  });

  return result;
}
