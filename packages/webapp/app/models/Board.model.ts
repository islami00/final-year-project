import { z } from 'zod';
import type { ZodOf } from './types';
import Converter from './Converter.model';

export type BoardApi = Board;
export interface Board {
  id: string;
  name: string;
  departmentId: string;
}
export interface BoardCreate {
  name: string;
  departmentId: string;
}
export const boardSchema = z.object({
  id: z.string().min(1),
  name: z.string(),
  departmentId: z.string().min(1),
}) satisfies ZodOf<Board>;

class BoardConverter extends Converter<BoardApi, Board> {
  fromApi(from: BoardApi): Promise<Board> {
    return boardSchema.parseAsync(from);
  }
}

export default new BoardConverter();
