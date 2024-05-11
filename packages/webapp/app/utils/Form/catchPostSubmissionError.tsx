import type { Submission } from '@conform-to/dom';
import toast from 'react-hot-toast';
import { castError } from '../parseClientResponseError';

export function catchPostSubmissionError(
  error: unknown,
  submission: Submission<unknown>
) {
  const appError = castError(error);
  toast.error(appError.message);
  // Revert
  return submission.reply({ resetForm: true });
}
