import { AppError, ErrorCtx, appErrorCodes } from './AppError';

export class AppInternalError extends AppError {
  constructor(message?: string, ctx?: ErrorCtx) {
    super(appErrorCodes.INTERNAL, message, ctx);
  }
}
