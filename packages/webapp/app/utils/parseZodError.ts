import { ZodError } from 'zod';
import { AppValidationError } from './AppValidationError';

export function parseZodError(err: unknown): null {
  if (!(err instanceof ZodError)) {
    return null;
  }

  throw new AppValidationError(err.errors.at(0)?.message);
}
