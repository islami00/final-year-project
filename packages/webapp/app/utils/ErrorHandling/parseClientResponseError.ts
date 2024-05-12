import * as yup from 'yup';
import { ClientResponseError } from 'pocketbase';
import { AppError } from './AppError';
import { AppValidationError } from './AppValidationError';

interface ValidationErrorObject {
  code: string;
  message: string;
}
interface FormValidationError {
  [key: string]: ValidationErrorObject;
}
interface FormValidationErrorResponse {
  data: FormValidationError;
}
const validationError: yup.ObjectSchema<ValidationErrorObject> = yup.object({
  code: yup.string().required(),
  message: yup.string().required(),
});
function parseValidationError(error: ClientResponseError) {
  const { data } = error.response as FormValidationErrorResponse;
  try {
    const responseTyped = validationError.cast(Object.values(data).at(0));
    return responseTyped;
  } catch (caughtError) {
    return null;
  }
}
export function parseClientResponseError(error: unknown): null {
  if (!(error instanceof ClientResponseError)) {
    return null;
  }
  const parsedError = parseValidationError(error);
  if (parsedError) throw new AppValidationError(parsedError.message);

  throw new AppValidationError(error.message);
}

export function castError(error: unknown): AppError {
  if (error instanceof AppError) return error;

  return new AppError();
}
