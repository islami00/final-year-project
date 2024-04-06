import { ClientResponseError } from 'pocketbase';
import { TaskApi } from '../../../models/Task.model';
import { asyncCatch } from '../../../utils/asyncCatch';
import { parseClientResponseError } from '../../../utils/parseClientResponseError';
import { collections } from '../../pocketbase/collections';
import { pb } from '../../pocketbase/setup';
import { z } from 'zod';
import { forwardError } from '../../../utils/forwardError';
import { parseZodError } from '../../../utils/parseZodError';

interface GetNextColumnOrderArgs {
  boardId: string;
}

const numberSchema = z.number();
export async function getNextTaskColumnOrder(
  args: GetNextColumnOrderArgs
): Promise<number> {
  const { boardId } = args;
  const result = pb
    .collection<TaskApi>(collections.task)
    .getFirstListItem(pb.filter(`boardId = {:boardId}`, { boardId }), {
      sort: '-columnOrder',
    });

  const [data, err] = await asyncCatch(result);

  if (err instanceof ClientResponseError && err.status !== 404) {
    parseClientResponseError(err);
  }
  const maxOrder = data?.columnOrder ?? -1;
  const nextOrder = maxOrder + 1;
  return numberSchema.parseAsync(nextOrder).catch(forwardError(parseZodError));
}
