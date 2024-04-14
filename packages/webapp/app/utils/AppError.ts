export const appErrorCodes = {
  VALIDATION_ERROR: 0,
  UNKNOWN: 1,
  INTERNAL: 2,
  NOT_FOUND: 3,
} as const;

type AppErrorCodeOptions = (typeof appErrorCodes)[keyof typeof appErrorCodes];
const errorMessage: Record<number, string> = {
  [appErrorCodes.VALIDATION_ERROR]: 'Validation Error',
  [appErrorCodes.UNKNOWN]: 'Unknown Error',
  [appErrorCodes.INTERNAL]: 'Internal Error',
  [appErrorCodes.NOT_FOUND]: 'Not Found Error',
} satisfies Record<AppErrorCodeOptions, string>;

export interface ErrorCtx {
  why: string;
  cause: unknown;
}
export class AppError extends Error {
  constructor(
    public readonly code: number = appErrorCodes.UNKNOWN,
    public message: string = errorMessage[code],
    public readonly ctx?: ErrorCtx
  ) {
    super(message);
  }
}
