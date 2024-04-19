import * as yup from 'yup';
export interface CreateTaskData {
  boardId: string;
  title: string;
  statusId: string;
}

export function defaultData(boardId: string): CreateTaskData {
  return {
    boardId,
    title: '',
    statusId: '',
  };
}

export const schema: yup.ObjectSchema<CreateTaskData> = yup.object({
  boardId: yup.string().required(),
  title: yup.string().required(),
  statusId: yup.string().required(),
});
