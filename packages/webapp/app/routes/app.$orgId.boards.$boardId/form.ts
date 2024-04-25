import { ZodOf } from '../../models/types';
import { z } from 'zod';

export enum BoardIdFormIntent {
  NAME = 'boardIdForm/name',
  DELETE_BOARD = 'boardIdForm/deleteDepartment',
}

export interface DeleteBoardFormData {
  intent: BoardIdFormIntent.DELETE_BOARD;
  boardId: string;
}

const deleteBaordSchema = z.object({
  intent: z.literal(BoardIdFormIntent.DELETE_BOARD),
  boardId: z.string().min(1),
}) satisfies ZodOf<DeleteBoardFormData>;

type BoardIdFormData = DeleteBoardFormData;
export const schema = deleteBaordSchema satisfies ZodOf<BoardIdFormData>;
