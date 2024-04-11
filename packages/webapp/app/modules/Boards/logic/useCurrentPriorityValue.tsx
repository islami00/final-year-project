import { useFetcher, type FetcherWithComponents } from '@remix-run/react';
import { SubmissionResult } from '@conform-to/react';
import { taskFetcherKeys } from '../../../services/queries/task/taskFetcherKeys';
import * as taskDetailsForm from './taskDetailsForm';
import { Priority } from '../../../models/Task.model';
import { parseWithZod } from '@conform-to/zod';

interface UseCurrentPriorityValueReturns {
  fetcher: FetcherWithComponents<SubmissionResult>;
  currentPriority: Priority | null;
}
export function useCurrentPriorityValue(
  taskId: string,
  apiValue: Priority | null
): UseCurrentPriorityValueReturns {
  const fetcher = useFetcher<SubmissionResult>({
    key: taskFetcherKeys.priorityFilter(taskId),
  });

  const apiReturn: UseCurrentPriorityValueReturns = {
    currentPriority: apiValue,
    fetcher,
  };
  if (fetcher.state === 'idle' || !fetcher.formData) return apiReturn;
  const submission = parseWithZod(fetcher.formData, {
    schema: taskDetailsForm.prioritySchema,
  });
  if (submission.status !== 'success') return apiReturn;

  return { currentPriority: submission.value.priority, fetcher };
}
