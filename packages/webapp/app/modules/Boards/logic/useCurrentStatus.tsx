import { parseWithZod } from '@conform-to/zod';
import { useFetcher } from '@remix-run/react';
import { Status } from '../../../models/Status.model';
import { taskFetcherKeys } from '../../../services/queries/task/taskFetcherKeys';
import { getOptimisticValue } from './getOptimisticValue';
import * as taskDetailsForm from './taskDetailsForm';
import { invariant } from '@epic-web/invariant';

interface UseCurrentStatusArgs {
  statuses: Status[];
  taskId: string;
  defaultValue: string;
}
export function useCurrentStatus(args: UseCurrentStatusArgs) {
  const { statuses, taskId, defaultValue } = args;

  const fetcher = useFetcher({
    key: taskFetcherKeys.statusFilter(taskId),
  });
  const currentStatus = getOptimisticValue({
    apiValue: defaultValue,
    fetcher,
    parser(formData) {
      return parseWithZod(formData, {
        schema: taskDetailsForm.statusSchema,
      });
    },
    getValue: (value) => value.statusId,
  });

  const statusObject = statuses.find((each) => each.id === currentStatus);
  invariant(
    !!statusObject,
    'statusId being set for task must exist in the board'
  );
  return { statusObject, fetcher };
}
