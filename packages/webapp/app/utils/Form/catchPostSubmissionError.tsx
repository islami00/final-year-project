import { json } from '@remix-run/react';
import toast from 'react-hot-toast';
import { castError } from '../parseClientResponseError';
import type { Submission } from '@conform-to/dom';

export function catchPostSubmissionError(
  error: unknown,
  submission: Submission<unknown>
) {
  const appError = castError(error);
  toast.error(appError.message);
  // Revert
  return json(submission.reply({ resetForm: true }));
}
