import { parseWithZod } from '@conform-to/zod';
import { redirect, type ClientActionFunctionArgs } from '@remix-run/react';
import { deleteBoard } from '../../services/queries/board/deleteBoard';
import { patchBoardById } from '../../services/queries/board/patchBoardById';
import { catchPostSubmissionError } from '../../utils/Form/catchPostSubmissionError';
import * as boardIdForm from './form';

/** Handles formData submisions by conform */
export async function formDataHandler(args: ClientActionFunctionArgs) {
  const { request } = args;
  const formData = await request.formData();
  const submission = parseWithZod(formData, {
    schema: boardIdForm.schema,
  });
  if (submission.status !== 'success') {
    return submission.reply();
  }
  const { value } = submission;
  try {
    switch (value.intent) {
      case boardIdForm.BoardIdFormIntent.DELETE_BOARD:
        await deleteBoard({ boardId: value.boardId });
        return redirect('../');
      case boardIdForm.BoardIdFormIntent.NAME:
        await patchBoardById({ body: { name: value.name }, id: value.id });
        break;
      default:
        break;
    }
    return submission.reply({ resetForm: true });
  } catch (error) {
    return catchPostSubmissionError(error, submission);
  }
}
