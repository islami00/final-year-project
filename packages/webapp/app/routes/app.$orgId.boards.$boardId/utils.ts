import { ZodOf } from '../../models/types';
import { z } from 'zod';

export interface BoardIdParams {
  boardId: string;
  orgId: string;
}

export const boardIdSchema: ZodOf<BoardIdParams> = z.object({
  boardId: z.string().min(1),
  orgId: z.string().min(1),
});
