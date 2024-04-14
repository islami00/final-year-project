import { AppError, ErrorCtx, appErrorCodes } from './AppError';

export class AppValidationError extends AppError {
  constructor(message?: string, ctx?: ErrorCtx) {
    super(appErrorCodes.VALIDATION_ERROR, message, ctx);
  }
}
