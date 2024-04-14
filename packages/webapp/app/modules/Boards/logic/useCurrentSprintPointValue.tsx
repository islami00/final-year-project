import { SubmissionResult } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { useFetcher } from '@remix-run/react';
import { taskFetcherKeys } from '../../../services/queries/task/taskFetcherKeys';
import * as taskDetailsForm from '../logic/taskDetailsForm';
import { getOptimisticValue } from './getOptimisticValue';

interface UseCurrentSprintPointValueArgs {
  apiValue: number;
  taskId: string;
}
export function useCurrentSprintPointValue(
  args: UseCurrentSprintPointValueArgs
): number {
  const { apiValue, taskId } = args;
  const fetcher = useFetcher<SubmissionResult>({
    key: taskFetcherKeys.sprintPointsFilter(taskId),
  });

  const optimisticValue = getOptimisticValue({
    fetcher,
    apiValue: apiValue,
    parser(formData) {
      return parseWithZod(formData, {
        schema: taskDetailsForm.sprintPointsSchema,
      });
    },
    getValue: (value) => value.sprintPoints,
  });
  return optimisticValue;
}
