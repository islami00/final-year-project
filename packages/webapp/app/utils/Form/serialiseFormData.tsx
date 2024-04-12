import { formatPaths } from '@conform-to/dom';
import { isNonNullable } from '../isNonNullable';

type SupportedPrimitives =
  | string
  | number
  | boolean
  | bigint
  | Date
  | null
  | undefined;
type SupportedFormData = SupportedPrimitives | SupportedPrimitives[];
export function serialiseFormData<K extends PropertyKey>(
  someJSON: Record<K, SupportedFormData>
) {
  const entries = Object.entries(someJSON) as [string, SupportedFormData][];
  const form = new FormData();
  entries.forEach((entry) => {
    const [key, value] = entry;
    setFormData(key, value, form);
  });

  return form;
}
function serialisePrimitives(value: SupportedPrimitives): string | null {
  if (value instanceof Date) {
    return value.toJSON();
  }

  if (!isNonNullable(value)) return null;

  // Stringify anything else
  return String(value);
}
function setFormData(
  key: string,
  value: SupportedFormData,
  form: FormData
): FormData {
  if (Array.isArray(value)) {
    value.forEach((item, idx) => {
      const serialised = serialisePrimitives(item);
      const realKey = formatPaths([key, idx]);
      if (serialised === null) return;
      form.set(realKey, serialised);
    });
    return form;
  }

  const serialised = serialisePrimitives(value);
  if (serialised === null) return form;
  form.set(key, serialised);
  return form;
}
