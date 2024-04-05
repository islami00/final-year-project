import * as yup from 'yup';

export interface BoardIdParams {
  boardId: string;
}

export const boardIdSchema: yup.ObjectSchema<BoardIdParams> = yup.object({
  boardId: yup.string().required(),
});
