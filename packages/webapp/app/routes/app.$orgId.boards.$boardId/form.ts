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
export interface NameFormData {
  intent: BoardIdFormIntent.NAME;
  name: string;
  id: string;
}
type BoardIdFormData = DeleteBoardFormData | NameFormData;

interface NameDefaultDataArgs {
  name: string;
  id: string;
}

export function nameDefaultData(args: NameDefaultDataArgs): NameFormData {
  const { name, id } = args;
  return {
    id,
    name,
    intent: BoardIdFormIntent.NAME,
  };
}

const deleteBaordSchema = z.object({
  intent: z.literal(BoardIdFormIntent.DELETE_BOARD),
  boardId: z.string().min(1),
}) satisfies ZodOf<DeleteBoardFormData>;
const nameSchema = z.object({
  intent: z.literal(BoardIdFormIntent.NAME),
  name: z.string().min(1),
  id: z.string().min(1),
}) satisfies ZodOf<NameFormData>;

export const schema = z.union([
  deleteBaordSchema,
  nameSchema,
]) satisfies ZodOf<BoardIdFormData>;
