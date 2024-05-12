import { ZodOf } from '../../models/types';
import { z } from 'zod';
import { BoardIdParams } from './types';

export const boardIdSchema: ZodOf<BoardIdParams> = z.object({
  boardId: z.string().min(1),
  orgId: z.string().min(1),
});
