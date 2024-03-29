/**
 * Like passThrough, but guaranteed never to return
 * Inspired by: https://www.npmjs.com/package/promise-passthrough
 */
export function forwardError(fn: (value: unknown) => unknown) {
  return function (arg: unknown): never {
    fn(arg);
    // Invoke fn and rethrow error
    throw arg;
  };
}

/**
 * Like passThrough, but guaranteed never to return
 * Inspired by: https://www.npmjs.com/package/promise-passthrough
 */
export function forwardErrorAndAwait(fn: (value: unknown) => Promise<unknown>) {
  return async function (arg: unknown): Promise<never> {
    await fn(arg);
    // Invoke fn and rethrow error
    throw arg;
  };
}
