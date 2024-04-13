import { type Submission } from '@conform-to/react';
import { type Fetcher } from '@remix-run/react';

interface OptimisticValue<T, U> {
  fetcher: Fetcher;
  parser: (formData: FormData) => Submission<U>;
  getValue: (value: U) => T;
  apiValue: T;
}
export function getOptimisticValue<T, U>(arg: OptimisticValue<T, U>): T {
  const { fetcher, parser, apiValue: apiValue, getValue } = arg;
  if (fetcher.state === 'idle' || !fetcher.formData) return apiValue;
  const submission = parser(fetcher.formData);
  if (submission.status !== 'success') return apiValue;

  return getValue(submission.value);
}
