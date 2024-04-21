import { AppError, appErrorCodes } from '../AppError';
import { parseClientResponseError } from '../parseClientResponseError';
import { parseZodError } from '../parseZodError';

export function getErrorMessage(err: unknown) {
  try {
    parseZodError(err);
    parseClientResponseError(err);
  } catch (error) {
    if (error instanceof AppError) return error.message;
  }
  return new AppError(appErrorCodes.UNKNOWN).message;
}
