import { type SubmissionResult } from '@conform-to/react';
import { type FetcherWithComponents } from '@remix-run/react';

/**
 * @description Ensure we reset with fresh data
 */
export function getLastResultToReset(
  fetcher: FetcherWithComponents<SubmissionResult>
) {
  // Ensure we only reset when not loading or submitting (navigating)
  const lastResult = fetcher.state === 'idle' ? fetcher.data : null;
  return lastResult;
}
