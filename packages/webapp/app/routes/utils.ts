import * as yup from 'yup';

export interface BoardIdParams {
  boardId: string;
}

export const boardIdSchema: yup.ObjectSchema<BoardIdParams> = yup.object({
  boardId: yup.string().required(),
});

export const routeConfig = {
  app: '/app',
  boardList: '/app/boards',
  board: '/app/boards/:boardId',
  createTask: '/app/boards/:boardId/task/create',
  boardTasks: '/app/boards/:boardId/task/:taskId',
} as const;
