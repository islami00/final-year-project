import type { Submission } from '@conform-to/dom';
import toast from 'react-hot-toast';
import { castError } from '../ErrorHandling/parseClientResponseError';
import type { IAppError } from '../ErrorHandling/AppError';

export function catchPostSubmissionError(
  error: unknown,
  submission: Submission<unknown>
) {
  console.error(error);
  const appError = castError(error);
  toast.error(appError.message);
  // Revert
  return submission.reply({ resetForm: true });
}

export function catchJSONPostSubmissionError(error: unknown): IAppError {
  console.error(error);
  const appError = castError(error);
  toast.error(appError.message);

  return appError.toJSON();
}
