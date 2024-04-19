import { SubmissionResult } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { useFetcher } from '@remix-run/react';
import { Priority } from '../../../models/Task.model';
import { taskFetcherKeys } from '../../../services/queries/task/taskFetcherKeys';
import { getOptimisticValue } from './getOptimisticValue';
import * as taskDetailsForm from './taskDetailsForm';

interface UseCurrentPriorityValueArgs {
  taskId: string;
  apiValue: Priority | null;
}

export function useCurrentPriorityValue(
  args: UseCurrentPriorityValueArgs
): Priority | null {
  const { taskId, apiValue } = args;
  const fetcher = useFetcher<SubmissionResult>({
    key: taskFetcherKeys.priorityFilter(taskId),
  });

  const optimisticValue = getOptimisticValue({
    apiValue: apiValue,
    fetcher,
    parser(formData) {
      return parseWithZod(formData, {
        schema: taskDetailsForm.prioritySchema,
      });
    },
    getValue: (value) => value.priority,
  });
  return optimisticValue;
}
