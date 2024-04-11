import { type FetcherWithComponents } from '@remix-run/react';
import { SubmissionResult } from '@conform-to/react';

export function getOptimisticFetcherData(
  fetcher: FetcherWithComponents<SubmissionResult>
) {
  if (fetcher.state === 'idle') return fetcher.data;
  return null;
}
