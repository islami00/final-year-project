import * as yup from 'yup';
import { ClientResponseError } from 'pocketbase';
import { AppError } from './AppError';

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
  } catch (error) {
    return null;
  }
}
export function parseClientResponseError(error: unknown): never {
  if (!(error instanceof ClientResponseError)) {
    throw new AppError('Unknown error');
  }
  const validationError = parseValidationError(error);
  if (validationError) throw new AppError(validationError.message);

  throw new AppError(error.message);
}

export function castError(error: unknown): AppError {
  if (error instanceof AppError) return error;

  return new AppError('Unknown error');
}
